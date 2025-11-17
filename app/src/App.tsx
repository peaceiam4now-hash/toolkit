// src/App.tsx
import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";

import { TransportBar } from "./components/transport/TransportBar";
import { TrackList } from "./components/tracks/TrackList";
import type { Track } from "./types/Track";

type TrackNode = {
  channel: Tone.Channel;
};

const INITIAL_TRACKS: Track[] = [
  {
    id: "track-1",
    name: "Drums",
    color: "#40E0D0",
    isGroup: false,
    parentId: null,
    volumeDb: -6,
    pan: 0,
    isMuted: false,
    isSolo: false,
    isArmed: true,
  },
  {
    id: "track-2",
    name: "Bass",
    color: "#FF7F50",
    isGroup: false,
    parentId: null,
    volumeDb: -8,
    pan: -0.1,
    isMuted: false,
    isSolo: false,
    isArmed: true,
  },
  {
    id: "track-3",
    name: "Lead",
    color: "#9370DB",
    isGroup: false,
    parentId: null,
    volumeDb: -10,
    pan: 0.15,
    isMuted: false,
    isSolo: false,
    isArmed: true,
  },
];

function App() {
  const [audioStarted, setAudioStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [tracks, setTracks] = useState<Track[]>(INITIAL_TRACKS);

  // Tone.js nodes per track id
  const trackNodesRef = useRef<Map<string, TrackNode>>(new Map());

  // keep Tone.Transport in sync with BPM
  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  const ensureTrackNodes = () => {
    const map = trackNodesRef.current;
    let changed = false;

    tracks.forEach((track) => {
      if (!map.has(track.id)) {
        const channel = new Tone.Channel({
          volume: track.volumeDb,
          pan: track.pan,
        }).toDestination();

        map.set(track.id, { channel });
        changed = true;
      }
    });

    // (Optional) remove deleted tracks later if you support deletes
    if (changed) {
      trackNodesRef.current = new Map(map);
    }
  };

  const applyTrackToNode = (track: Track) => {
    const node = trackNodesRef.current.get(track.id);
    if (!node) return;

    node.channel.volume.value = track.volumeDb;
    node.channel.pan.value = track.pan;
    node.channel.mute = track.isMuted;

    // Solo logic: if any solo, mute all non-solo
    const anySolo = tracks.some((t) => t.isSolo);
    if (anySolo) {
      node.channel.mute = !track.isSolo;
    }
  };

  const handleStartEngine = async () => {
    await Tone.start();
    ensureTrackNodes();
    tracks.forEach(applyTrackToNode);
    setAudioStarted(true);
  };

  const handlePlay = async () => {
    if (!audioStarted) return;
    await Tone.start();
    await Tone.Transport.start();
    setIsPlaying(true);
  };

  const handleStop = async () => {
    if (!audioStarted) return;
    await Tone.Transport.stop();
    setIsPlaying(false);
  };

  const handleChangeBpm = (value: number) => {
    if (!Number.isFinite(value)) return;
    setBpm(Math.max(40, Math.min(240, value)));
  };

  const updateTrack = (id: string, fn: (t: Track) => Track) => {
    setTracks((prev) => {
      const next = prev.map((t) => (t.id === id ? fn(t) : t));
      // re-apply mixing state to Tone nodes
      next.forEach((track) => applyTrackToNode(track));
      return next;
    });
  };

  const handleChangeVolume = (id: string, volumeDb: number) => {
    updateTrack(id, (t) => ({ ...t, volumeDb }));
  };

  const handleChangePan = (id: string, pan: number) => {
    updateTrack(id, (t) => ({ ...t, pan }));
  };

  const handleToggleMute = (id: string) => {
    updateTrack(id, (t) => ({ ...t, isMuted: !t.isMuted }));
  };

  const handleToggleSolo = (id: string) => {
    setTracks((prev) => {
      const next = prev.map((t) =>
        t.id === id ? { ...t, isSolo: !t.isSolo } : t,
      );

      // apply solo logic to Tone nodes
      const anySolo = next.some((t) => t.isSolo);
      next.forEach((track) => {
        const node = trackNodesRef.current.get(track.id);
        if (!node) return;
        if (anySolo) {
          node.channel.mute = !track.isSolo;
        } else {
          node.channel.mute = track.isMuted;
        }
      });

      return next;
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1b2940 0, #050814 50%, #02030a 100%)",
        color: "#f4f7ff",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "1.5rem",
      }}
    >
      <header style={{ marginBottom: "1.5rem" }}>
        <h1
          style={{
            fontSize: "1.4rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "0.25rem",
          }}
        >
          Lunar Studios · Toolkit Web DAW
        </h1>
        <p style={{ fontSize: "0.85rem", opacity: 0.75 }}>
          Transport · Tracks · Mixer (gain / pan wired to Tone.js)
        </p>
      </header>

      <main style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <TransportBar
          audioStarted={audioStarted}
          isPlaying={isPlaying}
          bpm={bpm}
          onChangeBpm={handleChangeBpm}
          onStartEngine={handleStartEngine}
          onPlay={handlePlay}
          onStop={handleStop}
        />

        <TrackList
          tracks={tracks}
          onChangeVolume={handleChangeVolume}
          onChangePan={handleChangePan}
          onToggleMute={handleToggleMute}
          onToggleSolo={handleToggleSolo}
        />

        {/* Stubs for upcoming sections (Effects rack, Sequencer grid, Theme) */}
        <section style={{ marginTop: "1.5rem", opacity: 0.65, fontSize: "0.8rem" }}>
          Effects Rack · Sequencer Grid · Theme System coming next
        </section>
      </main>
    </div>
  );
}

export default App;
