// /workspaces/toolkit/app/src/components/sequencer/StepSequencer.tsx
import type {
  SequencerPattern,
  SequencerLaneId,
} from "../../types/Sequencer";

type Props = {
  pattern: SequencerPattern;
  onToggleStep: (laneId: SequencerLaneId, stepIndex: number) => void;
};

export function StepSequencer({ pattern, onToggleStep }: Props) {
  const totalSteps = pattern.stepsPerBar * pattern.bars;

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <header className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Step Sequencer
          </h2>
          <p className="text-xs text-slate-500">
            {pattern.bars} bar • {pattern.stepsPerBar} steps
          </p>
        </div>
      </header>

      <div className="space-y-2">
        {pattern.lanes.map((lane) => (
          <div
            key={lane.id}
            className="flex items-center gap-2"
          >
            {/* Lane label */}
            <div className="w-20 flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: lane.color }}
              />
              <span className="text-xs text-slate-200">{lane.label}</span>
            </div>

            {/* Step grid */}
            <div className="flex flex-1 gap-1">
              {Array.from({ length: totalSteps }).map((_, stepIndex) => {
                const active =
                  pattern.grid[lane.id]?.[stepIndex] ?? false;

                const isBarBoundary =
                  (stepIndex + 1) % pattern.stepsPerBar === 0 &&
                  stepIndex !== totalSteps - 1;

                return (
                  <button
                    key={stepIndex}
                    type="button"
                    onClick={() => onToggleStep(lane.id, stepIndex)}
                    className={[
                      "flex-1 h-7 rounded-md border text-[10px] font-medium transition-all",
                      active
                        ? "bg-indigo-500/90 border-indigo-300 shadow-[0_0_0_1px_rgba(129,140,248,0.6)]"
                        : "bg-slate-900/60 border-slate-700/80 hover:bg-slate-800",
                    ].join(" ")}
                    style={{
                      boxShadow: isBarBoundary
                        ? "inset -2px 0 0 0 rgba(148,163,184,0.4)"
                        : undefined,
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
