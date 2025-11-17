// /workspaces/toolkit/app/src/state/initialPattern.ts
import type { SequencerPattern } from "../types/SequencerPattern";

function makeSteps(stepsPerBar: number, fn: (i: number) => boolean) {
  return Array.from({ length: stepsPerBar }, (_, i) => ({
    index: i,
    active: fn(i),
    velocity: 1.0,
  }));
}

export const initialPattern: SequencerPattern = {
  id: "pattern-1",
  name: "Main Pattern",
  stepsPerBar: 16,
  bars: 1,
  lanes: [
    {
      id: "lane-kick",
      name: "Kick",
      color: "#22c55e",
      trackId: "track-1",
      steps: makeSteps(16, (i) => i % 4 === 0),
    },
    {
      id: "lane-snare",
      name: "Snare",
      color: "#f97316",
      trackId: "track-1",
      steps: makeSteps(16, (i) => i % 8 === 4),
    },
    {
      id: "lane-hat",
      name: "Hat",
      color: "#e5e7eb",
      trackId: "track-1",
      steps: makeSteps(16, (i) => i % 2 === 0),
    },
  ],
};
