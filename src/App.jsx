import { useState } from 'react'
import { nanoid } from 'nanoid';
import './App.css'
import Die from './Die'

function App() {

  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 6) + 1)
  const [rolls, setRolls] = useState(0)
  const [bestScore, setBestScore] = useState('')



  function setAllNewDie() {
    const newDices = [];
    for (let i=0; i<10; i++){
      newDices.push({
        id: nanoid(),
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false
      })
    }
    return newDices
  }

  const [allDie, setAllDie] = useState(setAllNewDie());
  function rollDice() {
    setRolls(roll => roll+1)
    setAllDie(prev => prev.map((die) => {
      const newDie = die.isHeld === true ? die : {...die, value: Math.floor(Math.random() * 6) + 1}
      return newDie
    }))
  }

  function holdDice(id) {
    setAllDie(prev => prev.map((die) => {
      const newDie = die.id === id ? {...die, isHeld: !die.isHeld} : die
      return newDie
    }))
  }
  function checkBestScore() {
    for (let i=0; i<10; i++) {
      const check = 0
      if (allDie[i].isHeld && allDie[i] === targetNumber){
        check += 1
      }
    if (check === 10) {
      setBestScore((score) => {
        const bestScore = score === '' ? rolls : (score > rolls ? rolls : score)
      return bestScore
    })
      setTargetNumber(Math.floor(Math.random() * 6) + 1)
      setAllDie(setAllNewDie())
    }
    }
  }

  checkBestScore()

  const diceElements = allDie.map((die) => (
    <Die key={die.id} id={die.id} val={die.value} isHeld={die.isHeld} onClick={() => holdDice(die.id)}/>
    ))
 

  return (
    <main>
      <div>How many times do you have to roll to get all numbers as {targetNumber}</div>
      <div className='scores'>
        <span className='score'> Rolls: {rolls}</span>
        <span className='best-score'> Bestscore: {bestScore} </span>
      </div>
      <div className='die-container'>
      {diceElements}
      </div>
      <button type='button' onClick={rollDice} className='roll-dice'>Roll</button>
    </main>
  )
}

export default App
