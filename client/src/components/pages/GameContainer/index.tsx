import { useContext, useEffect, useState } from 'react';
import AnnouncerMessage from '../../atoms/AnnouncerMessage';
import OxygenSubmarine from '../../atoms/VisualAssets/OxygenSubmarine';
import DiceContainer from '../../molecules/DiceContainer';
import AnnouncerContainer from '../../organisms/AnnouncerContainer';
import './GameContainer.css'
import {
    ActionType,
    GameContext,
    GameContextReducer,
    DefaultGameState,
    oxygenTokenLocations
} from "../../../application-context";
import ScoreBoardContainer from '../../organisms/ScoreBoardContainer';
import EscapeButton from '../../molecules/EscapeButton';
import HelpButton from '../../molecules/HelpButton';
import OxygenMarker from '../../atoms/OxygenMarker';
import TileLayout from '../../organisms/TileLayout';
import PlayerTokens from '../../molecules/PlayerTokens';
import WhoGoesFirst from '../../molecules/WhoGoesFirst';
import TealOverlay from '../../atoms/TealOverlay';

const GameContainer = () => {
    const [appState, appAction] = useContext(GameContext);
    const [whoGoesFirstVisibility, setWhoGoesFirstVisibility] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setWhoGoesFirstVisibility(false)
        }, 1500)
        setTimeout(() => {
            setWhoGoesFirstVisibility(true)
        }, 4500)
    }, []);
    console.log(appState)
    return (
        <div className="game-container">
            <TileLayout />
            <PlayerTokens />
            <EscapeButton style={{position: 'absolute', top: '15px', right: '0px'}}/>
            <HelpButton style={{position: 'absolute', top: '15px', right: '50px'}}/>
            <OxygenSubmarine style={{position: 'absolute', top: '20px', left: '500px'}}/>
            <OxygenMarker style={{position: 'absolute', top: oxygenTokenLocations[appState.remainingOxygen].top, left: oxygenTokenLocations[appState.remainingOxygen].left}}/>
            <AnnouncerContainer dice={<DiceContainer />} announcerMessage={<AnnouncerMessage text={appState.currentStep}/>}/>
            <ScoreBoardContainer />
            <TealOverlay hidden={whoGoesFirstVisibility} />
            <WhoGoesFirst hidden={whoGoesFirstVisibility} /> 
        </div>
    )
}

export default GameContainer;