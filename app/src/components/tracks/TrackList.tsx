// /workspaces/toolkit/app/src/components/tracks/TrackList.tsx
import type { Track } from "../../types/Track";

type Props = {
  tracks: Track[];
  onToggleMute: (id: string) => void;
  onToggleSolo: (id: string) => void;
};

export function TrackList({ tracks, onToggleMute, onToggleSolo }: Props) {
  if (!tracks.length) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-4 text-sm text-slate-400">
        No tracks yet. This is where your Lunar Studios hierarchy will live.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 space-y-2">
      {tracks.map(track => (
        <div
          key={track.id}
          className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-slate-900/80"
        >
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: track.color }}
            />
            <span className="text-sm text-slate-100">{track.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSolo(track.id)}
              className={`px-2 py-0.5 rounded text-xs font-semibold border
                ${
                  track.isSolo
                    ? "bg-yellow-400 text-slate-900 border-yellow-300"
                    : "bg-slate-800 text-slate-200 border-slate-700"
                }`}
            >
              S
            </button>
            <button
              onClick={() => onToggleMute(track.id)}
              className={`px-2 py-0.5 rounded text-xs font-semibold border
                ${
                  track.isMuted
                    ? "bg-rose-500 text-white border-rose-400"
                    : "bg-slate-800 text-slate-200 border-slate-700"
                }`}
            >
              M
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
