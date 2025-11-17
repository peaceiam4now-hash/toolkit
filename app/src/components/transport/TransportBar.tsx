// /workspaces/toolkit/app/src/components/transport/TransportBar.tsx

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
    <section className="transport">
      <button onClick={onStartEngine} disabled={audioStarted}>
        {audioStarted ? "Engine Ready" : "Init Audio Engine"}
      </button>

      <button onClick={onPlay} disabled={!audioStarted || isPlaying}>
        Play
      </button>

      <button onClick={onStop} disabled={!audioStarted || !isPlaying}>
        Stop
      </button>

      <label style={{ marginLeft: "1rem" }}>
        BPM{" "}
        <input
          type="number"
          min={40}
          max={240}
          value={bpm}
          onChange={(e) => onChangeBpm(Number(e.target.value || 0))}
        />
      </label>
    </section>
  );
}
