// /workspaces/toolkit/app/src/App.tsx

import { useState } from "react";

import * as Tone from "tone";



import type { Track } from "./types/Track";

import { TransportBar } from "./components/transport/TransportBar";

import { TrackList } from "./components/tracks/TrackList";

import { SequencerGrid } from "./components/sequencer/SequencerGrid";

import { initialTracks } from "./state/initialTracks";



const STEPS_PER_BAR = 16;



function createInitialPattern(tracks: Track[]): Record<string, boolean[]> {

  const map: Record<string, boolean[]> = {};

  for (const t of tracks) {

    if (!t.isGroup) {

      map[t.id] = Array(STEPS_PER_BAR).fill(false);

    }

  }

  return map;

}



function App() {

  const [audioStarted, setAudioStarted] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);

  const [bpm, setBpm] = useState(120);

  const [tracks, setTracks] = useState<Track[]>(initialTracks);



  // Section E: per-track step patterns (UI-only for now)

  const [patternByTrack, setPatternByTrack] = useState<

    Record<string, boolean[]>

  >(() => createInitialPattern(initialTracks));



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



  // --- Track list controls ---



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



      // Basic UI-only solo behavior: if any solo is active, mute everything else

      if (next.some((t) => t.isSolo)) {

        next = next.map((t) =>

          t.isSolo ? { ...t, isMuted: false } : { ...t, isMuted: true }

        );

      } else {

        // No solo: unmute all

        next = next.map((t) => ({ ...t, isMuted: false }));

      }



      return next;

    });

  };



  // --- Sequencer step toggling (Section E) ---



  const handleToggleStep = (trackId: string, stepIndex: number) => {

    setPatternByTrack((prev) => {

      const currentRow =

        prev[trackId] ?? Array(STEPS_PER_BAR).fill(false);

      const nextRow = [...currentRow];

      nextRow[stepIndex] = !nextRow[stepIndex];



      return {

        ...prev,

        [trackId]: nextRow,

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

          {/* Left: Track list / hierarchy */}

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



          {/* Right: Sequencer grid (Section E) */}

          <div className="col-span-8 space-y-4">

            <section>

              <h2 className="mb-2 text-xs uppercase tracking-wide text-slate-400">

                Step Sequencer

              </h2>

              <SequencerGrid

                tracks={tracks}

                stepsPerBar={STEPS_PER_BAR}

                patternByTrack={patternByTrack}

                onToggleStep={handleToggleStep}

              />

            </section>

          </div>

        </section>

      </main>

    </div>

  );

}



export default App;