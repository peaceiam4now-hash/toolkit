import { useState } from "react";
import * as Tone from "tone";

import { TransportBar } from "./components/transport/TransportBar";
import { TrackList } from "./components/tracks/TrackList";
import { MixerSection } from "./components/mixer/MixerSection";
import { StepSequencer } from "./components/sequencer/StepSequencer";

import type { Track } from "./types/Track";
import type { SequencerPattern } from "./types/Sequencer";

import { initialTracks } from "./state/initialTracks";
import { initialPattern } from "./state/initialPattern";
import { sequencerEngine } from "./audio/sequencerEngine";

function App() {
  const [audioStarted, setAudioStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);

  const [tracks, setTracks] = useState<Track[]>(initialTracks);
  const [pattern, setPattern] = useState<SequencerPattern>(initialPattern);

  // --- TRANSPORT / AUDIO ENGINE -----------------------------------------

  const handleStartEngine = async () => {
    await Tone.start();
    setAudioStarted(true);
  };

  const handlePlay = async () => {
    if (!audioStarted) {
      await Tone.start();
      setAudioStarted(true);
    }

    sequencerEngine.setPattern(pattern);
    sequencerEngine.start(bpm);

    setIsPlaying(true);
  };

  const handleStop = () => {
    sequencerEngine.stop();
    Tone.Transport.stop();
    setIsPlaying(false);
  };

  const handleChangeBpm = (value: number) => {
    const clamped = Math.min(240, Math.max(40, value || 120));
    setBpm(clamped);
    Tone.Transport.bpm.value = clamped;
  };

  // --- MIXER / TRACK STATE ----------------------------------------------

  const handleChangeVolume = (id: string, volumeDb: number) => {
    setTracks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, volumeDb } : t))
    );
    // Future hook: push volumeDb into Tone.js channel here
  };

  const handleChangePan = (id: string, pan: number) => {
    const clamped = Math.max(-1, Math.min(1, pan));
    setTracks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, pan: clamped } : t))
    );
    // Future hook: push pan into Tone.js panner here
  };

  const handleToggleMute = (id: string) => {
    setTracks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isMuted: !t.isMuted } : t
      )
    );
    // Future: mirror mute state to Tone.js channels
  };

  const handleToggleSolo = (id: string) => {
    setTracks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isSolo: !t.isSolo } : t
      )
    );
    // Keeping solo logic simple for now (UI only)
  };

  // --- SEQUENCER STATE --------------------------------------------------

  const handleToggleStep = (laneId: string, stepIndex: number) => {
    setPattern((prev) => {
      const next: SequencerPattern = {
        ...prev,
        lanes: prev.lanes.map((lane) =>
          lane.id === laneId
            ? {
                ...lane,
                steps: lane.steps.map((on, idx) =>
                  idx === stepIndex ? !on : on
                ),
              }
            : lane
        ),
      };

      // keep engine live-updated while running
      sequencerEngine.setPattern(next);
      return next;
    });
  };

  // --- RENDER -----------------------------------------------------------

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-wide">
          Lunar Studios{" "}
          <span className="text-indigo-400 text-sm">/ Web DAW</span>
        </h1>
      </header>

      <main className="flex-1 px-6 py-4 space-y-4">
        {/* Transport (A) */}
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
          {/* Track list + hierarchy (B) */}
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

          {/* Mixer (C) + Effects rack / Sequencer (D/E) */}
          <div className="col-span-9 space-y-4">
            {/* Mixer section */}
            <MixerSection
              tracks={tracks}
              onChangeVolume={handleChangeVolume}
              onChangePan={handleChangePan}
              onToggleMute={handleToggleMute}
              onToggleSolo={handleToggleSolo}
            />

            {/* Step sequencer grid */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <h2 className="text-xs uppercase tracking-wide text-slate-400 mb-2">
                Step Sequencer
              </h2>
              <StepSequencer pattern={pattern} onToggleStep={handleToggleStep} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
