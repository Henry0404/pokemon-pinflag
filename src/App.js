import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Pokedex from './pages/Pokedex';
import PokeGrid from './pages/PokeGrid';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LandingPage />}></Route>
          <Route exact path='/pokegrid' element={<PokeGrid />}></Route>
          <Route exact path='/pokedex/:id' element={<Pokedex />}></Route>
        </Routes>  
      </BrowserRouter>
    </>
  )
}

export default App