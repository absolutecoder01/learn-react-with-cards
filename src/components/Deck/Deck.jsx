import './Deck.css'

export function Deck({ cardsCount, isClickable, onClick }) {
  return (
    <div
      className={`deck ${isClickable ? 'clickable' : ''}`}
      onClick={isClickable ? onClick : null}
      >
      {cardsCount > 0 ? (
        <>
          <div className="deck-card"></div>
          <div className="deck-card-offset"></div>
          <div className="deck-card-offset-2"></div>
          <div className="deck-count">{cardsCount}</div>
        </>
      ) : (
        <div className="deck-empty">Empty</div>
      )}
    </div>
  )
}
