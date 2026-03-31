export function createDeck() {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades']
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
  const deck = []

  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({
        id: `${rank}-${suit}`,
        suit: suit,
        rank: rank,
        isFlipped: false,
        isMatched: false
      })
    }
  }

  return deck
}

export function shuffleDeck(deck) {
  const newDeck = [...deck]
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    const temp = newDeck[i]
    newDeck[i] = newDeck[j]
    newDeck[j] = temp
  }
  return newDeck
}

export function getCardImageSrc(card) {
  if (!card) {
    return "/cards/BLUE_BACK.svg"
  }

  const { suit, rank, isFlipped } = card

  if (isFlipped === false) {
    return "/cards/BLUE_BACK.svg"
  }

  const suitMap = {
    hearts: "H",
    diamonds: "D",
    clubs: "C",
    spades: "S"
  }

  const rankMap = {
    'J': 'J',
    'Q': 'Q',
    'K': 'K',
    'A': 'A'
  }

  const suitCode = suitMap[suit] || ''
  const rankCode = rankMap[rank] || rank
  const cardCode = rankCode + suitCode

  return `/cards/${cardCode}.svg`
}

export function getCardValue(rank) {
  const values = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 11, 'Q': 12, 'K': 13, 'A': 14
  }
  return values[rank] || 0
}

export function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function calculateRoundResult(userCard, computerCard){
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

export function dealCard(deck) {
  if (!deck || deck.length === 0) {
    return { card: null, remainingDeck: [] }
  }

  const [card, ...remainingDeck] = deck

  return {
    card: { ...card, isFlipped: true },
    remainingDeck
  }
}
