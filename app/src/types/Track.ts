// src/types/Track.ts
// Canonical JSON contract for a single track's mixer state.

export type Track = {
  id: string;              // stable string id
  name: string;            // display name
  color: string;           // UI color token
  isGroup: boolean;        // folder / group track flag
  parentId?: string | null;

  // Mixer state (this is your "JSON contract" the AI can read/write)
  volumeDb: number;        // -60..+6 dB
  pan: number;             // -1 (L) .. 0 .. +1 (R)
  isMuted: boolean;
  isSolo: boolean;
  isArmed: boolean;
};
