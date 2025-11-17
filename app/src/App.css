// /workspaces/toolkit/app/src/App.tsx
import "./App.css";
import * as Tone from "tone";
import { useState } from "react";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayToggle = async () => {
    await Tone.start(); // user gesture: this is in a click handler
    if (isPlaying) {
      Tone.Transport.stop();
      setIsPlaying(false);
    } else {
      Tone.Transport.start();
      setIsPlaying(true);
    }
  };

  return (
    <div className="app-root">
      <header className="transport-bar">
        <button onClick={handlePlayToggle}>
          {isPlaying ? "Stop" : "Play"}
        </button>
        <span className="bpm-label">BPM: 120</span>
      </header>

      <main className="daw-layout">
        <aside className="track-list">
          <div className="track-row">Track 1 – Placeholder</div>
          <div className="track-row">Track 2 – Placeholder</div>
        </aside>

        <section className="timeline">
          {/* future: grid + clips */}
          <div className="timeline-ruler">| 1 | 2 | 3 | 4 |</div>
          <div className="timeline-grid">[empty grid]</div>
        </section>
      </main>
    </div>
  );
}

export default App;
