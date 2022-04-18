import { useState } from 'react';
import './App.css';
import GameContainer from './components/pages/GameContainer';
// import HomeScreen from './components/pages/HomeScreen';

function App() {
    // const [clicked, setClicked] = useState(false);
    return (
      <div className="App">
        <GameContainer />
      </div>
    );
}

export default App;
