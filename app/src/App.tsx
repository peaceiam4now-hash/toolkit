// /workspaces/toolkit/app/src/App.tsx
import { useEffect, useState } from "react";
import * as Tone from "tone";

import { TransportBar } from "./components/transport/TransportBar";
import { TrackList } from "./components/tracks/TrackList";
import { MixerSection } from "./components/mixer/MixerSection";
import { SequencerGrid } from "./components/sequencer/SequencerGrid";

import { initialTracks } from "./state/initialTracks";
import { initialPattern } from "./state/initialPattern";

import { sequencerEngine } from "./audio/sequencerEngine";

import type { SequencerPattern, SequencerLane } from "./types/Sequencer";
import type { Track } from "./types/Track";

function App() {
  const [audioStarted, setAudioStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [tracks, setTracks] = useState<Track[]>(initialTracks);
  const [pattern, setPattern] = useState<SequencerPattern>(initialPattern);

  /** ────────────────────────────────
   *  AUDIO ENGINE INITIALIZATION
   * ──────────────────────────────── */
  const handleStartEngine = async () => {
    console.log("[App] Init audio engine");
    await Tone.start();
    setAudioStarted(true);
    Tone.Transport.bpm.value = bpm;
    sequencerEngine.setPattern(pattern);
    console.log("[App] Engine ready, BPM:", bpm);
  };

  const handlePlay = async () => {
    console.log("[App] Play clicked");
    if (!audioStarted) await handleStartEngine();
    await sequencerEngine.start(bpm);
    setIsPlaying(true);
    console.log("[App] Transport state:", Tone.Transport.state);
  };

  const handleStop = async () => {
    console.log("[App] Stop clicked");
    await sequencerEngine.stop();
    setIsPlaying(false);
  };

  const handleChangeBpm = (value: number) => {
    const clamped = Math.min(240, Math.max(40, value));
    setBpm(clamped);
    Tone.Transport.bpm.value = clamped;
    console.log("[App] BPM changed to", clamped);
  };

  /** ────────────────────────────────
   *  TRACK CONTROLS (wired to engine)
   * ──────────────────────────────── */
  const handleChangeVolume = (id: string, volumeDb: number) => {
    console.log(`[App] Volume change for ${id}: ${volumeDb} dB`);
    setTracks((prev: Track[]) =>
      prev.map((t) => (t.id === id ? { ...t, volumeDb } : t))
    );
    sequencerEngine.setTrackVolume(id, volumeDb);
  };

  const handleChangePan = (id: string, pan: number) => {
    const clamped = Math.max(-1, Math.min(1, pan));
    console.log(`[App] Pan change for ${id}: ${clamped}`);
    setTracks((prev: Track[]) =>
      prev.map((t) => (t.id === id ? { ...t, pan: clamped } : t))
    );
    sequencerEngine.setTrackPan(id, clamped);
  };

  const handleToggleMute = (id: string) => {
    console.log(`[App] Toggle mute for ${id}`);
    setTracks((prev: Track[]) => {
      const next = prev.map((t) =>
        t.id === id ? { ...t, isMuted: !t.isMuted } : t
      );
      const changed = next.find((t) => t.id === id);
      if (changed) sequencerEngine.setTrackMute(id, changed.isMuted);
      return next;
    });
  };

  const handleToggleSolo = (id: string) => {
    console.log(`[App] Toggle solo for ${id}`);
    setTracks((prev: Track[]) => {
      const next = prev.map((t) =>
        t.id === id ? { ...t, isSolo: !t.isSolo } : t
      );
      sequencerEngine.applySoloState(next);
      return next;
    });
  };

  /** ────────────────────────────────
   *  SEQUENCER PATTERN HANDLING
   * ──────────────────────────────── */
  const handleToggleStep = (laneId: string, stepIndex: number) => {
    console.log(`[App] Toggle step ${stepIndex} in lane ${laneId}`);
    setPattern((prev: SequencerPattern) => {
      const next: SequencerPattern = {
        ...prev,
        lanes: prev.lanes.map((lane: SequencerLane) =>
          lane.id === laneId
            ? {
                ...lane,
                steps: lane.steps.map(
                  (on: boolean, idx: number) =>
                    idx === stepIndex ? !on : on
                ),
              }
            : lane
        ),
      };
      sequencerEngine.setPattern(next);
      return next;
    });
  };

  /** ────────────────────────────────
   *  SIDE EFFECTS
   * ──────────────────────────────── */
  useEffect(() => {
    sequencerEngine.setPattern(pattern);
    console.log("[App] Pattern updated, lanes:", pattern.lanes.length);
  }, [pattern]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-wide">
          Lunar Studios{" "}
          <span className="text-indigo-400 text-sm">/ Web DAW</span>
        </h1>
      </header>

      <main className="flex-1 px-6 py-4 space-y-6">
        {/* Transport */}
        <TransportBar
          audioStarted={audioStarted}
          isPlaying={isPlaying}
          bpm={bpm}
          onChangeBpm={handleChangeBpm}
          onStartEngine={handleStartEngine}
          onPlay={handlePlay}
          onStop={handleStop}
        />

        {/* Main Grid Layout */}
        <section className="grid grid-cols-12 gap-4">
          {/* Track List */}
          <div className="col-span-3 space-y-3">
            <h2 className="text-xs uppercase tracking-wide text-slate-400">
              Tracks
            </h2>
            <TrackList
              tracks={tracks}
              onToggleMute={handleToggleMute}
              onToggleSolo={handleToggleSolo}
            />
          </div>

          {/* Mixer */}
          <div className="col-span-3">
            <MixerSection
              tracks={tracks}
              onChangeVolume={handleChangeVolume}
              onChangePan={handleChangePan}
              onToggleMute={handleToggleMute}
              onToggleSolo={handleToggleSolo}
            />
          </div>

          {/* Sequencer Grid */}
          <div className="col-span-6">
            <SequencerGrid pattern={pattern} onToggleStep={handleToggleStep} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;