// /workspaces/toolkit/app/src/components/sequencer/StepSequencer.tsx
import type { SequencerLane } from "../../types/Sequencer";

type Props = {
  lane: SequencerLane;
  stepsPerBar: number;
  onToggleStep: (laneId: string, stepIndex: number) => void;
};

/**
 * Renders one row of the step grid for a single lane.
 */
export function StepSequencer({ lane, stepsPerBar, onToggleStep }: Props) {
  // Normalise to exactly stepsPerBar steps
  const steps = Array.from({ length: stepsPerBar }, (_, i) => lane.steps[i] ?? false);

  return (
    <div className="flex items-center gap-3 mb-1">
      <div className="w-16 text-xs text-slate-300 select-none">{lane.label}</div>
      <div className="flex gap-1">
        {steps.map((isOn, index) => (
          <button
            key={index}
            onClick={() => onToggleStep(lane.id, index)}
            className={[
              "w-5 h-5 rounded-sm border",
              "transition-colors duration-75",
              isOn
                ? "bg-emerald-400 border-emerald-300"
                : "bg-slate-900 border-slate-700 hover:border-slate-400",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}
