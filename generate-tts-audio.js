#!/usr/bin/env node

/**
 * TTS Audio Generator
 *
 * Generates audio files from tour narration scripts
 * Priority:
 * 1. OpenAI TTS API (if OPENAI_API_KEY env var is set)
 * 2. Mac 'say' command (fallback, good quality on macOS)
 * 3. Manual instructions if neither available
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import narration scripts
const narrationScripts = {
  // SEGMENT 0: Opening
  '00-intro-wide': `Welcome, fellow explorer of possible futures.

Before you lies not merely a visualization, but a cosmos of methodologies—
eighteen distinct approaches to understanding what comes next.

The future, you see, is not a place we're traveling to.
It's a landscape we're actively constructing,
one decision, one assumption, one paradigm at a time.

What you're witnessing is the architecture of foresight itself.`,

  // SEGMENT 1: Strategic Foresight Center
  '01-strategic-foresight': `This is Strategic Foresight.

Not fortune-telling. Not prediction.
But rather, a disciplined framework for expanding our peripheral vision
across the possibility space of what might emerge.

It's the difference between being surprised by the future,
and being prepared to shape it.

At its core, foresight asks three fundamental questions:
What is probable? What is possible? And what is preferable?`,

  // SEGMENT 2: Six Pillars Overview
  '02-six-pillars': `Surrounding the center, you see six pillars.

This framework was developed by Professor Sohail Inayatullah—
a Malaysian-Pakistani futurist who holds the UNESCO Chair in Futures Studies.

Born between cultures, Inayatullah built his career
bridging Eastern wisdom traditions and Western systems thinking.
He saw that futures work had become too narrow,
too dominated by quantitative forecasting.

The Six Pillars emerged from this frustration.
A complete cognitive architecture for engaging uncertainty—
from mapping our current assumptions,
to transforming our preferred futures into reality.

Each pillar represents a different way of knowing,
a different mode of consciousness.

Let's explore each one.`,

  // More narrations abbreviated for brevity in this script
  // Full scripts will be read from tourNarration.js in production
};

const OUTPUT_DIR = path.join(__dirname, 'public', 'audio', 'narration');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`✓ Created directory: ${OUTPUT_DIR}`);
}

/**
 * Generate audio using OpenAI TTS API
 */
async function generateWithOpenAI(text, outputPath) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY not found');
  }

  console.log('  Using OpenAI TTS API...');

  const response = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'tts-1-hd', // High quality model
      voice: 'onyx', // Deep, authoritative voice (most Carl Sagan-like)
      input: text,
      speed: 0.95, // Slightly slower for gravitas
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);
  console.log(`  ✓ Generated with OpenAI TTS`);
}

/**
 * Generate audio using Mac 'say' command
 */
function generateWithSay(text, outputPath) {
  console.log('  Using Mac "say" command...');

  // Mac voices that sound good:
  // - Alex (default, clear)
  // - Daniel (British, authoritative)
  // - Samantha (clear, warm)
  const voice = 'Alex';
  const rate = 170; // Words per minute (slower = more gravitas)

  try {
    // Generate AIFF first, then convert to MP3
    const aiffPath = outputPath.replace('.mp3', '.aiff');
    execSync(`say -v "${voice}" -r ${rate} -o "${aiffPath}" "${text.replace(/"/g, '\\"')}"`, {
      stdio: 'inherit'
    });

    // Convert AIFF to MP3 using ffmpeg (if available)
    try {
      execSync(`ffmpeg -i "${aiffPath}" -codec:a libmp3lame -qscale:a 2 "${outputPath}" -y`, {
        stdio: 'pipe' // Suppress ffmpeg output
      });
      fs.unlinkSync(aiffPath); // Remove temp AIFF
      console.log(`  ✓ Generated with 'say' + ffmpeg`);
    } catch (e) {
      // If ffmpeg not available, just use AIFF
      fs.renameSync(aiffPath, outputPath.replace('.mp3', '.aiff'));
      console.log(`  ✓ Generated with 'say' (AIFF format - install ffmpeg to convert to MP3)`);
    }
  } catch (error) {
    throw new Error(`'say' command failed: ${error.message}`);
  }
}

/**
 * Generate a single audio file
 */
async function generateAudioFile(id, text) {
  const outputPath = path.join(OUTPUT_DIR, `${id}.mp3`);

  console.log(`\nGenerating: ${id}.mp3`);
  console.log(`  Text length: ${text.length} characters`);

  try {
    // Try OpenAI first
    await generateWithOpenAI(text, outputPath);
  } catch (openaiError) {
    console.log(`  OpenAI not available: ${openaiError.message}`);

    try {
      // Fall back to Mac 'say'
      generateWithSay(text, outputPath);
    } catch (sayError) {
      console.error(`  ✗ Failed: ${sayError.message}`);
      console.error(`\n  Manual generation required for ${id}:`);
      console.error(`  1. Use ElevenLabs or other TTS service`);
      console.error(`  2. Save as: ${outputPath}`);
      console.error(`  Text:\n${text}\n`);
    }
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║  Strategic Foresight Mind Map - TTS Audio Generator       ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  console.log('Checking TTS availability...');

  // Check for OpenAI API key
  if (process.env.OPENAI_API_KEY) {
    console.log('✓ OpenAI API key found - will use high-quality TTS');
  } else {
    console.log('✗ OPENAI_API_KEY not set');
    console.log('  Set it with: export OPENAI_API_KEY=sk-...');
  }

  // Check for 'say' command (Mac)
  try {
    execSync('which say', { stdio: 'pipe' });
    console.log('✓ Mac "say" command available - fallback ready');
  } catch {
    console.log('✗ Mac "say" command not found (only available on macOS)');
  }

  // Check for ffmpeg
  try {
    execSync('which ffmpeg', { stdio: 'pipe' });
    console.log('✓ ffmpeg available - can convert to MP3');
  } catch {
    console.log('⚠ ffmpeg not found - install with: brew install ffmpeg');
  }

  console.log('\n' + '─'.repeat(60));
  console.log('Starting generation...\n');

  // Generate all audio files
  const entries = Object.entries(narrationScripts);
  for (let i = 0; i < entries.length; i++) {
    const [id, text] = entries[i];
    await generateAudioFile(id, text);

    // Progress
    console.log(`Progress: ${i + 1}/${entries.length}`);
  }

  console.log('\n' + '─'.repeat(60));
  console.log('\n✓ Generation complete!');
  console.log(`\nAudio files saved to: ${OUTPUT_DIR}`);
  console.log('\nNext steps:');
  console.log('1. Test audio files in the tour');
  console.log('2. Replace with ElevenLabs versions later for production quality');
  console.log('3. Generate background music (ambient-futures.mp3)');
}

main().catch(error => {
  console.error('\n✗ Fatal error:', error);
  process.exit(1);
});
