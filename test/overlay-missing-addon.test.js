'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const { createOverlayLibrary } = require('../src/overlays');
const { writePe } = require('./fixtures/pe');
const gameOverlay = require('../src/game-overlay');

// The add-on the game loads is a file inside this app, and antivirus takes it:
// reported as Trojan:Win32/Kepavll!rfn, a machine-learning verdict on an
// unsigned native DLL. With the file gone the bridge still listened, so the
// Overlay page said "ready, waiting for a game" for as long as anyone cared to
// look, and no game could ever attach. Say what is actually wrong.
function library(t, present) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'overlay-addon-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const builtin = path.join(root, 'dlss5-lab-overlay.addon64');
  // A real add-on is a DLL: readNative checks the COFF characteristics bit,
  // so the fixture has to carry it or the library refuses its own file.
  if (present) {
    writePe(builtin, { text: 'overlay' });
    const bytes = fs.readFileSync(builtin);
    bytes.writeUInt16LE(bytes.readUInt16LE(0x96) | 0x2000, 0x96);
    fs.writeFileSync(builtin, bytes);
  }
  return { root, builtin, lib: createOverlayLibrary(path.join(root, 'library'), builtin, []) };
}

// What the Overlay page asks for, built the way src/overlay-ipc.js builds it.
function bridgeState(lib, live) {
  const entry = lib.resolve('builtin');
  return { ...live, addon: Boolean(entry.ready), addonFile: entry.file };
}

test('a removed add-on is reported, not hidden behind a listening service', (t) => {
  const { lib, builtin } = library(t, false);
  const state = bridgeState(lib, { listening: true, connected: false, game: false });

  assert.equal(state.listening, true, 'the service really is up - that was never the fault');
  assert.equal(state.addon, false);
  assert.equal(state.addonFile, builtin, 'the page can name the file to restore');
});

test('with the add-on in place nothing is claimed to be wrong', (t) => {
  const { lib } = library(t, true);
  const state = bridgeState(lib, { listening: true, connected: true, game: true });
  assert.equal(state.addon, true);
});

test('an add-on left corrupt counts as missing, not as a dead service', (t) => {
  const { lib, root } = library(t, true);
  fs.writeFileSync(path.join(root, 'dlss5-lab-overlay.addon64'), 'not a PE any more');
  let addon = false, addonFile = null;
  try { const entry = lib.resolve('builtin'); addon = Boolean(entry.ready); addonFile = entry.file; }
  catch { addon = false; }
  assert.equal(addon, false);
  assert.equal(addonFile, null);
});

test('installing without the add-on says where the file went' , (t) => {
  const { lib, root, builtin } = library(t, false);
  const exe = path.join(root, 'Game.exe');
  fs.writeFileSync(exe, 'exe');

  assert.throws(() => gameOverlay.prepare({
    library: lib,
    target: { bitness: 64, api: 'dxgi', apiLabel: 'DirectX 12', path: exe },
    route: 'native'
  }), (error) => {
    assert.match(error.message, /missing from this app/);
    assert.match(error.message, /[Aa]ntivirus/, 'names the cause people actually hit');
    assert.ok(error.message.includes(builtin), 'names the file itself');
    return true;
  });
});
