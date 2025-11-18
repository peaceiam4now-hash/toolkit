// src/audio/sequencerEngine.ts

import * as Tone from "tone";

import type {

  SequencerPattern,

  SequencerLaneId,

} from "../types/Sequencer";



type LaneSynth = any; // keep TS out of the way for now



class SequencerEngine {

  private pattern: SequencerPattern | null = null;

  private loop: Tone.Loop | null = null;

  private laneSynths: Record<SequencerLaneId, LaneSynth> = {};

  private currentStep = 0;



  setPattern(pattern: SequencerPattern) {

    this.pattern = pattern;

  }



  private ensureInstruments() {

    if (Object.keys(this.laneSynths).length > 0) return;



    // Kick: deep thump

    this.laneSynths["kick"] = new Tone.MembraneSynth({

      pitchDecay: 0.02,

      octaves: 4,

    }).toDestination();



    // Snare: noise hit

    this.laneSynths["snare"] = new Tone.NoiseSynth({

      volume: -10,

      envelope: { attack: 0.001, decay: 0.15, sustain: 0 },

    }).toDestination();



    // Hi-hat: metallic tick

    this.laneSynths["hihat"] = new Tone.MetalSynth({

      volume: -18,

      envelope: { attack: 0.001, decay: 0.05, release: 0.01 },

      frequency: 400,

      harmonicity: 5.1,

      modulationIndex: 32,

      resonance: 4000,

    }).toDestination();



    // Bass: simple mono synth

    this.laneSynths["bass"] = new Tone.Synth({

      oscillator: { type: "sawtooth" },

      envelope: { attack: 0.01, decay: 0.2, sustain: 0.4, release: 0.4 },

    }).toDestination();

  }



  start(bpm: number) {

    if (!this.pattern) return;



    this.ensureInstruments();

    this.currentStep = 0;



    Tone.Transport.bpm.value = bpm;



    if (this.loop) {

      this.loop.stop();

      this.loop.dispose();

      this.loop = null;

    }



    this.loop = new Tone.Loop((time) => {

      this.tick(time);

    }, "16n");



    this.loop.start(0);

    Tone.Transport.start();

  }



  stop() {

    if (this.loop) {

      this.loop.stop();

      this.loop.dispose();

      this.loop = null;

    }

    Tone.Transport.stop();

    this.currentStep = 0;

  }



  updateBpm(bpm: number) {

    Tone.Transport.bpm.value = bpm;

  }



  private tick(time: number) {

    if (!this.pattern) return;



    const { lanes, stepsPerBar } = this.pattern;

    const step = this.currentStep;



    for (const lane of lanes) {

      const on = lane.steps[step];

      if (on) {

        this.triggerLane(lane.id, time);

      }

    }



    this.currentStep = (this.currentStep + 1) % stepsPerBar;

  }



  private triggerLane(id: SequencerLaneId, time: number) {

    const synth = this.laneSynths[id];

    if (!synth) return;



    switch (id) {

      case "kick":

        synth.triggerAttackRelease("C1", "8n", time);

        break;

      case "snare":

        synth.triggerAttackRelease("8n", time);

        break;

      case "hihat":

        synth.triggerAttackRelease("16n", time);

        break;

      case "bass":

        synth.triggerAttackRelease("C2", "8n", time);

        break;

      default:

        synth.triggerAttackRelease("C3", "8n", time);

        break;

    }

  }

}



export const sequencerEngine = new SequencerEngine();