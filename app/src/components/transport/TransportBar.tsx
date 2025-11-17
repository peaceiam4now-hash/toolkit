// /workspaces/toolkit/app/src/components/transport/TransportBar.tsx

type Props = {
  audioStarted: boolean;
  isPlaying: boolean;
  bpm: number;
  onChangeBpm: (value: number) => void;
  onStartEngine: () => Promise<void>;
  onPlay: () => Promise<void>;
  // Stop can be sync or async; keep it flexible
  onStop: () => void | Promise<void>;
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
    <section className="transport flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700/70 shadow-lg backdrop-blur-md">
      {/* Engine init */}
      <button
        onClick={onStartEngine}
        disabled={audioStarted}
        className="px-3 py-1.5 rounded-lg text-sm font-medium
                   disabled:opacity-50 disabled:cursor-not-allowed
                   bg-emerald-500 hover:bg-emerald-400 text-slate-900
                   transition-colors"
      >
        {audioStarted ? "Engine Ready" : "Init Audio Engine"}
      </button>

      {/* Play / Stop */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPlay}
          disabled={!audioStarted || isPlaying}
          className="px-3 py-1.5 rounded-full text-sm font-semibold
                     disabled:opacity-40 disabled:cursor-not-allowed
                     bg-indigo-500 hover:bg-indigo-400 text-white
                     transition-colors"
        >
          ▶ Play
        </button>

        <button
          onClick={onStop}
          disabled={!audioStarted || !isPlaying}
          className="px-3 py-1.5 rounded-full text-sm font-semibold
                     disabled:opacity-40 disabled:cursor-not-allowed
                     bg-rose-500 hover:bg-rose-400 text-white
                     transition-colors"
        >
          ■ Stop
        </button>
      </div>

      {/* BPM control */}
      <div className="flex items-center gap-2 ml-4 text-sm text-slate-100">
        <span className="uppercase tracking-wide text-xs text-slate-400">
          Tempo
        </span>
        <input
          type="number"
          min={40}
          max={240}
          value={bpm}
          onChange={(e) => onChangeBpm(Number(e.target.value || 0))}
          className="w-16 px-2 py-1 rounded-md bg-slate-800 border border-slate-700
                     text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <span className="text-xs text-slate-400">BPM</span>
      </div>
    </section>
  );
}
