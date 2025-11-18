// src/App.tsx

import { useEffect, useState } from "react";

import * as Tone from "tone";



import { TransportBar } from "./components/transport/TransportBar";

import { TrackList } from "./components/tracks/TrackList";

import { MixerSection } from "./components/mixer/MixerSection";

import { StepSequencer } from "./components/sequencer/StepSequencer";



import { initialTracks } from "./state/initialTracks";

import { initialPattern } from "./state/initialPattern";



import type { Track } from "./types/Track";

import type {

  SequencerPattern,

  SequencerLaneId,

} from "./types/Sequencer";



import { sequencerEngine } from "./audio/sequencerEngine";



function App() {

  const [audioStarted, setAudioStarted] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);

  const [bpm, setBpm] = useState(120);

  const [tracks, setTracks] = useState<Track[]>(initialTracks);

  const [pattern, setPattern] =

    useState<SequencerPattern>(initialPattern);



  // Keep engine in sync with the current pattern

  useEffect(() => {

    sequencerEngine.setPattern(pattern);

  }, [pattern]);



  // --- Transport handlers ---------------------------------------------------



  const handleStartEngine = async () => {

    await Tone.start();

    setAudioStarted(true);

  };



  const handlePlay = () => {

    if (!audioStarted) {

      // In practice this should be gated behind the Init button,

      // but calling Tone.start() twice is harmless.

      Tone.start().then(() => setAudioStarted(true));

    }



    sequencerEngine.start(bpm);

    setIsPlaying(true);

  };



  const handleStop = () => {

    sequencerEngine.stop();

    setIsPlaying(false);

  };



  const handleChangeBpm = (value: number) => {

    const clamped = Math.min(240, Math.max(40, value || 120));

    setBpm(clamped);

    sequencerEngine.updateBpm(clamped);

  };



  // --- Mixer / track handlers ----------------------------------------------



  const handleChangeVolume = (id: string, volumeDb: number) => {

    setTracks((prev) =>

      prev.map((t) => (t.id === id ? { ...t, volumeDb } : t)),

    );

    // Hook into Tone.js here once you have per-track channels.

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



      // Simple solo logic: if any solo is active, mute non-solo tracks.

      if (next.some((t) => t.isSolo)) {

        next = next.map((t) =>

          t.isSolo ? { ...t, isMuted: false } : { ...t, isMuted: true },

        );

      } else {

        next = next.map((t) => ({ ...t, isMuted: false }));

      }



      return next;

    });

  };



  // --- Sequencer grid handler ----------------------------------------------



  const handleToggleStep = (

    laneId: SequencerLaneId,

    stepIndex: number,

  ) => {

    setPattern((prev) => {

      const next: SequencerPattern = {

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

      };



      sequencerEngine.setPattern(next);

      return next;

    });

  };



  // --- Render ---------------------------------------------------------------



  return (

    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">

      <header className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">

        <h1 className="text-xl font-semibold tracking-wide">

          Lunar Studios <span className="text-indigo-400 text-sm">/ Web DAW</span>

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



        <section className="grid grid-cols-12 gap-4 mt-4">

          {/* Track list */}

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



          {/* Sequencer grid */}

          <div className="col-span-5 space-y-3">

            <h2 className="text-xs uppercase tracking-wide text-slate-400">

              Sequencer Grid

            </h2>

            <StepSequencer

              pattern={pattern}

              onToggleStep={handleToggleStep}

            />

            <p className="text-[11px] text-slate-500">

              Each lit step in Kick / Snare / Hat / Bass now drives a real

              Tone.js instrument via the sequencer engine.

            </p>

          </div>



          {/* Mixer */}

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

        </section>

      </main>

    </div>

  );

}



export default App;