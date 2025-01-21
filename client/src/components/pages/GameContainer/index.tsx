import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
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
    let navigate = useNavigate();

    const handleEscapeButtonSubmit = () => {
        console.log(`We're clicking the escape button`);
        //navigate("/");
    }

    useEffect(() => {
        console.log(`The current appState.currentStep is - ${appState.currentStep}`);
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
        console.log(`The current appState.currentStep is - ${appState.currentStep}`);
        console.log(`The current announceInnextText is - ${announcerInnerText}`);
        if(appState.currentPlayer === -1) { 
            setAnnouncerInnerText('') 
        };

        if(appState.currentStep === 'is_player_in_sub'){
            let isPlayerInSub = false;
            returnedPlayerIds.forEach((id) => {
                if(id === appState.players[appState.currentPlayer].id){
                    isPlayerInSub = true;
                }
            })
            if(!isPlayerInSub){
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
                appAction({
                    type: ActionType.NEXT_PLAYER_LOGIC
                })
            }
        };

        if(appState.currentStep === 'direction_logic'){
            setTimeout(() => {
                if(appState.players[appState.currentPlayer].direction === 'backwards'){
                    appAction({
                        type: ActionType.DEEPER_OR_BACK,
                        payload: {
                            currentPlayer: appState.currentPlayer,
                            direction: 'backwards',
                        }
                    })
                } else if (appState.players[appState.currentPlayer].direction === 'forwards'){
                    if(appState.players[appState.currentPlayer].id === 1){
                        if(appState.players[appState.currentPlayer].mapPosition !== 0){
                            setAnnouncerInnerText('') 
                        } else if (appState.players[appState.currentPlayer].mapPosition === 0){
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
                        if(appState.players[appState.currentPlayer].mapPosition === 0){
                            setAnnouncerInnerText('')
                            appAction({
                                type: ActionType.DEEPER_OR_BACK,
                                payload: {
                                    direction: 'forwards',
                                    currentPlayer: appState.currentPlayer,
                                }
                            })
                        } else if (appState.players[appState.currentPlayer].mapPosition !== 0){
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
                setAnnouncerInnerText('') 
            } else if(appState.players[appState.currentPlayer].id !== 1){
                        setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} is rolling!`);
                setTimeout(() => {
                    appAction({
                        type: ActionType.ROLL_DICE,
                    })
                }, 2000);
            }
        };

        if(appState.currentStep === 'rolled'){
            setTimeout(() => {
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
                let playerMapPositions: PlayerMapPositions = {};
                for(let i = 0; i < appState.players.length; i++){
                    playerMapPositions[appState.players[i].mapPosition] = appState.players[i].id
                }
                let totalPlacesToMove = (appState.dice[0] + appState.dice[1]) - appState.players[appState.currentPlayer].treasure.length;
                let simulatedPlayerPosition = appState.players[appState.currentPlayer].mapPosition;
                if(appState.players[appState.currentPlayer].direction === 'forwards'){
                    if(totalPlacesToMove < 0){
                        totalPlacesToMove = 0;
                    }
                    for(let i = 0; i < totalPlacesToMove; i++){
                        if(playerMapPositions[simulatedPlayerPosition+1] !== undefined){
                            totalPlacesToMove++;
                        }
                        if(simulatedPlayerPosition === 32){
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
                    if(totalPlacesToMove < 0) {
                        totalPlacesToMove = 0;
                    } 
                    console.log(playerMapPositions);
                    for(let i = 0; i < totalPlacesToMove; i++){
                        if(playerMapPositions[simulatedPlayerPosition-1] !== undefined && playerMapPositions[simulatedPlayerPosition-1] !== appState.players[appState.currentPlayer].id){
                            totalPlacesToMove++;
                        }
                        if(simulatedPlayerPosition === 0){
                            totalPlacesToMove = i;
                        } else {
                            simulatedPlayerPosition--;
                        }
                    }
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
                            anyTreasureThere = true;
                        }
                        if(anyTreasureThere){
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
                                appAction({
                                    type: ActionType.TREASURE_LEAVE_DECISION,
                                })
                            }
                        } else if(!anyTreasureThere){
                            if(appState.remainingOxygen < 15 && appState.players[appState.currentPlayer].treasure.length > 2){
                                let newTileArray = [...appState.tiles];
                                let newPlayerTreasureArray = [...appState.players[appState.currentPlayer].treasure]
                                let treasureToBeDropped: any = {};
                                for(let i = 0; i < newPlayerTreasureArray.length; i++){
                                    if(newPlayerTreasureArray[i].type === 1){
                                        treasureToBeDropped = newPlayerTreasureArray[i];
                                    }
                                }
                                //This needs to be looked at. I think this is the last thing I worked on before the break and I'm not sure
                                //exactly what this code is supposed to do yet, or why the === {} value is empty. 
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
                                    return element !== treasureToBeDropped
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
        
        if(appState.currentStep === 'decided_leave_treasure' || appState.currentStep === 'decided_pickup_treasure' || appState.currentStep === 'decided_drop_treasure' || appState.currentStep === 'player_got_back'){
                if(appState.currentStep === 'decided_pickup_treasure'){
                    setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} picked up the treasure!`);
                };
                if(appState.currentStep === 'decided_leave_treasure'){
                    setAnnouncerInnerText(``);
                };
                if(appState.currentStep === 'decided_drop_treasure'){
                    setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} dropped a treasure!`);
                };
                if(appState.currentStep === 'player_got_back'){
                    setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} made it back!`);
                };
                
                setTimeout(() => {
                if(appState.remainingOxygen === 0 || returnedPlayerIds.length === appState.players.length){
                appAction({
                    type: ActionType.END_THE_ROUND
                })
            } else if(appState.remainingOxygen > 0 && returnedPlayerIds.length < appState.players.length){
                appAction({
                    type: ActionType.NEXT_PLAYER_LOGIC
                })
            }
            }, 2000);
        }

        if(appState.currentStep === 'next_player_logic'){
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
            <EscapeButton buttonFunction={handleEscapeButtonSubmit} style={{position: 'absolute', top: '15px', right: '0px'}} text={`X`}/>
            <HelpButton style={{position: 'absolute', top: '15px', right: '50px'}}/>
            <OxygenSubmarine style={{position: 'absolute', top: '20px', left: '500px'}}/>
            <OxygenMarker style={{position: 'absolute', top: oxygenTokenLocations[appState.remainingOxygen].top, left: oxygenTokenLocations[appState.remainingOxygen].left}}/>
            <AnnouncerContainer dice={<DiceContainer />} announcerMessage={<AnnouncerMessage text={announcerInnerText}/>}/>
            <ScoreBoardContainer />
            {(appState.currentStep === 'direction_logic' && appState.players[appState.currentPlayer].id === 1 && appState.players[appState.currentPlayer].mapPosition !== 0 && appState.players[appState.currentPlayer].direction === 'forwards') ? <ForwardsOrBackwardsContainer /> : <></>}
            {(appState.currentStep === 'rolling' || appState.currentStep === 'next_players_turn') && appState.players[appState.currentPlayer].id === 1 ? <RollTheDiceContainer /> : <></>}
            {appState.currentStep === 'moved' && appState.players[appState.currentPlayer].id === 1 && appState.players[appState.currentPlayer].mapPosition !== 0? <PickupTreasureContainer /> : <></>}
            <TealOverlay hidden={whoGoesFirstVisibility} />
            <WhoGoesFirst hidden={whoGoesFirstVisibility} /> 
        </div>
    )
}

export default GameContainer;