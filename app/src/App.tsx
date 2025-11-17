// /workspaces/toolkit/app/src/App.tsx

import { useEffect, useState } from "react";
import * as Tone from "tone";
import { TransportBar } from "./components/transport/TransportBar";
import { TrackList } from "./components/tracks/TrackList";
import type { Track } from "./types/Track";

const initialTracks: Track[] = [
  { id: "t1", name: "Track 1 (placeholder)" },
  { id: "t2", name: "Track 2 (placeholder)" },
  { id: "t3", name: "Track 3 (placeholder)" },
];

function App() {
  const [audioStarted, setAudioStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [tracks] = useState<Track[]>(initialTracks);

  // Simple placeholder loop – later this will drive the grid / clips
  useEffect(() => {
    const loop = new Tone.Loop(() => {
      // TODO: trigger per-track steps here
    }, "4n");

    loop.start(0);

    return () => {
      loop.stop();
      loop.dispose();
    };
  }, []);

  // Keep Tone.Transport BPM in sync with UI
  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  const handleStartEngine = async () => {
    if (audioStarted) return;
    await Tone.start(); // required user-gesture unlock
    setAudioStarted(true);
  };

  const handlePlay = async () => {
    if (!audioStarted) {
      await handleStartEngine();
    }
    Tone.Transport.start();
    setIsPlaying(true);
  };

  const handleStop = async () => {
    Tone.Transport.stop();
    setIsPlaying(false);
  };

  const handleChangeBpm = (value: number) => {
    if (!Number.isFinite(value) || value <= 0) return;
    setBpm(value);
  };

  return (
    <main style={{ padding: "1.5rem" }}>
      <h1>Toolkit Web DAW</h1>

      <TransportBar
        audioStarted={audioStarted}
        isPlaying={isPlaying}
        bpm={bpm}
        onChangeBpm={handleChangeBpm}
        onStartEngine={handleStartEngine}
        onPlay={handlePlay}
        onStop={handleStop}
      />

      <section style={{ marginTop: "2rem" }}>
        <TrackList tracks={tracks} />
      </section>
    </main>
  );
}

export default App;
