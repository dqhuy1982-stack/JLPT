import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}
function ok(message) { console.log(`OK: ${message}`); }
const preview = 'preview/v7';
if (!fs.existsSync(path.join(preview, 'index.html'))) {
  console.log('Preview not yet committed. Validating repository bootstrap only.');
} else {
  const html = fs.readFileSync(path.join(preview, 'index.html'), 'utf8');
  if (!html.includes('<meta name="viewport"')) fail('Missing responsive viewport');
  else ok('Responsive viewport');

  const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)];
  if (scripts.length === 0) fail('No inline JavaScript found');
  scripts.forEach((match, i) => {
    try { new vm.Script(match[1], {filename: `inline-${i+1}.js`}); ok(`Inline script ${i+1}`); }
    catch (e) { fail(`JavaScript parse error in script ${i+1}: ${e.message}`); }
  });
  if (/<script[^>]+\bsrc=/.test(html) || /<link[^>]+\brel=["']stylesheet/.test(html)) {
    fail('Standalone preview has external JS/CSS dependency');
  } else {
    ok('No external JS/CSS dependency');
  }

  const filename = path.join(preview, 'demo_profiles.json');
  if (!fs.existsSync(filename)) {
    fail('Missing demo_profiles.json');
  } else {
    try {
      const obj = JSON.parse(fs.readFileSync(filename, 'utf8'));
      const profiles = obj.profiles;
      if (!profiles || Object.keys(profiles).length !== 4) {
        fail('Expected exactly four demo profiles');
      } else {
        const levels = new Set(Object.values(profiles).map(p => p.target));
        if (levels.size !== 4) fail('Demo profiles must show four distinct paths');
        else ok('Four distinct demo learning paths');
      }
    } catch(e) { fail(`Invalid demo fixture: ${e.message}`); }
  }

  for (const name of ['Vy Anh','Gia Hưng','Khánh']) {
    if (html.includes(name)) fail('Real family name accidentally included in public preview');
  }
}
if (!process.exitCode) console.log('VALIDATION PASSED');
