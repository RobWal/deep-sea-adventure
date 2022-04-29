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
        console.log(appState.currentStep);
        console.log(announcerInnerText);
        if(appState.currentPlayer === -1) { 
            setAnnouncerInnerText('') 
        };
        
        if(appState.currentStep === 'is_player_in_sub'){
            console.log(`WE'RE IN THE CALCULATE IF IN SUB SECTION`);
            let isPlayerInSub = false;
            returnedPlayerIds.forEach((id) => {
                if(id === appState.players[appState.currentPlayer].id){
                    isPlayerInSub = true;
                }
            })
            if(!isPlayerInSub){
                console.log(`THE PLAYER IS NOT IN THE SUB SECTION`);
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
            } else {
                console.log(`THE PLAYER IS IN THE SUB SECTION`);
                appAction({
                    type: ActionType.NEXT_PLAYER_LOGIC
                })
            }
        };

        if(appState.currentStep === 'direction_logic'){
            setTimeout(() => {
                console.log(`DIRECTION LOGIC SECTION`);
                if(appState.players[appState.currentPlayer].direction === 'backwards'){
                    console.log(`DIRECTION IS ALREADY BACKWARDS SECTION`);
                    appAction({
                        type: ActionType.DEEPER_OR_BACK,
                        payload: {
                            currentPlayer: appState.currentPlayer,
                            direction: 'backwards',
                        }
                    })
                } else if (appState.players[appState.currentPlayer].direction === 'forwards'){
                    console.log(`DIRECTION IS FORWARDS SECTION`);
                    if(appState.players[appState.currentPlayer].id === 1){

                        console.log(`CURRENT PLAYER IS PC`);
                        if(appState.players[appState.currentPlayer].mapPosition !== 0){
                            console.log(`PC POSITION IS !== 0, BUTTON SHOULD APPEAR`);
                            setAnnouncerInnerText('') 
                        } else if (appState.players[appState.currentPlayer].mapPosition === 0){
                            console.log(`DIRECTION IS FORWARDS AS PC IS HOME, YET TO LEAVE`);
                            setAnnouncerInnerText('')
                            appAction({
                                type: ActionType.DEEPER_OR_BACK,
                                payload: {
                                    direction: 'forwards',
                                    currentPlayer: appState.currentPlayer,
                                }
                            })
                        }
                    } else if (appState.players[appState.currentPlayer].id !== 1){
                        console.log(`CURRENT PLAYER IS NOT A PC`);
                        if(appState.players[appState.currentPlayer].mapPosition === 0){
                            console.log(`DIRECTION IS FORWARDS AS NOT A PC IS HOME, YET TO LEAVE`);
                            setAnnouncerInnerText('')
                            appAction({
                                type: ActionType.DEEPER_OR_BACK,
                                payload: {
                                    direction: 'forwards',
                                    currentPlayer: appState.currentPlayer,
                                }
                            })
                        } else if (appState.players[appState.currentPlayer].mapPosition !== 0){
                            console.log(`NOT A PC DECIDING WHETHER TO TURN BACK SECTION`);
                            setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} is deciding whether to turn back!`);
                            setTimeout(() => {
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
                                appAction({
                                    type: ActionType.DEEPER_OR_BACK,
                                    payload: {
                                        currentPlayer: appState.currentPlayer,
                                        direction: playerDecision,
                                    }
                                })
                            }, 2000);
                        }
                    }
                }
            }, 2000);
        };

        if(appState.currentStep === 'rolling'){
            if(appState.players[appState.currentPlayer].id === 1){
                console.log(`PC 'ROLLING' SECTION`);
                setAnnouncerInnerText('') 
            } else if(appState.players[appState.currentPlayer].id !== 1){
                // setTimeout(() => {
                    console.log(`NOT A PC 'ROLLING' SECTION`);
                    // setTimeout(() => {
                        setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} is rolling!`);
                        // }, 2000);
                setTimeout(() => {
                    appAction({
                        type: ActionType.ROLL_DICE,
                    })
                }, 2000);
            }
        };

        if(appState.currentStep === 'rolled'){
            setTimeout(() => {
                console.log(`WE'RE IN THE 'ROLLED' SECTION`);
                setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} ${appState.currentStep} a ${appState.dice[0] + appState.dice[1]}!`);
                setTimeout(() => {
                    appAction({
                        type: ActionType.SHOW_DICE_RESULTS,
                    })
                }, 2000);
            }, 2000);
        };
        
        if(appState.currentStep === 'moving'){
            setTimeout(() => {
            console.log(`WE'RE IN THE 'MOVING' SECTION`);
                let playerMapPositions: PlayerMapPositions = {};
                for(let i = 0; i < appState.players.length; i++){
                    playerMapPositions[appState.players[i].mapPosition] = appState.players[i].id
                }
                let totalPlacesToMove = (appState.dice[0] + appState.dice[1]) - appState.players[appState.currentPlayer].treasure.length;
                let simulatedPlayerPosition = appState.players[appState.currentPlayer].mapPosition;
                if(appState.players[appState.currentPlayer].direction === 'forwards'){
                    console.log(`WE'RE IN THE PLAYER IS MOVING FORWARDS SECTION`);
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
                    appAction({
                        type: ActionType.MOVE_PLAYER_TOKEN,
                        payload: {
                            newMapPosition: appState.players[appState.currentPlayer].mapPosition + totalPlacesToMove,
                            playerToMove: appState.currentPlayer,
                        }
                    })
                } else if(appState.players[appState.currentPlayer].direction === 'backwards'){
                    console.log(`WE'RE IN THE PLAYER IS MOVING BACKWARDS SECTION`);
                    // console.log(`First total places to move: ${totalPlacesToMove}`)
                    if(totalPlacesToMove < 0) {
                        totalPlacesToMove = 0;
                    } 
                    console.log(playerMapPositions);
                    for(let i = 0; i < totalPlacesToMove; i++){
                        if(playerMapPositions[simulatedPlayerPosition-1] !== undefined && playerMapPositions[simulatedPlayerPosition-1] !== appState.players[appState.currentPlayer].id){
                            console.log(`WE'RE BACKWARDS, STEPPING OVER SOMEONE`);
                            totalPlacesToMove++;
                        }
                        if(simulatedPlayerPosition === 0){
                            console.log(`MADE IT HOME!`);
                            totalPlacesToMove = i;

                            // hitTheEnd = true;
                            // simulatedPlayerPosition--;
                            // i = 100;
                            // TO DO, IF PLAYER MADE IT HOME, FIRE APPSTATE TO CHECK IF GAME ENDED VIA EVERYBODY IN SUB
                            // let newReturnedPlayers = [...returnedPlayerIds];
                            //     newReturnedPlayers.push(appState.players[appState.currentPlayer].id);
                            //     setReturnedPlayerIds(newReturnedPlayers);
                        } else {
                            console.log(`HEADING BACK ONE SIMULATED STEP`);
                            simulatedPlayerPosition--;
                        }
                    }
                    console.log(`WE'RE CALLING THE MOVE_PLAYER_TOKEN, WITH TOTALPLACESTOMOVE === ${totalPlacesToMove}`);
                    appAction({
                        type: ActionType.MOVE_PLAYER_TOKEN,
                        payload: {
                            newMapPosition: appState.players[appState.currentPlayer].mapPosition - totalPlacesToMove,
                            playerToMove: appState.currentPlayer,
                        }
                    })
                }
                playerMapPositions = {100: 100};
            }, 2000);
        };
        
        if(appState.currentStep === 'moved'){
            setTimeout(() => {
            
            console.log(`WE'RE IN THE 'MOVED' SECTION`);
            if(appState.players[appState.currentPlayer].id === 1){
                if(appState.players[appState.currentPlayer].mapPosition === 0){
                    let newReturnedPlayers = [...returnedPlayerIds];
                        newReturnedPlayers.push(appState.players[appState.currentPlayer].id);
                        setReturnedPlayerIds(newReturnedPlayers);
                    appAction({
                        type: ActionType.PLAYER_GOT_BACK
                    })
                }
            } else if (appState.players[appState.currentPlayer].id !== 1){
                    let anyTreasureThere = false;
                    if(appState.players[appState.currentPlayer].mapPosition === 0){
                        let newReturnedPlayers = [...returnedPlayerIds];
                            newReturnedPlayers.push(appState.players[appState.currentPlayer].id);
                            setReturnedPlayerIds(newReturnedPlayers);
                        appAction({
                            type: ActionType.PLAYER_GOT_BACK
                        })
                    } else if(appState.players[appState.currentPlayer].mapPosition !== 0){
                        if(appState.tiles[appState.players[appState.currentPlayer].mapPosition-1].type !== 0){
                            console.log(`THERE'S TREASURE ON THIS TILE`);
                            anyTreasureThere = true;
                        }
                        if(anyTreasureThere){
                            // console.log(`WE'RE IN THE HEADING BACK, THERE'S TREASURE SECTION`);
                            // setTimeout(() => {
                            //     setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} is deciding!`)
                            // }, 2000);
                            if(appState.remainingOxygen > 15 && appState.players[appState.currentPlayer].treasure.length < 3){
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
                                // console.log(`WE'RE IN THE HEADING BACK, THERE'S TREASURE SECTION, SECOND IF`);
                                appAction({
                                    type: ActionType.TREASURE_LEAVE_DECISION,
                                })
                            }
                        } else if(!anyTreasureThere){
                            // console.log(`WE'RE IN THE HEADING BACK, THERE'S NO TREASURE SECTION`);
                            if(appState.remainingOxygen < 15 && appState.players[appState.currentPlayer].treasure.length > 2){
                                // console.log(`WE'RE IN THE HEADING BACK, THERE'S TREASURE SECTION, FIRST IF`);
                                let newTileArray = [...appState.tiles];
                                let newPlayerTreasureArray = [...appState.players[appState.currentPlayer].treasure]
                                let treasureToBeDropped: any = {};
                                for(let i = 0; i < newPlayerTreasureArray.length; i++){
                                    if(newPlayerTreasureArray[i].type === 1){
                                        treasureToBeDropped = newPlayerTreasureArray[i];
                                    }
                                }
                                if(treasureToBeDropped === {}){
                                    for(let i = 0; i < newPlayerTreasureArray.length; i++){
                                        if(newPlayerTreasureArray[i].type === 2){
                                            treasureToBeDropped = newPlayerTreasureArray[i];
                                        }
                                    }
                                }
                                if(treasureToBeDropped === {}){
                                    for(let i = 0; i < newPlayerTreasureArray.length; i++){
                                        if(newPlayerTreasureArray[i].type === 3){
                                            treasureToBeDropped = newPlayerTreasureArray[i];
                                        }
                                    }
                                }
                                if(treasureToBeDropped === {}){
                                    for(let i = 0; i < newPlayerTreasureArray.length; i++){
                                        if(newPlayerTreasureArray[i].type === 4){
                                            treasureToBeDropped = newPlayerTreasureArray[i];
                                        }
                                    }
                                }
                                newTileArray[appState.players[appState.currentPlayer].mapPosition-1] = {
                                    type: treasureToBeDropped.type,
                                    id: treasureToBeDropped.id,
                                    location: appState.players[appState.currentPlayer].mapPosition,
                                    value: treasureToBeDropped.value,
                                }
                                newPlayerTreasureArray = newPlayerTreasureArray.filter(function(element) {
                                    return element != treasureToBeDropped
                                })

                                appAction({
                                    type: ActionType.TREASURE_DROP_DECISION,
                                    payload: {
                                        currentPlayer: appState.currentPlayer,
                                        newPlayerTreasureArray: newPlayerTreasureArray,
                                        newTileArray: newTileArray,
                                    }
                                })
                            } else if(!(appState.remainingOxygen < 15 && appState.players[appState.currentPlayer].treasure.length > 2)){
                                appAction({
                                    type: ActionType.TREASURE_LEAVE_DECISION,
                                })
                            }
                        }
                    }
                }
            }, 2000)
        }
        // if(appState.currentStep === 'deciding_direction' || appState.currentStep === 'skip_players_turn') {
        //     console.log(`WE'RE IN THE SET THE OXYGEN SECTION`);
            // let newOxygenLevel =  (appState.remainingOxygen) - appState.players[appState.currentPlayer].treasure.length;
            // if(newOxygenLevel < 0) {
            //     newOxygenLevel = 0;
            // };
            //  appAction({
            //         type: ActionType.SET_OXYGEN_LEVEL,
            //         payload: {
            //             newOxygenLevel: newOxygenLevel,
            //         }
            //     })  
        // }
        // if(!isPlayerInSub){
            
        // if((appState.currentStep === 'deciding_direction' && appState.players[appState.currentPlayer].direction === 'backwards')) {
        //     console.log(`WE'RE IN THE SET THE CONFIRMING 'BACKWARDS' DIRECTION SECTION`);
        //     appAction({
        //             type: ActionType.DEEPER_OR_BACK,
        //             payload: {
        //                 currentPlayer: appState.currentPlayer,
        //                 direction: 'backwards',
        //             }
        //         })
        // }

        // if(((appState.currentStep === 'deciding_direction' || appState.currentStep === 'skip_players_turn') && appState.players[appState.currentPlayer].id === 1 && appState.players[appState.currentPlayer].mapPosition !== 0) ){
        //     console.log(`PC DECIDING_DIRECTION || SKIP_PLAYERS_TURN && MAPPOS !== 0 SECTION`);
        //     setAnnouncerInnerText('') 
            // let newOxygenLevel =  (appState.remainingOxygen) - appState.players[appState.currentPlayer].treasure.length;
            // if(newOxygenLevel < 0) {
            //     newOxygenLevel = 0;
            // };
            // appAction({
            //         type: ActionType.SET_OXYGEN_LEVEL,
            //         payload: {
            //             newOxygenLevel: newOxygenLevel,
            //         }
            //     })        
        // } else if((appState.currentStep === 'deciding_direction' || appState.currentStep === 'skip_players_turn') && appState.players[appState.currentPlayer].id === 1 && appState.players[appState.currentPlayer].mapPosition === 0) {
        //     console.log(`PC MAPPOS === 0 CONFIRMING 'FORWARDS' SECTION`);
            // let newOxygenLevel =  (appState.remainingOxygen) - appState.players[appState.currentPlayer].treasure.length;
            // if(newOxygenLevel < 0) {
            //     newOxygenLevel = 0;
            // };
            // appAction({
            //         type: ActionType.SET_OXYGEN_LEVEL,
            //         payload: {
            //             newOxygenLevel: newOxygenLevel,
            //         }
            //     })
        //     appAction({
        //         type: ActionType.DEEPER_OR_BACK,
        //         payload: {
        //             direction: 'forwards',
        //             currentPlayer: appState.currentPlayer,
        //         }
        //     })
        // }
        // ROLLING
        // if((appState.currentStep === 'rolling' && appState.players[appState.currentPlayer].id === 1)){
        //     console.log(`PC 'ROLLING' SECTION`);
        //     setAnnouncerInnerText('') 
        // }
        // if((appState.currentStep === 'deciding_direction' || appState.currentStep === 'skip_players_turn') && appState.players[appState.currentPlayer].id !== 1 && appState.players[appState.currentPlayer].mapPosition === 0){
        //     console.log(`NONPC MAPPOS === 0 CONFIRMING 'FORWARDS' SECTION`);
        //     appAction({
        //             type: ActionType.DEEPER_OR_BACK,
        //             payload: {
        //                 currentPlayer: appState.currentPlayer,
        //                 direction: 'forwards',
        //             }
        //         })
        // } else if((appState.currentStep === 'deciding_direction' || appState.currentStep === 'skip_players_turn') && appState.players[appState.currentPlayer].id !== 1){
        //     console.log(`NONPC MAPPOS !== 0 DECIDING DIRECTION SECTION`);
        //     setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} is deciding whether to turn back!`);
        //     let totalTreasuresOwned = 0;
        //     appState.players.forEach((player) => {
        //         totalTreasuresOwned += player.treasure.length;
        //     })
        //     let currentPlayersAverageMovement = 4 - (appState.players[appState.currentPlayer].treasure.length)
        //     let approximateRoundsLeft = 0;
        //     if(totalTreasuresOwned !== 0){
        //         approximateRoundsLeft = appState.remainingOxygen / totalTreasuresOwned;
        //     } else {
        //         approximateRoundsLeft = appState.remainingOxygen / 1;
        //     }
        //     let turnsRequiredToGetHome = appState.players[appState.currentPlayer].mapPosition / currentPlayersAverageMovement;
        //     let  playerDecision = '';
        //     if(turnsRequiredToGetHome > approximateRoundsLeft){
        //         playerDecision = 'backwards'
        //     } else {
        //         playerDecision = 'forwards'
        //     }
        //     setTimeout(() => {
        //         appAction({
        //             type: ActionType.DEEPER_OR_BACK,
        //             payload: {
        //                 currentPlayer: appState.currentPlayer,
        //                 direction: playerDecision,
        //             }
        //         })
        //         setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} has decided to go ${playerDecision}!`);
        //     }, 2000)
        // } 
        // if((appState.currentStep === 'rolling' ||  appState.currentStep === 'next_players_turn') && appState.players[appState.currentPlayer].id !== 1){
        //     console.log(`NONPC IS ROLLING SECTION`);
        //     setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} is rolling!`)
        //     // let newOxygenLevel =  (appState.remainingOxygen) - appState.players[appState.currentPlayer].treasure.length;
        //     // if(newOxygenLevel < 0) {
        //     //     newOxygenLevel = 0;
        //     // };
        //     setTimeout(() => {
        //         appAction({
        //             type: ActionType.ROLL_DICE,
        //         })
        //         // appAction({
        //         //     type: ActionType.SET_OXYGEN_LEVEL,
        //         //     payload: {
        //         //         newOxygenLevel: newOxygenLevel,
        //         //     }
        //         // })
        //     }, 2000)
        // } 
        // if(appState.currentStep === 'rolled') {
        //     console.log(`WE'RE IN THE 'ROLLED' SECTION`);
        //     setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} ${appState.currentStep} a ${appState.dice[0] + appState.dice[1]}!`)
        //     setTimeout(() => {
        //         appAction({
        //                 type: ActionType.SHOW_DICE_RESULTS,
        //             })
        //     }, 2000)
        // }
        // if(appState.currentStep === 'moving'){
        //     console.log(`WE'RE IN THE 'MOVING' SECTION`);
        //     setTimeout(() => {
        //         let playerMapPositions: PlayerMapPositions = {};
        //         for(let i = 0; i < appState.players.length; i++){
        //             playerMapPositions[appState.players[i].mapPosition] = appState.players[i].id
        //         }
        //         let totalPlacesToMove = (appState.dice[0] + appState.dice[1]) - appState.players[appState.currentPlayer].treasure.length;
        //         let simulatedPlayerPosition = appState.players[appState.currentPlayer].mapPosition;
        //         if(appState.players[appState.currentPlayer].direction === 'forwards'){
        //             // let hitTheEnd = false;
        //             if(totalPlacesToMove < 0){
        //                 totalPlacesToMove = 0;
        //             }
        //             for(let i = 0; i < totalPlacesToMove; i++){
        //                 if(playerMapPositions[simulatedPlayerPosition+1] !== undefined){
        //                     totalPlacesToMove++;
        //                 }
        //                 if(simulatedPlayerPosition === 32){
        //                     // hitTheEnd = true;
        //                     simulatedPlayerPosition--;
        //                 } else {
        //                     simulatedPlayerPosition++;
        //                 }
        //             }
        //             // console.log()
        //             appAction({
        //                 type: ActionType.MOVE_PLAYER_TOKEN,
        //                 payload: {
        //                     newMapPosition: appState.players[appState.currentPlayer].mapPosition + totalPlacesToMove,
        //                     playerToMove: appState.currentPlayer,
        //                 }
        //             })
        //         } else if(appState.players[appState.currentPlayer].direction === 'backwards'){
        //             console.log(`First total places to move: ${totalPlacesToMove}`)
        //             if(totalPlacesToMove < 0) {
        //                 totalPlacesToMove = 0;
        //                 // appAction({
        //                 //     type: ActionType.MOVE_PLAYER_TOKEN,
        //                 //     payload: {
        //                 //         newMapPosition: appState.players[appState.currentPlayer].mapPosition - totalPlacesToMove,
        //                 //         playerToMove: appState.currentPlayer,
        //                 //     }
        //                 // })
        //             } 
        //             let madeItHome = false;
        //             console.log(playerMapPositions);
        //             for(let i = 0; i < totalPlacesToMove; i++){
        //                 if(playerMapPositions[simulatedPlayerPosition-1] !== undefined && playerMapPositions[simulatedPlayerPosition-1] !== appState.players[appState.currentPlayer].id){
        //                     console.log(`We're backwards, stepping over someone`);
        //                     totalPlacesToMove++;
        //                 }
        //                 if(simulatedPlayerPosition === 0){
        //                     console.log(`Made it home!`);
        //                     madeItHome = true;
        //                     totalPlacesToMove = i;
        //                     // hitTheEnd = true;
        //                     // simulatedPlayerPosition--;
        //                     // i = 100;


        //                     // TO DO, IF PLAYER MADE IT HOME, FIRE APPSTATE TO CHECK IF GAME ENDED VIA EVERYBODY IN SUB
        //                     let newReturnedPlayers = [...returnedPlayerIds];
        //                         newReturnedPlayers.push(appState.players[appState.currentPlayer].id);
        //                         setReturnedPlayerIds(newReturnedPlayers);
        //                 } else {
        //                     console.log(`Heading back one simulated step`);
        //                     simulatedPlayerPosition--;
        //                 }
        //             }
        //             // for(let i = 0; i < totalPlacesToMove; i++){
        //                 // console.log(`Second total places to move: ${totalPlacesToMove}`)
        //                 // if(playerMapPositions[simulatedPlayerPosition-1] !== undefined){
        //                 //     totalPlacesToMove++;
        //                 // }
        //                 // console.log(`simulated home pos #: ${simulatedPlayerPosition}`)
        //                 // if(simulatedPlayerPosition === 0){
        //                     // console.log(`we're in the simulated home pos`)
        //                     // let newReturnedPlayers = [...returnedPlayerIds];
        //                     // newReturnedPlayers.push(appState.players[appState.currentPlayer].id);
        //                     // setReturnedPlayerIds(newReturnedPlayers);
        //                     // appAction({
        //                     //     type: ActionType.PLAYER_GOT_BACK,
        //                     //     payload: {
        //                     //         newMapPosition: 0,
        //                     //         playerToMove: appState.currentPlayer,
        //                     //     }
        //                     // });
        //                     // if(appState.currentPlayer+1 === appState.players.length){
        //                     //     appAction({
        //                     //         type: ActionType.NEXT_PLAYER_TURN,
        //                     //         payload: {
        //                     //             newCurrentPlayer: 0,
        //                     //         }
        //                     //     })
        //                     // } else {
        //                     //     appAction({
        //                     //         type: ActionType.NEXT_PLAYER_TURN,
        //                     //         payload: {
        //                     //             newCurrentPlayer: appState.currentPlayer+1,

        //                     //         }
        //                     //     })
        //                     // }
        //                     // i+=10;
        //                 // } else {
        //                     // console.log(`Third total places to move: ${totalPlacesToMove}`)
        //                     // simulatedPlayerPosition--;
        //                     // if(totalPlacesToMove < 0){
        //                     //     totalPlacesToMove = 0;
        //                     // }
        //             console.log(`We're calling the move_player_token, with totalPlacedToMove === ${totalPlacesToMove}`);
        //             appAction({
        //                 type: ActionType.MOVE_PLAYER_TOKEN,
        //                 payload: {
        //                     newMapPosition: appState.players[appState.currentPlayer].mapPosition - totalPlacesToMove,
        //                     playerToMove: appState.currentPlayer,
        //                 }
        //             })
        //                 // }
        //             // }
                
        //         }
        //         playerMapPositions = {100: 100};
        //     }, 2000)
        // }
        // if(appState.currentStep === 'moved' && appState.players[appState.currentPlayer].id !== 1){
        //     setTimeout(() => {
        //         let anyTreasureThere = false;
        //         if(appState.tiles[appState.players[appState.currentPlayer].mapPosition-1].type !== 0){
        //                 anyTreasureThere = true;
        //         }
        //         if(anyTreasureThere){
        //             console.log(`WE'RE IN THE HEADING BACK, THERE'S TREASURE SECTION`);
        //             setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} is deciding!`)
        //             if(appState.remainingOxygen > 15 && appState.players[appState.currentPlayer].treasure.length < 3){
        //                 let newPlayerTreasureArray = [...appState.players[appState.currentPlayer].treasure]
        //                 newPlayerTreasureArray.push(appState.tiles[appState.players[appState.currentPlayer].mapPosition-1])
        //                 let newTileArray = [...appState.tiles];
        //                 newTileArray[appState.players[appState.currentPlayer].mapPosition-1] = {
        //                     type: 0,
        //                     location: appState.players[appState.currentPlayer].mapPosition,
        //                 }
        //                 console.log(`WE'RE IN THE HEADING BACK, THERE'S TREASURE SECTION, FIRST IF`);
        //                 appAction({
        //                     type: ActionType.TREASURE_PICKUP_DECISION,
        //                     payload: {
        //                         currentPlayer: appState.currentPlayer,
        //                         newPlayerTreasureArray: newPlayerTreasureArray,
        //                         newTileArray: newTileArray,
        //                     }
        //                 })
        //             } else {
        //                 console.log(`WE'RE IN THE HEADING BACK, THERE'S TREASURE SECTION, SECOND IF`);
        //                 appAction({
        //                     type: ActionType.TREASURE_LEAVE_DECISION,
        //                 })
        //             }
        //         } else if(!anyTreasureThere){
        //             console.log(`WE'RE IN THE HEADING BACK, THERE'S NO TREASURE SECTION`);
        //             if(appState.remainingOxygen < 15 && appState.players[appState.currentPlayer].treasure.length > 2){
        //                 console.log(`WE'RE IN THE HEADING BACK, THERE'S TREASURE SECTION, FIRST IF`);
        //                 appAction({
        //                     type: ActionType.TREASURE_DROP_DECISION,
        //                 })
        //             } else if(!(appState.remainingOxygen < 15 && appState.players[appState.currentPlayer].treasure.length > 2)){
        //                 console.log(`WE'RE IN THE HEADING BACK, THERE'S TREASURE SECTION, SECOND IF`);
        //                 appAction({
        //                     type: ActionType.TREASURE_LEAVE_DECISION,
        //                 })
        //             }
        //         }
        //     }, 2000)
        // } 

        
        if(appState.currentStep === 'decided_leave_treasure' || appState.currentStep === 'decided_pickup_treasure' || appState.currentStep === 'decided_drop_treasure' || appState.currentStep === 'player_got_back'){
            // if(appState.currentStep === 'did_round_end'){
                if(appState.currentStep === 'decided_pickup_treasure'){
                    // setTimeout(() => {
                        setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} picked up the treasure!`);
                    // }, 2000);
                };
                if(appState.currentStep === 'decided_leave_treasure'){
                    // setTimeout(() => {
                        setAnnouncerInnerText(``);
                    // }, 2000);
                };
                if(appState.currentStep === 'decided_drop_treasure'){
                    // setTimeout(() => {
                        setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} dropped a treasure!`);
                    // }, 2000);
                };
                if(appState.currentStep === 'player_got_back'){
                    // setTimeout(() => {
                        setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} made it back!`);
                    // }, 2000);
                };
                
                // IF OXYGEN === 0 OR EVERYBODY IS IN THE SUBMARINE
                setTimeout(() => {
                if(appState.remainingOxygen === 0 || returnedPlayerIds.length === appState.players.length){
                let appStateClone = {...appState};
                let drownedPlayers = [];
                // END THE ROUND
                console.log(`END OF THE ROUND`)
                appAction({
                    type: ActionType.END_THE_ROUND
                })
                // IF OXYGEN !== 0, DO THIS INSTEAD, PROBABLY NEXT_PLAYER_TURN_LOGIC
            } else if(appState.remainingOxygen > 0 && returnedPlayerIds.length < appState.players.length){
                appAction({
                    type: ActionType.NEXT_PLAYER_LOGIC
                })
            }
            }, 2000);
        }

        if(appState.currentStep === 'next_player_logic'){
            console.log(`WE'RE IN NEXT PLAYER LOGIC SECTION`);
            if(appState.currentPlayer+1 === appState.players.length){
                appAction({
                    type: ActionType.NEXT_PLAYER_TURN,
                    payload: {
                        newCurrentPlayer: 0,
                    }
                })
            } 
            else {
                appAction({
                    type: ActionType.NEXT_PLAYER_TURN,
                    payload: {
                        newCurrentPlayer: appState.currentPlayer+1,
                    }
                })
            }
        }
            // setTimeout(() => {
            //         if(appState.currentPlayer+1 === appState.players.length){
            //             appAction({
            //                 type: ActionType.NEXT_PLAYER_TURN,
            //                 payload: {
            //                     newCurrentPlayer: 0,
            //                 }
            //             })
            //         } else {
                        
            //             appAction({
            //                 type: ActionType.NEXT_PLAYER_TURN,
            //                 payload: {
            //                     newCurrentPlayer: appState.currentPlayer+1,
            //                 }
            //             })
            //         }
            //     }, 2000)
            // }
        
    // } else {
    //     appAction({
    //         type: ActionType.SKIP_PLAYERS_GO,
    //     })
    // }
    // if(appState.currentStep === 'skip_players_turn'){
    //     if(appState.currentPlayer+1 === appState.players.length){
    //             appAction({
    //                 type: ActionType.NEXT_PLAYER_TURN,
    //                 payload: {
    //                     newCurrentPlayer: 0,
    //                 }
    //             })
    //         } else {
    //             appAction({
    //                 type: ActionType.NEXT_PLAYER_TURN,
    //                 payload: {
    //                     newCurrentPlayer: appState.currentPlayer+1,
    //                 }
    //             })
    //         }
    //     }
    if(appState.currentStep === 'end_of_round'){
        setAnnouncerInnerText(`The round is over!`);
        setTimeout(() => {
            setAnnouncerInnerText(`Calculating who won the round!`);
            let roundHighScore = 0;
            let roundWinner = '';
            for(let i = 0; i < appState.players.length; i++){
                if(appState.players[i].mapPosition === 0){
                    let newPlayerScore = appState.players[i].score;
                    appState.players[i].treasure.forEach((item) => {
                        newPlayerScore += item.value;
                    })
                    if(newPlayerScore > roundHighScore){
                        roundHighScore = newPlayerScore;
                        roundWinner = `${appState.players[i].name}`;
                    } else if (newPlayerScore === roundHighScore && roundHighScore !== 0){
                        roundWinner += ` and ${appState.players[i].name}`;
                    }
                    appAction({
                        type: ActionType.TALLY_SCORES,
                        payload: {
                            newPlayerScore: newPlayerScore,
                            playerToUpdate: i,
                        }
                    })
                }
            }
            setTimeout(() => {
                setAnnouncerInnerText(`${roundWinner} won the round!`);
            }, 2000)
        }, 2000)
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
            {/* {(appState.currentStep === 'deciding_direction' && appState.players[appState.currentPlayer].id === 1 && appState.players[appState.currentPlayer].mapPosition !== 0) ? <ForwardsOrBackwardsContainer /> : <></>} */}
            {(appState.currentStep === 'direction_logic' && appState.players[appState.currentPlayer].id === 1 && appState.players[appState.currentPlayer].mapPosition !== 0 && appState.players[appState.currentPlayer].direction === 'forwards') ? <ForwardsOrBackwardsContainer /> : <></>}
            {(appState.currentStep === 'rolling' || appState.currentStep === 'next_players_turn') && appState.players[appState.currentPlayer].id === 1 ? <RollTheDiceContainer /> : <></>}
            {appState.currentStep === 'moved' && appState.players[appState.currentPlayer].id === 1 && appState.players[appState.currentPlayer].mapPosition !== 0? <PickupTreasureContainer /> : <></>}
            <TealOverlay hidden={whoGoesFirstVisibility} />
            <WhoGoesFirst hidden={whoGoesFirstVisibility} /> 
        </div>
    )
}

export default GameContainer;