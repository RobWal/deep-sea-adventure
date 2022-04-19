import React, { useEffect, useContext, useReducer, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameContainer from './components/pages/GameContainer';
import HomeScreen from './components/pages/HomeScreen';
import { GameContext, ActionType, GameContextReducer, DefaultGameState } from './application-context';



function App() {
    const [gameState, gameAction] = useReducer(
      GameContextReducer,
      DefaultGameState
    );
    console.log('DefaultGameState in App.tsx');
    console.log(DefaultGameState);
    // useEffect(()=> {
    //   appAction({
    //     type: ActionType.START_GAME,
    //     payload: {
    //       userName: userName,
    //       totalPlayers: totalPlayers,
    //     }
    //   })
    // }, []);
    return (
      <div className="App">
        <GameContext.Provider value={[gameState, gameAction]}>
          <Routes>
              <Route path="/" element={<HomeScreen />}/>
              <Route path="/gamecontainer" element={<GameContainer />}/>
            </Routes>
          {/* {<HomeScreen /> ? <HomeScreen /> : <GameContainer />}
          <HomeScreen /> 
          <GameContainer /> */}
        </GameContext.Provider>
      </div>
    );
}

export default App;
