// /workspaces/toolkit/app/src/components/mixer/MixerSection.tsx
import type { Track } from "../../types/Track";
import { MixerChannel } from "./MixerChannel";

type Props = {
  tracks: Track[];
  onChangeVolume: (id: string, volumeDb: number) => void;
  onChangePan: (id: string, pan: number) => void;
  onToggleMute: (id: string) => void;
  onToggleSolo: (id: string) => void;
};

export function MixerSection({
  tracks,
  onChangeVolume,
  onChangePan,
  onToggleMute,
  onToggleSolo,
}: Props) {
  if (!tracks.length) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-4 text-sm text-slate-400">
        No tracks yet. Mixer will appear here once tracks are created.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-4 overflow-x-auto">
      <div className="flex gap-4">
        {tracks.map((track) => (
          <MixerChannel
            key={track.id}
            track={track}
            onChangeVolume={onChangeVolume}
            onChangePan={onChangePan}
            onToggleMute={onToggleMute}
            onToggleSolo={onToggleSolo}
          />
        ))}
      </div>
    </div>
  );
}
