export function dealCard(deck) {
  if (!deck || deck.length === 0) {
    console.warn('⚠️ Próba dobrania karty z pustej talii!')
    return { card: null, remainingDeck: [] }
  }

  const newDeck = [...deck]
  const card = newDeck.shift() // shift - takes from the beginning of deck

  return {
    card: { ...card, isFlipped: true },
    remainingDeck: newDeck
  }
}
