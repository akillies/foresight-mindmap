const fs = require('fs');

console.log('=== CHECKING NODE CONTENT FOR CRASH-CAUSING ISSUES ===\n');

const content = fs.readFileSync('src/mindMapData.js', 'utf8');

let criticalIssues = [];
let warnings = [];

// Check 1: Apostrophes/Quotes that could break string literals
console.log('1. CHECKING FOR UNESCAPED QUOTES IN STRINGS...\n');

// Find all title/description/overview fields
const textFieldRegex = /(title|description|overview):\s*'([^'\\]*(\\.[^'\\]*)*)'/g;
let match;
let quoteIssues = 0;

while ((match = textFieldRegex.exec(content)) !== null) {
  const fieldName = match[1];
  const fieldValue = match[2];

  // Check for problematic patterns
  if (fieldValue.includes('\\"') || fieldValue.includes("\\'")) {
    // Has escapes - check if they're correct
    const lineNum = content.substring(0, match.index).split('\n').length;
    console.log(`⚠️  Line ${lineNum}: ${fieldName} has escape sequences`);
    console.log(`   Preview: ${fieldValue.substring(0, 60)}...`);
    quoteIssues++;
  }
}

if (quoteIssues === 0) {
  console.log('✅ No quote escaping issues\n');
} else {
  console.log(`Found ${quoteIssues} fields with escape sequences\n`);
}

// Check 2: Extremely long URLs that could cause rendering issues
console.log('2. CHECKING URL LENGTHS...\n');

const urlRegex = /url:\s*'([^']+)'/g;
let longUrls = [];

while ((match = urlRegex.exec(content)) !== null) {
  const url = match[1];
  if (url.length > 500) {
    longUrls.push({ url: url.substring(0, 80) + '...', length: url.length });
  }
}

if (longUrls.length > 0) {
  console.log(`⚠️  Found ${longUrls.length} extremely long URLs:\n`);
  longUrls.forEach(item => {
    console.log(`   ${item.length} chars: ${item.url}`);
    warnings.push(`URL too long (${item.length} chars)`);
  });
  console.log();
} else {
  console.log('✅ All URLs reasonable length\n');
}

// Check 3: Description fields that are empty or just whitespace
console.log('3. CHECKING FOR EMPTY/WHITESPACE-ONLY FIELDS...\n');

const emptyFields = [];
const fieldRegex = /(title|description|overview|label):\s*'(\s*)'/g;

while ((match = fieldRegex.exec(content)) !== null) {
  const fieldName = match[1];
  const fieldValue = match[2];

  if (fieldValue.trim() === '') {
    const lineNum = content.substring(0, match.index).split('\n').length;
    emptyFields.push({ line: lineNum, field: fieldName });
  }
}

if (emptyFields.length > 0) {
  console.log(`❌ Found ${emptyFields.length} empty fields:\n`);
  emptyFields.forEach(item => {
    console.log(`   Line ${item.line}: ${item.field} is empty`);
    criticalIssues.push(`Empty ${item.field} at line ${item.line}`);
  });
  console.log();
} else {
  console.log('✅ No empty required fields\n');
}

// Check 4: Check for null/undefined values
console.log('4. CHECKING FOR NULL/UNDEFINED VALUES...\n');

const nullPattern = /:\s*(null|undefined)/g;
let nullCount = 0;

while ((match = nullPattern.exec(content)) !== null) {
  const lineNum = content.substring(0, match.index).split('\n').length;
  const value = match[1];
  console.log(`⚠️  Line ${lineNum}: Found ${value} value`);
  nullCount++;
  warnings.push(`${value} at line ${lineNum}`);
}

if (nullCount === 0) {
  console.log('✅ No null/undefined values\n');
} else {
  console.log(`Found ${nullCount} null/undefined values\n`);
}

// Check 5: Circular references or self-referencing IDs
console.log('5. CHECKING FOR CIRCULAR REFERENCES...\n');

const idRegex = /id:\s*'([^']+)'/g;
const parentRegex = /parent:\s*'([^']+)'/g;

let ids = [];
let parents = [];

while ((match = idRegex.exec(content)) !== null) {
  ids.push(match[1]);
}

while ((match = parentRegex.exec(content)) !== null) {
  parents.push(match[1]);
}

// Check if any ID references itself as parent
const selfRefs = ids.filter((id, idx) => {
  const parentId = parents[idx];
  return id === parentId;
});

if (selfRefs.length > 0) {
  console.log(`❌ Self-referencing IDs found:\n`);
  selfRefs.forEach(id => {
    console.log(`   ${id} references itself as parent`);
    criticalIssues.push(`Circular ref: ${id}`);
  });
  console.log();
} else {
  console.log('✅ No circular references detected\n');
}

// Check 6: Special characters that could crash React rendering
console.log('6. CHECKING FOR REACT-BREAKING CHARACTERS...\n');

