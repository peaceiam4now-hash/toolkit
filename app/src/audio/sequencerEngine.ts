// /workspaces/toolkit/app/src/audio/sequencerEngine.ts
import * as Tone from "tone";
import type { Track } from "../types/Track";

export type SequencerLaneId = string;

export type SequencerStep = {
  /** 0-based step index in the bar (e.g. 0..15 for a 16-step grid) */
  index: number;
  /** note to trigger – keep it simple for now */
  note: string;
  /** velocity 0..1 */
  velocity: number;
  /** whether this step is active */
  active: boolean;
};

export type SequencerPattern = {
  laneId: SequencerLaneId;
  steps: SequencerStep[];
};

type AnySynth = Tone.Synth | Tone.MembraneSynth;

class SequencerEngine {
  private isInitialized = false;
  private synths: Record<SequencerLaneId, AnySynth> = {};
  private pattern: SequencerPattern[] = [];

  init(tracks: Track[]) {
    if (this.isInitialized) return;

    tracks.forEach((track) => {
      let synth: AnySynth;

      switch (track.kind) {
        case "audio":
          // Drum-ish lane
          synth = new Tone.MembraneSynth().toDestination();
          break;
        case "instrument":
        case "group":
        default:
          synth = new Tone.Synth().toDestination();
          break;
      }

      this.synths[track.id] = synth;
    });

    this.isInitialized = true;
  }

  /**
   * Replace the current pattern and re-schedule the Transport callbacks.
   * Call this whenever the grid changes.
   */
  updatePattern(pattern: SequencerPattern[]) {
    this.pattern = pattern;
    Tone.Transport.cancel(); // clear previous scheduled events
    this.schedulePattern();
  }

  private schedulePattern() {
    // Simple 1-bar pattern in 16 steps (16th notes)
    const stepsPerBar = 16;

    this.pattern.forEach(({ laneId, steps }) => {
      const synth = this.synths[laneId];
      if (!synth) return;

      steps.forEach((step) => {
        if (!step.active) return;

        // map step index -> "measure:step:subdivision"
        // For now we stay in measure 0 and schedule across the bar
        const stepIndex = step.index % stepsPerBar;
        const time = `0:0:${stepIndex}`;

        Tone.Transport.schedule((t) => {
          // basic note trigger; no fancy options yet
          (synth as any).triggerAttackRelease(step.note, "16n", t, step.velocity);
        }, time);
      });
    });
  }

  /**
   * Clean up Tone nodes when the app is torn down or pattern system resets.
   */
  dispose() {
    Object.values(this.synths).forEach((s) => s.dispose());
    this.synths = {};
    this.pattern = [];
    Tone.Transport.cancel();
    this.isInitialized = false;
  }
}

export const sequencerEngine = new SequencerEngine();
