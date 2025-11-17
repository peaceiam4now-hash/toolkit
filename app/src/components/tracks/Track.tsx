// src/components/tracks/Track.tsx
import type { Track } from "../../types/Track";

type Props = {
  track: Track;
  onChangeVolume: (id: string, volumeDb: number) => void;
  onChangePan: (id: string, pan: number) => void;
  onToggleMute: (id: string) => void;
  onToggleSolo: (id: string) => void;
};

export function TrackRow({
  track,
  onChangeVolume,
  onChangePan,
  onToggleMute,
  onToggleSolo,
}: Props) {
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeVolume(track.id, Number(e.target.value));
  };

  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangePan(track.id, Number(e.target.value));
  };

  return (
    <div
      className="track-row"
      style={{
        display: "grid",
        gridTemplateColumns: "1.5fr 0.8fr 0.8fr 1.2fr 2fr",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem 0.75rem",
        borderRadius: "0.5rem",
        marginBottom: "0.35rem",
        background: track.isGroup
          ? "rgba(255,255,255,0.06)"
          : "rgba(0,0,0,0.35)",
        border: `1px solid ${track.color}`,
      }}
    >
      {/* Track name */}
      <div
        style={{
          fontWeight: track.isGroup ? 600 : 400,
          fontSize: "0.85rem",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "999px",
            backgroundColor: track.color,
          }}
        />
        {track.name}
      </div>

      {/* MUTE / SOLO */}
      <div style={{ display: "flex", gap: "0.4rem" }}>
        <button
          type="button"
          onClick={() => onToggleMute(track.id)}
          style={{
            padding: "0.15rem 0.5rem",
            fontSize: "0.75rem",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
            background: track.isMuted
              ? "rgba(255, 80, 80, 0.9)"
              : "rgba(255,255,255,0.06)",
            color: "#fff",
          }}
        >
          M
        </button>
        <button
          type="button"
          onClick={() => onToggleSolo(track.id)}
          style={{
            padding: "0.15rem 0.5rem",
            fontSize: "0.75rem",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
            background: track.isSolo
              ? "rgba(80, 200, 255, 0.9)"
              : "rgba(255,255,255,0.06)",
            color: "#fff",
          }}
        >
          S
        </button>
      </div>

      {/* VOLUME */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label
          style={{
            fontSize: "0.7rem",
            opacity: 0.8,
            marginBottom: "0.15rem",
          }}
        >
          Vol ({track.volumeDb.toFixed(1)} dB)
        </label>
        <input
          type="range"
          min={-60}
          max={6}
          step={0.5}
          value={track.volumeDb}
          onChange={handleVolumeChange}
        />
      </div>

      {/* PAN */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label
          style={{
            fontSize: "0.7rem",
            opacity: 0.8,
            marginBottom: "0.15rem",
          }}
        >
          Pan ({track.pan.toFixed(2)})
        </label>
        <input
          type="range"
          min={-1}
          max={1}
          step={0.01}
          value={track.pan}
          onChange={handlePanChange}
        />
      </div>

      {/* Placeholder for waveform / meter lane */}
      <div
        style={{
          height: "1.1rem",
          borderRadius: "999px",
          background:
            "linear-gradient(90deg, rgba(0,255,200,0.2), rgba(160,120,255,0.25))",
          opacity: 0.7,
        }}
      />
    </div>
  );
}
