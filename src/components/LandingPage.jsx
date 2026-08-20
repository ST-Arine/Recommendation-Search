import { useState } from 'react'
import { advanceAbCounter, getAbAssignment } from '../lib/abAssignment'

function LandingPage({ onLaunch }) {
  const [assignment] = useState(() => getAbAssignment())

  function handleLaunch(arm) {
    advanceAbCounter()
    onLaunch(arm, assignment[arm])
  }

  return (
    <div className="landing-page">
      <h1>Welcome to our Recommendation Search research test</h1>
      <p>
        You'll be asked to find a specific recommendation using one of two search
        experiences. When you're done, pick whichever version you'd try again.
      </p>

      <div className="landing-actions">
        <button type="button" className="landing-button" onClick={() => handleLaunch('A')}>
          Search A
        </button>
        <button type="button" className="landing-button" onClick={() => handleLaunch('B')}>
          Search B
        </button>
      </div>
    </div>
  )
}

export default LandingPage
