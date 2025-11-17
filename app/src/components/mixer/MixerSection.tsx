// /workspaces/toolkit/app/src/components/mixer/MixerSection.tsx
import type { Track } from "../../types/Track";
import { MixerChannel } from "./MixerChannel";

type Props = {
  tracks: Track[];
  onChangeVolume: (id: string, volumeDb: number) => void;
  onChangePan: (id: string, pan: number) => void;
};

export function MixerSection({ tracks, onChangeVolume, onChangePan }: Props) {
  if (!tracks.length) return null;

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs uppercase tracking-wide text-slate-400">
          Mixer
        </h2>
        <span className="text-[10px] text-slate-500">
          Volume (dB) · Pan (L/R)
        </span>
      </div>

      <div className="flex gap-4 overflow-x-auto">
        {tracks.map((track) => (
          <MixerChannel
            key={track.id}
            track={track}
            onChangeVolume={onChangeVolume}
            onChangePan={onChangePan}
          />
        ))}
      </div>
    </section>
  );
}
