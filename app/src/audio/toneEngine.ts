// src/audio/toneEngine.ts
import * as Tone from "tone";

let started = false;
let initialized = false;

function ensureInitialized() {
  if (initialized) return;
  Tone.Transport.bpm.value = 120;
  Tone.Transport.loop = true;
  Tone.Transport.loopStart = "0m";
  Tone.Transport.loopEnd = "1m";
  initialized = true;
}

/**
 * Must be called from a user gesture (button click).
 */
export async function initAudioEngine(): Promise<void> {
  if (started) return;
  await Tone.start();
  ensureInitialized();

  // very simple metronome for now
  const click = new Tone.MembraneSynth().toDestination();
  const loop = new Tone.Loop((time) => {
    click.triggerAttackRelease("C4", "16n", time);
  }, "4n").start(0);

  loop.humanize = true;

  started = true;
}

export function isEngineStarted(): boolean {
  return started;
}

export function playTransport() {
  if (!started) return;
  Tone.Transport.start();
}

export function stopTransport() {
  if (!started) return;
  Tone.Transport.stop();
}

export function setBpm(bpm: number) {
  ensureInitialized();
  Tone.Transport.bpm.rampTo(bpm, 0.05);
}
