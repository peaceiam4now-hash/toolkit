// sequencer state
const [pattern, setPattern] = useState<SequencerPattern>({
  id: "pattern-1",
  lanes: [
    {
      id: "lane-drums",
      name: "Drums",
      color: "#22c55e",
      trackId: "track-1",
      steps: Array(16).fill({ value: 0 })
    }
  ]
});

// toggle handler
const handleToggleStep = (laneId: string, idx: number) => {
  setPattern((prev) => ({
    ...prev,
    lanes: prev.lanes.map((lane) =>
      lane.id === laneId
        ? {
            ...lane,
            steps: lane.steps.map((s, i) =>
              i === idx ? { value: s.value ? 0 : 1 } : s
            ),
          }
        : lane
    )
  }));
};
