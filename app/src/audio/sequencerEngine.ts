// /workspaces/toolkit/app/src/audio/sequencerEngine.ts

import * as Tone from "tone";
import type { SequencerPattern } from "../types/Sequencer";

/**
 * Very simple step sequencer engine:
 * - Reads a SequencerPattern (steps + lanes[steps:boolean[]])
 * - On each 16th-note tick, checks which lanes are "on" for that step
 * - Triggers a short synth ping for active steps
 *
 * This is intentionally minimal and UI-driven. All “truth” for the grid
 * lives in React state; the engine only *plays* whatever pattern it’s given.
 */
export class SequencerEngine {
  private pattern: SequencerPattern | null;
  private loop: Tone.Loop | null;

  constructor(pattern?: SequencerPattern) {
    this.pattern = pattern ?? null;
    this.loop = null;
  }

  /**
   * Update the current pattern.
   * Safe to call while running; next tick will use the new data.
   */
  setPattern(pattern: SequencerPattern) {
    this.pattern = pattern;
  }

  /**
   * Start the sequencer loop. If there is no valid pattern, this is a no-op.
   */
  start() {
    if (!this.pattern || this.loop) return;

    const { steps, lanes } = this.pattern;
    if (!steps || lanes.length === 0) return;

    this.loop = new Tone.Loop((time) => {
      // Current 16th-note step index based on Transport ticks
      const currentStep =
        Math.floor(Tone.Transport.ticks / Tone.Transport.PPQ) % steps;

      for (const lane of lanes) {
        const isOn = lane.steps[currentStep];
        if (!isOn) continue;

        // Simple tone for now – you can later swap per-lane voices
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease("C4", "16n", time);
      }
    }, "16n");

    this.loop.start(0);

    if (Tone.Transport.state !== "started") {
      Tone.Transport.start();
    }
  }

  /**
   * Stop the sequencer loop but leave Transport state alone.
   */
  stop() {
    if (this.loop) {
      this.loop.stop();
      this.loop.dispose();
      this.loop = null;
    }
  }

  /**
   * Cleanup everything.
   */
  dispose() {
    this.stop();
    this.pattern = null;
  }
}

export default SequencerEngine;
