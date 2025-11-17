import { useState } from "react";
import "./App.css";

import { TransportBar } from "./components/transport/TransportBar";
import { initAudioEngine, startTestLoop, stopTransport } from "./audio/toneEngine";

function App() {
  const [audioStarted, setAudioStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStartEngine = async () => {
    if (audioStarted) return;
    await initAudioEngine();
    setAudioStarted(true);
  };

  const handlePlay = async () => {
    if (!audioStarted || isPlaying) return;
    await startTestLoop();
    setIsPlaying(true);
  };

  const handleStop = async () => {
    if (!audioStarted || !isPlaying) return;
    stopTransport();
    setIsPlaying(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <button>Toolkit Web DAW</button>
        <span className="app-bpm-label">BPM: 120</span>
      </header>

      <main className="app-main">
        <TransportBar
          audioStarted={audioStarted}
          isPlaying={isPlaying}
          onStartEngine={handleStartEngine}
          onPlay={handlePlay}
          onStop={handleStop}
        />

        <section className="tracks">
          <p>Track 1 – Placeholder</p>
          <p>Track 2 – Placeholder</p>
        </section>

        <section className="timeline">
          <p>| 1 | 2 | 3 | 4 |</p>
          <p>[empty grid]</p>
        </section>
      </main>
    </div>
  );
}

export default App;
