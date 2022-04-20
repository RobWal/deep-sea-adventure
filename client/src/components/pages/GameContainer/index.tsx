import { useContext, useEffect } from 'react';
// Reducer, useReducer,
import AnnouncerMessage from '../../atoms/AnnouncerMessage';
import DieOne from '../../atoms/VisualAssets/DieOne';
import DieThree from '../../atoms/VisualAssets/DieThree';
import OxygenSubmarine from '../../atoms/VisualAssets/OxygenSubmarine';
import DiceContainer from '../../molecules/DiceContainer';
import AnnouncerContainer from '../../organisms/AnnouncerContainer';
import './GameContainer.css'
import {
    ActionType,
    GameContext,
    GameContextReducer,
    DefaultGameState,
} from "../../../application-context";
import H1 from '../../atoms/H1';
import ScoreBoardContainer from '../../organisms/ScoreBoardContainer';


const GameContainer = () => {
    const [appState, appAction] = useContext(GameContext);
    let scoreBoard = '';
    useEffect(()=> {
        appState.players.forEach((player)=> console.log(player.name))
        console.log(appState)
    }, [appState]);
    return (
        <div className="game-container">
            <OxygenSubmarine style={{position: 'absolute', top: '20px', left: '500px'}}/>
            <AnnouncerContainer dice={<DiceContainer diceOne={<DieOne />} diceTwo={<DieThree />}/>} announcerMessage={<AnnouncerMessage text={appState.currentStep}/>}/>
            <ScoreBoardContainer />
        </div>
    )
}

export default GameContainer;