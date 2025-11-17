// /workspaces/toolkit/app/src/components/sequencer/StepSequencer.tsx
import type {
  SequencerPattern,
  SequencerLaneId,
} from "../../types/Sequencer";
import { SequencerGrid } from "./SequencerGrid";

type Props = {
  pattern: SequencerPattern;
  onToggleStep: (laneId: SequencerLaneId, stepIndex: number) => void;
};

export function StepSequencer({ pattern, onToggleStep }: Props) {
  return <SequencerGrid pattern={pattern} onToggleStep={onToggleStep} />;
}
