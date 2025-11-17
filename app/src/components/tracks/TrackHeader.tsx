// /workspaces/toolkit/app/src/components/tracks/TrackHeader.tsx
import type { Track } from "../../types/Track";

type Props = {
  track: Track;
};

export function TrackHeader({ track }: Props) {
  return (
    <div style={{ width: "180px" }}>
      <strong>{track.name}</strong>

      <div style={{ marginTop: "0.25rem" }}>
        <button style={{ marginRight: "0.5rem" }}>M</button>
        <button>S</button>
      </div>
    </div>
  );
}
