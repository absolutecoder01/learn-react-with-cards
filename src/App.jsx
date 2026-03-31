import { useState, useEffect } from 'react'
import { Card } from './components/Card/Card'
import { createDeck, shuffleDeck, wait, calculateRoundResult, dealCard } from './utils/cardHelpers'
import './index.css'

function App() {
  const [userDeck, setUserDeck] = useState([])
  const [computerDeck, setComputerDeck] = useState([])
  const [userCard, setUserCard] = useState(null)
  const [computerCard, setComputerCard] = useState(null)
  const [result, setResult] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [gameInitialized, setGameInitialized] = useState(false)
  const [isUserDrawing, setIsUserDrawing] = useState(false)
  const [isComputerDrawing, setIsComputerDrawing] = useState(false)

  const initGame = () => {
    const deck = shuffleDeck(createDeck())
    const midPoint = Math.floor(deck.length / 2)

    setUserDeck(deck.slice(0, midPoint))
    setComputerDeck(deck.slice(midPoint))
    setUserCard(null)
    setComputerCard(null)
    setResult(null)
    setGameOver(false)
    setGameInitialized(true)
  }

  useEffect(() => {
    if (!gameInitialized) {
      initGame()
    }
  }, [])

  const handleUserDraw = async () => {
    if (isAnimating || gameOver || userDeck.length === 0 || userCard) { return }
    setIsAnimating(true)
    setIsUserDrawing(true)

    const { card: newUserCard, remainingDeck: newUserDeck } = dealCard(userDeck)
    setUserCard(newUserCard)
    setUserDeck(newUserDeck)

    await wait(800)
    setIsUserDrawing(false)
    setIsComputerDrawing(true)

    const { card: newComputerCard, remainingDeck: newComputerDeck } = dealCard(computerDeck)
    setComputerCard(newComputerCard)
    setComputerDeck(newComputerDeck)

    await wait(600)
    setIsComputerDrawing(false)

    const roundResult = calculateRoundResult(newUserCard, newComputerCard)
    setResult(roundResult.message)

    await wait(1000)
    let finalUserDeck = newUserDeck
    let finalComputerDeck = newComputerDeck

    if (roundResult.winner === 'user') {
      finalUserDeck = [...newUserDeck, newUserCard, newComputerCard]
    } else if (roundResult.winner === 'computer') {
      finalComputerDeck = [...newComputerDeck, newUserCard, newComputerCard]
    } else {
      finalUserDeck = [...newUserDeck, newUserCard]
      finalComputerDeck = [...newComputerDeck, newComputerCard]
    }

    setUserDeck(finalUserDeck)
    setComputerDeck(finalComputerDeck)

    if (finalUserDeck.length === 0 && finalComputerDeck.length > 0) {
      setResult('Game over! Computer won.')
      setGameOver(true)
    } else if (finalComputerDeck.length === 0 && finalUserDeck.length > 0) {
      setResult('Game over! You won.')
      setGameOver(true)
    } else if (finalUserDeck.length === 0 && finalComputerDeck.length === 0) {
      setResult('Game over! Tie!')
      setGameOver(true)
    }

    setUserCard(null)
    setComputerCard(null)
    setIsAnimating(false)
  }

  const handleReset = () => {
    setGameOver(false)
    setResult(null)
    initGame()
  }

  return (
    <div className="game-container">
      <div className="poker-table"></div>

      <div className="top-bar">
        <div className="scoreboard">
          <div className="score user">
            <span className="score-label">Player</span>
            <span className="score-value">{userDeck.length}</span>
            <span className="score-sublabel">cards</span>
          </div>
          <div className="score-divider">VS</div>
          <div className="score computer">
            <span className="score-label">Computer</span>
            <span className="score-value">{computerDeck.length}</span>
            <span className="score-sublabel">cards</span>
          </div>
        </div>
        {gameInitialized && (
          <button className="new-game-button" onClick={handleReset}>
            🔄 New Game
          </button>
        )}
      </div>

      <div className={`game-message ${gameOver ? 'game-over' : ''}`}>
        {result && <p className="message-text">{gameOver ? 'Game Over!' : result}</p>}
        {gameOver && (
          <button className="reset-button" onClick={handleReset}>
            🔄 New Game
          </button>
        )}
      </div>

      <section className="game-area">
        <div className="player-area computer">
          <h3>Computer</h3>
          <div className="deck">
            {computerDeck.length > 0 ? (
              <>
                <div className="deck-card"></div>
                <div className="deck-card-offset"></div>
                <div className="deck-card-offset-2"></div>
                <div className="deck-count">{computerDeck.length}</div>
              </>
            ) : (
              <div className="deck-empty">Empty</div>
            )}
          </div>
          <div className="card-slot">
            {computerCard && <Card card={computerCard} isAppearing={isComputerDrawing} />}
          </div>
        </div>

        <div className="player-area user">
          <div className="card-slot">
            {userCard && <Card card={userCard} isAppearing={isUserDrawing} />}
          </div>
          <div
            className={`deck ${!isAnimating && !gameOver && !userCard && userDeck.length > 0 ? 'clickable' : ''}`}
            onClick={!isAnimating && !gameOver && !userCard && userDeck.length > 0 ? handleUserDraw : null}
          >
            {userDeck.length > 0 ? (
              <>
                <div className="deck-card"></div>
                <div className="deck-card-offset"></div>
                <div className="deck-card-offset-2"></div>
                <div className="deck-count">{userDeck.length}</div>
              </>
            ) : (
              <div className="deck-empty">Empty</div>
            )}
          </div>
          <h3>You</h3>
        </div>
      </section>
    </div>
  )
}

export default App
