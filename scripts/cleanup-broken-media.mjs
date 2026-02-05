#!/usr/bin/env node

/**
 * Cleanup Broken Media Script
 *
 * Removes all broken external image URLs (Wikimedia, etc.)
 * Keeps only local diagrams (/diagrams/) and working videos/podcasts/articles
 *
 * Run: node scripts/cleanup-broken-media.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Known broken URLs from QA audit
const BROKEN_URLS = [
  // Wikimedia 404s (31 items)
  'upload.wikimedia.org/wikipedia/commons/0/0d/Delphi_Method.png',
  'upload.wikimedia.org/wikipedia/commons/1/16/Gene_Roddenberry_in_1976.jpg',
  'upload.wikimedia.org/wikipedia/commons/3/36/Arthur_C._Clarke_%281982%29.jpg',
  'upload.wikimedia.org/wikipedia/commons/3/38/Rand_Corporation_logo.svg',
  'upload.wikimedia.org/wikipedia/commons/3/3c/Morphological_box.png',
  'upload.wikimedia.org/wikipedia/commons/4/4a/Kondratieff_Wave.svg',
  'upload.wikimedia.org/wikipedia/commons/5/5e/Generation_timeline.svg',
  'upload.wikimedia.org/wikipedia/commons/5/5f/FAA_8040.4B_Risk_matrix.svg',
  'upload.wikimedia.org/wikipedia/commons/6/65/Alvin_Toffler_02.jpg',
  'upload.wikimedia.org/wikipedia/commons/6/66/ETH-BIB-Zwicky',
  'upload.wikimedia.org/wikipedia/commons/7/74/Ursula_K_Le_Guin.JPG',
  'upload.wikimedia.org/wikipedia/commons/7/7a/Buckminster_Fuller_1917.jpg',
  'upload.wikimedia.org/wikipedia/commons/a/a1/Braudel_time_scales.png',
  'upload.wikimedia.org/wikipedia/commons/a/a7/Backcasting_vs_Forecasting.png',
  'upload.wikimedia.org/wikipedia/commons/a/ab/Futures_cone.svg',
  'upload.wikimedia.org/wikipedia/commons/b/b0/Eisenhower_matrix.svg',
  'upload.wikimedia.org/wikipedia/commons/b/b4/Milky_Way_IR_Spitzer.jpg',
  'upload.wikimedia.org/wikipedia/commons/c/c0/Ansoff_Matrix.jpg',
  'upload.wikimedia.org/wikipedia/commons/c/c0/Portrait_of_Ray_Kurzweil.png',
  'upload.wikimedia.org/wikipedia/commons/c/c3/Herman_Kahn.jpg',
  'upload.wikimedia.org/wikipedia/commons/c/c4/Kondratieff_Wave.svg',
  'upload.wikimedia.org/wikipedia/commons/c/c6/Stakeholder_analysis.png',
  'upload.wikimedia.org/wikipedia/commons/d/d3/Neal_Stephenson_2008_crop.jpg',
  'upload.wikimedia.org/wikipedia/commons/d/d4/Scenario_matrix.png',
  'upload.wikimedia.org/wikipedia/commons/d/de/William_Gibson_60th_birthday_portrait.jpg',
  'upload.wikimedia.org/wikipedia/commons/e/e0/Technology-Adoption-Lifecycle.png',
  'upload.wikimedia.org/wikipedia/commons/e/e4/Competitiveforces.svg',
  'upload.wikimedia.org/wikipedia/commons/e/ea/Igor_Ansoff%2C_1971.jpg',
  'upload.wikimedia.org/wikipedia/commons/f/f5/MichaelCrichton.jpg',
  'upload.wikimedia.org/wikipedia/commons/f/f7/Peter_Schwartz_in_2022.jpg',
  'upload.wikimedia.org/wikipedia/commons/f/f7/Vision_Framework.svg',
  // External 403/406 errors (7 items)
  'metafuture.org/video/tedxnoosa',
  'sciencedirect.com/science/article/abs/pii/S0016328715001160',
  'sciencedirect.com/science/article/abs/pii/S0016328719303556',
  'medium.com/the-futurist/',
  'apf.org/foresight-competency-model',
];

function isBrokenUrl(url) {
  if (!url) return false;
  return BROKEN_URLS.some(broken => url.includes(broken));
}

function main() {
  const dataPath = join(__dirname, '..', 'src', 'mindMapData.js');
  console.log(`Reading: ${dataPath}`);

  let content = readFileSync(dataPath, 'utf8');
  let removedCount = 0;

  // Match media objects and remove broken ones
  // Pattern matches: { type: '...', ... url: 'BROKEN_URL', ... }
  for (const brokenUrl of BROKEN_URLS) {
    // Escape special regex characters in URL
    const escapedUrl = brokenUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Match the entire media object containing this URL
    // This handles multi-line objects with various property orders
    const pattern = new RegExp(
      `\\s*\\{[^{}]*url:\\s*['"]https?://[^'"]*${escapedUrl}[^'"]*['"][^{}]*\\},?`,
      'gs'
    );

    const matches = content.match(pattern);
    if (matches) {
      removedCount += matches.length;
      content = content.replace(pattern, '');
      console.log(`  Removed ${matches.length} entries with: ${brokenUrl.substring(0, 50)}...`);
    }
  }

  // Clean up any double commas or trailing commas
  content = content.replace(/,(\s*),/g, ',');
  content = content.replace(/,(\s*)\]/g, '$1]');
  content = content.replace(/\[\s*,/g, '[');

  console.log(`\nTotal removed: ${removedCount} broken media entries`);

  // Write the cleaned file
  writeFileSync(dataPath, content);
  console.log('Saved cleaned mindMapData.js');
}

main();
