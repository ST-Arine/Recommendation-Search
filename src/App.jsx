import { useRef, useState } from 'react'
import LandingPage from './components/LandingPage'
import SearchModal from './components/SearchModal'
import SessionSummary from './components/SessionSummary'
import { mockRecommendations, categories } from './lib/mockData'
import { startSession, logEvent, endSession } from './lib/analytics'
import './App.css'

function App() {
  const [arm, setArm] = useState(null)
  const [condition, setCondition] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [taskDone, setTaskDone] = useState(false)
  const sessionRef = useRef(null)

  const selectedRecommendation = mockRecommendations.find((r) => r.id === selectedId) ?? null

  function handleLaunch(selectedArm, mappedCondition) {
    setArm(selectedArm)
    setCondition(mappedCondition)
    sessionRef.current = startSession({
      participantId: null,
      condition: mappedCondition,
      scenarioId: null,
    })
    logEvent(sessionRef.current, 'modal_open')
  }

  function handleSelect(id) {
    setSelectedId(id)
    if (sessionRef.current && id) {
      logEvent(sessionRef.current, 'selection_made', { recommendation_id: id })
    }
  }

  function handleClose() {
    if (sessionRef.current) {
      logEvent(sessionRef.current, 'abandoned')
      const record = endSession(sessionRef.current, { abandoned: true })
      // TODO: insert into Supabase `sessions` table once wired up (see Section 4/5
      // of the architecture doc). Logged for now so abandon behavior is visible.
      console.log('[session] abandoned', record)
      sessionRef.current = null
    }
    handleRestart()
  }

  function handleRestart() {
    setArm(null)
    setCondition(null)
    setSelectedId(null)
    setTaskDone(false)
  }

  if (!arm) {
    return <LandingPage onLaunch={handleLaunch} />
  }

  return (
    <div className="app-shell">
      <header>
        <h1>Recommendation Search</h1>
        <p>You're using Search {arm}.</p>
      </header>

      {!taskDone && (
        <div className="modal-scrim">
          <SearchModal
            recommendations={mockRecommendations}
            categories={categories}
            condition={condition}
            selectedId={selectedId}
            onSelect={handleSelect}
            onFinish={() => setTaskDone(true)}
            onClose={handleClose}
          />
        </div>
      )}

      {taskDone && (
        <SessionSummary
          selectedRecommendation={selectedRecommendation}
          arm={arm}
          condition={condition}
          onSubmit={handleRestart}
        />
      )}
    </div>
  )
}

export default App
