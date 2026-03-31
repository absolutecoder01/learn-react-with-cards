
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

// Converts card object to its image path
export function getCardImageSrc(card) {
  if (!card) {
    return "cards/BLUE_BACK.svg";
  }

  const { suit, rank, isFlipped } = card;

  if (isFlipped === false) {
    return "cards/BLUE_BACK.svg";
  }

  const suitCode = suitMap[suit] || '';
  const rankCode = rankMap[rank] || rank;
  const cardCode = rankCode + suitCode;

  return `cards/${cardCode}.svg`;
}

function getCardValue(rank) {
  const values = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 11, 'Q': 12, 'K': 13, 'A': 14
  };
  return values[rank] || 0;
}
