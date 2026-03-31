import { useState, useEffect } from 'react'
import { Card } from './components/Card/Card'
import { Deck } from './components/Deck/Deck'
import { Scoreboard } from './components/Scoreboard/Scoreboard'
import { GameMessage } from './components/GameMessage/GameMessage'
import { createDeck, shuffleDeck, getCardValue } from './utils/cardHelpers'
import { dealCard } from './utils/dealCards'

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

  const calculateRoundResult = (userCard, computerCard) => {
    if (!userCard || !computerCard) {
      return { winner: 'tie', message: 'Error: no cards!' }
    }

    const userValue = getCardValue(userCard.rank)
    const computerValue = getCardValue(computerCard.rank)

    if (userValue > computerValue) {
      return { winner: 'user', message: 'You won the round.' }
    }
    else if (computerValue > userValue) {
      return { winner: 'computer', message: 'Computer won the round.' }
    }
    else {
      return { winner: 'tie', message: 'Tie!' }
    }
  }

  const handleUserDraw = () => {
    if (isAnimating || gameOver || userDeck.length === 0 || userCard) { return }
    setIsAnimating(true)
    setIsUserDrawing(true)

    const { card: newUserCard, remainingDeck: newUserDeck } = dealCard(userDeck)
    setUserCard(newUserCard)
    setUserDeck(newUserDeck)

    setTimeout(() => {
      setIsUserDrawing(false)
      setIsComputerDrawing(true)

      const { card: newComputerCard, remainingDeck: newComputerDeck } = dealCard(computerDeck)
      setComputerCard(newComputerCard)
      setComputerDeck(newComputerDeck)

      setTimeout(() => {
        setIsComputerDrawing(false)

        const roundResult = calculateRoundResult(newUserCard, newComputerCard)
        setResult(roundResult.message)

        setTimeout(() => {
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
        }, 1000)
      }, 600)
    }, 800)
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
        <Scoreboard
          userDeckLength={userDeck.length}
          computerDeckLength={computerDeck.length}
        />
      </div>

      <GameMessage
        result={result}
        gameOver={gameOver}
        onReset={handleReset}
      />

      <section className="game-area">
        <div className="player-area computer">
          <h3>Computer</h3>
          <Deck
            cardsCount={computerDeck.length}
            isClickable={false}
            onClick={null}
          />
          <div className="card-slot">
            {computerCard && (
              <Card
                card={computerCard}
                isAppearing={isComputerDrawing}
              />
            )}
          </div>
        </div>

        <div className="player-area user">
          <div className="card-slot">
            {userCard && (
              <Card
                card={userCard}
                isAppearing={isUserDrawing}
              />
            )}
          </div>
          <Deck
            cardsCount={userDeck.length}
            isClickable={!isAnimating && !gameOver && !userCard && userDeck.length > 0}
            onClick={handleUserDraw}
          />
          <h3>You</h3>
        </div>
      </section>
    </div>
  )
}

export default App
