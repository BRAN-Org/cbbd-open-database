#!/usr/bin/env node
/**
 * Sync guard: confere se uma atualização automática do template quebra a API
 * ou os dados do repositório.
 *
 * Uso:
 *   node scripts/sync_guard.js compare <dirBase> <dirHead>
 *   node scripts/sync_guard.js snapshot <dir>      (uso interno, imprime JSON)
 *
 * Regras:
 *   - ERRO  : dados/config alterados, endpoint mudou de status, campo removido
 *             de alguma resposta, contagem de registros diferente.
 *   - AVISO : identidade do repo alterada (name/description do package.json,
 *             título do CHANGELOG), arquivos novos fora do escopo (mock/).
 * Sai com código 1 se houver ERRO.
 */
import { spawnSync } from 'node:child_process';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, resolve } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import http from 'node:http';

const SELF = fileURLToPath(import.meta.url);

// ---------------------------------------------------------------- snapshot

/** Reduz um valor JSON a um "formato" comparável (chaves e tipos, sem valores). */
function shapeOf(value, depth = 0) {
  if (Array.isArray(value)) {
    // Une os formatos dos primeiros itens para não depender de um único registro.
    const merged = {};
    for (const item of value.slice(0, 25)) {
      const s = shapeOf(item, depth + 1);
      if (s && typeof s === 'object') Object.assign(merged, s);
      else merged.__type = s;
    }
    return { __array: merged };
  }
  if (value && typeof value === 'object') {
    if (depth > 4) return 'object';
    const out = {};
    for (const k of Object.keys(value).sort()) out[k] = shapeOf(value[k], depth + 1);
    return out;
  }
  return value === null ? 'null' : typeof value;
}

async function snapshot(dir) {
  const root = resolve(dir);
  process.chdir(root);
  process.env.NODE_ENV = 'test';
  const { default: app } = await import(pathToFileURL(join(root, 'server.js')).href);

  const server = http.createServer(app);
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const get = async (path) => {
    const res = await fetch(base + path, { headers: { Connection: 'close' } });
    const type = res.headers.get('content-type') || '';
    const body = type.includes('json') ? await res.json() : await res.text();
    return { status: res.status, type: type.split(';')[0], body };
  };

  const snap = { endpoints: {} };
  const config = await get('/api/v1/config');
  const entity = config.body?.dataset?.entityName || 'articles';
  const pk = config.body?.dataset?.primaryKey || 'doi';
  snap.entity = entity;
  snap.primaryKey = pk;

  const list = await get(`/api/v1/${entity}?limit=25`);
  const firstKey = list.body?.results?.[0]?.[pk];
  snap.total = list.body?.total ?? null;
  snap.firstKeys = (list.body?.results || []).slice(0, 5).map((r) => r[pk]);

  const paths = [
    '/api/v1/config',
    `/api/v1/${entity}?limit=25`,
    `/api/v1/${entity}?limit=5&page=2`,
    `/api/v1/${entity}/stats`,
    `/api/v1/${entity}/stats/correlations`,
    `/api/v1/${entity}/stats/temporal`,
    `/api/v1/${entity}/stats/scatter`,
    `/api/v1/${entity}/stats/pareto`,
    `/api/v1/${entity}/export?format=csv`,
    `/api/v1/${entity}/export?format=bibtex`,
    `/api/v1/${entity}/export?format=ris`,
    `/api/v1/${entity}/export?format=json`,
    '/api/rota-inexistente',
  ];
  if (firstKey) paths.push(`/api/v1/${entity}/${encodeURIComponent(firstKey)}`);

  for (const p of paths) {
    // Normaliza a chave do registro individual para comparar entre branches.
    const label = firstKey && p.endsWith(encodeURIComponent(firstKey)) ? `/api/v1/${entity}/:key` : p;
    try {
      const r = await get(p);
      snap.endpoints[label] = {
        status: r.status,
        type: r.type,
        shape: typeof r.body === 'string' ? `text:${r.body.length > 0}` : shapeOf(r.body),
        // Em exports de texto, o primeiro cabeçalho/linha revela mudança de colunas.
        head: typeof r.body === 'string' ? r.body.split('\n')[0].slice(0, 300) : undefined,
      };
    } catch (err) {
      snap.endpoints[label] = { status: 0, error: err.message };
    }
  }

  await new Promise((r) => server.close(r));
  server.closeAllConnections?.();
  return snap;
}

// ----------------------------------------------------------------- compare

function hashTree(dir) {
  const out = {};
  if (!existsSync(dir)) return out;
  const walk = (d) => {
    for (const name of readdirSync(d).sort()) {
      const p = join(d, name);
      if (statSync(p).isDirectory()) walk(p);
      else out[p.slice(dir.length + 1)] = createHash('sha256').update(readFileSync(p)).digest('hex');
    }
  };
  walk(dir);
  return out;
}

function readJson(p) {
  try { return JSON.parse(readFileSync(p, 'utf-8')); } catch { return null; }
}

function firstHeading(p) {
  if (!existsSync(p)) return null;
  return readFileSync(p, 'utf-8').split('\n').find((l) => l.startsWith('# ')) || null;
}

