const fs = require('fs');
const content = fs.readFileSync('/Users/adminster/foresight/foresight-mindmap/src/mindMapData.js', 'utf8');

console.log('=== LINK VALIDATION AUDIT ===\n');

// Extract all URLs from media arrays
const urlMatches = content.matchAll(/url:\s*'([^']+)'/g);
const urls = Array.from(urlMatches).map(m => m[1]);

console.log(`Total URLs found: ${urls.length}\n`);

// Categorize URLs
const urlsByType = {
  youtube: [],
  wikimedia: [],
  wikipedia: [],
  local: [],
  external: []
};

const issues = [];

urls.forEach(url => {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    urlsByType.youtube.push(url);
  } else if (url.includes('wikimedia.org')) {
    urlsByType.wikimedia.push(url);
  } else if (url.includes('wikipedia.org')) {
    urlsByType.wikipedia.push(url);
  } else if (url.startsWith('/')) {
    urlsByType.local.push(url);
    // Check if local file exists
    const localPath = '/Users/adminster/foresight/foresight-mindmap/public' + url;
    const exists = fs.existsSync(localPath);
    if (exists === false) {
      issues.push(`❌ BROKEN LOCAL: ${url} (file not found)`);
    }
  } else {
    urlsByType.external.push(url);
  }

  // Check for suspicious patterns
  if (url.includes('Special:FilePath') || url.includes('Special:Redirect')) {
    issues.push(`⚠️ FRAGILE: ${url} (uses Special:FilePath/Redirect)`);
  }

  if (url.includes(' ')) {
    issues.push(`❌ INVALID: ${url} (contains spaces)`);
  }

  if (url.startsWith('http') === false && url.startsWith('/') === false) {
    issues.push(`❌ INVALID: ${url} (malformed URL)`);
  }
});

console.log('URL BREAKDOWN:');
console.log(`  YouTube videos: ${urlsByType.youtube.length}`);
console.log(`  Wikimedia images: ${urlsByType.wikimedia.length}`);
console.log(`  Wikipedia articles: ${urlsByType.wikipedia.length}`);
console.log(`  Local files: ${urlsByType.local.length}`);
console.log(`  External sites: ${urlsByType.external.length}`);

console.log(`\n\nLOCAL FILES:`);
urlsByType.local.forEach(url => {
  const localPath = '/Users/adminster/foresight/foresight-mindmap/public' + url;
  const exists = fs.existsSync(localPath);
  console.log(`  ${exists ? '✓' : '❌'} ${url}`);
});

if (issues.length > 0) {
  console.log(`\n\n=== URL ISSUES ===`);
  console.log(`Total issues: ${issues.length}\n`);
  issues.forEach(issue => console.log(issue));
} else {
  console.log(`\n\n✓ All URLs valid, no broken links found!`);
}
