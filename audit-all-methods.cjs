const fs = require('fs');
const content = fs.readFileSync('src/mindMapData.js', 'utf8');

console.log('=== COMPREHENSIVE METHODOLOGY AUDIT ===\n');

// Extract all methodology blocks
const methodBlocks = content.split(/(?=\s+\{[\s\n]+id:)/);

const methodologies = [];

methodBlocks.forEach(block => {
  const idMatch = block.match(/id:\s*'([^']+)'/);
  const labelMatch = block.match(/label:\s*'([^']+)'/);
  const mediaMatch = block.match(/media:\s*\[/);

  if (idMatch && labelMatch) {
    const id = idMatch[1];
    const label = labelMatch[1];

    if (mediaMatch) {
      // Count media items in this block
      const mediaSection = block.substring(block.indexOf('media: ['));
      const mediaEnd = mediaSection.indexOf(']');
      const mediaContent = mediaSection.substring(0, mediaEnd);
      const mediaCount = (mediaContent.match(/\{\s*type:/g) || []).length;

      if (mediaCount > 0) {
        methodologies.push({ id, label, mediaCount });
      }
    }
  }
});

// Sort by media count descending
methodologies.sort((a, b) => b.mediaCount - a.mediaCount);

console.log(`Total methodologies with media: ${methodologies.length}\n`);

console.log('MEDIA COUNT DISTRIBUTION:\n');
methodologies.forEach((m, i) => {
  const status = m.mediaCount > 9 ? '⚠️  HEAVY' :
                 m.mediaCount > 6 ? '⚠️  HIGH' :
                 m.mediaCount >= 4 ? '✓ OK' : '✓ Light';
  console.log(`${(i+1).toString().padStart(2)}. ${m.label.padEnd(35)} ${m.mediaCount.toString().padStart(2)} items  ${status}`);
});

// Statistics
const totalMedia = methodologies.reduce((sum, m) => sum + m.mediaCount, 0);
const avgMedia = (totalMedia / methodologies.length).toFixed(1);
const maxMedia = methodologies[0].mediaCount;
const minMedia = methodologies[methodologies.length - 1].mediaCount;

console.log(`\nSTATISTICS:`);
console.log(`  Total media items: ${totalMedia}`);
console.log(`  Average per methodology: ${avgMedia}`);
console.log(`  Maximum: ${maxMedia} (${methodologies[0].label})`);
console.log(`  Minimum: ${minMedia} (${methodologies[methodologies.length - 1].label})`);

// Risk analysis
const heavy = methodologies.filter(m => m.mediaCount > 9);
const high = methodologies.filter(m => m.mediaCount > 6 && m.mediaCount <= 9);
const safe = methodologies.filter(m => m.mediaCount <= 6);

console.log(`\nRISK ANALYSIS:`);
console.log(`  ⚠️  HEAVY (>9 items): ${heavy.length} methodologies`);
heavy.forEach(m => console.log(`      - ${m.label}: ${m.mediaCount} items`));

console.log(`  ⚠️  HIGH (7-9 items): ${high.length} methodologies`);
high.forEach(m => console.log(`      - ${m.label}: ${m.mediaCount} items`));

console.log(`  ✓ SAFE (≤6 items): ${safe.length} methodologies`);

console.log(`\nMITIGATION STRATEGY:`);
console.log(`  Current MAX_MEDIA_PER_METHOD: 6`);
console.log(`  This protects against all ${heavy.length + high.length} high-risk methodologies`);
console.log(`  Impact: ${safe.length}/${methodologies.length} methodologies show all media`);
console.log(`          ${heavy.length + high.length}/${methodologies.length} show first 6 only (rest via info panel)`);

// Calculate new safe limits
const maxSafeExpansion = 1 + 6 + safe.length + (safe.length * 6);  // center + pillars + safe methods + their media
console.log(`\nSAFE EXPANSION SCENARIO:`);
console.log(`  If user expands only safe methodologies (≤6 media):`);
console.log(`    - ${safe.length} methodologies × 6 media = ${safe.length * 6} nodes`);
console.log(`    - Plus pillars and methodologies: +${1 + 6 + safe.length}`);
console.log(`    - Total: ${maxSafeExpansion} nodes`);
console.log(`  Recommended MAX_TOTAL_NODES: ${Math.ceil(maxSafeExpansion * 1.2)} (20% safety margin)`);
