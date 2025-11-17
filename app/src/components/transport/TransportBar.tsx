// app/src/components/transport/TransportBar.tsx

type Props = {
  audioStarted: boolean;
  isPlaying: boolean;
  bpm: number;
  onChangeBpm: (value: number) => void;
  onStartEngine: () => Promise<void>;
  onPlay: () => Promise<void>;
  onStop: () => Promise<void>;
};

export function TransportBar({
  audioStarted,
  isPlaying,
  bpm,
  onChangeBpm,
  onStartEngine,
  onPlay,
  onStop,
}: Props) {
  return (
    <section
      className="transport"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px 14px",
        borderRadius: "999px",
        background:
          "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,64,175,0.8))",
        border: "1px solid rgba(129,140,248,0.6)",
        boxShadow:
          "0 18px 45px rgba(15,23,42,0.8), 0 0 0 1px rgba(129,140,248,0.3)",
        backdropFilter: "blur(18px)",
      }}
    >
      <button
        onClick={onStartEngine}
        disabled={audioStarted}
        style={{
          padding: "6px 12px",
          borderRadius: "999px",
          border: "none",
          cursor: audioStarted ? "default" : "pointer",
          fontSize: "0.75rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          background: audioStarted
            ? "rgba(34,197,94,0.16)"
            : "radial-gradient(circle at 20% 0%, #22c55e, #16a34a)",
          color: audioStarted ? "#bbf7d0" : "#022c22",
          boxShadow: audioStarted
            ? "0 0 0 1px rgba(34,197,94,0.5)"
            : "0 0 18px rgba(34,197,94,0.7)",
        }}
      >
        {audioStarted ? "Engine Ready" : "Init Audio Engine"}
      </button>

      <button
        onClick={onPlay}
        disabled={!audioStarted || isPlaying}
        style={{
          padding: "6px 12px",
          borderRadius: "999px",
          border: "1px solid rgba(248,250,252,0.7)",
          background: isPlaying
            ? "rgba(248,250,252,0.15)"
            : "rgba(15,23,42,0.9)",
          color: "#f9fafb",
          fontSize: "0.8rem",
          fontWeight: 600,
          cursor: !audioStarted || isPlaying ? "default" : "pointer",
        }}
      >
        ▶ Play
      </button>

      <button
        onClick={onStop}
        disabled={!audioStarted || !isPlaying}
        style={{
          padding: "6px 12px",
          borderRadius: "999px",
          border: "1px solid rgba(248,250,252,0.4)",
          background: "rgba(15,23,42,0.9)",
          color: "#f9fafb",
          fontSize: "0.8rem",
          fontWeight: 600,
          cursor: !audioStarted || !isPlaying ? "default" : "pointer",
        }}
      >
        ■ Stop
      </button>

      <label
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "0.75rem",
          color: "#e5e7eb",
        }}
      >
        BPM
        <input
          type="number"
          min={40}
          max={240}
          value={bpm}
          onChange={(e) => onChangeBpm(Number(e.target.value || 0))}
          style={{
            width: 64,
            padding: "4px 8px",
            borderRadius: "999px",
            border: "1px solid rgba(148,163,184,0.6)",
            background: "rgba(15,23,42,0.9)",
            color: "#e5e7eb",
            fontSize: "0.75rem",
          }}
        />
      </label>
    </section>
  );
}
