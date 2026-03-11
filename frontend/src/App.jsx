import './App.css'

import { Routes, Route } from "react-router-dom";


import LandingPage from "./pages/LandingPage"
import WorkStationPage from './pages/WorkStationPage';
import JournalPage from './pages/JournalPage';
import UserProfilePage from './pages/UserProfilePage';
import NoteTable from './pages/NoteTable';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/ws' element={<WorkStationPage />} />
      <Route path='/user' element={<UserProfilePage /> } />
      <Route path='/journal' element={<JournalPage /> } />
      <Route path='/addnote' element={<NoteTable />} />
    </Routes>
    </>
  )
}

export default App
