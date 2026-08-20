// Event tracking helpers.
// Buffers events in memory for a session, then computes the summary fields
// that map onto the `sessions` table columns (see architecture doc Section 4/5).
// Not wired to Supabase yet — endSession() returns the row payload instead of inserting it.

export function startSession({ participantId, condition, scenarioId }) {
  return {
    participantId,
    condition,
    scenarioId,
    startedAt: Date.now(),
    events: [],
  }
}

export function logEvent(session, type, data = {}) {
  session.events.push({ type, t: Date.now() - session.startedAt, ...data })
}

export function endSession(session, { correctRecommendationId, confidence, notes }) {
  const events = session.events
  const selectionEvents = events.filter((e) => e.type === 'selection_made')
  const lastSelection = selectionEvents[selectionEvents.length - 1]

  return {
    participant_id: session.participantId,
    condition: session.condition,
    scenario_id: session.scenarioId,
    correct_selection: lastSelection
      ? lastSelection.recommendation_id === correctRecommendationId
      : false,
    selected_recommendation_id: lastSelection?.recommendation_id ?? null,
    time_to_selection_sec: lastSelection ? lastSelection.t / 1000 : null,
    search_iterations: events.filter((e) => e.type === 'search_submit').length,
    filter_changes: events.filter((e) => e.type === 'filter_change').length,
    results_viewed_before_pick: events.filter((e) => e.type === 'result_viewed').length,
    changed_selection: events.some((e) => e.type === 'selection_changed'),
    confidence_1to5: confidence ?? null,
    raw_events: events,
    notes: notes ?? null,
  }
}
