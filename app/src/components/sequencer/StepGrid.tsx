import type { SequencerPattern, SequencerLane } from "../../types/Sequencer";

type Props = {
  pattern: SequencerPattern;
  onToggleStep: (laneId: string, stepIndex: number) => void;
};

export function StepGrid({ pattern, onToggleStep }: Props) {
  return (
    <div style={{ display: "grid", gap: "16px" }}>
      {pattern.lanes.map((lane) => (
        <LaneRow key={lane.id} lane={lane} onToggleStep={onToggleStep} />
      ))}
    </div>
  );
}

function LaneRow({
  lane,
  onToggleStep
}: {
  lane: SequencerLane;
  onToggleStep: (laneId: string, stepIndex: number) => void;
}) {
  return (
    <div>
      <div style={{ fontWeight: 600 }}>{lane.label}</div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(16, 24px)", gap: "4px" }}>
        {lane.steps.map((on, i) => (
          <div
            key={i}
            onClick={() => onToggleStep(lane.id, i)}
            style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              cursor: "pointer",
              background: on ? "rgb(99,102,241)" : "rgb(229,231,235)",
              border: "1px solid rgb(156,163,175)"
            }}
          />
        ))}
      </div>
    </div>
  );
}
