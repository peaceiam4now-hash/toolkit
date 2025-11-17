// src/App.tsx
import { useState } from "react";
import { AppShell } from "./components/layout/AppShell";
import { TransportBar } from "./components/transport/TransportBar";
import { SequencerGrid } from "./components/sequencer/SequencerGrid";
import { TrackList } from "./components/tracks/TrackList";
import {
  initAudioEngine,
  isEngineStarted,
  playTransport,
  stopTransport,
  setBpm,
} from "./audio/toneEngine";

function App() {
  const [audioStarted, setAudioStarted] = useState(isEngineStarted());
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpmState] = useState(120);

  const handleStartEngine = async () => {
    await initAudioEngine();
    setAudioStarted(true);
  };

  const handlePlay = async () => {
    playTransport();
    setIsPlaying(true);
  };

  const handleStop = async () => {
    stopTransport();
    setIsPlaying(false);
  };

  const handleBpmChange = (next: number) => {
    setBpmState(next);
    setBpm(next);
  };

  return (
    <AppShell>
      <TransportBar
        audioStarted={audioStarted}
        isPlaying={isPlaying}
        bpm={bpm}
        onStartEngine={handleStartEngine}
        onPlay={handlePlay}
        onStop={handleStop}
        onChangeBpm={handleBpmChange}
      />
      <TrackList />
      <SequencerGrid />
    </AppShell>
  );
}

export default App;
