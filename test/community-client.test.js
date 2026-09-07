'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { CommunityClient } = require('../src/community-client');

function fixture(t, replies = []) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'dlss5-community-client-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const calls = [];
  const fetchImpl = async (url, options) => {
    calls.push({ url, options });
    const reply = replies.shift() || { status: 200, body: {} };
    return new Response([204, 205, 304].includes(reply.status) ? null : JSON.stringify(reply.body), {
      status: reply.status,
      headers: { 'content-type': 'application/json', ...(reply.headers || {}) }
    });
  };
  return { calls, client: new CommunityClient({ file: path.join(root, 'community.json'), baseUrl: 'https://example.test', fetchImpl }) };
}

test('one private install id is generated and reused for writes', async (t) => {
  const { client, calls } = fixture(t, [{ body: { name: 'Rakan', icon: 3, tag: 'abcd' } }, { body: { ok: true } }]);
  await client.saveProfile({ name: 'Rakan', icon: 3 });
  await client.react(7, '🔥');
  const first = calls[0].options.headers['x-install'];
  assert.match(first, /^[A-Za-z0-9_-]{16,64}$/);
  assert.equal(calls[1].options.headers['x-install'], first);
  assert.equal(fs.readFileSync(client.file, 'utf8').includes(first), true);
});

test('reads never send the install id and encode card keys', async (t) => {
  const { client, calls } = fixture(t, [{ body: { key: 'steam:10' }, headers: { etag: '"7"' } }]);
  const result = await client.card('steam:10');
  assert.equal(calls[0].url, 'https://example.test/v1/cards/steam%3A10');
  assert.equal(calls[0].options.headers['x-install'], undefined);
  assert.equal(result.etag, '"7"');
});

test('a 304 is returned as a small not-modified result', async (t) => {
  const { client } = fixture(t, [{ status: 304, body: null, headers: { etag: '"9"' } }]);
  assert.deepEqual(await client.updates('steam:10', 9, '"9"'), { notModified: true, etag: '"9"' });
});

test('server rejection text survives for the settings page', async (t) => {
  const { client } = fixture(t, [{ status: 400, body: { error: 'reserved_name', message: 'That name is reserved.' } }]);
  await assert.rejects(() => client.saveProfile({ name: 'admin', icon: 0 }), error => {
    assert.equal(error.code, 'reserved_name');
    assert.equal(error.message, 'That name is reserved.');
    return true;
  });
});
