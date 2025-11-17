// /workspaces/toolkit/app/src/App.tsx
import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";

import type { Track } from "./types/Track";
import { initialTracks } from "./state/initialTracks";

import { TransportBar } from "./components/transport/TransportBar";
import { TrackList } from "./components/tracks/TrackList";
import { MixerSection } from "./components/mixer/MixerSection";

type TrackNodes = {
  [id: string]: {
    channel: Tone.Channel;
  };
};

function App() {
  const [audioStarted, setAudioStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [tracks, setTracks] = useState<Track[]>(initialTracks);

  // One Tone channel per track
  const trackNodesRef = useRef<TrackNodes>({});

  //
  // AUDIO ENGINE BOOTSTRAP
  //
  const ensureAudioStarted = async () => {
    if (audioStarted) return;

    await Tone.start();
    Tone.Transport.bpm.value = bpm;
    setAudioStarted(true);
  };

  const handleStartEngine = async () => {
    await ensureAudioStarted();
  };

  const handlePlay = async () => {
    await ensureAudioStarted();
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
    if (audioStarted) {
      Tone.Transport.bpm.value = clamped;
    }
  };

  //
  // TRACK STATE MUTATORS
  //
  const handleChangeVolume = (id: string, volumeDb: number) => {
    setTracks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, volumeDb } : t
      )
    );
  };

  const handleChangePan = (id: string, pan: number) => {
    const clamped = Math.max(-1, Math.min(1, pan));
    setTracks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, pan: clamped } : t
      )
    );
  };

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

      // UI-level solo logic: if any track is solo, others visually “mute”
      const anySolo = next.some((t) => t.isSolo);
      if (anySolo) {
        next = next.map((t) =>
          t.isSolo ? { ...t, isMuted: false } : { ...t, isMuted: true }
        );
      } else {
        next = next.map((t) => ({ ...t, isMuted: false }));
      }

      return next;
    });
  };

  //
  // SYNC TRACK STATE -> TONE.JS NODES
  //
  useEffect(() => {
    // Ensure node per track
    tracks.forEach((track) => {
      if (!trackNodesRef.current[track.id]) {
        trackNodesRef.current[track.id] = {
          channel: new Tone.Channel({
            volume: track.volumeDb,
            pan: track.pan,
            mute: track.isMuted,
          }).toDestination(),
        };
      }
    });

    // Apply gain/pan/mute/solo state to Tone
    const anySolo = tracks.some((t) => t.isSolo);

    tracks.forEach((track) => {
      const node = trackNodesRef.current[track.id];
      if (!node) return;

      // volume & pan
      node.channel.volume.value = track.volumeDb;
      npm run BiquadFilterNode
      node.channel.pan.value = track.pan;

      // solo logic at engine level
      if (anySolo) {
        node.channel.mute = !track.isSolo;
      } else {
        node.channel.mute = track.isMuted;
      }
    });

    // Cleanup removed tracks
    Object.keys(trackNodesRef.current).forEach((id) => {
      if (!tracks.find((t) => t.id === id)) {
        trackNodesRef.current[id].channel.dispose();
        delete trackNodesRef.current[id];
      }
    });
  }, [tracks]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-wide">
          Lunar Studios{" "}
          <span className="text-indigo-400 text-sm">/ Web DAW</span>
        </h1>
      </header>

      <main className="flex-1 px-6 py-4 space-y-4">
        {/* STEP A: Transport */}
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
          {/* STEP B: Track list + hierarchy */}
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

          {/* STEP C: Mixer section */}
          <div className="col-span-8 space-y-3">
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
