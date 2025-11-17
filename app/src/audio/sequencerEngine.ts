// /src/audio/sequencerEngine.ts
import * as Tone from "tone";
import type { SequencerPattern } from "../types/SequencerTypes";

export class SequencerEngine {
  private pattern: SequencerPattern | null = null;
  private synths: Record<string, Tone.MembraneSynth> = {};

  loadPattern(pattern: SequencerPattern) {
    this.pattern = pattern;

    // Create a synth for each lane
    pattern.lanes.forEach((lane) => {
      this.synths[lane.id] = new Tone.MembraneSynth({
        volume: -12,
      }).toDestination();
    });
  }

  start() {
    if (!this.pattern) return;

    Tone.Transport.scheduleRepeat((time) => {
      const stepIndex = Math.floor((Tone.Transport.ticks / Tone.Transport.PPQ) % 16);

      this.pattern!.lanes.forEach((lane) => {
        const step = lane.steps[stepIndex];
        if (step.value === 1) {
          this.synths[lane.id].triggerAttackRelease("C4", "8n", time);
        }
      });

    }, "16n");
  }

  stop() {
    Tone.Transport.cancel(0);
  }
}
