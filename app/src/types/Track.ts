// /workspaces/toolkit/app/src/types/Track.ts

export type TrackKind = "audio" | "instrument" | "group";

export interface Track {
  id: string;
  name: string;
  kind: TrackKind;

  color: string;     // Hex color (#rrggbb)
  isGroup: boolean;

  parentId?: string | null;
  children?: Track[];     // recursive

  volumeDb: number;   // -60 .. +6 dB
  pan: number;        // -1 .. 1

  isMuted: boolean;
  isSolo: boolean;
  armed: boolean;
}
