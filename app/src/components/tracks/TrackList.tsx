// src/components/tracks/TrackList.tsx
import type { Track } from "../../types/Track";
import { TrackRow } from "./Track";

type Props = {
  tracks: Track[];
  onChangeVolume: (id: string, volumeDb: number) => void;
  onChangePan: (id: string, pan: number) => void;
  onToggleMute: (id: string) => void;
  onToggleSolo: (id: string) => void;
};

export function TrackList({
  tracks,
  onChangeVolume,
  onChangePan,
  onToggleMute,
  onToggleSolo,
}: Props) {
  return (
    <section>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "0.5rem",
        }}
      >
        <h2 style={{ fontSize: "0.9rem" }}>Tracks</h2>
        <span style={{ fontSize: "0.75rem", opacity: 0.7 }}>
          {tracks.length} tracks
        </span>
      </header>

      <div>
        {tracks.map((track) => (
          <TrackRow
            key={track.id}
            track={track}
            onChangeVolume={onChangeVolume}
            onChangePan={onChangePan}
            onToggleMute={onToggleMute}
            onToggleSolo={onToggleSolo}
          />
        ))}
      </div>
    </section>
  );
}
