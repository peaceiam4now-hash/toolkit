// /workspaces/toolkit/app/src/state/initialTracks.ts
import type { Track } from "../types/Track";

export const initialTracks: Track[] = [
  {
    id: "track-1",
    name: "Drums",
    kind: "group",          // valid for a bus/group
    color: "#22c55e",
    isGroup: true,
    parentId: null,
    children: [],
    volumeDb: -6,
    pan: 0,
    isMuted: false,
    isSolo: false,
    armed: false,
  },
  {
    id: "track-2",
    name: "Bass",
    kind: "audio",
    color: "#0ea5e9",
    isGroup: false,
    parentId: "track-1",     // subordinate to group
    children: [],
    volumeDb: -8,
    pan: 0,
    isMuted: false,
    isSolo: false,
    armed: false,
  },
  {
    id: "track-3",
    name: "Lead",
    kind: "instrument",
    color: "#a855f7",
    isGroup: false,
    parentId: null,
    children: [],
    volumeDb: -10,
    pan: 0,
    isMuted: false,
    isSolo: false,
    armed: false,
  },
];
