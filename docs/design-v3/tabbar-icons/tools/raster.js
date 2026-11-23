// usage: node raster.js jobs.json   jobs: [{svg, color, scale, out}]
const sharp = require('/Users/omarlahmimi/Documents/Plotbreak/node_modules/sharp');
const fs = require('fs');
(async () => {
  const jobs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  for (const j of jobs) {
    let s = fs.readFileSync(j.svg, 'utf8').replaceAll('currentColor', j.color);
    // render at scale: density 72 => 1 unit = 1px
    await sharp(Buffer.from(s), { density: 72 * j.scale }).png().toFile(j.out);
  }
  console.log('rendered', jobs.length);
})().catch(e => { console.error(e); process.exit(1); });
