import { useState } from 'react'
import { Card } from './components/Card/Card'
function App() {
  const [userCard, setUserCard] = useState(null);
  const [userDeck, setUserDeck] = useState(null);
  const [userPoints, setUserPoints] = useState(0);
  const [computerCard, setComputerCard] = useState(null);
  const [computerDeck, setComputerDeck] = useState(null);
  const [computerPoints, setComputerPoints] = useState(0);
  const [result, setResult] = useState(null);

  function createDeck() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck = [];

    for (let suit of suits) {
      for (let rank of ranks) {
        deck.push({
          id: `${rank}-${suit}`,
          suit: suit,
          rank: rank,
          isFlipped: true,
          isMatched: false
        });
      }
    }

    return deck;
  }
  function getRandomCard(deck) {
    return deck[Math.floor(Math.random() * deck.length)];
  }

  function getCardValue(rank) {
    const values = {
      '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
      'J': 11, 'Q': 12, 'K': 13, 'A': 14
    };
    return values[rank] || 0;
  }

  function calculateRoundResult(userCard, computerCard, currentScores) {
    const userValue = getCardValue(userCard.rank);
    const computerValue = getCardValue(computerCard.rank);

    let newUserPoints = currentScores.user;
    let newComputerPoints = currentScores.computer;
    let message = '';

    if (userValue > computerValue) {
      newUserPoints += 1;
      message = 'Wygrałeś tę rundę!';
    } else if (computerValue > userValue) {
      newComputerPoints += 1;
      message = 'Komputer wygrał tę rundę.';
    } else {
      message = 'Remis!';
    }

    return {
      userPoints: newUserPoints,
      computerPoints: newComputerPoints,
      message: message
    };
  }

  const handleCardClick = (id) => {
    console.log('Kliknięto kartę o ID:', id)
  }

  function drawCards() {
    const deck = createDeck();
    const userCard = getRandomCard(deck);
    const computerCard = getRandomCard(deck);
    return { userCard, computerCard };
  }

  function beginRound() {
    const cards = drawCards();
    const scores = {
        user: userPoints,
        computer: computerPoints
    };

    setComputerCard(cards.computerCard);
    setUserCard(cards.userCard);
    const roundResult = calculateRoundResult(cards.userCard, cards.computerCard, scores)

    setComputerPoints(roundResult.computerPoints);
    setUserPoints(roundResult.userPoints);
    setResult(roundResult.message);
  }
  return (
    <>
      <section id="center">
        <div className="hand hhand">
          <Card
            card={userCard}
            onCardClick={handleCardClick}
          />
        </div>
        <div className="hand hhand">
          <Card
            card={computerCard}
            onCardClick={handleCardClick}
          />
        </div>
        <button
          onClick={beginRound}
        >
          Begin
        </button>
        <div className="scoreboard">
          <p>Twój wynik: {userPoints}</p>
          <p>Wynik komputera: {computerPoints}</p>
        </div>
        <p className="result-message">{result}</p>
      </section>
    </>
  )
}

export default App;
