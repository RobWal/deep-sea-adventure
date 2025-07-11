import React, { useEffect, useContext, useReducer, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, HashRouter } from "react-router";
import GameContainer from './components/pages/GameContainer';
import HomeScreen from './components/pages/HomeScreen';
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
              <Route path="/" element={<HomeScreen />}/>
              <Route path="/gamecontainer" element={<GameContainer />}/>
            </Routes>
        </GameContext.Provider>
      </div>
    );
}

export default App;
