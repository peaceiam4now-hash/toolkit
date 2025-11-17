// /workspaces/toolkit/app/src/App.tsx
import { useState } from "react";
import * as Tone from "tone";

import { TransportBar } from "./components/transport/TransportBar";
import { TrackList } from "./components/tracks/TrackList";
import { StepSequencer } from "./components/sequencer/StepSequencer";

import { initialTracks } from "./state/initialTracks";
import type { Track } from "./types/Track";
import type {
  SequencerPattern,
  SequencerLaneId,
} from "./types/Sequencer";

const initialPattern: SequencerPattern = {
  id: "pattern-1",
  stepsPerBar: 16,
  bars: 1,
  lanes: [
    { id: "kick", label: "Kick",  color: "#22c55e" },
    { id: "snare", label: "Snare", color: "#f97316" },
    { id: "hihat", label: "Hi-Hat", color: "#eab308" },
    { id: "perc", label: "Perc",  color: "#a855f7" },
  ],
  grid: {
    kick:  Array(16).fill(false),
    snare: Array(16).fill(false),
    hihat: Array(16).fill(false),
    perc:  Array(16).fill(false),
  },
};

function App() {
  const [audioStarted, setAudioStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [tracks, setTracks] = useState<Track[]>(initialTracks);
  const [pattern, setPattern] = useState<SequencerPattern>(initialPattern);

  // --- Transport / engine ---

  const handleStartEngine = async () => {
    await Tone.start();
    setAudioStarted(true);
  };

  const handlePlay = async () => {
    if (!audioStarted) {
      await Tone.start();
      setAudioStarted(true);
    }
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.start();
    setIsPlaying(true);

    // NOTE: scheduling actual sequencer playback will be wired
    // here in the next iteration, using `pattern`.
  };

  const handleStop = () => {
    Tone.Transport.stop();
    setIsPlaying(false);
  };

  const handleChangeBpm = (value: number) => {
    const clamped = Math.min(240, Math.max(40, value || 120));
    setBpm(clamped);
    Tone.Transport.bpm.value = clamped;
  };

  // --- Track controls (mute / solo) ---

  const handleToggleMute = (id: string) => {
    setTracks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isMuted: !t.isMuted } : t
      )
    );
  };

  const handleToggleSolo = (id: string) => {
    setTracks((prev) => {
      const target = prev.find((t) => t.id === id);
      if (!target) return prev;

      const nextSolo = !target.isSolo;
      let next = prev.map((t) =>
        t.id === id ? { ...t, isSolo: nextSolo } : t
      );

      // Simple UI-only solo logic:
      if (next.some((t) => t.isSolo)) {
        next = next.map((t) =>
          t.isSolo ? { ...t, isMuted: false } : { ...t, isMuted: true }
        );
      } else {
        next = next.map((t) => ({ ...t, isMuted: false }));
      }

      return next;
    });
  };

  // --- Sequencer state ---

  const handleToggleStep = (laneId: SequencerLaneId, stepIndex: number) => {
    setPattern((prev) => {
      const laneSteps = prev.grid[laneId] ?? [];
      const nextSteps = [...laneSteps];
      nextSteps[stepIndex] = !nextSteps[stepIndex];

      return {
        ...prev,
        grid: {
          ...prev.grid,
          [laneId]: nextSteps,
        },
      };
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-wide">
          Lunar Studios{" "}
          <span className="text-indigo-400 text-sm">/ Web DAW</span>
        </h1>
      </header>

      <main className="flex-1 px-6 py-4 space-y-4">
        <TransportBar
          audioStarted={audioStarted}
          isPlaying={isPlaying}
          bpm={bpm}
          onChangeBpm={handleChangeBpm}
          onStartEngine={handleStartEngine}
          onPlay={handlePlay}
          onStop={handleStop}
        />

        <section className="grid grid-cols-12 gap-4">
          {/* Left: track hierarchy */}
          <div className="col-span-4 space-y-3">
            <h2 className="text-xs uppercase tracking-wide text-slate-400">
              Track List
            </h2>
            <TrackList
              tracks={tracks}
              onToggleMute={handleToggleMute}
              onToggleSolo={handleToggleSolo}
            />
          </div>

          {/* Right: sequencer (and later mixer / FX) */}
          <div className="col-span-8 space-y-3">
            <StepSequencer
              pattern={pattern}
              onToggleStep={handleToggleStep}
            />

            {/* Mixer / FX rack can live under or beside sequencer in the next phase */}
            {/* <MixerSection ... /> */}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
