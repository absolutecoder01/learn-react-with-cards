import { useState } from 'react'
import { Card } from './components/Card/Card'
function App() {
  const testCard = {
    id: 'test-1',
    suit: 'hearts',
    rank: 'A',
    isFlipped: true,
    isMatched: false 
  }

  const handleCardClick = (id) => {
    console.log('Kliknięto kartę o ID:', id)
  }
  return (
    <>
      <section id="center">
        <div className="hand hhand">
          <Card
            card={testCard}
            onCardClick={handleCardClick}
          />
        </div>
      </section>
    </>
  )
}

export default App
