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
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-6 text-sm text-slate-400">
        Mixer will appear here once you add tracks.
      </div>
    );
  }

  // Optionally, keep groups first
  const ordered = [...tracks].sort((a, b) => {
    if (a.isGroup && !b.isGroup) return -1;
    if (!a.isGroup && b.isGroup) return 1;
    return a.id.localeCompare(b.id);
  });

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-4 overflow-x-auto">
      <div className="flex gap-4">
        {ordered.map((track) => (
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