const dangerousChars = [
  { pattern: /<script/i, name: '<script tag' },
  { pattern: /<iframe/i, name: '<iframe tag' },
  { pattern: /javascript:/i, name: 'javascript: protocol' },
  { pattern: /on\w+\s*=/i, name: 'inline event handler' },
  { pattern: /\$\{.*\}/, name: 'template literal' },
  { pattern: /\{.*eval.*\}/i, name: 'eval expression' },
];

let dangerousFound = [];

dangerousChars.forEach(({ pattern, name }) => {
  if (pattern.test(content)) {
    const matches = content.match(new RegExp(pattern.source, 'gi')) || [];
    dangerousFound.push({ name, count: matches.length });
  }
});

if (dangerousFound.length > 0) {
  console.log(`❌ DANGEROUS CONTENT DETECTED:\n`);
  dangerousFound.forEach(item => {
    console.log(`   ${item.name}: ${item.count} occurrence(s)`);
    criticalIssues.push(`SECURITY: ${item.name} found`);
  });
  console.log();
} else {
  console.log('✅ No dangerous patterns detected\n');
}

// Check 7: Unclosed brackets/braces
console.log('7. CHECKING BRACKET BALANCE...\n');

const counts = {
  curly: { open: (content.match(/\{/g) || []).length, close: (content.match(/\}/g) || []).length },
  square: { open: (content.match(/\[/g) || []).length, close: (content.match(/\]/g) || []).length },
  paren: { open: (content.match(/\(/g) || []).length, close: (content.match(/\)/g) || []).length },
};

let bracketIssues = [];

Object.keys(counts).forEach(type => {
  const { open, close } = counts[type];
  if (open !== close) {
    const issue = `${type} brackets: ${open} open, ${close} close (${Math.abs(open - close)} unmatched)`;
    console.log(`❌ ${issue}`);
    bracketIssues.push(issue);
    criticalIssues.push(issue);
  }
});

if (bracketIssues.length === 0) {
  console.log('✅ All brackets balanced\n');
}

// Check 8: Check specific problematic methodologies
console.log('8. CHECKING SPECIFIC NODES MENTIONED BY USER...\n');

const problematicNodes = [
  'env-scanning',        // Environmental Scanning (58 media items)
  'futures-triangle',    // User mentioned crashes
  'porters-five',        // User mentioned crashes
];

problematicNodes.forEach(nodeId => {
  const nodeRegex = new RegExp(`id:\\s*'${nodeId}'([\\s\\S]*?)(?=\\{\\s*id:|export default)`, 'i');
  const nodeMatch = content.match(nodeRegex);

  if (!nodeMatch) {
    console.log(`⚠️  ${nodeId}: Not found in data`);
    warnings.push(`${nodeId} not found`);
    return;
  }

  const nodeContent = nodeMatch[1];

  // Count media items
  const mediaCount = (nodeContent.match(/\{\s*type:\s*'/g) || []).length;

  // Check for empty description
  const descMatch = nodeContent.match(/description:\s*'([^']*)'/);
  const descLength = descMatch ? descMatch[1].length : 0;

  // Check for overview
  const hasOverview = /overview:/.test(nodeContent);

  console.log(`   ${nodeId}:`);
  console.log(`     - ${mediaCount} media items`);
  console.log(`     - ${descLength} char description`);
  console.log(`     - Overview: ${hasOverview ? 'Yes' : 'NO - MISSING!'}`);

  if (!hasOverview && nodeId !== 'futures-triangle') {
    warnings.push(`${nodeId} missing overview`);
  }

  if (descLength < 50) {
    warnings.push(`${nodeId} has very short description (${descLength} chars)`);
  }
});

console.log();

// FINAL REPORT
console.log('='.repeat(70));
console.log('FINAL DIAGNOSTIC REPORT');
console.log('='.repeat(70));

if (criticalIssues.length === 0 && warnings.length === 0) {
  console.log('\n✅ ALL CHECKS PASSED\n');
  console.log('Data appears clean - crash likely caused by:');
  console.log('  1. React rendering issue (infinite loop in component)');
  console.log('  2. Three.js memory issue (too many meshes at once)');
  console.log('  3. Browser-specific bug\n');
  process.exit(0);
}

if (criticalIssues.length > 0) {
  console.log(`\n❌ CRITICAL ISSUES (${criticalIssues.length}):\n`);
  criticalIssues.forEach((issue, i) => {
    console.log(`  ${i + 1}. ${issue}`);
  });
}

if (warnings.length > 0) {
  console.log(`\n⚠️  WARNINGS (${warnings.length}):\n`);
  warnings.forEach((warn, i) => {
    console.log(`  ${i + 1}. ${warn}`);
  });
}

console.log(`\nRECOMMENDATION:`);
if (criticalIssues.length > 0) {
  console.log('  Fix critical issues immediately - these could cause crashes.\n');
  process.exit(1);
} else {
  console.log('  Data is clean. Crashes likely from rendering logic, not content.\n');
  process.exit(0);
}
