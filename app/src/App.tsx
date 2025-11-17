// src/App.tsx
import { useState } from "react";
import * as Tone from "tone";
import "./App.css";

function App() {
  const [audioReady, setAudioReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleInitAudio = async () => {
    await Tone.start(); // This is the "unlock" after a user click
    console.log("AudioContext started");
    setAudioReady(true);
  };

  const handlePlayTestLoop = async () => {
    if (!audioReady) {
      await handleInitAudio();
    }

    // Simple test loop using a synth; replace later with real tracks
    const synth = new Tone.Synth().toDestination();

    const loop = new Tone.Loop((time) => {
      synth.triggerAttackRelease("C4", "8n", time);
    }, "4n").start(0);

    await Tone.start();
    Tone.Transport.start();
    setIsPlaying(true);

    // Stop after 4 bars for now so it doesn’t run forever
    Tone.Transport.scheduleOnce(() => {
      loop.stop();
      Tone.Transport.stop();
      setIsPlaying(false);
    }, "+4m");
  };

  return (
    <div className="App">
      <h1>Web DAW – Toolkit</h1>

      <button onClick={handleInitAudio} disabled={audioReady}>
        {audioReady ? "Audio Ready ✅" : "Initialize Audio Engine"}
      </button>

      <button onClick={handlePlayTestLoop} disabled={!audioReady || isPlaying}>
        {isPlaying ? "Playing..." : "Play Test Loop"}
      </button>

      {/* your existing track placeholders here */}
    </div>
  );
}

export default App;
