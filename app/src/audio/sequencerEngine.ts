// /workspaces/toolkit/app/src/audio/sequencerEngine.ts
import * as Tone from "tone";
import type { SequencerPattern } from "../types/Sequencer";

type TrackAudioChain = {
  instrument:
    | Tone.MembraneSynth
    | Tone.NoiseSynth
    | Tone.MetalSynth
    | Tone.MonoSynth
    | Tone.Sampler;
  volume: Tone.Volume;
  panner: Tone.Panner;
};

export class SequencerEngine {
  private pattern: SequencerPattern | null = null;
  private loop: Tone.Loop | null = null;
  private isRunning = false;
  private stepIndex = 0;

  private chains: Record<string, TrackAudioChain>;

  constructor() {
    this.chains = {
      kick: this.createChain(new Tone.MembraneSynth()),
      snare: this.createChain(new Tone.NoiseSynth()),
      hat: this.createChain(new Tone.MetalSynth()),
      bass: this.createChain(new Tone.MonoSynth()),
    };
  }

  private createChain(instrument: TrackAudioChain["instrument"]): TrackAudioChain {
    const volume = new Tone.Volume(0);
    const panner = new Tone.Panner(0);
    instrument.connect(volume);
    volume.connect(panner);
    panner.toDestination();
    return { instrument, volume, panner };
  }

  setSampler(trackId: string, sampler: Tone.Sampler) {
    const old = this.chains[trackId];
    if (old) {
      try {
        old.instrument.disconnect();
        old.volume.disconnect();
        old.panner.disconnect();
      } catch {}
    }
    this.chains[trackId] = this.createChain(sampler);
  }

  setPattern(pattern: SequencerPattern) {
    this.pattern = pattern;
    this.stepIndex = 0;
    console.log("[SequencerEngine] Pattern set:", pattern);
  }

  async start(bpm: number) {
    if (!this.pattern) {
      console.warn("[SequencerEngine] No pattern set, cannot start.");
      return;
    }
    Tone.Transport.bpm.value = bpm;

    if (!this.loop) {
      this.loop = new Tone.Loop((time) => {
        this.tick(time);
      }, "16n");
      this.loop.start(0);
    }

    if (!this.isRunning) {
      await Tone.start();
      Tone.Transport.start();
      this.isRunning = true;
      console.log("[SequencerEngine] Transport started at BPM", bpm);
    }
  }

  stop() {
    if (this.loop) {
      this.loop.stop();
      this.loop.cancel(0);
      this.loop = null;
    }
    Tone.Transport.stop();
    this.isRunning = false;
    this.stepIndex = 0;
    console.log("[SequencerEngine] Transport stopped.");
  }

  private tick(time: number) {
    if (!this.pattern) return;
    const { lanes, stepsPerBar } = this.pattern;
    const step = this.stepIndex % stepsPerBar;
    this.stepIndex = (this.stepIndex + 1) % stepsPerBar;

    console.log("[SequencerEngine] Tick fired at step", step);

    for (const lane of lanes) {
      const active = lane.steps[step];
      if (!active) continue;

      const chain = this.chains[lane.trackId];
      if (!chain) continue;

      console.log("Triggering lane:", lane.id, "at step", step);

      if (chain.instrument instanceof Tone.MembraneSynth) {
        chain.instrument.triggerAttackRelease("C2", "16n", time);
      } else if (chain.instrument instanceof Tone.MonoSynth) {
        chain.instrument.triggerAttackRelease("C2", "8n", time);
      } else if (chain.instrument instanceof Tone.NoiseSynth) {
        chain.instrument.triggerAttackRelease("16n", time);
      } else if (chain.instrument instanceof Tone.MetalSynth) {
        chain.instrument.triggerAttackRelease("16n", time);
      } else if (chain.instrument instanceof Tone.Sampler) {
        chain.instrument.triggerAttackRelease("C2", "16n", time);
      }
    }
  }

  setTrackVolume(trackId: string, volumeDb: number) {
    const chain = this.chains[trackId];
    if (chain) {
      chain.volume.volume.value = volumeDb;
      console.log(`[SequencerEngine] Volume set for ${trackId}: ${volumeDb} dB`);
    }
  }

  setTrackPan(trackId: string, pan: number) {
    const chain = this.chains[trackId];
    if (chain) {
      chain.panner.pan.value = pan;
      console.log(`[SequencerEngine] Pan set for ${trackId}: ${pan}`);
    }
  }

  setTrackMute(trackId: string, isMuted: boolean) {
    const chain = this.chains[trackId];
    if (chain) {
      chain.volume.mute = isMuted;
      console.log(`[SequencerEngine] Mute set for ${trackId}: ${isMuted}`);
    }
  }

  applySoloState(tracks: Array<{ id: string; isSolo: boolean }>) {
    const anySolo = tracks.some((t) => t.isSolo);
    if (!anySolo) {
      for (const t of tracks) {
        const chain = this.chains[t.id];
        if (chain) chain.volume.mute = false;
      }
      console.log("[SequencerEngine] Solo cleared, all tracks unmuted.");
      return;
    }
    for (const t of tracks) {
      const chain = this.chains[t.id];
      if (!chain) continue;
      chain.volume.mute = !t.isSolo;
    }
    console.log("[SequencerEngine] Solo applied:", tracks);
  }
}

// Create singleton and expose for debugging
export const sequencerEngine = new SequencerEngine();
(window as any).sequencerEngine = sequencerEngine;
(window as any).Tone = Tone;