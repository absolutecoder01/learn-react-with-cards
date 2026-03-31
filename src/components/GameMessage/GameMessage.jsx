import './GameMessage.css'

export function GameMessage({ result, gameOver, onReset }) {
  if (!result && !gameOver) return null

  return (
    <div className={`game-message ${gameOver ? 'game-over' : ''}`}>
      <p className="message-text">{gameOver ? 'Game over!' : result}</p>
      {gameOver && (
        <button className="reset-button" onClick={onReset}>
          New Game
        </button>
      )}
    </div>
  )
}
