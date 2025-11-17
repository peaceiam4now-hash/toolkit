// /workspaces/toolkit/app/src/components/mixer/MixerChannel.tsx
import type { Track } from "../../types/Track";

type Props = {
  track: Track;
  onChangeVolume: (id: string, volumeDb: number) => void;
  onChangePan: (id: string, pan: number) => void;
};

export function MixerChannel({ track, onChangeVolume, onChangePan }: Props) {
  return (
    <div className="flex flex-col items-center w-28 rounded-lg bg-slate-900/70 border border-slate-800 px-2 py-3">
      {/* Track label */}
      <div className="flex items-center gap-1 mb-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: track.color }}
        />
        <span className="text-xs text-slate-100 truncate max-w-[5rem]">
          {track.name}
        </span>
      </div>

      {/* Volume fader */}
      <div className="flex flex-col items-center mb-2">
        <span className="text-[10px] text-slate-400 mb-1">
          {track.volumeDb.toFixed(1)} dB
        </span>
        <input
          type="range"
          min={-60}
          max={6}
          step={0.5}
          value={track.volumeDb}
          onChange={(e) =>
            onChangeVolume(track.id, Number(e.target.value))
          }
          className="h-24 w-2 accent-indigo-400 [writing-mode:bt-lr] rotate-180"
        />
      </div>

      {/* Pan control */}
      <div className="flex flex-col items-center mt-1 w-full">
        <span className="text-[10px] text-slate-400 mb-1">
          Pan {track.pan.toFixed(2)}
        </span>
        <input
          type="range"
          min={-1}
          max={1}
          step={0.01}
          value={track.pan}
          onChange={(e) =>
            onChangePan(track.id, Number(e.target.value))
          }
          className="w-full accent-emerald-400"
        />
        <div className="flex justify-between w-full text-[9px] text-slate-500 mt-0.5">
          <span>L</span>
          <span>C</span>
          <span>R</span>
        </div>
      </div>
    </div>
  );
}
