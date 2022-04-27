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
import ForwardsOrBackwardsContainer from '../../molecules/ForwardsOrBackwardsContainer';

export interface PlayerMapPositions {
    [index: number]: number
}



const GameContainer = () => {
    const [appState, appAction] = useContext(GameContext);
    const [whoGoesFirstVisibility, setWhoGoesFirstVisibility] = useState(true);
    const [announcerInnerText, setAnnouncerInnerText] = useState("");
    const [returnedPlayerIds, setReturnedPlayerIds] = useState <number[]>([]);
    useEffect(() => {
        console.log(appState);
        if(appState.currentStep === 'preStart'){
            setTimeout(() => {
                setWhoGoesFirstVisibility(false)
            }, 2000);
            setTimeout(() => {
                setWhoGoesFirstVisibility(true)
                
                appAction({
                    type: ActionType.START_GAME
                });
            }, 7000)
        }
    }, [appState.currentStep]);

    useEffect(() => {
        if(appState.currentPlayer === -1) { 
            setAnnouncerInnerText('') 
        }
        console.log(returnedPlayerIds)
        let isPlayerInSub = false;
        returnedPlayerIds.forEach((id) => {
            if(id === appState.players[appState.currentPlayer].id){
                isPlayerInSub = true;
            }
        })
        console.log(isPlayerInSub)
        if(isPlayerInSub){
            appAction({
                type: ActionType.SKIP_PLAYERS_GO
            })
        }
        if(!isPlayerInSub){
        if((appState.currentStep === 'deciding_direction' && appState.players[appState.currentPlayer].direction === 'backwards')) {
            appAction({
                    type: ActionType.DEEPER_OR_BACK,
                    payload: {
                        currentPlayer: appState.currentPlayer,
                        direction: 'backwards',
                    }
                })
        }
        // if((appState.currentStep === 'deciding_direction' && appState.players[appState.currentPlayer].direction === 'backwards')) {
        //     appAction({
        //             type: ActionType.DEEPER_OR_BACK,
        //             payload: {
        //                 currentPlayer: appState.currentPlayer,
        //                 direction: 'backwards',
        //             }
        //         })
        // }
        if(((appState.currentStep === 'deciding_direction' || appState.currentStep === 'skip_players_turn') && appState.players[appState.currentPlayer].id === 1 && appState.players[appState.currentPlayer].mapPosition !== 0) ){
            setAnnouncerInnerText('') 
            let newOxygenLevel =  (appState.remainingOxygen) - appState.players[appState.currentPlayer].treasure.length;
            if(newOxygenLevel < 0) {
                newOxygenLevel = 0;
            };
            appAction({
                    type: ActionType.SET_OXYGEN_LEVEL,
                    payload: {
                        newOxygenLevel: newOxygenLevel,
                    }
                })        
        } else if((appState.currentStep === 'deciding_direction' || appState.currentStep === 'skip_players_turn') && appState.players[appState.currentPlayer].id === 1 && appState.players[appState.currentPlayer].mapPosition === 0) {
            let newOxygenLevel =  (appState.remainingOxygen) - appState.players[appState.currentPlayer].treasure.length;
            if(newOxygenLevel < 0) {
                newOxygenLevel = 0;
            };
            appAction({
                    type: ActionType.SET_OXYGEN_LEVEL,
                    payload: {
                        newOxygenLevel: newOxygenLevel,
                    }
                })
            appAction({
                type: ActionType.DEEPER_OR_BACK,
                payload: {
                    direction: 'forwards',
                    currentPlayer: appState.currentPlayer,
                }
            })
        }
        if((appState.currentStep === 'rolling' && appState.players[appState.currentPlayer].id === 1)){
            setAnnouncerInnerText('') 
        }
        if((appState.currentStep === 'deciding_direction' || appState.currentStep === 'skip_players_turn') && appState.players[appState.currentPlayer].id !== 1 && appState.players[appState.currentPlayer].mapPosition == 0){
            appAction({
                    type: ActionType.DEEPER_OR_BACK,
                    payload: {
                        currentPlayer: appState.currentPlayer,
                        direction: 'forwards',
                    }
                })
        } else if((appState.currentStep === 'deciding_direction' || appState.currentStep === 'skip_players_turn') && appState.players[appState.currentPlayer].id !== 1){
            setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} is deciding whether to turn back!`);
            let totalTreasuresOwned = 0;
            appState.players.forEach((player) => {
                totalTreasuresOwned += player.treasure.length;
            })
            let currentPlayersAverageMovement = 4 - (appState.players[appState.currentPlayer].treasure.length)
            let approximateRoundsLeft = 0;
            if(totalTreasuresOwned !== 0){
                approximateRoundsLeft = appState.remainingOxygen / totalTreasuresOwned;
            } else {
                approximateRoundsLeft = appState.remainingOxygen / 1;
            }
            let turnsRequiredToGetHome = appState.players[appState.currentPlayer].mapPosition / currentPlayersAverageMovement;
            let  playerDecision = '';
            if(turnsRequiredToGetHome > approximateRoundsLeft){
                playerDecision = 'backwards'
            } else {
                playerDecision = 'forwards'
            }

            setTimeout(() => {
                appAction({
                    type: ActionType.DEEPER_OR_BACK,
                    payload: {
                        currentPlayer: appState.currentPlayer,
                        direction: playerDecision,
                    }
                })
                setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} has decided to go ${playerDecision}!`);
            }, 2000)
        } 
        if((appState.currentStep === 'rolling' ||  appState.currentStep === 'next_players_turn') && appState.players[appState.currentPlayer].id !== 1){
            setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} is rolling!`)
            let newOxygenLevel =  (appState.remainingOxygen) - appState.players[appState.currentPlayer].treasure.length;
            if(newOxygenLevel < 0) {
                newOxygenLevel = 0;
            };
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
                    playerMapPositions[appState.players[i].mapPosition] = appState.players[i].id
                }
                let totalPlacesToMove = (appState.dice[0] + appState.dice[1]) - appState.players[appState.currentPlayer].treasure.length;
                let simulatedPlayerPosition = appState.players[appState.currentPlayer].mapPosition;
                if(appState.players[appState.currentPlayer].direction === 'forwards'){
                    // let hitTheEnd = false;
                    if(totalPlacesToMove < 0){
                        totalPlacesToMove = 0;
                    }
                    for(let i = 0; i < totalPlacesToMove; i++){
                        if(playerMapPositions[simulatedPlayerPosition+1] !== undefined){
                            totalPlacesToMove++;
                        }
                        if(simulatedPlayerPosition === 32){
                            // hitTheEnd = true;
                            simulatedPlayerPosition--;
                        } else {
                            simulatedPlayerPosition++;
                        }
                    }
                    // console.log()
                    appAction({
                        type: ActionType.MOVE_PLAYER_TOKEN,
                        payload: {
                            newMapPosition: appState.players[appState.currentPlayer].mapPosition + totalPlacesToMove,
                            playerToMove: appState.currentPlayer,
                        }
                    })
                } else if(appState.players[appState.currentPlayer].direction === 'backwards'){
                    console.log(`First total places to move: ${totalPlacesToMove}`)
                    if(totalPlacesToMove < 0) {
                        totalPlacesToMove = 0;
                        // appAction({
                        //     type: ActionType.MOVE_PLAYER_TOKEN,
                        //     payload: {
                        //         newMapPosition: appState.players[appState.currentPlayer].mapPosition - totalPlacesToMove,
                        //         playerToMove: appState.currentPlayer,
                        //     }
                        // })
                    } 
                    let madeItHome = false;
                    console.log(playerMapPositions);
                    for(let i = 0; i < totalPlacesToMove; i++){
                        if(playerMapPositions[simulatedPlayerPosition-1] !== undefined && playerMapPositions[simulatedPlayerPosition-1] !== appState.players[appState.currentPlayer].id){
                            console.log(`We're backwards, stepping over someone`);
                            totalPlacesToMove++;
                        }
                        if(simulatedPlayerPosition === 0){
                            console.log(`Made it home!`);
                            madeItHome = true;
                            // hitTheEnd = true;
                            // simulatedPlayerPosition--;
                            i = 100;
                            let newReturnedPlayers = [...returnedPlayerIds];
                                newReturnedPlayers.push(appState.players[appState.currentPlayer].id);
                                setReturnedPlayerIds(newReturnedPlayers);
                        } else {
                            console.log(`Heading back one simulated step`);
                            simulatedPlayerPosition--;
                        }
                    }
                    // for(let i = 0; i < totalPlacesToMove; i++){
                        // console.log(`Second total places to move: ${totalPlacesToMove}`)
                        // if(playerMapPositions[simulatedPlayerPosition-1] !== undefined){
                        //     totalPlacesToMove++;
                        // }
                        // console.log(`simulated home pos #: ${simulatedPlayerPosition}`)
                        // if(simulatedPlayerPosition === 0){
                            // console.log(`we're in the simulated home pos`)
                            // let newReturnedPlayers = [...returnedPlayerIds];
                            // newReturnedPlayers.push(appState.players[appState.currentPlayer].id);
                            // setReturnedPlayerIds(newReturnedPlayers);
                            // appAction({
                            //     type: ActionType.PLAYER_GOT_BACK,
                            //     payload: {
                            //         newMapPosition: 0,
                            //         playerToMove: appState.currentPlayer,
                            //     }
                            // });
                            // if(appState.currentPlayer+1 === appState.players.length){
                            //     appAction({
                            //         type: ActionType.NEXT_PLAYER_TURN,
                            //         payload: {
                            //             newCurrentPlayer: 0,
                            //         }
                            //     })
                            // } else {
                            //     appAction({
                            //         type: ActionType.NEXT_PLAYER_TURN,
                            //         payload: {
                            //             newCurrentPlayer: appState.currentPlayer+1,

                            //         }
                            //     })
                            // }
                            // i+=10;
                        // } else {
                            // console.log(`Third total places to move: ${totalPlacesToMove}`)
                            // simulatedPlayerPosition--;
                            // if(totalPlacesToMove < 0){
                            //     totalPlacesToMove = 0;
                            // }
                    console.log(`We're calling the move_player_token, with totalPlacedToMove === ${totalPlacesToMove}`);
                    appAction({
                        type: ActionType.MOVE_PLAYER_TOKEN,
                        payload: {
                            newMapPosition: appState.players[appState.currentPlayer].mapPosition - totalPlacesToMove,
                            playerToMove: appState.currentPlayer,
                        }
                    })
                        // }
                    // }
                
                }
                playerMapPositions = {100: 100};
            }, 2000)
        }
        if(appState.currentStep === 'moved' && appState.players[appState.currentPlayer].id !== 1){
            setTimeout(() => {
                let anyTreasureThere = false;
                if(appState.tiles[appState.players[appState.currentPlayer].mapPosition-1].type !== 0){
                        anyTreasureThere = true;
                }
                if(anyTreasureThere){
                    setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} is deciding!`)
                    if(appState.remainingOxygen > 15 && appState.players[appState.currentPlayer].treasure.length < 4){
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
            setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} didn't pick up the treasure!`)
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
        
    } else {
        appAction({
            type: ActionType.SKIP_PLAYERS_GO,
        })
    }
    if(appState.currentStep === 'skip_players_turn'){
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
    }, [appState.currentStep])
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
            {(appState.currentStep === 'deciding_direction' && appState.players[appState.currentPlayer].id === 1 && appState.players[appState.currentPlayer].mapPosition !== 0) ? <ForwardsOrBackwardsContainer /> : <></>}
            {(appState.currentStep === 'rolling' || appState.currentStep === 'next_players_turn') && appState.players[appState.currentPlayer].id === 1 ? <RollTheDiceContainer /> : <></>}
            {appState.currentStep === 'moved' && appState.players[appState.currentPlayer].id === 1 && appState.players[appState.currentPlayer].mapPosition !== 0? <PickupTreasureContainer /> : <></>}
            <TealOverlay hidden={whoGoesFirstVisibility} />
            <WhoGoesFirst hidden={whoGoesFirstVisibility} /> 
        </div>
    )
}

export default GameContainer;