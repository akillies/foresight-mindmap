#!/usr/bin/env node

/**
 * TTS Audio Generator for Strategic Foresight Mind Map
 *
 * Generates placeholder audio files using Mac 'say' command
 * These can be replaced with ElevenLabs versions later
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import narrationScripts from './src/tourNarration.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, 'public', 'audio', 'narration');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`✓ Created directory: ${OUTPUT_DIR}\n`);
}

/**
 * Generate audio using Mac 'say' command
 */
function generateAudioFile(id, text) {
  const outputPath = path.join(OUTPUT_DIR, `${id}.mp3`);

  console.log(`Generating: ${id}.mp3`);
  console.log(`  Text length: ${text.length} characters`);

  try {
    // Mac TTS voices (you can experiment with these):
    // - Alex (default, clear male voice)
    // - Daniel (British, authoritative)
    // - Samantha (clear female voice)
    // - Fred (humorous, novelty voice - NOT recommended for this!)
    const voice = 'Alex';
    const rate = 165; // Words per minute (slower = more gravitas, default is ~175)

    // Generate AIFF first
    const aiffPath = outputPath.replace('.mp3', '.aiff');
    execSync(`say -v "${voice}" -r ${rate} -o "${aiffPath}" "${text.replace(/"/g, '\\"')}"`, {
      stdio: 'pipe'
    });

    // Try to convert to MP3 using ffmpeg (if available)
    try {
      execSync(`ffmpeg -i "${aiffPath}" -codec:a libmp3lame -qscale:a 2 "${outputPath}" -y 2>/dev/null`, {
        stdio: 'pipe'
      });
      fs.unlinkSync(aiffPath); // Remove temp AIFF
      console.log(`  ✓ Generated MP3\n`);
    } catch (e) {
      // If ffmpeg not available, rename AIFF to MP3 (AudioManager can handle AIFF)
      fs.renameSync(aiffPath, outputPath.replace('.mp3', '.aiff'));
      console.log(`  ✓ Generated AIFF (install ffmpeg to convert to MP3)\n`);
      console.log(`     Run: brew install ffmpeg\n`);
    }

    return true;
  } catch (error) {
    console.error(`  ✗ Failed: ${error.message}\n`);
    return false;
  }
}

/**
 * Main execution
 */
function main() {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║   Strategic Foresight Mind Map - TTS Audio Generator        ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  // Check system requirements
  console.log('System Check:');

  // Check for 'say' command (Mac only)
  try {
    execSync('which say', { stdio: 'pipe' });
    console.log('✓ Mac "say" command available');
  } catch {
    console.error('✗ Mac "say" command not found');
    console.error('  This script only works on macOS');
    console.error('  For other platforms, use ElevenLabs or another TTS service\n');
    process.exit(1);
  }

  // Check for ffmpeg (optional but recommended)
  try {
    execSync('which ffmpeg', { stdio: 'pipe' });
    console.log('✓ ffmpeg available - will convert to MP3');
  } catch {
    console.log('⚠  ffmpeg not found - will generate AIFF files instead');
    console.log('   Install with: brew install ffmpeg');
  }

  console.log('\n' + '─'.repeat(64));
  console.log('\nGenerating audio files...\n');

  // Get all narration scripts
  const entries = Object.entries(narrationScripts);
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < entries.length; i++) {
    const [id, text] = entries[i];

    if (generateAudioFile(id, text)) {
      successCount++;
    } else {
      failCount++;
    }

    // Progress
    console.log(`Progress: ${i + 1}/${entries.length} (${successCount} successful, ${failCount} failed)\n`);
  }

  console.log('─'.repeat(64));
  console.log(`\n✓ Generation complete!`);
  console.log(`   ${successCount} files generated`);
  if (failCount > 0) {
    console.log(`   ${failCount} files failed`);
  }
  console.log(`\nAudio files saved to: ${OUTPUT_DIR}`);

  console.log('\n📝 Next steps:');
  console.log('   1. Test audio files by starting a tour in the app');
  console.log('   2. Replace with ElevenLabs versions later for production quality');
  console.log('   3. Generate background music (ambient-futures.mp3) if desired\n');

  console.log('💡 TIP: To regenerate with different voice/speed:');
  console.log('   - Edit the voice/rate variables in this script');
  console.log('   - Available voices: Alex, Daniel, Samantha, Victoria, etc.');
  console.log('   - Run: say -v "?" to see all voices\n');
}

main();
