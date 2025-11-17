// /workspaces/toolkit/app/src/components/mixer/MixerChannel.tsx
import type { Track } from "../../types/Track";

type Props = {
  track: Track;
  onChangeVolume: (id: string, volumeDb: number) => void;
  onChangePan: (id: string, pan: number) => void;
  onToggleMute: (id: string) => void;
  onToggleSolo: (id: string) => void;
};

export function MixerChannel({
  track,
  onChangeVolume,
  onChangePan,
  onToggleMute,
  onToggleSolo,
}: Props) {
  // volume slider in dB
  const handleVolumeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    onChangeVolume(track.id, value);
  };

  // pan slider -1..1
  const handlePanInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    onChangePan(track.id, value);
  };

  return (
    <div className="flex flex-col items-center w-32 rounded-xl bg-slate-900/80 border border-slate-800 px-2 py-3">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: track.color }}
        />
        <span
          className={`text-xs truncate max-w-[5rem] ${
            track.isGroup ? "font-semibold text-slate-50" : "text-slate-200"
          }`}
        >
          {track.name}
        </span>
      </div>

      {/* Solo/Mute buttons */}
      <div className="flex gap-1 mb-3">
        <button
          onClick={() => onToggleSolo(track.id)}
          className={`px-2 py-0.5 rounded text-[11px] font-semibold border
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
          className={`px-2 py-0.5 rounded text-[11px] font-semibold border
            ${
              track.isMuted
                ? "bg-rose-500 text-white border-rose-400"
                : "bg-slate-800 text-slate-200 border-slate-700"
            }`}
        >
          M
        </button>
      </div>

      {/* Volume fader */}
      <div className="flex flex-col items-center gap-1 mb-3">
        <span className="text-[10px] uppercase tracking-wide text-slate-400">
          Vol
        </span>
        <input
          type="range"
          min={-60}
          max={6}
          step={0.5}
          value={track.volumeDb}
          onChange={handleVolumeInput}
          className="h-24 w-8 rotate-[-90deg] origin-center"
        />
        <span className="text-[11px] text-slate-300 mt-6">
          {track.volumeDb.toFixed(1)} dB
        </span>
      </div>

      {/* Pan control */}
      <div className="w-full mt-auto">
        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
          <span>L</span>
          <span className="uppercase tracking-wide">Pan</span>
          <span>R</span>
        </div>
        <input
          type="range"
          min={-1}
          max={1}
          step={0.01}
          value={track.pan}
          onChange={handlePanInput}
          className="w-full"
        />
        <div className="text-[11px] text-center text-slate-300 mt-1">
          {track.pan.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
