const fs = require('fs');

console.log('=== COMPREHENSIVE DATA INTEGRITY CHECK ===\n');

// Read the data file
const content = fs.readFileSync('src/mindMapData.js', 'utf8');

// Extract the mindMapData array
const dataMatch = content.match(/export const mindMapData = (\[[\s\S]*?\n\];)/);
if (!dataMatch) {
  console.error('❌ CRITICAL: Could not parse mindMapData array');
  process.exit(1);
}

let errors = [];
let warnings = [];

// Check 1: URL Validation
console.log('1. CHECKING URLS FOR MALFORMATION...\n');
const urlRegex = /url:\s*['"]([^'"]+)['"]/g;
let urlMatch;
let urlCount = 0;
let malformedUrls = [];

while ((urlMatch = urlRegex.exec(content)) !== null) {
  urlCount++;
  const url = urlMatch[1];

  // Check for common malformations
  if (url.includes(' ')) {
    malformedUrls.push({ url, issue: 'Contains spaces' });
  }
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    malformedUrls.push({ url, issue: 'Missing http(s)://' });
  }
  if (url.includes('\\')) {
    malformedUrls.push({ url, issue: 'Contains backslashes' });
  }
  if (url.includes('"') || url.includes("'")) {
    malformedUrls.push({ url, issue: 'Contains quotes' });
  }
  // Check for unescaped special chars that could break rendering
  if (url.match(/[<>{}[\]]/)) {
    malformedUrls.push({ url, issue: 'Contains special chars: <>{[]}' });
  }
}

console.log(`Total URLs found: ${urlCount}`);
if (malformedUrls.length > 0) {
  console.log(`\n❌ MALFORMED URLS (${malformedUrls.length}):\n`);
  malformedUrls.forEach((item, i) => {
    console.log(`${i + 1}. ${item.issue}`);
    console.log(`   ${item.url.substring(0, 100)}...\n`);
    errors.push(`URL: ${item.issue} - ${item.url.substring(0, 50)}`);
  });
} else {
  console.log('✅ All URLs properly formed\n');
}

// Check 2: Missing Required Fields
console.log('2. CHECKING FOR MISSING REQUIRED FIELDS...\n');

// Extract all methodology blocks
const methodBlocks = content.split(/(?=\s+\{[\s\n]+id:)/).filter(block => block.includes('id:'));

methodBlocks.forEach((block, idx) => {
  const idMatch = block.match(/id:\s*'([^']+)'/);
  if (!idMatch) return;

  const id = idMatch[1];

  // Check required fields
  const requiredFields = ['label', 'description', 'overview'];
  requiredFields.forEach(field => {
    const fieldRegex = new RegExp(`${field}:\\s*['"]`);
    if (!fieldRegex.test(block)) {
      const issue = `Missing ${field} in ${id}`;
      console.log(`❌ ${issue}`);
      errors.push(issue);
    }
  });

  // Check for empty strings
  const emptyLabel = block.match(/label:\s*['"]['"]/) || block.match(/label:\s*['"]\s*['"]/);
  if (emptyLabel) {
    const issue = `Empty label in ${id}`;
    console.log(`❌ ${issue}`);
    errors.push(issue);
  }
});

if (errors.length === 0) {
  console.log('✅ All methodologies have required fields\n');
}

// Check 3: Media Items Validation
console.log('3. CHECKING MEDIA ITEMS...\n');

const mediaBlocksRegex = /media:\s*\[([\s\S]*?)\]/g;
let mediaMatch;
let mediaIssues = [];

while ((mediaMatch = mediaBlocksRegex.exec(content)) !== null) {
  const mediaContent = mediaMatch[1];

  // Find parent methodology
  const beforeMedia = content.substring(0, mediaMatch.index);
  const parentIdMatch = beforeMedia.match(/id:\s*'([^']+)'(?![\s\S]*id:\s*')/);
  const parentId = parentIdMatch ? parentIdMatch[1] : 'unknown';

  // Count media items
  const mediaItems = (mediaContent.match(/\{\s*type:/g) || []).length;

  // Check each media item has required fields
  const typeMatches = mediaContent.match(/type:\s*'([^']+)'/g) || [];
  const titleMatches = mediaContent.match(/title:\s*'/g) || [];
  const urlMatches = mediaContent.match(/url:\s*'/g) || [];

  if (typeMatches.length !== titleMatches.length) {
    const issue = `${parentId}: ${typeMatches.length} types but ${titleMatches.length} titles`;
    console.log(`❌ ${issue}`);
    mediaIssues.push(issue);
  }

  if (typeMatches.length !== urlMatches.length) {
    const issue = `${parentId}: ${typeMatches.length} types but ${urlMatches.length} urls`;
    console.log(`❌ ${issue}`);
    mediaIssues.push(issue);
  }

  // Check for invalid media types
  const invalidTypes = typeMatches.filter(t => {
    const type = t.match(/type:\s*'([^']+)'/)[1];
    return !['video', 'image', 'article', 'document'].includes(type);
  });

  if (invalidTypes.length > 0) {
    const issue = `${parentId}: Invalid media types: ${invalidTypes.join(', ')}`;
    console.log(`❌ ${issue}`);
    mediaIssues.push(issue);
  }
}

