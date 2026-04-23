import './App.css'

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoutes';

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


      <Route element={<ProtectedRoute />}>
      <Route path='/ws' element={<WorkStationPage />} />
      <Route path='/user' element={<UserProfilePage /> } />
      <Route path='/journal' element={<JournalPage /> } />
      <Route path='/addnote' element={<NoteTable />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
