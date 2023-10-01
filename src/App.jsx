import { useState } from 'react'
import './App.css'
import Die from './Die'

function App() {

  const setAllNewDie = () =>
    Array.from({ length: 10 }, () => Math.floor(Math.random() * 6) + 1);

  const [allDie, setAllDie] = useState(setAllNewDie());
  function rollDice() {
    setAllDie(setAllNewDie())
  }

  return (
    <main>
      <div className='die-container'>
      {allDie.map((value, index) => (
                    <Die key={index} val={value} />
                    ))}
      </div>
      <button type='button' onClick={rollDice} className='roll-dice'>Roll</button>
    </main>
  )
}

export default App
