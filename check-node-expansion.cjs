const fs = require('fs');
const content = fs.readFileSync('src/mindMapData.js', 'utf8');

console.log('=== CHECKING WHICH NODES CAN/CANNOT EXPAND ===\n');

// Find all methodology blocks
const methodRegex = /\{\s*id:\s*'([^']+)'[\s\S]*?parent:\s*'([^']+)'[\s\S]*?media:\s*\[([\s\S]*?)\]/g;
let match;
let results = [];

while ((match = methodRegex.exec(content)) !== null) {
  const id = match[1];
  const parent = match[2];
  const mediaSection = match[3];

  // Count media items
  const mediaCount = (mediaSection.match(/\{\s*type:/g) || []).length;

  results.push({ id, parent, mediaCount });
}

console.log('METHODOLOGIES WITH MEDIA:\n');
results.sort((a, b) => b.mediaCount - a.mediaCount);
results.forEach(r => {
  const status = r.mediaCount > 0 ? '✓' : '✗';
  console.log(`  ${status} ${r.id.padEnd(25)} ${r.mediaCount.toString().padStart(2)} media items`);
});

console.log(`\nTotal: ${results.length} methodologies`);
console.log(`With media: ${results.filter(r => r.mediaCount > 0).length}`);
console.log(`Without media (WON'T EXPAND): ${results.filter(r => r.mediaCount === 0).length}`);

const noMedia = results.filter(r => r.mediaCount === 0);
if (noMedia.length > 0) {
  console.log('\n⚠️  NODES THAT CANNOT EXPAND (no media):');
  noMedia.forEach(n => console.log(`   - ${n.id}`));
}

// Check if they have overview/details instead
console.log('\n=== CHECKING IF NO-MEDIA NODES HAVE OTHER CONTENT ===\n');
noMedia.forEach(node => {
  const nodeRegex = new RegExp(`id:\\s*'${node.id}'([\\s\\S]*?)(?=\\{\\s*id:|\\]\\s*\\}\\s*\\};)`, 'i');
  const nodeMatch = content.match(nodeRegex);

  if (nodeMatch) {
    const nodeContent = nodeMatch[1];
    const hasOverview = /overview:/.test(nodeContent);
    const hasDetails = /details:/.test(nodeContent);
    const descMatch = nodeContent.match(/description:\s*'([^']*)'/);
    const descLength = descMatch ? descMatch[1].length : 0;

    console.log(`${node.id}:`);
    console.log(`  Overview: ${hasOverview ? 'YES' : 'NO'}`);
    console.log(`  Details: ${hasDetails ? 'YES' : 'NO'}`);
    console.log(`  Description length: ${descLength} chars`);

    if (hasOverview || hasDetails || descLength > 50) {
      console.log(`  ⚠️  HAS CONTENT BUT CAN'T EXPAND!\n`);
    } else {
      console.log(`  (legitimately empty)\n`);
    }
  }
});
