// app/src/components/tracks/TrackRow.tsx

import type { Track } from "../../types/Track";

type Props = {
  track: Track;
  index: number;
  onToggleMute: (id: Track["id"]) => void;
  onToggleSolo: (id: Track["id"]) => void;
};

export function TrackRow({ track, index, onToggleMute, onToggleSolo }: Props) {
  return (
    <div
      className="track-row"
      style={{
        display: "grid",
        gridTemplateColumns: "32px minmax(0, 1.5fr) 120px minmax(0, 2fr)",
        alignItems: "center",
        gap: "8px",
        padding: "6px 10px",
        borderRadius: "999px",
        background:
          "linear-gradient(90deg, rgba(15,23,42,0.85), rgba(15,23,42,0.6))",
        border: "1px solid rgba(148,163,184,0.4)",
      }}
    >
      {/* Track index + color badge */}
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: "999px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.7rem",
          color: "#e5e7eb",
          background: track.color,
          boxShadow: "0 0 12px rgba(15,23,42,0.9)",
        }}
      >
        {index + 1}
      </div>

      {/* Name + hierarchy stub (for future groups) */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span
          style={{
            fontSize: "0.8rem",
            fontWeight: 500,
            color: "#e5e7eb",
          }}
        >
          {track.name}
        </span>
        <span
          style={{
            fontSize: "0.7rem",
            color: "#9ca3af",
          }}
        >
          Lane • Audio
        </span>
      </div>

      {/* M / S controls */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          justifyContent: "flex-start",
        }}
      >
        <button
          type="button"
          onClick={() => onToggleMute(track.id)}
          style={{
            minWidth: 40,
            padding: "4px 8px",
            borderRadius: "999px",
            border: "1px solid rgba(148,163,184,0.4)",
            background: track.isMuted
              ? "radial-gradient(circle at 20% 0%, #f97316, #b45309)"
              : "rgba(15,23,42,0.9)",
            color: track.isMuted ? "#0b1120" : "#e5e7eb",
            fontSize: "0.7rem",
            fontWeight: 600,
          }}
        >
          M
        </button>

        <button
          type="button"
          onClick={() => onToggleSolo(track.id)}
          style={{
            minWidth: 40,
            padding: "4px 8px",
            borderRadius: "999px",
            border: "1px solid rgba(148,163,184,0.4)",
            background: track.isSolo
              ? "radial-gradient(circle at 20% 0%, #22d3ee, #0ea5e9)"
              : "rgba(15,23,42,0.9)",
            color: track.isSolo ? "#0b1120" : "#e5e7eb",
            fontSize: "0.7rem",
            fontWeight: 600,
          }}
        >
          S
        </button>
      </div>

      {/* Waveform lane placeholder */}
      <div
        style={{
          height: 24,
          borderRadius: 999,
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(90deg, rgba(15,23,42,0.7), rgba(30,64,175,0.4))",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.7,
            backgroundImage:
              "linear-gradient(180deg, rgba(148,163,184,0.15) 1px, transparent 1px)",
            backgroundSize: "100% 4px",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.6,
            backgroundImage:
              "linear-gradient(90deg, rgba(94,234,212,0.4) 1px, transparent 1px)",
            backgroundSize: "3px 100%",
          }}
        />
      </div>
    </div>
  );
}
