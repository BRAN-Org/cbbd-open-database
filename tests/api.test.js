import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import http from 'node:http';
import app from '../server.js';

describe('Integration Tests - REST API Endpoints', () => {
  let server;
  let baseUrl;

  const fetchApi = (path) => fetch(`${baseUrl}${path}`, {
    headers: { 'Connection': 'close' }
  });

  before(async () => {
    process.env.NODE_ENV = 'test';
    server = http.createServer(app);
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    const port = server.address().port;
    baseUrl = `http://127.0.0.1:${port}`;
  });

  after(async () => {
    if (typeof server.closeAllConnections === 'function') {
      server.closeAllConnections();
    }
    if (typeof server.closeIdleConnections === 'function') {
      server.closeIdleConnections();
    }
    await new Promise((resolve) => server.close(resolve));
    if (typeof server.unref === 'function') {
      server.unref();
    }
  });

  test('GET /api/v1/config deve retornar configuração pública', async () => {
    const res = await fetchApi('/api/v1/config');
    assert.strictEqual(res.status, 200);
    const config = await res.json();
    assert.strictEqual(config.organization.name, 'BRAN Org');
  });

  test('GET /api/v1/articles deve retornar lista paginada', async () => {
    const res = await fetchApi('/api/v1/articles?limit=2');
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(data.total > 0);
    assert.strictEqual(data.results.length, 2);
  });

  test('GET /api/v1/articles/stats deve retornar estatísticas consolidadas', async () => {
    const res = await fetchApi('/api/v1/articles/stats');
    assert.strictEqual(res.status, 200);
    const stats = await res.json();
    assert.ok(stats.totalRecords > 0);
  });

  test('GET /api/v1/articles/stats/correlations deve retornar matriz de coocorrência', async () => {
    const res = await fetchApi('/api/v1/articles/stats/correlations');
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(Array.isArray(data.rows));
    assert.ok(Array.isArray(data.cols));
  });

  test('GET /api/v1/articles/stats/scatter deve retornar pontos de dispersão', async () => {
    const res = await fetchApi('/api/v1/articles/stats/scatter');
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(Array.isArray(data.points));
  });

  test('GET /api/v1/articles/export?format=csv deve retornar streaming CSV com BOM', async () => {
    const res = await fetchApi('/api/v1/articles/export?format=csv');
    assert.strictEqual(res.status, 200);
    assert.ok(res.headers.get('content-type').includes('text/csv'));
    const buf = Buffer.from(await res.arrayBuffer());
    assert.strictEqual(buf[0], 0xef);
    assert.strictEqual(buf[1], 0xbb);
    assert.strictEqual(buf[2], 0xbf);
  });

  test('GET /api/v1/articles/export?format=bibtex deve retornar arquivo BibTeX válido', async () => {
    const res = await fetchApi('/api/v1/articles/export?format=bibtex');
    assert.strictEqual(res.status, 200);
    assert.ok(res.headers.get('content-type').includes('bibtex'));
    const text = await res.text();
    assert.ok(text.includes('@inproceedings{'));
    assert.ok(text.includes('title = {'));
  });

  test('GET /api/v1/articles/export?format=ris deve retornar formato RIS com tags TY e ER', async () => {
    const res = await fetchApi('/api/v1/articles/export?format=ris');
    assert.strictEqual(res.status, 200);
    assert.ok(res.headers.get('content-type').includes('research-info-systems'));
    const text = await res.text();
    assert.ok(text.includes('TY  - CONF'));
    assert.ok(text.includes('TI  - '));
    assert.ok(text.includes('ER  - '));
  });

  test('GET /api/v1/articles/:key deve retornar item individual por ID', async () => {
    const resList = await fetchApi('/api/v1/articles?limit=1');
    const dataList = await resList.json();
    assert.ok(dataList.results.length > 0);
    const sampleItem = dataList.results[0];
    const key = encodeURIComponent(sampleItem.doi || sampleItem.id);

    const res = await fetchApi(`/api/v1/articles/${key}`);
    assert.strictEqual(res.status, 200);
    const item = await res.json();
    assert.ok(item);
  });
});