/** Lista caminhos presentes em `a` e ausentes em `b` (campos removidos). */
function missingPaths(a, b, prefix = '') {
  const missing = [];
  if (a && typeof a === 'object') {
    if (!b || typeof b !== 'object') return [prefix || '(raiz)'];
    for (const k of Object.keys(a)) {
      const path = prefix ? `${prefix}.${k}` : k;
      if (!(k in b)) missing.push(path);
      else missing.push(...missingPaths(a[k], b[k], path));
    }
  }
  return missing;
}

function runSnapshot(dir) {
  const res = spawnSync(process.execPath, [SELF, 'snapshot', dir], {
    encoding: 'utf-8',
    maxBuffer: 64 * 1024 * 1024,
  });
  if (res.status !== 0) {
    throw new Error(`Falha ao iniciar a API em ${dir}:\n${res.stderr || res.stdout}`);
  }
  const line = res.stdout.split('\n').reverse().find((l) => l.startsWith('__SNAPSHOT__'));
  if (!line) throw new Error(`Snapshot sem saída em ${dir}:\n${res.stdout}`);
  return JSON.parse(line.slice('__SNAPSHOT__'.length));
}

function compare(baseDir, headDir) {
  const errors = [];
  const warnings = [];

  // 1. Dados e configuração do repositório não podem ser tocados por um sync.
  for (const target of ['data', 'config']) {
    const a = hashTree(join(baseDir, target));
    const b = hashTree(join(headDir, target));
    for (const f of new Set([...Object.keys(a), ...Object.keys(b)])) {
      if (a[f] !== b[f]) {
        const kind = !(f in b) ? 'removido' : !(f in a) ? 'adicionado' : 'alterado';
        errors.push(`${target}/${f} foi ${kind} pelo sync`);
      }
    }
  }

  // 2. Identidade do repositório.
  const pa = readJson(join(baseDir, 'package.json')) || {};
  const pb = readJson(join(headDir, 'package.json')) || {};
  for (const k of ['name', 'description']) {
    if (pa[k] !== pb[k]) warnings.push(`package.json "${k}" mudou: "${pa[k]}" -> "${pb[k]}"`);
  }
  const ha = firstHeading(join(baseDir, 'CHANGELOG.md'));
  const hb = firstHeading(join(headDir, 'CHANGELOG.md'));
  if (ha !== hb) warnings.push(`Título do CHANGELOG.md mudou: "${ha}" -> "${hb}"`);
  if (!existsSync(join(baseDir, 'mock')) && existsSync(join(headDir, 'mock'))) {
    warnings.push('Diretório mock/ foi adicionado (dados de exemplo do template entrando no repo)');
  }

  // 3. Contrato da API.
  const sa = runSnapshot(baseDir);
  const sb = runSnapshot(headDir);

  if (sa.entity !== sb.entity) errors.push(`entityName mudou: ${sa.entity} -> ${sb.entity}`);
  if (sa.total !== sb.total) errors.push(`Total de registros mudou: ${sa.total} -> ${sb.total}`);
  if (JSON.stringify(sa.firstKeys) !== JSON.stringify(sb.firstKeys)) {
    errors.push('Os primeiros registros (ordem/chave primária) mudaram');
  }

  for (const [path, ea] of Object.entries(sa.endpoints)) {
    const eb = sb.endpoints[path];
    if (!eb) { errors.push(`${path}: endpoint não testado no head`); continue; }
    if (ea.status !== eb.status) {
      errors.push(`${path}: status ${ea.status} -> ${eb.status}`);
      continue;
    }
    if (ea.type !== eb.type) errors.push(`${path}: content-type ${ea.type} -> ${eb.type}`);
    if (ea.head !== eb.head) errors.push(`${path}: cabeçalho do export mudou ("${ea.head}" -> "${eb.head}")`);
    const gone = missingPaths(ea.shape, eb.shape);
    if (gone.length) errors.push(`${path}: campos removidos da resposta: ${gone.join(', ')}`);
    const added = missingPaths(eb.shape, ea.shape);
    if (added.length) warnings.push(`${path}: campos novos na resposta: ${added.join(', ')}`);
  }

  return { errors, warnings, total: sb.total, entity: sb.entity };
}

// -------------------------------------------------------------------- main

const [cmd, a, b] = process.argv.slice(2);

if (cmd === 'snapshot' && a) {
  snapshot(a)
    .then((s) => { console.log('__SNAPSHOT__' + JSON.stringify(s)); process.exit(0); })
    .catch((err) => { console.error(err.stack || err.message); process.exit(2); });
} else if (cmd === 'compare' && a && b) {
  let result;
  try {
    result = compare(resolve(a), resolve(b));
  } catch (err) {
    console.error(`❌ ${err.message}`);
    process.exit(1);
  }
  console.log(`API: ${result.entity} | registros: ${result.total}`);
  for (const w of result.warnings) console.log(`::warning::${w}`);
  for (const e of result.errors) console.log(`::error::${e}`);
  if (result.errors.length) {
    console.log(`\n❌ O sync quebra a API ou os dados (${result.errors.length} erro(s), ${result.warnings.length} aviso(s)).`);
    process.exit(1);
  }
  console.log(`\n✅ Sync seguro: API e dados intactos (${result.warnings.length} aviso(s)).`);
} else {
  console.error('Uso: node scripts/sync_guard.js compare <dirBase> <dirHead>');
  process.exit(64);
}
