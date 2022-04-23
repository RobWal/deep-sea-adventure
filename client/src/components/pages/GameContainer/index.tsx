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
import RollTheDiceContainer from '../../molecules/RollTheDiceContainer';

const GameContainer = () => {
    const [appState, appAction] = useContext(GameContext);
    const [whoGoesFirstVisibility, setWhoGoesFirstVisibility] = useState(true)
    const [announcerInnerText, setAnnouncerInnerText] = useState("")
    useEffect(() => {
        console.log(appState)
        if(appState.currentStep === 'preStart'){
            setTimeout(() => {
                setWhoGoesFirstVisibility(false)
            }, 2000)
            setTimeout(() => {
                setWhoGoesFirstVisibility(true)
                
                appAction({
                    type: ActionType.START_GAME
                })
            }, 7000)
        }
    }, [appState.currentStep]);

    useEffect(() => {
        if(appState.currentPlayer === -1) { 
            setAnnouncerInnerText('') 
        }
        
        if(appState.currentStep === 'rolling' && appState.players[appState.currentPlayer].id !== 1){
            setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} is ${appState.currentStep}!`)
            setTimeout(() => {
                appAction({
                    type: ActionType.ROLL_DICE
                })
            }, 2000)
        }
        if(appState.currentStep === 'rolled') {
            setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} ${appState.currentStep} a ${appState.dice[0] + appState.dice[1]}!`)
            appAction({
                    type: ActionType.SHOW_DICE_RESULTS,
                })
        }
        if(appState.currentStep === 'moving'){
            setTimeout(() => {
                appAction({
                    type: ActionType.MOVE_PLAYER_TOKEN,
                    payload: {
                        newMapPosition: appState.players[appState.currentPlayer].mapPosition + (appState.dice[0] + appState.dice[1]),
                        playerToMove: appState.currentPlayer,
                    }
                })
            }, 1000)
        }
    }, [appState.currentStep])



    // appAction({
    //     type: ActionType.SET_CURRENT_PLAYER,
    //     payload: {
    //         currentPlayer: 0,
    //     }
    // })

    // useEffect(() => {
    // }, [appState.currentPlayer])
    // interface CurrentStepTranslator {
    //     [index: string]: {

    //     }
    // }
    // let currentStepTranslator: CurrentStepTranslator = {
    //     'rolling': `${appState.players[appState.currentPlayer]} is rolling`
    // }
    return (
        <div className="game-container">
            <TileLayout />
            <PlayerTokens />
            <EscapeButton style={{position: 'absolute', top: '15px', right: '0px'}}/>
            <HelpButton style={{position: 'absolute', top: '15px', right: '50px'}}/>
            <OxygenSubmarine style={{position: 'absolute', top: '20px', left: '500px'}}/>
            <OxygenMarker style={{position: 'absolute', top: oxygenTokenLocations[appState.remainingOxygen].top, left: oxygenTokenLocations[appState.remainingOxygen].left}}/>
            <AnnouncerContainer dice={<DiceContainer />} announcerMessage={<AnnouncerMessage text={announcerInnerText}/>}/>
            <ScoreBoardContainer />
            {appState.currentStep === 'rolling' ? appState.players[appState.currentPlayer].id === 1 ? <RollTheDiceContainer /> : <></> : <></>}
            <TealOverlay hidden={whoGoesFirstVisibility} />
            <WhoGoesFirst hidden={whoGoesFirstVisibility} /> 
        </div>
    )
}

export default GameContainer;