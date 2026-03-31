import './Card.css'
import { getCardImageSrc } from "../../utils/cardHelpers";

export function Card({ card, onCardClick, isAppearing = false }) {
  if (!card) {
    return <div className="card-placeholder"></div>;
  }

  const imageSrc = getCardImageSrc(card);

  const handleClick = () => {
    if (typeof onCardClick === 'function') {
      onCardClick(card.id);
    }
  };

  return (
    <div className="card-container">
      <img
        src={imageSrc}
        alt={`Karta ${card.rank} ${card.suit}`}
        className={`card ${isAppearing ? 'appearing' : ''} ${!card.isFlipped ? 'back' : 'front'}`}
        onClick={handleClick}
        onError={(e) => {
          console.error('Failed to load card image:', imageSrc);
          e.target.src = '/cards/BLUE_BACK.svg';
        }}
      />
    </div>
  );
}
