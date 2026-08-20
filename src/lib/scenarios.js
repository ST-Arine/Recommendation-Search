// Scripted test task definitions.
// Each scenario is a "find the recommendation for X" task with a known correct answer.
// See architecture doc Section 7 (Open Decisions) — fill in the real scenario set
// before running sessions.

export const scenarios = [
  {
    id: 'scenario-1',
    prompt: 'A patient\'s recent lab results show their LDL cholesterol is above goal. Find the recommendation that addresses this.',
    correctRecommendationId: 'rec-1',
  },
  {
    id: 'scenario-2',
    prompt: 'Find the recommendation flagging that a patient hasn\'t been refilling a maintenance medication on schedule.',
    correctRecommendationId: 'rec-2',
  },
  {
    id: 'scenario-3',
    prompt: 'Find the recommendation for a patient who is overdue for a diabetes lab recheck.',
    correctRecommendationId: 'rec-3',
  },
]
