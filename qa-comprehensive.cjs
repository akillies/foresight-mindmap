const fs = require('fs');

console.log('=== COMPREHENSIVE QA CHECK ===\n');
console.log('Analyzing node structure for crash triggers...\n');

// Load the data
const content = fs.readFileSync('/Users/adminster/foresight/foresight-mindmap/src/mindMapData.js', 'utf8');

// Extract data structure
const level1Match = content.match(/level1:\s*\[([\s\S]*?)\n\s*\],?\s*$/m);
const methodologiesMatch = content.match(/methodologies:\s*\[([\s\S]*)\n\s*\]\s*\}/);

if (!level1Match || !methodologiesMatch) {
  console.error('❌ Could not parse mindMapData.js structure');
  process.exit(1);
}

// Count pillars
const pillars = level1Match[1].match(/\{[^}]+\}/g) || [];
console.log(`📊 LEVEL STRUCTURE:`);
console.log(`  Level 0: 1 center node (Strategic Foresight)`);
console.log(`  Level 1: ${pillars.length} pillars (Six Pillars framework)`);

// Parse methodologies
const methodologyObjects = methodologiesMatch[1].match(/\{\s*id:/g) || [];
console.log(`  Level 2: ${methodologyObjects.length} methodologies`);

// Count media items per methodology
const mediaCountsByMethodology = [];
let totalMediaItems = 0;

// Extract each methodology's media array
const methodologyBlocks = methodologiesMatch[1].split(/(?=\{\s*id:)/);

methodologyBlocks.forEach(block => {
  const idMatch = block.match(/id:\s*'([^']+)'/);
  const mediaMatch = block.match(/media:\s*\[([\s\S]*?)\]/);

  if (idMatch && mediaMatch) {
    const id = idMatch[1];
    const mediaItems = mediaMatch[1].match(/\{[^}]*type:/g) || [];
    const count = mediaItems.length;

    mediaCountsByMethodology.push({ id, count });
    totalMediaItems += count;
  }
});

console.log(`  Level 3: ${totalMediaItems} total media items across all methodologies`);

// Calculate worst-case scenarios
console.log(`\n📈 NODE COUNT ANALYSIS:`);
console.log(`  Minimum nodes (nothing expanded): ${1 + pillars.length} nodes`);
console.log(`  All pillars expanded: ${1 + pillars.length + methodologyObjects.length} nodes`);
console.log(`  ALL nodes expanded (worst case): ${1 + pillars.length + methodologyObjects.length + totalMediaItems} nodes`);

// Find methodologies with most media (crash triggers)
const sorted = mediaCountsByMethodology.sort((a, b) => b.count - a.count);

console.log(`\n⚠️  CRASH RISK ANALYSIS (methodologies with most media):`);
console.log(`  Top 5 heaviest methodologies:`);
sorted.slice(0, 5).forEach((m, i) => {
  console.log(`    ${i + 1}. ${m.id}: ${m.count} media items`);
});

// Calculate theoretical crash point
const worstCaseTotal = 1 + pillars.length + methodologyObjects.length + totalMediaItems;
const currentLimit = 150;

console.log(`\n🚨 CRASH POINT DETECTION:`);
console.log(`  Current MAX_TOTAL_NODES limit: ${currentLimit}`);
console.log(`  Theoretical max nodes if all expanded: ${worstCaseTotal}`);

if (worstCaseTotal > currentLimit) {
  console.log(`  ❌ PROBLEM: User can trigger crash by expanding too many nodes!`);
  console.log(`  📊 Safe expansion scenarios with limit ${currentLimit}:`);

  const baseNodes = 1 + pillars.length; // 7
  const availableForMethodologies = currentLimit - baseNodes;

  console.log(`    - Base (center + pillars): ${baseNodes} nodes`);
  console.log(`    - Available for expansion: ${availableForMethodologies} nodes`);
  console.log(`    - Can safely expand ~${Math.floor(availableForMethodologies / (1 + sorted[0].count))} methodologies with media`);

  // Calculate optimal limits
  const safeLimit = Math.ceil(worstCaseTotal * 0.5); // 50% of worst case
  const veryConservativeLimit = Math.ceil((1 + pillars.length + methodologyObjects.length) * 1.2); // Just methodologies + 20%

  console.log(`\n💡 RECOMMENDED LIMITS:`);
  console.log(`    - Very Conservative (no media crashes): ${veryConservativeLimit} nodes`);
  console.log(`    - Conservative (some media allowed): ${safeLimit} nodes`);
  console.log(`    - Current limit: ${currentLimit} nodes`);

  if (currentLimit < veryConservativeLimit) {
    console.log(`    ⚠️  Current limit may prevent viewing methodology media!`);
  }

} else {
  console.log(`  ✅ Current limit safely accommodates all possible nodes`);
}

// Check for data issues
console.log(`\n🔍 DATA INTEGRITY CHECK:`);

let dataIssues = [];

// Check for methodologies without media
const noMedia = mediaCountsByMethodology.filter(m => m.count === 0);
if (noMedia.length > 0) {
  dataIssues.push(`⚠️  ${noMedia.length} methodologies have NO media items`);
  noMedia.forEach(m => console.log(`    - ${m.id}`));
}

// Check for extremely heavy methodologies
const tooHeavy = mediaCountsByMethodology.filter(m => m.count > 9);
if (tooHeavy.length > 0) {
  dataIssues.push(`⚠️  ${tooHeavy.length} methodologies have >9 media items (very heavy)`);
  tooHeavy.forEach(m => console.log(`    - ${m.id}: ${m.count} items`));
}

// Check URLs
const urls = Array.from(content.matchAll(/url:\s*'([^']+)'/g)).map(m => m[1]);
const imageUrls = urls.filter(u => u.includes('wikimedia') || u.includes('pixabay') || (u.includes('.') && /\.(jpg|png|gif|svg|webp)/i.test(u)));

console.log(`\n🖼️  IMAGE ANALYSIS:`);
console.log(`  Total URLs: ${urls.length}`);
console.log(`  Image URLs: ${imageUrls.length}`);
console.log(`  Video URLs: ${urls.filter(u => u.includes('youtube') || u.includes('youtu.be')).length}`);
console.log(`  Local files: ${urls.filter(u => u.startsWith('/')).length}`);

if (imageUrls.length > 50) {
  console.log(`  ⚠️  ${imageUrls.length} images could cause memory issues if all loaded at once`);
  dataIssues.push(`High image count (${imageUrls.length}) - potential memory issue`);
}

if (dataIssues.length === 0) {
  console.log(`\n✅ No data integrity issues found`);
} else {
  console.log(`\n⚠️  Found ${dataIssues.length} potential issues`);
}

// Recommendations
console.log(`\n📋 RECOMMENDATIONS:`);

const recommendations = [];

// Issue 1: Node limit too permissive
if (worstCaseTotal > currentLimit && currentLimit > veryConservativeLimit) {
  recommendations.push({
    priority: 'HIGH',
    issue: 'Current node limit allows risky expansion patterns',
    fix: `Lower MAX_TOTAL_NODES to ${veryConservativeLimit} (prevents media overload) or add progressive disclosure (lazy load media)`
  });
}

// Issue 2: Heavy methodologies
if (sorted[0].count > 6) {
  recommendations.push({
    priority: 'MEDIUM',
    issue: `Methodology "${sorted[0].id}" has ${sorted[0].count} media items`,
    fix: 'Consider pagination or "Load More" button for media-heavy methodologies'
  });
}

// Issue 3: Images
if (imageUrls.length > 50) {
  recommendations.push({
    priority: 'MEDIUM',
    issue: 'Many images could load simultaneously',
    fix: 'Implement lazy loading with Intersection Observer or defer offscreen images'
  });
}

// Issue 4: Memory cleanup
recommendations.push({
  priority: 'HIGH',
  issue: 'No Three.js geometry/material disposal detected in code',
  fix: 'Add cleanup when collapsing nodes: geometry.dispose(), material.dispose(), remove from scene'
});

// Issue 5: Testing strategy
recommendations.push({
  priority: 'CRITICAL',
  issue: 'Need systematic crash testing',
  fix: 'Test expanding: (1) all pillars, (2) all methodologies in one pillar, (3) all media in heaviest methodology'
});

recommendations.forEach((rec, i) => {
  console.log(`\n${i + 1}. [${rec.priority}] ${rec.issue}`);
  console.log(`   → ${rec.fix}`);
});

console.log(`\n\n=== QA CHECK COMPLETE ===`);
console.log(`\n📊 SUMMARY:`);
console.log(`  Total possible nodes: ${worstCaseTotal}`);
console.log(`  Current limit: ${currentLimit}`);
console.log(`  Safety margin: ${((currentLimit / worstCaseTotal) * 100).toFixed(1)}%`);
console.log(`  Recommendations: ${recommendations.length}`);
console.log(`  Critical issues: ${recommendations.filter(r => r.priority === 'CRITICAL').length}`);
console.log(`  High priority: ${recommendations.filter(r => r.priority === 'HIGH').length}`);
