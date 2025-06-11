import React, { useEffect, useContext, useReducer, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameContainer from './components/pages/GameContainer';
import Homescreen from './components/pages/Homescreen/index';
import { GameContext, ActionType, GameContextReducer, DefaultGameState } from './application-context';



function App() {
    const [gameState, gameAction] = useReducer(
      GameContextReducer,
      DefaultGameState
    );
    return (
      <div className="App">
        <GameContext.Provider value={[gameState, gameAction]}>
          <Routes>
              <Route path="/" element={<Homescreen />}/>
              <Route path="/gamecontainer" element={<GameContainer />}/>
            </Routes>
        </GameContext.Provider>
      </div>
    );
}

export default App;
