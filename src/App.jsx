import { useState } from 'react'
import './App.css'
import Die from './Die'

function App() {


  function setAllNewDie() {
    const newDices = [];
    for (let i=0; i<10; i++){
      newDices.push({
        id: i+1,
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false
      })
    }
    return newDices
  }

  const [allDie, setAllDie] = useState(setAllNewDie());
  function rollDice() {
    setAllDie(setAllNewDie())
  }

  return (
    <main>
      <div className='die-container'>
      {allDie.map((die) => (
                    <Die key={die.id} val={die.value} />
                    ))}
      </div>
      <button type='button' onClick={rollDice} className='roll-dice'>Roll</button>
    </main>
  )
}

export default App
