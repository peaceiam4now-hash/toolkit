// src/state/initialPattern.ts
import type { SequencerPattern } from "../types/Sequencer";

export const STEPS_PER_BAR = 16;

export const initialPattern: SequencerPattern = {
  id: "pattern-1",
  name: "Main Pattern",
  bars: 1,
  stepsPerBar: STEPS_PER_BAR,
  lanes: [
    {
      id: "lane-kick",
      name: "Kick",
      color: "#f97316",
      steps: Array(STEPS_PER_BAR).fill(false),
    },
    {
      id: "lane-snare",
      name: "Snare",
      color: "#22c55e",
      steps: Array(STEPS_PER_BAR).fill(false),
    },
    {
      id: "lane-hat",
      name: "Hat",
      color: "#38bdf8",
      steps: Array(STEPS_PER_BAR).fill(false),
    },
  ],
};
