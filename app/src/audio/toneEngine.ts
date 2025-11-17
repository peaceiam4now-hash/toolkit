import * as Tone from "tone";

let engineInitialized = false;
let synth: Tone.Synth | null = null;
let testPattern: any = null;

// Ensure AudioContext is started (must be called from a user gesture)
export async function initAudioEngine() {
  if (engineInitialized) return;

  await Tone.start(); // must be inside a click handler
  Tone.Transport.bpm.value = 120;
  Tone.Transport.loop = true;
  Tone.Transport.loopStart = 0;
  Tone.Transport.loopEnd = "1m";

  engineInitialized = true;
}

// Start a simple reference loop (for now our "test DAW" sound)
export async function startTestLoop() {
  await initAudioEngine();

  if (!synth) {
    synth = new Tone.Synth().toDestination();
  }

  if (!testPattern) {
    testPattern = new Tone.Sequence(
      (time: number, note: string) => {
        synth!.triggerAttackRelease(note, "8n", time);
      },
      ["C4", "E4", "G4", "B4"],
      "4n"
    );
    testPattern.start(0);
  }

  if (Tone.Transport.state !== "started") {
    Tone.Transport.start();
  }
}

// Stop transport (and keep engine ready)
export function stopTransport() {
  if (Tone.Transport.state === "started") {
    Tone.Transport.stop();
  }
}
