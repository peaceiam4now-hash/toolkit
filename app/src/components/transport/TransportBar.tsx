// /workspaces/toolkit/app/src/components/transport/TransportBar.tsx

type Props = {
  audioStarted: boolean;
  isPlaying: boolean;
  onStartEngine: () => Promise<void>;
  onPlay: () => Promise<void>;
  onStop: () => Promise<void>;
};

export function TransportBar({
  audioStarted,
  isPlaying,
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
    </section>
  );
}
