// /workspaces/toolkit/app/src/types/Track.ts

export type TrackKind = "audio" | "instrument" | "group";

export interface Track {
  id: string;              // stable unique id
  name: string;            // UI label
  kind: TrackKind;         // audio / instrument / group
  color: string;           // hex color for UI
  isGroup: boolean;        // true for bus/group tracks
  parentId?: string | null;
  children?: Track[];      // optional nested tracks

  // Mixer parameters
  volumeDb: number;        // fader value in dB
  pan: number;             // -1..1 (L..R)

  // States
  isMuted: boolean;        // mute state
  isSolo: boolean;         // solo state
  armed: boolean;          // record-arm (future use)
}
