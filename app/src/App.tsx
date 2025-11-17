// /workspaces/toolkit/app/src/App.tsx

import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import { TransportBar } from "./components/transport/TransportBar";
import { Panel } from "./components/shared/Panel";

type Track = {
  id: number;
  name: string;
};

const INITIAL_TRACKS: Track[] = [
  { id: 1, name: "Track 1 (placeholder)" },
  { id: 2, name: "Track 2 (placeholder)" },
  { id: 3, name: "Track 3 (placeholder)" },
];

function App() {
  const [audioStarted, setAudioStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);

  const synthRef = useRef<Tone.Synth | null>(null);
  const loopRef = useRef<Tone.Loop | null>(null);

  // Keep Tone.Transport BPM in sync with UI
  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      loopRef.current?.dispose();
      synthRef.current?.dispose();
    };
  }, []);

  const handleStartEngine = async () => {
    if (audioStarted) return;

    // Required by browsers: must be triggered from user gesture
    await Tone.start();

    synthRef.current = new Tone.Synth().toDestination();

    loopRef.current = new Tone.Loop((time) => {
      // Simple test tick so we know the engine works
      synthRef.current?.triggerAttackRelease("C4", "16n", time);
    }, "4n").start(0);

    setAudioStarted(true);
  };

  const handlePlay = async () => {
    if (!audioStarted || isPlaying) return;
    Tone.Transport.start();
    setIsPlaying(true);
  };

  const handleStop = async () => {
    if (!audioStarted || !isPlaying) return;
    Tone.Transport.stop();
    setIsPlaying(false);
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "system-ui" }}>
      <h1>Toolkit Web DAW</h1>

      <TransportBar
        audioStarted={audioStarted}
        isPlaying={isPlaying}
        bpm={bpm}
        onChangeBpm={setBpm}
        onStartEngine={handleStartEngine}
        onPlay={handlePlay}
        onStop={handleStop}
      />

      <Panel title="Tracks">
        <ul style={{ marginTop: "0.5rem" }}>
          {INITIAL_TRACKS.map((track) => (
            <li key={track.id}>{track.name}</li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

export default App;
