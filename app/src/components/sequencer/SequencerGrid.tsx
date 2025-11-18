// /workspaces/toolkit/app/src/components/sequencer/SequencerGrid.tsx
import type { SequencerPattern, SequencerLane } from "../../types/Sequencer";
import { StepSequencer } from "./StepSequencer";

type Props = {
  pattern: SequencerPattern;
  onToggleStep: (laneId: string, stepIndex: number) => void;
};

export function SequencerGrid({ pattern, onToggleStep }: Props) {
  const { lanes, stepsPerBar } = pattern;

  if (!lanes.length) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-4 text-sm text-slate-400">
        No sequencer lanes yet. Add lanes to drive the Lunar Studios engine.
      </div>
    );
  }

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 space-y-2">
      <header className="flex items-baseline justify-between mb-1">
        <h2 className="text-xs uppercase tracking-wide text-slate-400">Sequencer Grid</h2>
        <span className="text-[10px] text-slate-500">
          {stepsPerBar} steps • click to toggle
        </span>
      </header>

      {lanes.map((lane: SequencerLane) => (
        <StepSequencer
          key={lane.id}
          lane={lane}
          stepsPerBar={stepsPerBar}
          onToggleStep={onToggleStep}
        />
      ))}
    </section>
  );
}