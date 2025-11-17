// src/audio/ensureAudioStarted.ts
import * as Tone from "tone";

let audioStarted = false;

export async function ensureAudioStarted() {
  if (audioStarted) return;

  await Tone.start(); // unlocks the AudioContext after a user gesture
  audioStarted = true;
  console.log("AudioContext unlocked ✅");
}
