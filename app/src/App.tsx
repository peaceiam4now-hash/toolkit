// /workspaces/toolkit/app/src/App.tsx
import { useEffect, useState } from "react";
import * as Tone from "tone";
import { TransportBar } from "./components/transport/TransportBar";

function App() {
  const [audioStarted, setAudioStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  const handleStartEngine = async () => {
    await Tone.start(); // must be called from a click
    setAudioStarted(true);
  };

  const handlePlay = async () => {
    if (!audioStarted) return;

    // Simple click test: kick every quarter-note
    const synth = new Tone.Synth().toDestination();
    const loop = new Tone.Loop((time) => {
      synth.triggerAttackRelease("C2", "8n", time);
    }, "4n").start(0);

    Tone.Transport.start();
    setIsPlaying(true);

    // optional: store loop in state later; for now it's fine
  };

  const handleStop = async () => {
    Tone.Transport.stop();
    Tone.Transport.cancel();
    setIsPlaying(false);
  };

  const handleChangeBpm = (value: number) => {
    if (!value || value < 40 || value > 240) return;
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

      <section className="workspace">
        {/* we’ll hook these up later */}
        {/* <TrackHeader /> */}
        {/* <TrackLane /> */}
        {/* <MasterMeter /> */}
      </section>
    </main>
  );
}

export default App;
