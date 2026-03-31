import './Card.css'
import { getCardImageSrc } from "../../utils/cardHelpers";

export function Card({ card, onCardClick, isAppearing = false }) {
  if (!card) {
    return <div className="card-placeholder"></div>;
  }

  const imageSrc = getCardImageSrc(card);

  return (
    <div className="card-container">
      <img
        src={imageSrc}
        alt={`Card ${card.rank} ${card.suit}`}
        className={`card ${isAppearing ? 'appearing' : ''} ${!card.isFlipped ? 'back' : 'front'}`}
        onClick={() => onCardClick?.(card.id)}
        onError={(e) => {
          console.error('Failed to load card image:', imageSrc);
          e.target.src = '/cards/BLUE_BACK.svg';
        }}
      />
    </div>
  );
}
