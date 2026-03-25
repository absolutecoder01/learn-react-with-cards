
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
export function getCardImageSrc({ suit, rank, isFlipped }) {
  if (isFlipped === false) { return "cards/BLUE_BACK.svg" }

  const suitCode = suitMap[suit] || '';
  const rankCode = rankMap[rank] || rank;
  const cardCode = rankCode + suitCode;

  return `cards/${cardCode}.svg`
}
