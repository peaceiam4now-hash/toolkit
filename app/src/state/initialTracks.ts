// /workspaces/toolkit/app/src/state/initialTracks.ts

import type { Track } from "../types/Track";

export const initialTracks: Track[] = [
  {
    id: "drums",
    name: "Drums",
    color: "#f97316",
    isGroup: false,
    parentId: null,
    children: [],
    isMuted: false,
    isSolo: false,
    volumeDb: 0,
    pan: 0,
  },
  {
    id: "bass",
    name: "Bass",
    color: "#22c55e",
    isGroup: false,
    parentId: null,
    children: [],
    isMuted: false,
    isSolo: false,
    volumeDb: -3,
    pan: 0,
  },
  {
    id: "keys",
    name: "Keys",
    color: "#3b82f6",
    isGroup: false,
    parentId: null,
    children: [],
    isMuted: false,
    isSolo: false,
    volumeDb: -6,
    pan: 0.1,
  },
];
