const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const sha = data => crypto.createHash('sha256').update(data).digest('hex');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'dist/manifest.json')));
for (const file of manifest.files) {
  if (sha(fs.readFileSync(path.join(root, file.path))) !== file.sha256) throw new Error('Build hash mismatch: ' + file.path);
  if (file.copiedByteForByte) {
    const vendorPath = file.path.replace('dist/', 'vendor/');
    if (!fs.readFileSync(path.join(root, file.path)).equals(fs.readFileSync(path.join(root, vendorPath)))) throw new Error('Asset changed: ' + file.path);
  }
}
console.log('All build hashes and copied dependency bytes verified.');
