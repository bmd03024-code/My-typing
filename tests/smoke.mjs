import fs from 'node:fs';
import assert from 'node:assert/strict';

const app = fs.readFileSync('app.js', 'utf8');
const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');

assert.doesNotThrow(() => new Function(app), 'app.js must be valid JavaScript');

const htmlIds = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(new Set(htmlIds).size, htmlIds.length, 'HTML ids must be unique');

const referencedIds = [...app.matchAll(/\$\('([^']+)'\)/g)].map(m => m[1]);
const dynamicIds = new Set(['examClock', 'examTarget', 'examInput', 'examMetrics', 'examStop', 'certificate']);
const missingIds = [...new Set(referencedIds.filter(id => !htmlIds.includes(id) && !dynamicIds.has(id)))];
assert.deepEqual(missingIds, [], 'all static JS element references must exist in index.html');

assert.equal((app.match(/\$\('restoreBackup'\)\.onclick/g) || []).length, 1, 'restore handler must be registered once');
assert.equal((app.match(/\$\('backupFile'\)\.onchange/g) || []).length, 1, 'backup file handler must be registered once');
assert.ok(app.includes('if(!run.started&&!run.manualPaused)start()'), 'manual pause must not auto-resume on typing');
assert.ok(app.includes("bindBijoy(inp,()=>lang==='bn')"), 'Bangla final exam must use Bijoy input mapping');
assert.ok(app.includes("KeyQ:['ঙ','ং']") && app.includes("KeyA:['ৃ','র্']") && app.includes("KeyZ:['্র','্য']"), 'core Bijoy normal/shift keys must match the documented chart');
assert.ok(app.includes('Intl.Segmenter'), 'grapheme-aware counting must be enabled where supported');
assert.ok(app.includes('txt.map((ch,i)=>'), 'typing target must render grapheme clusters consistently with Bengali character counting');
assert.ok(css.includes('.key-row'), 'physical keyboard rows must have layout styling');

console.log('My Typing static smoke checks passed.');
console.log('Note: these checks do not replace real browser, keyboard, or end-to-end tests.');
