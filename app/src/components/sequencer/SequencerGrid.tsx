// /src/components/sequencer/SequencerGrid.tsx
import type { SequencerPattern } from "../../types/SequencerTypes";

type Props = {
  pattern: SequencerPattern;
  onToggleStep: (laneId: string, stepIndex: number) => void;
};

export function SequencerGrid({ pattern, onToggleStep }: Props) {
  return (
    <div className="rounded-xl bg-slate-900/60 p-4 border border-slate-800 text-sm">
      <h2 className="text-xs uppercase tracking-wide text-slate-400 mb-2">
        Sequencer Grid
      </h2>

      <div className="space-y-3">
        {pattern.lanes.map((lane) => (
          <div key={lane.id}>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: lane.color }}
              />
              <span className="text-slate-200">{lane.name}</span>
            </div>

            <div className="grid grid-cols-16 gap-1">
              {lane.steps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => onToggleStep(lane.id, i)}
                  className={`h-6 rounded ${
                    step.value
                      ? "bg-indigo-500"
                      : "bg-slate-800 hover:bg-slate-700"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
