// /workspaces/toolkit/app/src/components/mixer/MixerSection.tsx

import type { Track } from "../../types/Track";
import { MixerChannel } from "./MixerChannel";

type Props = {
  tracks: Track[];
  onChangeVolume: (id: string, volumeDb: number) => void;
  onChangePan: (id: string, pan: number) => void;
};

export function MixerSection({ tracks, onChangeVolume, onChangePan }: Props) {
  return (
    <section className="mixer">
      <header className="mixer__header">
        <h2>Mixer</h2>
      </header>

      <div className="mixer__channels">
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
