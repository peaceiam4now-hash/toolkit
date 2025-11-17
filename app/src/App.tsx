// /workspaces/toolkit/app/src/App.tsx

import { useState } from "react";
import * as Tone from "tone";

import { TransportBar } from "./components/transport/TransportBar";
import { TrackList } from "./components/tracks/TrackList";
import { MixerSection } from "./components/mixer/MixerSection";
import { SequencerGrid } from "./components/sequencer/SequencerGrid";

import { initialTracks } from "./state/initialTracks";
import { initialPattern } from "./state/initialPattern";

import type { Track } from "./types/Track";
import type {
  SequencerPattern,
  SequencerLaneId,
} from "./types/Sequencer";

function App() {
  const [audioStarted, setAudioStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);

  const [tracks, setTracks] = useState<Track[]>(initialTracks);
  const [pattern, setPattern] = useState<SequencerPattern>(initialPattern);

  // --------------------------
  // Transport / engine control
  // --------------------------

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

  // --------------------------
  // Mixer / track state
  // --------------------------

  const handleChangeVolume = (id: string, volumeDb: number) => {
    setTracks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, volumeDb } : t)),
    );
  };

  const handleChangePan = (id: string, pan: number) => {
    const clamped = Math.max(-1, Math.min(1, pan));
    setTracks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, pan: clamped } : t)),
    );
  };

  const handleToggleMute = (id: string) => {
    setTracks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isMuted: !t.isMuted } : t,
      ),
    );
  };

  const handleToggleSolo = (id: string) => {
    setTracks((prev) => {
      const target = prev.find((t) => t.id === id);
      if (!target) return prev;

      const nextSolo = !target.isSolo;

      let next = prev.map((t) =>
        t.id === id ? { ...t, isSolo: nextSolo } : t,
      );

      // Simple solo logic: if any track is soloed, mute all others
      if (next.some((t) => t.isSolo)) {
        next = next.map((t) =>
          t.isSolo ? { ...t, isMuted: false } : { ...t, isMuted: true },
        );
      } else {
        // No solo: clear mutes
        next = next.map((t) => ({ ...t, isMuted: false }));
      }

      return next;
    });
  };

  // --------------------------
  // Sequencer grid state
  // --------------------------

  const handleToggleStep = (laneId: SequencerLaneId, stepIndex: number) => {
    setPattern((prev) => ({
      ...prev,
      lanes: prev.lanes.map((lane) =>
        lane.id === laneId
          ? {
              ...lane,
              steps: lane.steps.map((on, idx) =>
                idx === stepIndex ? !on : on,
              ),
            }
          : lane,
      ),
    }));
  };

  // --------------------------
  // Layout / UI
  // --------------------------

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
          {/* Left pane: track list / hierarchy */}
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

          {/* Right pane: mixer + sequencer */}
          <div className="col-span-8 space-y-4">
            <MixerSection
              tracks={tracks}
              onChangeVolume={handleChangeVolume}
              onChangePan={handleChangePan}
              onToggleMute={handleToggleMute}
              onToggleSolo={handleToggleSolo}
            />

            <SequencerGrid
              pattern={pattern}
              onToggleStep={handleToggleStep}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
