// src/contracts/trackMixer.ts
export interface TrackMixerContract {
  id: string;
  volumeDb: number; // -60..+6 typical operating range
  pan: number;      // -1..1
  isMuted: boolean;
  isSolo: boolean;
}
