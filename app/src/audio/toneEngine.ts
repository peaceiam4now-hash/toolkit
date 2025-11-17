import * as Tone from "tone";

let started = false;

export async function initAudioEngine() {
  if (!started) {
    await Tone.start();
    started = true;
    console.log("[audio] engine started");
  }
}

export function isAudioStarted() {
  return started;
}

export function startTransport() {
  if (!started) return;
  Tone.Transport.start();
}

export function stopTransport() {
  if (!started) return;
  Tone.Transport.stop();
}
