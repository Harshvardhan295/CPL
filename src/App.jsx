import { useState } from 'react'
import Navbar from './components/Navbar'
import Screen from './pages/Screen' 
import Squares from './components/Squares'
import Auction from './pages/auction'
function App() {

  return (
    <>
      <Navbar />  
      
      <Auction />
    </>
  )
}

export default App
