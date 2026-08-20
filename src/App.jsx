import { useState } from 'react'
import LandingPage from './components/LandingPage'
import SearchModal from './components/SearchModal'
import SessionSummary from './components/SessionSummary'
import { mockRecommendations, categories } from './lib/mockData'
import './App.css'

function App() {
  const [arm, setArm] = useState(null)
  const [condition, setCondition] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [taskDone, setTaskDone] = useState(false)

  const selectedRecommendation = mockRecommendations.find((r) => r.id === selectedId) ?? null

  function handleLaunch(selectedArm, mappedCondition) {
    setArm(selectedArm)
    setCondition(mappedCondition)
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
        <SearchModal
          recommendations={mockRecommendations}
          categories={categories}
          condition={condition}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onFinish={() => setTaskDone(true)}
        />
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
