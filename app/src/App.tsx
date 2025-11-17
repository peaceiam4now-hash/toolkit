// /workspaces/toolkit/app/src/App.tsx

import { useState, useEffect } from "react";
import * as Tone from "tone";

import { TransportBar } from "./components/transport/TransportBar";
// Later:
// import { TrackLane } from "./components/tracks/TrackLane";
// import { TrackHeader } from "./components/tracks/TrackHeader";
// import { MasterMeter } from "./components/mixer/MasterMeter";

function App() {
  const [audioStarted, setAudioStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);

  // Keep Tone.js BPM in sync with React
  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  // Initialize Audio Engine (browser requires user gesture)
  const handleStartEngine = async () => {
    await Tone.start();
    console.log("Audio Engine Started");
    setAudioStarted(true);
  };

  // Play simple metronome click
  const handlePlay = async () => {
    if (!audioStarted) return;

    const synth = new Tone.Synth().toDestination();

    const loop = new Tone.Loop((time) => {
      synth.triggerAttackRelease("C2", "8n", time);
    }, "4n").start(0);

    console.log(loop); // prevent TS unused warning

    Tone.Transport.start();
    setIsPlaying(true);
  };

  // Stop Transport
  const handleStop = async () => {
    Tone.Transport.stop();
    Tone.Transport.cancel(); // remove scheduled events
    setIsPlaying(false);
  };

  const handleChangeBpm = (value: number) => {
    if (value < 40 || value > 240) return;
    setBpm(value);
  };

  return (
    <main className="app">
      <h1>Web DAW Toolkit</h1>

      <TransportBar
        audioStarted={audioStarted}
        isPlaying={isPlaying}
        bpm={bpm}
        onChangeBpm={handleChangeBpm}
        onStartEngine={handleStartEngine}
        onPlay={handlePlay}
        onStop={handleStop}
      />

      <section className="workspace" style={{ marginTop: "2rem" }}>
        <div style={{ padding: "1rem", border: "1px solid #444" }}>
          <p>DAW Workspace Placeholder</p>
          <p>Tracks / Timeline / Mixer UI coming next</p>
        </div>
      </section>
    </main>
  );
}

export default App;
