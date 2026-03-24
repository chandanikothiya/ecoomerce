import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Homepage from './container/Homepage/Homepage'
import './App.css'
import Authendication from './container/Authendication/Authendication'
import Contact from './container/Contact/Contact'
import UserRoutes from './Routes/UserRoutes'
import PrivateRoutes from './Routes/PrivateRoutes'
import AdminRoutes from './Routes/AdminRoutes'
import { Route, Routes } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Header/>
      <Homepage/> */}
      {/* <Authendication/> */}
      {/* <Contact/> */}
      {/* <Footer/> */}
      <Routes>
        <Route path='/*' element={<UserRoutes />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/admin/*' element={<AdminRoutes />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
