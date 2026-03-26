import { getCardImageSrc } from "../../utils/cardHelpers";

export function Card({ card, onCardClick }) {

  return (
    <>
      <img
        src={getCardImageSrc(card)}
        className="card"
        onClick={() => onCardClick(card.id)}
      />
    </>
  );
}
