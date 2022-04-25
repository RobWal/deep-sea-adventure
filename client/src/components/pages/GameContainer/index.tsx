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
import PickupTreasureContainer from '../../molecules/PickupTreasureContainer';

export interface PlayerMapPositions {
    [index: number]: number
}

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
        if((appState.currentStep === 'next_players_turn' && appState.players[appState.currentPlayer].id === 1) ){
            setAnnouncerInnerText('') 
            let newOxygenLevel =  (appState.remainingOxygen) - appState.players[appState.currentPlayer].treasure.length
            appAction({
                    type: ActionType.SET_OXYGEN_LEVEL,
                    payload: {
                        newOxygenLevel: newOxygenLevel,
                    }
                })
        }
        if((appState.currentStep === 'rolling' ||  appState.currentStep === 'next_players_turn') && appState.players[appState.currentPlayer].id !== 1){
            setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} is rolling!`)
            let newOxygenLevel =  (appState.remainingOxygen) - appState.players[appState.currentPlayer].treasure.length
            setTimeout(() => {
                appAction({
                    type: ActionType.ROLL_DICE,
                })
                appAction({
                    type: ActionType.SET_OXYGEN_LEVEL,
                    payload: {
                        newOxygenLevel: newOxygenLevel,
                    }
                })
            }, 2000)
        } 
        if(appState.currentStep === 'rolled') {
            setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} ${appState.currentStep} a ${appState.dice[0] + appState.dice[1]}!`)
            setTimeout(() => {
                appAction({
                        type: ActionType.SHOW_DICE_RESULTS,
                    })
            }, 2000)
        }
        if(appState.currentStep === 'moving'){
            setTimeout(() => {
                let playerMapPositions: PlayerMapPositions = {};
                for(let i = 0; i < appState.players.length; i++){
                    playerMapPositions[appState.players[i].mapPosition] = i;
                }
                let totalPlacesToMove = (appState.dice[0] + appState.dice[1]) - appState.players[appState.currentPlayer].treasure.length;
                let simulatedPlayerPosition = appState.players[appState.currentPlayer].mapPosition;
                for(let i = 0; i < totalPlacesToMove; i++){
                    if(playerMapPositions[simulatedPlayerPosition+1] !== undefined){
                        totalPlacesToMove++;
                    } 
                    simulatedPlayerPosition++;
                }
                appAction({
                    type: ActionType.MOVE_PLAYER_TOKEN,
                    payload: {
                        newMapPosition: appState.players[appState.currentPlayer].mapPosition + totalPlacesToMove,
                        playerToMove: appState.currentPlayer,
                    }
                })
                playerMapPositions = {100: 100};
                
                // console.log(playerMapPositions)
                // for(let i = 0; i <  appState.dice[0] + appState.dice[1]; i++){
                //     if(playerMapPositions[appState.players[appState.currentPlayer].mapPosition + 1]){
                //         console.log(`WE'RE IN THE FIRST IF`);
                //         console.log(appState);
                //         console.log(appState.players[appState.currentPlayer].mapPosition + 1)
                //         appAction({
                //             type: ActionType.MOVE_PLAYER_TOKEN,
                //             payload: {
                //                 newMapPosition: appState.players[appState.currentPlayer].mapPosition + 1,
                //                 playerToMove: appState.currentPlayer,
                //             }
                //         })
                //         i--;
                //     } else {
                //         console.log(`WE'RE IN THE SECOND IF`);
                //         console.log(appState);
                //         console.log(appState.players[appState.currentPlayer].mapPosition + 1)
                //         appAction({
                //             type: ActionType.MOVE_PLAYER_TOKEN,
                //             payload: {
                //                 newMapPosition: appState.players[appState.currentPlayer].mapPosition + 1,
                //                 playerToMove: appState.currentPlayer,
                //             }
                //         })
                        // appAction({
                        //     type: ActionType.MOVE_PLAYER_TOKEN,
                        //     payload: {
                        //         newMapPosition: appState.players[appState.currentPlayer].mapPosition + 1,
                        //         playerToMove: appState.currentPlayer,
                        //     }
                        // })
                //     }
                // }
            //     appAction({
            //         type: ActionType.MOVE_PLAYER_TOKEN,
            //         payload: {
            //             newMapPosition: appState.players[appState.currentPlayer].mapPosition + (appState.dice[0] + appState.dice[1]),
            //             playerToMove: appState.currentPlayer,
            //         }
            //     })
            }, 2000)
        }
        if(appState.currentStep === 'moved' && appState.players[appState.currentPlayer].id !== 1){
            setTimeout(() => {
                let anyTreasureThere = false;
                // let currentPlayer = appState.players[appState.currentPlayer];
                if(appState.tiles[appState.players[appState.currentPlayer].mapPosition-1].type !== 0){
                        anyTreasureThere = true;
                }
                if(anyTreasureThere){
                    setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} is deciding!`)
                    if(appState.remainingOxygen > 15){
                        let newPlayerTreasureArray = [...appState.players[appState.currentPlayer].treasure]
                        newPlayerTreasureArray.push(appState.tiles[appState.players[appState.currentPlayer].mapPosition-1])
                        let newTileArray = [...appState.tiles];
                        newTileArray[appState.players[appState.currentPlayer].mapPosition-1] = {
                            type: 0,
                            location: appState.players[appState.currentPlayer].mapPosition,
                        }
                        appAction({
                            type: ActionType.TREASURE_PICKUP_DECISION,
                            payload: {
                                currentPlayer: appState.currentPlayer,
                                newPlayerTreasureArray: newPlayerTreasureArray,
                                newTileArray: newTileArray,
                            }
                        })
                    } else {
                        appAction({
                            type: ActionType.TREASURE_LEAVE_DECISION,
                        })
                    }
                } else {
                    if(appState.currentPlayer+1 === appState.players.length){
                    appAction({
                        type: ActionType.NEXT_PLAYER_TURN,
                        payload: {
                            newCurrentPlayer: 0,
                        }
                    })
                } else {
                    appAction({
                        type: ActionType.NEXT_PLAYER_TURN,
                        payload: {
                            newCurrentPlayer: appState.currentPlayer+1,
                        }
                    })
                }
                }
                // appAction({
                //     type: ActionType.TREASURE_PICKUP_DECISION,
                //     payload: {
                //         currentPlayer: appState.currentPlayer,
                //         pickedUpTile: appState.tiles[appState.players[appState.currentPlayer].mapPosition - 1]
                //     }
                // })
            }, 1000)
        }
        if(appState.currentStep === 'decided_pickup_treasure'){
            setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} picked up a treasure!`)
            setTimeout(() => {
                if(appState.currentPlayer+1 === appState.players.length){
                    appAction({
                        type: ActionType.NEXT_PLAYER_TURN,
                        payload: {
                            newCurrentPlayer: 0,
                        }
                    })
                } else {
                    appAction({
                        type: ActionType.NEXT_PLAYER_TURN,
                        payload: {
                            newCurrentPlayer: appState.currentPlayer+1,
                        }
                    })
                }
            }, 2000)
        }
        if(appState.currentStep === 'decided_leave_treasure'){
            setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} left the treasure!`)
            setTimeout(() => {
                if(appState.currentPlayer+1 === appState.players.length){
                    appAction({
                        type: ActionType.NEXT_PLAYER_TURN,
                        payload: {
                            newCurrentPlayer: 0,
                        }
                    })
                } else {
                    appAction({
                        type: ActionType.NEXT_PLAYER_TURN,
                        payload: {
                            newCurrentPlayer: appState.currentPlayer+1,
                        }
                    })
                }
            }, 2000)
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
            {appState.currentStep === 'rolling' || appState.currentStep === 'next_players_turn' ? appState.players[appState.currentPlayer].id === 1 ? <RollTheDiceContainer /> : <></> : <></>}
            {appState.currentStep === 'moved' ? appState.players[appState.currentPlayer].id === 1 ? <PickupTreasureContainer /> : <></> : <></>}
            <TealOverlay hidden={whoGoesFirstVisibility} />
            <WhoGoesFirst hidden={whoGoesFirstVisibility} /> 
        </div>
    )
}

export default GameContainer;