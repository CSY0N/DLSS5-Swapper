'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const compatibility = require('../src/core/compatibility');

// Numbers read off a real machine: Spider-Man Remastered ships 6.3.9600.16384,
// dated 2013, next to its executable; Windows itself carries 10.0.26100.9168.
// Windows loads the game-local copy first, and one from before the Windows 10
// SDK cannot compile the neural pass (cs_5_1) - so the pass produces nothing
// while the install, the add-on and the frame counter all report success.
function folder(t, version) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'shader-compiler-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  if (version !== null) fs.writeFileSync(path.join(dir, 'D3DCompiler_47.dll'), 'dll');
  return [dir, () => version];
}

test('a compiler from before the Windows 10 SDK is reported', (t) => {
  const [dir, version] = folder(t, '6.3.9600.16384');
  const stale = compatibility.oldShaderCompiler(dir, version);
  assert.equal(stale.version, '6.3.9600.16384');
  assert.equal(path.basename(stale.file), 'D3DCompiler_47.dll');
});

test('a current compiler beside the game is not worth mentioning', (t) => {
  const [dir, version] = folder(t, '10.0.26100.9168');
  assert.equal(compatibility.oldShaderCompiler(dir, version), null);
  const [older, ok] = folder(t, '10.0.19041.1');
  assert.equal(compatibility.oldShaderCompiler(older, ok), null,
    'Assassin\u2019s Creed Mirage ships this one and compiles the pass fine');
});

test('no compiler in the game folder is the normal case', (t) => {
  const [dir, version] = folder(t, null);
  assert.equal(compatibility.oldShaderCompiler(dir, version), null);
});

test('an unreadable version resource never speaks up', (t) => {
  const [dir] = folder(t, '6.3.9600.16384');
  assert.equal(compatibility.oldShaderCompiler(dir, () => null), null);
  assert.equal(compatibility.oldShaderCompiler(dir, () => { throw new Error('locked'); }), null);
});

// Whatever the guard decides, it is advice: the install goes ahead either way.
test('Windows own copy is current, so the check is quiet on a clean machine', () => {
  const system32 = path.join(process.env.SystemRoot || 'C:\\Windows', 'System32');
  if (!fs.existsSync(path.join(system32, 'D3DCompiler_47.dll'))) return;
  assert.equal(compatibility.oldShaderCompiler(system32), null);
});
