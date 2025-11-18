// /src/audio/sequencerEngine.ts
import * as Tone from "tone";
import type { SequencerPattern } from "../types/Sequencer";

export class SequencerEngine {
  private pattern: SequencerPattern | null = null;
  private loop: Tone.Loop | null = null;

  private instruments: Record<string, Tone.ToneAudioNode> = {};

  constructor() {
    this.buildInstruments();
  }

  private buildInstruments() {
    // Kick
    this.instruments["kick"] = new Tone.MembraneSynth({
      octaves: 3,
      pitchDecay: 0.05
    }).toDestination();

    // Snare
    this.instruments["snare"] = new Tone.NoiseSynth({
      noise: { type: "white" },
      envelope: {
        attack: 0.001,
        decay: 0.15,
        sustain: 0
      }
    }).toDestination();

    // Hi-Hat
    this.instruments["hihat"] = new Tone.NoiseSynth({
      noise: { type: "white" },
      envelope: {
        attack: 0.001,
        decay: 0.05,
        sustain: 0
      }
    }).toDestination();

    // Bass (mono synth)
    this.instruments["bass"] = new Tone.MonoSynth({
      oscillator: { type: "square" },
      envelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0.4,
        release: 0.2
      }
    }).toDestination();
  }

  public setPattern(pattern: SequencerPattern) {
    this.pattern = pattern;
  }

  public async start(bpm: number) {
    Tone.Transport.bpm.value = bpm;

    if (!this.pattern) return;

    if (this.loop) {
      this.loop.dispose();
    }

    this.loop = new Tone.Loop((time) => {
      this.tick(time);
    }, "16n").start(0);

    await Tone.start();
    Tone.Transport.start();
  }

  public stop() {
    if (this.loop) {
      this.loop.stop();
    }
    Tone.Transport.stop();
  }

  private tick(time: number) {
    if (!this.pattern) return;

    const stepIndex = Math.floor(Tone.Transport.ticks / Tone.Ticks("16n").value) % this.pattern.stepsPerBar;

    for (const lane of this.pattern.lanes) {
      if (lane.steps[stepIndex]) {
        const instr = this.instruments[lane.id];
        if (!instr) continue;

        if (lane.id === "kick") {
          (instr as Tone.MembraneSynth).triggerAttackRelease("C2", "8n", time);
        }
        else if (lane.id === "snare") {
          (instr as Tone.NoiseSynth).triggerAttackRelease("16n", time);
        }
        else if (lane.id === "hihat") {
          (instr as Tone.NoiseSynth).triggerAttackRelease("16n", time);
        }
        else if (lane.id === "bass") {
          (instr as Tone.MonoSynth).triggerAttackRelease("C2", "8n", time);
        }
      }
    }
  }
}

export const sequencerEngine = new SequencerEngine();
