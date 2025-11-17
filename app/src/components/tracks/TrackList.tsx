// /workspaces/toolkit/app/src/components/tracks/TrackList.tsx

import type { Track } from "../../types/Track";
import { TrackRow } from "./TrackRow";

type Props = {
  tracks: Track[];
};

export function TrackList({ tracks }: Props) {
  return (
    <div style={{ marginTop: "1rem" }}>
      {tracks.map((t) => (
        <TrackRow key={t.id} track={t} />
      ))}
    </div>
  );
}
