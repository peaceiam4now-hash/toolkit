// /workspaces/toolkit/app/src/audio/sequencerEngine.ts
import * as Tone from "tone";
import type { SequencerPattern } from "../types/Sequencer";

/**
 * Very simple step-sequencer engine for Lunar Studios.
 * - Holds a single pattern in memory
 * - Can start/stop the Tone.Transport at a given BPM
 * - Leaves actual note routing for later (MVP = transport-sync only)
 */
export class SequencerEngine {
  private pattern: SequencerPattern | null = null;

  attachPattern(pattern: SequencerPattern) {
    this.pattern = pattern;
  }

  async start(bpm: number) {
    if (!this.pattern) return;

    // Ensure AudioContext is unlocked
    await Tone.start();

    Tone.Transport.bpm.value = bpm;
    Tone.Transport.start();
  }

  stop() {
    Tone.Transport.stop();
  }
}

// Singleton instance used by App.tsx
export const sequencerEngine = new SequencerEngine();
