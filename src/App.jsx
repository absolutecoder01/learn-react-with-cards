import { useState } from 'react'
import { getCardImageSrc } from './utils/cardHelpers'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div class="hand hhand">
          <img class='card' src={getCardImageSrc({ suit: 'hearts', rank: 'A', isFlipped: true })}/>
          <img class='card' src={getCardImageSrc({ suit: 'spades', rank: '10', isFlipped: true })}/>
          <img class='card' src={getCardImageSrc({ suit: 'hearts', rank: 'A', isFlipped: false })} />
          <img class='card' src='cards/JS.svg'/>
          <img class='card' src='cards/10S.svg'/>
          <img class='card' src='cards/9H.svg'/>
          <img class='card' src='cards/3H.svg' />
        </div>
      </section>
    </>
  )
}

export default App
