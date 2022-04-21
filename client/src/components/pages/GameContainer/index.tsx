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
import EscapeButton from '../../molecules/EscapeButton';
import HelpButton from '../../molecules/HelpButton';
import OxygenMarker from '../../atoms/OxygenMarker';


const GameContainer = () => {
    const [appState, appAction] = useContext(GameContext);
    useEffect(()=> {
    }, [appState]);
    return (
        <div className="game-container">
            <EscapeButton style={{position: 'absolute', top: '15px', right: '0px'}}/>
            <HelpButton style={{position: 'absolute', top: '15px', right: '50px'}}/>
            <OxygenSubmarine style={{position: 'absolute', top: '20px', left: '500px'}}/>
            <OxygenMarker style={{position: 'absolute', top: '93px', left: '514px'}}/>
            <AnnouncerContainer dice={<DiceContainer diceOne={<DieOne />} diceTwo={<DieThree />}/>} announcerMessage={<AnnouncerMessage text={appState.currentStep}/>}/>
            <ScoreBoardContainer />
        </div>
    )
}

export default GameContainer;