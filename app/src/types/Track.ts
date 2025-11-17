// src/types/Track.ts
export type TrackKind = "audio" | "instrument" | "group";

export interface Track {
  id: string;
  name: string;
  kind: TrackKind;
  color: string;
  isGroup: boolean;
  parentId?: string | null;
  children?: Track[];

  volumeDb: number; // dB
  pan: number;      // -1..1

  isMuted: boolean;
  isSolo: boolean;
  armed: boolean;
}
