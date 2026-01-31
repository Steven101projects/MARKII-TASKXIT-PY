import './App.css'

import { Routes, Route } from "react-router-dom";


import LandingPage from "./pages/LandingPage"
import WorkStationPage from './pages/WorkStationPage';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/ws' element={<WorkStationPage />} />
    </Routes>
    </>
  )
}

export default App
