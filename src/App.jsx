import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid';
import './App.css'
import Die from './Die'
import Confetti from 'react-confetti'

function App() {

  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 6) + 1)
  const [rolls, setRolls] = useState(0)
  const [dice, setDice] = useState(newDice());
  const [bestScore, setBestScore] = useState('')
  const [tenzies, setTenzies] = useState(false)


  useEffect(
    function checkBestScore() {
      const winCondition = dice.every(die => die.isHeld === true && die.value === targetNumber)
      if (winCondition) {
        setTenzies(true)
        setBestScore((score) => {
          const bestScore = score === '' ? rolls : (score > rolls ? rolls : score)
        return bestScore
      })
      }}, [dice])



  function newDice() {
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


  function rollDice() {
    if (tenzies) {
      setTenzies(false)
      setDice(newDice())
      setRolls(0)
      setTargetNumber(Math.floor(Math.random() * 6) + 1)
    } else {
      setRolls(roll => roll+1)
      setDice(prev => prev.map((die) => {
        const newDie = die.isHeld === true ? die : {...die, value: Math.floor(Math.random() * 6) + 1}
        return newDie
      }))
    }
  }

  function holdDice(id) {
    setDice(prev => prev.map((die) => {
      const newDie = die.id === id ? {...die, isHeld: !die.isHeld} : die
      return newDie
    }))
  }

  
  const diceElements = dice.map((die) => (
    <Die key={die.id} id={die.id} val={die.value} isHeld={die.isHeld} onClick={() => holdDice(die.id)}/>
    ))
 

  return (
    <main>
      <h2>Tenzies</h2>
      <div>Roll until all dice are <b>{targetNumber}</b>. Click a die to freeze it at its current value between rools.</div>
      <div className='scores'>
        <span className='score'> Rolls: {rolls}</span>
        <span className='best-score'> Bestscore: {bestScore} </span>
      </div>
      <div className='die-container'>
      {diceElements}
      </div>
      <button type='button' onClick={rollDice} className='roll-dice'>{tenzies === true ? "Reset" : "Roll"}</button>
      {tenzies && <Confetti />}
    </main>
  )
}

export default App
