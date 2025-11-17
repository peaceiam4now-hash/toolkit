// /workspaces/toolkit/app/src/components/tracks/TrackRow.tsx

import { TrackHeader } from "./TrackHeader";
import type { Track } from "../../types/Track";

type Props = {
  track: Track;
};

export function TrackRow({ track }: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #ddd",
        padding: "0.5rem 0",
      }}
    >
      <TrackHeader track={track} />

      {/* Sequencer grid will go here */}
      <div
        style={{
          flex: 1,
          minHeight: "40px",
          background: "rgba(0,0,0,0.03)",
          marginLeft: "1rem",
          padding: "0.5rem",
        }}
      >
        [grid placeholder]
      </div>
    </div>
  );
}
