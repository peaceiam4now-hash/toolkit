// /workspaces/toolkit/app/src/App.tsx
import { useEffect, useState } from "react";
import * as Tone from "tone";

import { TransportBar } from "./components/transport/TransportBar";
import { TrackList } from "./components/tracks/TrackList";
import { MixerSection } from "./components/mixer/MixerSection";
import { SequencerGrid } from "./components/sequencer/SequencerGrid";

import type { Track } from "./types/Track";
import type { SequencerPattern } from "./types/Sequencer";

import { initialTracks } from "./state/initialTracks";
import { initialPattern } from "./state/initialPattern";
import { sequencerEngine } from "./audio/sequencerEngine";

function App() {
  // ---------- global transport ----------
  const [audioStarted, setAudioStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);

  // ---------- mixer / tracks ----------
  const [tracks, setTracks] = useState<Track[]>(initialTracks);

  // ---------- sequencer pattern ----------
  const [pattern, setPattern] = useState<SequencerPattern>(initialPattern);

  // Whenever the pattern changes, push it into the engine
  useEffect(() => {
    sequencerEngine.setPattern(pattern);
  }, [pattern]);

  // ---------- transport handlers ----------

  const handleStartEngine = async () => {
    await Tone.start(); // required user gesture in browser
    setAudioStarted(true);
  };

  const handlePlay = async () => {
    if (!audioStarted) {
      await Tone.start();
      setAudioStarted(true);
    }

    // Set tempo and start Tone's transport + engine
    Tone.Transport.bpm.value = bpm;
    sequencerEngine.start(bpm);
    Tone.Transport.start();

    setIsPlaying(true);
  };

  const handleStop = () => {
    Tone.Transport.stop();
    sequencerEngine.stop();
    setIsPlaying(false);
  };

  const handleChangeBpm = (value: number) => {
    const clamped = Math.min(240, Math.max(40, value || 120));
    setBpm(clamped);
    Tone.Transport.bpm.value = clamped;
  };

  // ---------- mixer handlers ----------

  const handleChangeVolume = (id: string, volumeDb: number) => {
    setTracks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              volumeDb,
            }
          : t
      )
    );

    // Hook into Tone later when each track has its own channel node
    // const node = trackNodesRef.current[id];
    // if (node?.channel) node.channel.volume.value = volumeDb;
  };

  const handleChangePan = (id: string, pan: number) => {
    const clamped = Math.max(-1, Math.min(1, pan));

    setTracks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              pan: clamped,
            }
          : t
      )
    );

    // Same story as above – wire this to a Tone.Panner or channel.pan later
  };

  const handleToggleMute = (id: string) => {
    setTracks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              isMuted: !t.isMuted,
            }
          : t
      )
    );
  };

  const handleToggleSolo = (id: string) => {
    setTracks((prev) => {
      // Flip solo on the target track
      const updated = prev.map((t) =>
        t.id === id
          ? {
              ...t,
              isSolo: !t.isSolo,
            }
          : t
      );

      // Simple UI-only solo logic: if any solo, mute non-solo
      const anySolo = updated.some((t) => t.isSolo);

      if (!anySolo) {
        // No solos → everyone unmuted
        return updated.map((t) => ({ ...t, isMuted: false }));
      }

      return updated.map((t) =>
        t.isSolo ? { ...t, isMuted: false } : { ...t, isMuted: true }
      );
    });
  };

  // ---------- sequencer handlers (pattern → sound) ----------

  /**
   * Toggle a step in the grid.
   * This updates the pattern.lanes[].steps array in state,
   * and the useEffect above pushes the new pattern into sequencerEngine.
   */
  const handleToggleStep = (laneId: string, stepIndex: number) => {
    setPattern((prev) => ({
      ...prev,
      lanes: prev.lanes.map((lane) =>
        lane.id !== laneId
          ? lane
          : {
              ...lane,
              steps: lane.steps.map((on, idx) =>
                idx === stepIndex ? !on : on
              ),
            }
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-wide">
          Lunar Studios <span className="text-indigo-400 text-sm">/ Web DAW</span>
        </h1>
      </header>

      {/* Main layout */}
      <main className="flex-1 px-6 py-4 space-y-4">
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

        <section className="grid grid-cols-12 gap-4 mt-4">
          {/* Left column: Track list */}
          <div className="col-span-3 space-y-3">
            <h2 className="text-xs uppercase tracking-wide text-slate-400">
              Track List
            </h2>
            <TrackList
              tracks={tracks}
              onToggleMute={handleToggleMute}
              onToggleSolo={handleToggleSolo}
            />
          </div>

          {/* Middle column: Mixer */}
          <div className="col-span-4 space-y-3">
            <h2 className="text-xs uppercase tracking-wide text-slate-400">
              Mixer
            </h2>
            <MixerSection
              tracks={tracks}
              onChangeVolume={handleChangeVolume}
              onChangePan={handleChangePan}
              onToggleMute={handleToggleMute}
              onToggleSolo={handleToggleSolo}
            />
          </div>

          {/* Right column: Sequencer */}
          <div className="col-span-5 space-y-3">
            <h2 className="text-xs uppercase tracking-wide text-slate-400">
              Sequencer
            </h2>
            <SequencerGrid pattern={pattern} onToggleStep={handleToggleStep} />
            <p className="text-xs text-slate-500 mt-1">
              Grid state is driving <code>sequencerEngine</code>. Each lane’s
              steps array feeds the per-lane instruments (kick / snare / hat /
              bass) in the engine.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
