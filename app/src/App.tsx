// /workspaces/toolkit/app/src/App.tsx
import { useEffect, useState } from "react";
import * as Tone from "tone";

import { TransportBar } from "./components/transport/TransportBar";
import { TrackList } from "./components/tracks/TrackList";
import { MixerSection } from "./components/mixer/MixerSection";
import { SequencerGrid } from "./components/sequencer/SequencerGrid";

import type { Track } from "./types/Track";
import type { SequencerPattern, SequencerLane } from "./types/Sequencer";
import { initialTracks } from "./state/initialTracks";

const STEPS_PER_BAR = 16;

function buildInitialPattern(tracks: Track[]): SequencerPattern {
  const lanes: SequencerLane[] = tracks.map((t) => ({
    trackId: t.id,
    label: t.name,
    steps: new Array(STEPS_PER_BAR).fill(false),
  }));

  return {
    stepsPerBar: STEPS_PER_BAR,
    lanes,
  };
}

function App() {
  const [audioStarted, setAudioStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [tracks, setTracks] = useState<Track[]>(initialTracks);

  // Section E: sequencer pattern + current step (for visual playhead)
  const [pattern, setPattern] = useState<SequencerPattern>(() =>
    buildInitialPattern(initialTracks)
  );
  const [currentStep, setCurrentStep] = useState(0);

  // --- Audio engine bootstrap -------------------------------------------------

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

  // --- Mixer handlers (Section C) --------------------------------------------

  const handleChangeVolume = (id: string, volumeDb: number) => {
    setTracks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, volumeDb } : t))
    );

    // Hook into Tone here when you have per-track nodes wired up
    // const node = trackNodesRef.current[id];
    // if (node?.channel) {
    //   node.channel.volume.value = volumeDb;
    // }
  };

  const handleChangePan = (id: string, pan: number) => {
    const clamped = Math.max(-1, Math.min(1, pan));

    setTracks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, pan: clamped } : t))
    );

    // Optional Tone pan hook goes here.
  };

  const handleToggleMute = (id: string) => {
    setTracks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isMuted: !t.isMuted } : t))
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

      // Simple UI-only solo logic: if any solo is active, mute non-solo tracks
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

  // --- Sequencer handlers (Section E) ----------------------------------------

  const handleToggleStep = (trackId: string, stepIndex: number) => {
    setPattern((prev) => {
      const lanes = prev.lanes.map((lane) => {
        if (lane.trackId !== trackId) return lane;
        const nextSteps = [...lane.steps];
        nextSteps[stepIndex] = !nextSteps[stepIndex];
        return { ...lane, steps: nextSteps };
      });

      return { ...prev, lanes };
    });
  };

  // Visual playhead that syncs to Tone.Transport
  useEffect(() => {
    const id = Tone.Transport.scheduleRepeat(() => {
      setCurrentStep((prev) => (prev + 1) % STEPS_PER_BAR);
    }, "16n");

    return () => {
      Tone.Transport.clear(id);
    };
  }, []);

  // NOTE: For now we’re only driving the visual grid.
  // Actual note triggering per lane can be added later by
  // reading `pattern` inside the scheduleRepeat callback.

  // --- UI ---------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-wide">
          Lunar Studios{" "}
          <span className="text-indigo-400 text-sm">/ Web DAW</span>
        </h1>
      </header>

      <main className="flex-1 px-6 py-4 space-y-4">
        {/* A. Transport bar */}
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
          {/* B. Track list / hierarchy */}
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

          {/* C + E: Mixer + Sequencer */}
          <div className="col-span-8 space-y-3">
            {/* C. Mixer section */}
            <MixerSection
              tracks={tracks}
              onChangeVolume={handleChangeVolume}
              onChangePan={handleChangePan}
              onToggleMute={handleToggleMute}
              onToggleSolo={handleToggleSolo}
            />

            {/* E. Sequencer grid */}
            <SequencerGrid
              tracks={tracks}
              pattern={pattern}
              currentStep={currentStep}
              onToggleStep={handleToggleStep}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
