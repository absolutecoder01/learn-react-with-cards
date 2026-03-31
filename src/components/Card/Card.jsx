import { getCardImageSrc } from "../../utils/cardHelpers";

export function Card({ card, onCardClick }) {
  if (!card) {
    return (
      <div style={{
        width: '100px',
        height: '140px',
        border: '2px dashed red',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffe6e6'
      }}>
        NO CARD (null)
      </div>
    );
  }

  const imageSrc = getCardImageSrc(card);

  const handleClick = () => {
    if (typeof onCardClick === 'function') {
      onCardClick(card.id);
    }
  };

  return (
    <div style={{ width: '100px', height: '140px' }}>
      <img
        src={imageSrc}
        alt={`Karta ${card.rank} ${card.suit}`}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        onClick={handleClick}
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.parentNode.innerHTML = `
            <div style="
              width: 100%;
              height: 100%;
              border: 2px solid orange;
              background: #fff3cd;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              text-align: center;
            ">
              BŁĄD ŁADOWANIA<br/>
              Rank: ${card.rank}<br/>
              Suit: ${card.suit}<br/>
              Src: ${imageSrc}
            </div>
          `;
        }}
      />
    </div>
  );
}
