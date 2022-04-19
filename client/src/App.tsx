import React from 'react';
import './App.css';
// import { tileGenerator } from './application-context';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameContainer from './components/pages/GameContainer';
import HomeScreen from './components/pages/HomeScreen';
// import HomeScreen from './components/pages/HomeScreen';



function App() {
    // console.log(tileGenerator());
    // const [clicked, setClicked] = useState(false);
    return (
      <div className="App">
        <Routes>
            <Route path="/" element={<HomeScreen />}/>
            <Route path="/gamecontainer" element={<GameContainer />}/>
          </Routes>
        {/* {<HomeScreen /> ? <HomeScreen /> : <GameContainer />}
        <HomeScreen /> 
        <GameContainer /> */}
      </div>
    );
}

export default App;
