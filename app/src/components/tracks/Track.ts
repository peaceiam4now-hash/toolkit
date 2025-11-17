// /workspaces/toolkit/app/src/types/Track.ts

export type TrackId = number;

export type Track = {
  id: TrackId;
  name: string;
  isPlaceholder?: boolean;
};

export default Track;
