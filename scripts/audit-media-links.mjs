#!/usr/bin/env node

/**
 * Media Link Audit Script
 *
 * Checks all YouTube videos and external URLs in mindMapData.js for availability.
 *
 * Usage:
 *   node scripts/audit-media-links.mjs
 *   node scripts/audit-media-links.mjs --fix  # Generate suggestions for broken links
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m'
};

// Read mindMapData.js and extract URLs
function extractMediaUrls(filePath) {
  const content = readFileSync(filePath, 'utf8');

  const youtubeUrls = [];
  const externalUrls = [];
  const pdfUrls = [];

  // Match YouTube URLs
  const youtubeRegex = /https:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/g;
  let match;
  while ((match = youtubeRegex.exec(content)) !== null) {
    youtubeUrls.push({
      url: match[0],
      videoId: match[1],
      line: content.substring(0, match.index).split('\n').length
    });
  }

  // Match external URLs (non-YouTube, non-local)
  const urlRegex = /url:\s*['"]([^'"]+)['"]/g;
  while ((match = urlRegex.exec(content)) !== null) {
    const url = match[1];
    const line = content.substring(0, match.index).split('\n').length;

    // Skip local paths and YouTube (already captured)
    if (url.startsWith('/') || url.includes('youtube.com')) continue;

    if (url.endsWith('.pdf')) {
      pdfUrls.push({ url, line });
    } else if (url.startsWith('http')) {
      externalUrls.push({ url, line });
    }
  }

  return { youtubeUrls, externalUrls, pdfUrls };
}

// Check if YouTube video is available using oEmbed API
async function checkYouTubeVideo(videoId) {
  const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

  try {
    const response = await fetch(oembedUrl, {
      method: 'HEAD',
      signal: AbortSignal.timeout(10000)
    });
    return response.ok;
  } catch (error) {
    // Try full GET request as fallback
    try {
      const response = await fetch(oembedUrl, {
        signal: AbortSignal.timeout(10000)
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Check if external URL is accessible
async function checkExternalUrl(url) {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });
    return { ok: response.ok, status: response.status };
  } catch (error) {
    // Try GET as fallback (some servers don't support HEAD)
    try {
      const response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: AbortSignal.timeout(15000),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
      });
      return { ok: response.ok, status: response.status };
    } catch (e) {
      return { ok: false, status: 'ERROR', error: e.message };
    }
  }
}

// Rate limiter to avoid overwhelming servers
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Main audit function
async function runAudit() {
  console.log(`${colors.cyan}========================================${colors.reset}`);
  console.log(`${colors.cyan}   Strategic Foresight Media Audit${colors.reset}`);
  console.log(`${colors.cyan}========================================${colors.reset}\n`);

  const dataPath = join(__dirname, '..', 'src', 'mindMapData.js');
  console.log(`${colors.dim}Reading: ${dataPath}${colors.reset}\n`);

  const { youtubeUrls, externalUrls, pdfUrls } = extractMediaUrls(dataPath);

  // De-duplicate URLs
  const uniqueYouTube = [...new Map(youtubeUrls.map(v => [v.videoId, v])).values()];
  const uniqueExternal = [...new Map(externalUrls.map(v => [v.url, v])).values()];
  const uniquePdfs = [...new Map(pdfUrls.map(v => [v.url, v])).values()];

  console.log(`Found ${colors.blue}${uniqueYouTube.length}${colors.reset} unique YouTube videos`);
  console.log(`Found ${colors.blue}${uniqueExternal.length}${colors.reset} unique external URLs`);
  console.log(`Found ${colors.blue}${uniquePdfs.length}${colors.reset} unique PDF links\n`);

  const results = {
    youtube: { working: [], broken: [] },
    external: { working: [], broken: [] },
    pdfs: { working: [], broken: [] }
  };

  // Check YouTube videos
  console.log(`${colors.yellow}Checking YouTube videos...${colors.reset}`);
  for (let i = 0; i < uniqueYouTube.length; i++) {
    const video = uniqueYouTube[i];
    process.stdout.write(`  [${i + 1}/${uniqueYouTube.length}] ${video.videoId}... `);

    const isAvailable = await checkYouTubeVideo(video.videoId);
    if (isAvailable) {
      console.log(`${colors.green}OK${colors.reset}`);
      results.youtube.working.push(video);
    } else {
      console.log(`${colors.red}BROKEN${colors.reset}`);
      results.youtube.broken.push(video);
    }

    await delay(300); // Rate limit
  }

  // Check external URLs (excluding common reliable sources)
  console.log(`\n${colors.yellow}Checking external URLs...${colors.reset}`);
  const skipDomains = ['wikipedia.org', 'wikimedia.org']; // Usually reliable

  for (let i = 0; i < uniqueExternal.length; i++) {
    const item = uniqueExternal[i];
    const domain = new URL(item.url).hostname;

    if (skipDomains.some(d => domain.includes(d))) {
      process.stdout.write(`  [${i + 1}/${uniqueExternal.length}] ${colors.dim}${domain}${colors.reset}... `);
      console.log(`${colors.blue}SKIPPED (trusted)${colors.reset}`);
      results.external.working.push(item);
      continue;
    }

    process.stdout.write(`  [${i + 1}/${uniqueExternal.length}] ${domain}... `);

    const { ok, status, error } = await checkExternalUrl(item.url);
    if (ok) {
      console.log(`${colors.green}OK${colors.reset}`);
      results.external.working.push(item);
    } else {
      console.log(`${colors.red}BROKEN (${status})${colors.reset}`);
      results.external.broken.push({ ...item, status, error });
    }

    await delay(500); // Rate limit
  }

  // Check PDF URLs (high risk for linkrot)
  console.log(`\n${colors.yellow}Checking PDF links...${colors.reset}`);
  for (let i = 0; i < uniquePdfs.length; i++) {
    const item = uniquePdfs[i];
    const domain = new URL(item.url).hostname;

    process.stdout.write(`  [${i + 1}/${uniquePdfs.length}] ${domain}... `);

    const { ok, status, error } = await checkExternalUrl(item.url);
    if (ok) {
      console.log(`${colors.green}OK${colors.reset}`);
      results.pdfs.working.push(item);
    } else {
      console.log(`${colors.red}BROKEN (${status})${colors.reset}`);
      results.pdfs.broken.push({ ...item, status, error });
    }

    await delay(500);
  }

  // Print summary
  console.log(`\n${colors.cyan}========================================${colors.reset}`);
  console.log(`${colors.cyan}              SUMMARY${colors.reset}`);
  console.log(`${colors.cyan}========================================${colors.reset}\n`);

  console.log(`${colors.blue}YouTube Videos:${colors.reset}`);
  console.log(`  ${colors.green}Working: ${results.youtube.working.length}${colors.reset}`);
  console.log(`  ${colors.red}Broken: ${results.youtube.broken.length}${colors.reset}`);

  console.log(`\n${colors.blue}External URLs:${colors.reset}`);
  console.log(`  ${colors.green}Working: ${results.external.working.length}${colors.reset}`);
  console.log(`  ${colors.red}Broken: ${results.external.broken.length}${colors.reset}`);

  console.log(`\n${colors.blue}PDF Links:${colors.reset}`);
  console.log(`  ${colors.green}Working: ${results.pdfs.working.length}${colors.reset}`);
  console.log(`  ${colors.red}Broken: ${results.pdfs.broken.length}${colors.reset}`);

  // Print broken items
  if (results.youtube.broken.length > 0) {
    console.log(`\n${colors.red}Broken YouTube Videos:${colors.reset}`);
    results.youtube.broken.forEach(v => {
      console.log(`  Line ${v.line}: ${v.url}`);
    });
  }

  if (results.external.broken.length > 0) {
    console.log(`\n${colors.red}Broken External URLs:${colors.reset}`);
    results.external.broken.forEach(v => {
      console.log(`  Line ${v.line}: ${v.url} (${v.status})`);
    });
  }

  if (results.pdfs.broken.length > 0) {
    console.log(`\n${colors.red}Broken PDF Links (consider local backup):${colors.reset}`);
    results.pdfs.broken.forEach(v => {
      console.log(`  Line ${v.line}: ${v.url} (${v.status})`);
    });
  }

  // Write detailed report
  const reportPath = join(__dirname, '..', 'MEDIA_AUDIT_REPORT.json');
  writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n${colors.dim}Detailed report saved to: MEDIA_AUDIT_REPORT.json${colors.reset}`);

  // Calculate health score
  const total = uniqueYouTube.length + uniqueExternal.length + uniquePdfs.length;
  const working = results.youtube.working.length + results.external.working.length + results.pdfs.working.length;
  const healthScore = Math.round((working / total) * 100);

  console.log(`\n${colors.cyan}Media Health Score: ${healthScore}%${colors.reset}`);

  if (healthScore >= 90) {
    console.log(`${colors.green}Excellent! Very few broken links.${colors.reset}`);
  } else if (healthScore >= 70) {
    console.log(`${colors.yellow}Good, but some links need attention.${colors.reset}`);
  } else {
    console.log(`${colors.red}Needs work - many broken links detected.${colors.reset}`);
  }

  return results;
}

// Run the audit
runAudit().catch(console.error);
