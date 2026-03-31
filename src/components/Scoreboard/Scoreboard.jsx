import './Scoreboard.css'

export function Scoreboard({ userDeckLength, computerDeckLength }) {
  return (
    <div className="scoreboard">
      <div className="score user">
        <span className="score-label">Player</span>
        <span className="score-value">{userDeckLength}</span>
        <span className="score-sublabel">cards</span>
      </div>
      <div className="score-divider">VS</div>
      <div className="score computer">
        <span className="score-label">Computer</span>
        <span className="score-value">{computerDeckLength}</span>
        <span className="score-sublabel">cards</span>
      </div>
    </div>
  )
}
