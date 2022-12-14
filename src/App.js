import axios from 'axios';
import { useEffect, useState } from 'react';
import {BrowserRouter, Route, Routes, NavLink} from 'react-router-dom';
import './App.css';
import CharacterList from './Components/CharacterList';
import Character from './Components/Character';
import NotFound from './Components/NotFound';

function App() {

  return (
    <div className="bg-slate-800  mx-auto">
      <nav className='w-100 bg-rose-900 flex justify-around space-x-3 pt-5 pb-5 font-bold text-white'>
        <h1 className='text-xl'>Marvel Characters</h1>
      </nav>

        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={ <CharacterList /> }/>   
            <Route path="/character/:id" exact element={ <Character /> }/>   
            <Route path="*" exact element={ <NotFound /> }/>   
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
