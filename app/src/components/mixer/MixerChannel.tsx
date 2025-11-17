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
  const handleVolumeInput = (value: string) => {
    const num = Number(value);
    const clamped = Math.max(-60, Math.min(6, isNaN(num) ? -12 : num));
    onChangeVolume(track.id, clamped);
  };

  const handlePanInput = (value: string) => {
    const num = Number(value);
    const clamped = Math.max(-1, Math.min(1, isNaN(num) ? 0 : num));
    onChangePan(track.id, clamped);
  };

  return (
    <div className="flex flex-col items-center w-32 rounded-xl bg-slate-950/70 border border-slate-800 px-3 py-3 shadow-inner">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: track.color }}
        />
        <span className="text-xs font-medium text-slate-100 truncate">
          {track.name}
        </span>
      </div>

      {/* Solo / Mute */}
      <div className="flex gap-1 mb-3">
        <button
          onClick={() => onToggleSolo(track.id)}
          className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border
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
          className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border
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
      <div className="flex flex-col items-center mb-3">
        <span className="text-[10px] text-slate-500 mb-1">VOL</span>
        <input
          type="range"
          min={-60}
          max={6}
          step={0.5}
          value={track.volumeDb}
          onChange={(e) => handleVolumeInput(e.target.value)}
          className="w-10 h-28 rotate-[-90deg] origin-center"
        />
        <span className="text-[10px] text-slate-400 mt-2">
          {track.volumeDb.toFixed(1)} dB
        </span>
      </div>

      {/* Pan */}
      <div className="flex flex-col items-center">
        <span className="text-[10px] text-slate-500 mb-1">PAN</span>
        <input
          type="range"
          min={-1}
          max={1}
          step={0.1}
          value={track.pan}
          onChange={(e) => handlePanInput(e.target.value)}
          className="w-full"
        />
        <div className="flex justify-between w-full text-[10px] text-slate-500">
          <span>L</span>
          <span>C</span>
          <span>R</span>
        </div>
      </div>
    </div>
  );
}
