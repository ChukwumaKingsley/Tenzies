import { useState } from 'react'
import './App.css'
import Die from './Die'

function App() {

  return (
    <main>
      <div className='die-container'>
          <Die val={1} />
          <Die val={1} />
          <Die val={1} />
          <Die val={1} />
          <Die val={1} />
          <Die val={1} />
          <Die val={1} />
          <Die val={1} />
          <Die val={1} />
          <Die val={1} />
      </div>
    </main>
  )
}

export default App
