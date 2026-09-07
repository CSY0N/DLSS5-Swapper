'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DEFAULT_API = 'https://5.rakanki.com';

function validState(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

class CommunityClient {
  constructor({ file, baseUrl = DEFAULT_API, fetchImpl = global.fetch } = {}) {
    if (!file) throw new Error('community state file is required');
    this.file = file;
    this.baseUrl = String(baseUrl).replace(/\/$/, '');
    this.fetch = fetchImpl;
    this.state = null;
  }

  load() {
    if (this.state) return this.state;
    try { this.state = validState(JSON.parse(fs.readFileSync(this.file, 'utf8'))); }
    catch { this.state = {}; }
    if (!/^[A-Za-z0-9_-]{16,64}$/.test(this.state.installId || '')) {
      this.state.installId = crypto.randomBytes(24).toString('base64url');
      this.save();
    }
    this.state.profile = validState(this.state.profile);
    return this.state;
  }

  save() {
    fs.mkdirSync(path.dirname(this.file), { recursive: true });
    const temporary = `${this.file}.${process.pid}.tmp`;
    fs.writeFileSync(temporary, JSON.stringify(this.state, null, 2), { encoding: 'utf8', mode: 0o600 });
    fs.renameSync(temporary, this.file);
  }

  async request(method, pathname, { body, etag, write = false } = {}) {
    const headers = { accept: 'application/json' };
    if (body !== undefined) headers['content-type'] = 'application/json';
    if (etag) headers['if-none-match'] = etag;
    if (write) headers['x-install'] = this.load().installId;
    let response;
    try {
      response = await this.fetch(this.baseUrl + pathname, {
        method, headers, body: body === undefined ? undefined : JSON.stringify(body),
        signal: AbortSignal.timeout(10_000)
      });
    } catch (error) {
      throw Object.assign(new Error('Community service is unavailable. Check your connection and try again.'), {
        code: 'community_offline', cause: error
      });
    }
    if (response.status === 304) return { notModified: true, etag: response.headers.get('etag') || etag || null };
    let data = {};
    try { data = await response.json(); } catch { /* handled as a status error below */ }
    if (!response.ok) {
      throw Object.assign(new Error(data.message || 'Community request failed.'), {
        code: data.error || 'community_failed', status: response.status
      });
    }
    return { data, etag: response.headers.get('etag') || null };
  }

  profile() { return { name: null, icon: 0, ...this.load().profile }; }

  async saveProfile(profile) {
    const { data } = await this.request('PUT', '/v1/me', { body: profile, write: true });
    this.load().profile = { name: data.name || null, icon: Number(data.icon) || 0, tag: data.tag || null };
    this.save();
    return this.profile();
  }

  async cards(filters = {}) {
    const query = new URLSearchParams();
    for (const key of ['q', 'route', 'api', 'status', 'limit', 'offset']) {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '' && filters[key] !== 'all') {
        query.set(key, String(filters[key]));
      }
    }
    return (await this.request('GET', `/v1/cards${query.size ? `?${query}` : ''}`)).data.cards || [];
  }

  async card(key, etag) {
    return this.request('GET', `/v1/cards/${encodeURIComponent(key)}`, { etag });
  }

  async updates(key, since, etag) {
    return this.request('GET', `/v1/cards/${encodeURIComponent(key)}/updates?since=${Number(since) || 0}`, { etag });
  }

  async report(payload) {
    return (await this.request('POST', '/v1/reports', { body: payload, write: true })).data;
  }

  async withdraw(id) {
    return (await this.request('DELETE', `/v1/reports/${encodeURIComponent(id)}`, { write: true })).data;
  }

  async react(id, emoji, on = true) {
    return (await this.request('POST', `/v1/comments/${encodeURIComponent(id)}/reactions`, {
      body: { emoji, on: on !== false }, write: true
    })).data;
  }
}

module.exports = { CommunityClient, DEFAULT_API };
