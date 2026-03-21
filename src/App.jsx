import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Homepage from './container/Homepage/Homepage'
import './App.css'
import Authendication from './container/Authendication/Authendication'
import Cart from './container/Cart/Cart'
import Contact from './container/Contact/Contact'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      {/* <Homepage/> */}
      <Authendication/>
      {/* <Cart/> */}
      {/* <Contact/> */}
      <Footer/>
    </>
  )
}

export default App
