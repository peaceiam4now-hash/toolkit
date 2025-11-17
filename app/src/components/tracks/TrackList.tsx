import type { Track } from "../../types/Track";

type Props = {
  tracks: Track[];
};

export function TrackList({ tracks }: Props) {
  return (
    <section className="tracks-panel">
      <h2>Tracks</h2>
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>{track.name}</li>
        ))}
      </ul>
    </section>
  );
}
