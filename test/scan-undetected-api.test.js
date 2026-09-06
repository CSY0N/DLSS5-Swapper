'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const { scanGame } = require('../src/core/scan');
const routes = require('../src/shared/install-routes');
const renderingApi = require('../src/shared/rendering-api');

// A valid 64-bit PE that mentions no Direct3D entry point at all, which is what
// a protected or launcher-fronted build looks like from the outside.
function silentPe(file, { dll = false, size = 64 * 1024 } = {}) {
  const buf = Buffer.alloc(size);
  buf.writeUInt16LE(0x5a4d, 0);
  buf.writeUInt32LE(0x80, 0x3c);
  buf.writeUInt32LE(0x00004550, 0x80);
  buf.writeUInt16LE(0x8664, 0x84);
  buf.writeUInt16LE(0, 0x86);
  buf.writeUInt16LE(240, 0x94);
  buf.writeUInt16LE(dll ? 0x2022 : 0x0022, 0x96);
  buf.writeUInt16LE(0x20b, 0x98);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, buf);
  return file;
}

function game(t, name) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), name));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  return dir;
}

test('a game that ships DLSS is still found when its executable names no API', async (t) => {
  const dir = game(t, 'scan-undetected-');
  silentPe(path.join(dir, 'Game.exe'));
  silentPe(path.join(dir, 'nvngx_dlss.dll'), { dll: true });

  const scan = await scanGame(dir);
  assert.ok(scan.chosen, 'the game must not be dropped');
  assert.equal(scan.chosen.name, 'Game.exe');
  assert.equal(scan.chosen.via, 'undetected');
  assert.equal(scan.chosen.api, null, 'the renderer is reported as unknown, never guessed');
  assert.equal(scan.chosen.apiLabel, null);
  assert.equal(scan.emptyReason, null);
  assert.ok(scan.primaryDlss, 'the DLSS runtime is still reported');

  // Unknown means no route until the person picks one; picking one works.
  assert.deepEqual(routes.routesFor(scan.chosen), []);
  const picked = renderingApi.effective(scan.chosen, 'd3d12');
  assert.equal(picked.apiLabel, 'DirectX 12');
  assert.deepEqual(routes.routesFor(picked), ['native', 'feeder']);
  assert.deepEqual(routes.routesFor(renderingApi.effective(scan.chosen, 'vulkan')), ['feeder']);
});

test('a folder with no NVIDIA runtime is not turned into a game by this', async (t) => {
  const dir = game(t, 'scan-plain-');
  silentPe(path.join(dir, 'Tool.exe'));

  const scan = await scanGame(dir);
  assert.equal(scan.chosen, null, 'an ordinary folder of executables stays unrecognised');
  assert.equal(scan.emptyReason, 'no-graphics-exe');
});

test('an executable that does name its API is preferred over a silent one', async (t) => {
  const dir = game(t, 'scan-mixed-');
  silentPe(path.join(dir, 'Launcher.exe'), { size: 300 * 1024 });
  const real = silentPe(path.join(dir, 'Engine.exe'), { size: 300 * 1024 });
  // Give the second one a D3D12 marker so detection has something to read.
  const buf = fs.readFileSync(real);
  buf.write('D3D12CreateDevice', 0x1000, 'ascii');
  fs.writeFileSync(real, buf);
  silentPe(path.join(dir, 'nvngx_dlss.dll'), { dll: true });

  const scan = await scanGame(dir);
  assert.equal(scan.chosen.name, 'Engine.exe');
  assert.equal(scan.chosen.apiLabel, 'DirectX 12');
  assert.notEqual(scan.chosen.via, 'undetected');
});