if (mediaIssues.length === 0) {
  console.log('✅ All media items properly structured\n');
} else {
  errors.push(...mediaIssues);
}

// Check 4: Special Characters in Text Fields
console.log('4. CHECKING FOR CRASH-CAUSING SPECIAL CHARACTERS...\n');

const dangerousPatterns = [
  { pattern: /description:\s*'[^']*<script/i, name: 'Script tag in description' },
  { pattern: /title:\s*'[^']*<iframe/i, name: 'Iframe in title' },
  { pattern: /overview:\s*'[^']*javascript:/i, name: 'JavaScript protocol' },
  { pattern: /\${[^}]+}/, name: 'Template literal injection' },
  { pattern: /\\x[0-9a-f]{2}/i, name: 'Hex escape sequences' },
];

dangerousPatterns.forEach(({ pattern, name }) => {
  if (pattern.test(content)) {
    const issue = `SECURITY: ${name} detected`;
    console.log(`⚠️  ${issue}`);
    warnings.push(issue);
  }
});

if (warnings.length === 0) {
  console.log('✅ No dangerous patterns detected\n');
}

// Check 5: Unclosed Strings/Brackets
console.log('5. CHECKING SYNTAX INTEGRITY...\n');

// Count brackets
const openCurly = (content.match(/\{/g) || []).length;
const closeCurly = (content.match(/\}/g) || []).length;
const openSquare = (content.match(/\[/g) || []).length;
const closeSquare = (content.match(/\]/g) || []).length;

if (openCurly !== closeCurly) {
  const issue = `Mismatched curly braces: ${openCurly} open, ${closeCurly} close`;
  console.log(`❌ ${issue}`);
  errors.push(issue);
}

if (openSquare !== closeSquare) {
  const issue = `Mismatched square brackets: ${openSquare} open, ${closeSquare} close`;
  console.log(`❌ ${issue}`);
  errors.push(issue);
}

if (openCurly === closeCurly && openSquare === closeSquare) {
  console.log('✅ All brackets properly matched\n');
}

// Check 6: Duplicate IDs
console.log('6. CHECKING FOR DUPLICATE IDS...\n');

const ids = [];
const idMatches = content.matchAll(/id:\s*'([^']+)'/g);
for (const match of idMatches) {
  ids.push(match[1]);
}

const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
if (duplicates.length > 0) {
  const issue = `Duplicate IDs found: ${[...new Set(duplicates)].join(', ')}`;
  console.log(`❌ ${issue}`);
  errors.push(issue);
} else {
  console.log('✅ All IDs unique\n');
}

// Check 7: Year Field Validation
console.log('7. CHECKING YEAR FIELDS...\n');

const yearMatches = content.matchAll(/year:\s*(\d+|'[^']+')/g);
let invalidYears = [];

for (const match of yearMatches) {
  const year = match[1].replace(/'/g, '');
  const yearNum = parseInt(year);

  if (isNaN(yearNum)) {
    invalidYears.push(`Non-numeric year: ${match[1]}`);
  } else if (yearNum < 1900 || yearNum > 2030) {
    invalidYears.push(`Suspicious year: ${year}`);
  }
}

if (invalidYears.length > 0) {
  invalidYears.forEach(issue => {
    console.log(`⚠️  ${issue}`);
    warnings.push(issue);
  });
} else {
  console.log('✅ All years valid\n');
}

// FINAL REPORT
console.log('='.repeat(60));
console.log('FINAL REPORT');
console.log('='.repeat(60));

if (errors.length === 0 && warnings.length === 0) {
  console.log('\n✅ ALL CHECKS PASSED - Data integrity verified\n');
  process.exit(0);
} else {
  if (errors.length > 0) {
    console.log(`\n❌ CRITICAL ERRORS (${errors.length}):`);
    errors.forEach((err, i) => console.log(`  ${i + 1}. ${err}`));
  }

  if (warnings.length > 0) {
    console.log(`\n⚠️  WARNINGS (${warnings.length}):`);
    warnings.forEach((warn, i) => console.log(`  ${i + 1}. ${warn}`));
  }

  console.log(`\n${errors.length > 0 ? '❌' : '⚠️'} Found ${errors.length} errors and ${warnings.length} warnings\n`);
  process.exit(errors.length > 0 ? 1 : 0);
}
