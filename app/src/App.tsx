// /workspaces/toolkit/app/src/App.tsx
import { useEffect, useState } from "react";
import * as Tone from "tone";

import { TransportBar } from "./components/transport/TransportBar";

function App() {
  const [audioStarted, setAudioStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);

  // Keep Tone.Transport BPM in sync with state
  useEffect(() => {
    Tone.getContext().resume().catch(() => {
      // ignore if context not yet allowed – gets fixed on first user gesture
    });
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  const handleStartEngine = async () => {
    await Tone.start(); // MUST be called from a click handler
    await Tone.getContext().resume();
    setAudioStarted(true);
  };

  const handlePlay = async () => {
    if (!audioStarted) {
      await handleStartEngine();
    }

    // simple test loop – 1 bar of a metronome-ish click
    const synth = new Tone.MembraneSynth().toDestination();

    const loop = new Tone.Loop((time) => {
      synth.triggerAttackRelease("C2", "8n", time);
    }, "4n").start(0);

    Tone.Transport.start();
    setIsPlaying(true);

    // optional: store loop somewhere (ref) to stop/dispose later
  };

  const handleStop = async () => {
    Tone.Transport.stop();
    Tone.Transport.cancel(); // clear scheduled events
    setIsPlaying(false);
  };

  const handleChangeBpm = (value: number) => {
    const clamped = Math.min(240, Math.max(40, value || 0));
    setBpm(clamped);
  };

  return (
    <div className="app">
      <h1>Web DAW Prototype</h1>

      <TransportBar
        audioStarted={audioStarted}
        isPlaying={isPlaying}
        bpm={bpm}
        onChangeBpm={handleChangeBpm}
        onStartEngine={handleStartEngine}
        onPlay={handlePlay}
        onStop={handleStop}
      />

      {/* Track placeholder UI goes here */}
      <main className="tracks">
        {/* TODO: TrackLane components */}
        <div className="track-placeholder">Track 1 (placeholder)</div>
        <div className="track-placeholder">Track 2 (placeholder)</div>
      </main>
    </div>
  );
}

export default App;
