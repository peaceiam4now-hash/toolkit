// /workspaces/toolkit/app/src/components/sequencer/StepGrid.tsx
import type { SequencerLane } from "../../types/Sequencer";

type Props = {
  lane: SequencerLane;
  stepsPerBar: number;
  onToggleStep: (laneId: string, stepIndex: number) => void;
};

/**
 * StepGrid renders the clickable step buttons for a single lane.
 * Each step is toggle-able (on/off) and reflects active state visually.
 */
export function StepGrid({ lane, stepsPerBar, onToggleStep }: Props) {
  return (
    <div className="flex items-center space-x-2">
      {/* Lane label */}
      <span className="w-16 text-xs text-slate-400">{lane.label}</span>

      {/* Step buttons */}
      <div className="flex space-x-1">
        {Array.from({ length: stepsPerBar }).map((_, idx) => {
          const isActive = lane.steps[idx];
          return (
            <button
              key={idx}
              onClick={() => onToggleStep(lane.id, idx)}
              className={`w-6 h-6 rounded-sm border ${
                isActive
                  ? "bg-indigo-500 border-indigo-400"
                  : "bg-slate-800 border-slate-700"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}