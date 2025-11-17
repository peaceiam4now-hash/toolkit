// /workspaces/toolkit/app/src/audio/sequencerEngine.ts
import * as Tone from "tone";
import type { SequencerPattern } from "../types/Sequencer";

/**
 * SequencerEngine
 * ----------------
 * A very simple step-sequencer playback engine.
 * Each step fires once per grid position depending on:
 *    - BPM (handled by Tone.Transport)
 *    - active lanes
 *    - active steps in pattern.grid
 *
 * For now, each lane is a percussive "MetalSynth" sound.
 * This keeps it simple and fully functional while we expand.
 */
export class SequencerEngine {
  private pattern: SequencerPattern | null = null;
  private loop: Tone.Loop | null = null;

  // Tone synths for each lane
  private synths: Record<string, Tone.MetalSynth> = {};

  constructor() {}

  /** Load a new pattern */
  loadPattern(pattern: SequencerPattern) {
    this.pattern = pattern;

    // Create a synth per lane if not exists
    pattern.lanes.forEach((lane) => {
      if (!this.synths[lane.id]) {
        this.synths[lane.id] = new Tone.MetalSynth({
          octaves: 1.5,
          resonance: 400,
          harmonicity: 5.1,
        }).toDestination();
      }
    });
  }

  /** Start step sequencing */
  start() {
    if (!this.pattern) return;

    // If a previous loop exists, remove it
    if (this.loop) {
      this.loop.dispose();
      this.loop = null;
    }

    // Create playback loop
    this.loop = new Tone.Loop((/* time */) => {
      if (!this.pattern) return;

      const step = this.pattern.position;

      // Iterate lanes → if step is active → trigger synth
      this.pattern.lanes.forEach((lane) => {
        const active = lane.steps[step];
        if (active) {
          const synth = this.synths[lane.id];
          synth?.triggerAttackRelease("C4", "16n");
        }
      });

      // Advance the playhead
      this.pattern.position =
        (this.pattern.position + 1) % this.pattern.steps;
    }, "16n");

    this.loop.start(0);
    Tone.Transport.start();
  }

  /** Stop playback without destroying the pattern */
  stop() {
    if (this.loop) {
      this.loop.stop();
    }
    Tone.Transport.stop();
  }

  /** Hard reset to step 0 */
  reset() {
    if (this.pattern) {
      this.pattern.position = 0;
    }
  }
}
