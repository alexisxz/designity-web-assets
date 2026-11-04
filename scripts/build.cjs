const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const zlib = require('node:zlib');
const CleanCSS = require('clean-css');
const root = path.resolve(__dirname, '..');
const source = path.join(root, 'vendor/slick/1.8.1');
const target = path.join(root, 'dist/slick/1.8.1');
fs.mkdirSync(target, { recursive: true });
const hash = data => crypto.createHash('sha256').update(data).digest('hex');
const inputManifest = JSON.parse(fs.readFileSync(path.join(root, 'vendor-manifest.json')));
for (const entry of inputManifest.files) {
  if (hash(fs.readFileSync(path.join(root, entry.path))) !== entry.sha256) throw new Error('Vendor source differs: ' + entry.path);
}
const files = [];
for (const name of ['slick.css', 'slick-theme.css']) {
  const original = fs.readFileSync(path.join(source, name));
  // Enable only whitespace/comment compaction and charset positioning.
  // All value optimizations and selector/rule reordering remain disabled.
  const level = { 1: { all: false, cleanupCharsets: true, removeWhitespace: true,
    specialComments: 'all', selectorsSortingMethod: false } };
  const result = new CleanCSS({ level, rebase: false, inline: ['none'] })
    .minify('/*! Slick 1.8.1 | MIT | See LICENSE in this directory. */\n' + original.toString());
  if (result.errors.length || result.warnings.length) throw new Error(JSON.stringify(result));
  const output = Buffer.from(result.styles + '\n');
  const outputName = name.replace('.css', '.min.css');
  fs.writeFileSync(path.join(target, outputName), output);
  files.push({ source: 'vendor/slick/1.8.1/' + name, path: 'dist/slick/1.8.1/' + outputName,
    sourceBytes: original.length, bytes: output.length, sourceGzipBytes: zlib.gzipSync(original).length,
    gzipBytes: zlib.gzipSync(output).length, sha256: hash(output) });
}
for (const name of ['ajax-loader.gif', 'fonts/slick.eot', 'fonts/slick.woff', 'fonts/slick.ttf', 'fonts/slick.svg', 'LICENSE']) {
  const data = fs.readFileSync(path.join(source, name));
  fs.mkdirSync(path.dirname(path.join(target, name)), { recursive: true });
  fs.writeFileSync(path.join(target, name), data);
  files.push({ path: 'dist/slick/1.8.1/' + name, bytes: data.length, sha256: hash(data), copiedByteForByte: true });
}
fs.writeFileSync(path.join(root, 'dist/manifest.json'), JSON.stringify({ version: '1.0.0', vendor: 'slick-carousel@1.8.1',
  minifier: 'clean-css@5.3.3', options: { level: { 1: { all: false, cleanupCharsets: true,
    removeWhitespace: true, specialComments: 'all', selectorsSortingMethod: false } },
    rebase: false, inline: ['none'] }, files }, null, 2) + '\n');
console.log(JSON.stringify(files.filter(x => x.source), null, 2));
