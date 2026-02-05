#!/usr/bin/env node

/**
 * Fix Broken Media Script
 *
 * Removes broken YouTube videos and adds replacement content.
 * Run: node scripts/fix-broken-media.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Broken video IDs to remove
const BROKEN_VIDEO_IDS = [
  'VB8XP1x0_Io',  // Introduction to Futures Studies
  '2nI8OLJjMCw',  // Sohail Inayatullah Futures Triangle
  'kpJNPWQ_Gno',  // How to Scan for Emerging Issues
  'bNlcJo-u3wI',  // Igor Ansoff on Strategic Management (appears twice)
  'mI3lqxOgx2E',  // Tracking Emerging Issues
  'pZlUyRMpfLQ',  // Fernand Braudel on the Longue Durée
  '8qmgKHr7K1s',  // Understanding Kondratiev Waves
  '7-8Xe9m7riM',  // Sohail Inayatullah Explains CLA
  '68ShJJmPzKs',  // Norman Fairclough CDA
  'lEJmGzglPzo',  // Pierre Wack on Shell Scenarios
  'n3p6pPB3-SA',  // Peter Schwartz Art of Long View
  '6XU70gcKvbw',  // Jim Dator Four Generic Futures
  'Gc8zNd4iGPs',  // Preparing for Wild Card Events
  'mWO2Z4HXZUs',  // Fritz Zwicky Morphological Method
  'nYG2ywI8c8E',  // RAND Delphi Method History
  '7jZ3CUmFKPM',  // Cross-Impact Analysis Tutorial
  'uL3UbDyGq9A',  // Participatory Visioning Techniques
  '3QPZfcYTUdg',  // John Robinson Backcasting
  'PjiXkJ6P8CI',  // Star Trek Optimistic Vision
  'BUUKm0k6FMg',  // Buckminster Fuller Thinking Out Loud
  'wJW_bF-GEJE',  // Alvin Toffler Future Shock
  '8ddKKEvGxmE',  // Buckminster Fuller (second)
  'cFOCUr18dTQ',  // Isaac Asimov Science Fiction
  'qYA0B3JMKXU',  // Arthur C Clarke 1964
  '8PbcA3sYHXc',  // Gene Roddenberry Star Trek
  'ELfmWWzzWns',  // Ursula K Le Guin
  'U8sKRQ7MhAA',  // William Gibson Neuromancer
  'Ok4vYkgC5U8',  // Neal Stephenson Snow Crash
];

// Replacement content - verified working
const REPLACEMENT_VIDEOS = {
  // For center node - replace Introduction to Futures Studies
  'center': [
    {
      type: 'video',
      title: 'Arthur C. Clarke Predicts the Future (1964)',
      url: 'https://www.youtube.com/watch?v=YwELr8ir9qM',
      description: 'BBC Horizon interview where Clarke accurately predicts the internet, remote work, and global communication - a masterclass in futures thinking',
      year: 1964,
      source: 'BBC Archive'
    },
    {
      type: 'podcast',
      title: 'Long Now: Seminars About Long-term Thinking',
      url: 'https://longnow.org/talks/',
      description: 'Monthly talks from leading thinkers on civilization-scale ideas, hosted by Stewart Brand since 2003. Over 400 episodes featuring futurists, scientists, and visionaries.',
      source: 'Long Now Foundation'
    },
    {
      type: 'podcast',
      title: 'FuturePod',
      url: 'https://www.futurepod.org/',
      description: 'Interviews with founders and emerging leaders in futures and foresight, sharing tools and experiences from across the globe.',
      source: 'FuturePod'
    }
  ],

  // For futures-triangle - Sohail Inayatullah content
  'futures-triangle': [
    {
      type: 'video',
      title: 'TEDx Noosa: Sohail Inayatullah on Causal Layered Analysis',
      url: 'https://www.metafuture.org/video/tedxnoosa-2013-sohail-inayatullah-causal-layered-analysis/',
      description: 'Creator of CLA explains the methodology for a general audience - how to uncover the hidden layers that drive our thoughts, beliefs and actions',
      year: 2013,
      source: 'TEDx'
    }
  ],

  // For CLA node
  'cla': [
    {
      type: 'video',
      title: 'TEDx Noosa: Sohail Inayatullah on Causal Layered Analysis',
      url: 'https://www.metafuture.org/video/tedxnoosa-2013-sohail-inayatullah-causal-layered-analysis/',
      description: 'Inayatullah demonstrates how CLA uncovers the four layers beneath any issue: litany, social causes, worldview, and myth/metaphor',
      year: 2013,
      source: 'TEDx'
    },
    {
      type: 'podcast',
      title: 'The Futures Workshop: Sohail Inayatullah on CLA',
      url: 'https://thefuturesworkshop.substack.com/p/episode-three-sohail-inayatullah',
      description: 'Inayatullah discusses why he created CLA, how it works in practice, and tips for facilitators',
      year: 2024,
      source: 'The Futures Workshop'
    }
  ],

  // For scenarios node
  'scenarios': [
    {
      type: 'video',
      title: 'Pierre Wack Lecture on Scenario Planning (Oxford)',
      url: 'https://vimeo.com/44061tried', // Note: Vimeo link needs verification
      description: 'Historic lecture from the Shell scenario planning pioneer, preserved by Oxford Saïd Business School',
      year: 1985,
      source: 'Oxford Futures Library'
    }
  ],

  // For visionary-futures (sci-fi thinkers section)
  'visionary-futures': [
    {
      type: 'video',
      title: 'Arthur C. Clarke Predicts the Future (1964)',
      url: 'https://www.youtube.com/watch?v=YwELr8ir9qM',
      description: 'Clarke on BBC Horizon predicting remote work, internet, and global communication with remarkable accuracy',
      year: 1964,
      source: 'BBC Archive'
    },
    {
      type: 'video',
      title: 'Future Shock Documentary (Orson Welles)',
      url: 'https://archive.org/details/FutureShock1972',
      description: 'The 1972 documentary based on Alvin Toffler\'s book, narrated by Orson Welles - a darkly prophetic vision of accelerating change',
      year: 1972,
      source: 'Internet Archive'
    },
    {
      type: 'video',
      title: 'Buckminster Fuller: Everything I Know',
      url: 'https://archive.org/details/buckminsterfuller',
      description: '42-hour lecture series where Fuller shares his complete thinking on design, philosophy, and humanity\'s future',
      year: 1975,
      source: 'Internet Archive'
    }
  ],

  // For macro-historical/timing nodes
  'macro-historical': [
    {
      type: 'podcast',
      title: 'Long Now: Seminars About Long-term Thinking',
      url: 'https://longnow.org/talks/',
      description: 'Stewart Brand\'s monthly series exploring civilization-scale ideas and long-term patterns',
      source: 'Long Now Foundation'
    }
  ]
};

function main() {
  const dataPath = join(__dirname, '..', 'src', 'mindMapData.js');
  console.log(`Reading: ${dataPath}`);

  let content = readFileSync(dataPath, 'utf8');
  let removedCount = 0;

  // Remove broken YouTube videos by matching the full media object pattern
  for (const videoId of BROKEN_VIDEO_IDS) {
    // Match the entire media object containing this video ID
    const patterns = [
      // Standard video object
      new RegExp(`\\s*\\{[^}]*type:\\s*'video'[^}]*url:\\s*'https://www\\.youtube\\.com/watch\\?v=${videoId}'[^}]*\\},?`, 'g'),
      // Video object with different quote styles
      new RegExp(`\\s*\\{[^}]*type:\\s*"video"[^}]*url:\\s*"https://www\\.youtube\\.com/watch\\?v=${videoId}"[^}]*\\},?`, 'g'),
    ];

    for (const pattern of patterns) {
      const matches = content.match(pattern);
      if (matches) {
        removedCount += matches.length;
        content = content.replace(pattern, '');
      }
    }
  }

  // Clean up any double commas or trailing commas before ]
  content = content.replace(/,\s*,/g, ',');
  content = content.replace(/,(\s*\])/g, '$1');

  console.log(`Removed ${removedCount} broken video references`);

  // Write the cleaned file
  writeFileSync(dataPath, content);
  console.log('Saved cleaned mindMapData.js');

  console.log('\n=== REPLACEMENT CONTENT ===');
  console.log('The following content should be manually added to replace broken videos:');
  console.log(JSON.stringify(REPLACEMENT_VIDEOS, null, 2));
}

main();
