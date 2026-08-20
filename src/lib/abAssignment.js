// Randomly assigns which condition "Search A" / "Search B" launches for this
// session, so across many sessions on many devices the two conditions land
// under each label roughly equally often (no shared counter to coordinate).
// The mapping returned here is what ties a participant's "A" or "B" answer
// back to the actual legacy/condensed condition for analysis.

export function getAbAssignment() {
  return Math.random() < 0.5
    ? { A: 'legacy', B: 'condensed' }
    : { A: 'condensed', B: 'legacy' }
}
