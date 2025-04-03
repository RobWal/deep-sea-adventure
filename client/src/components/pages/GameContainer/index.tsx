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
import LoadButton from '../../molecules/LoadButton';
import OxygenMarker from '../../atoms/OxygenMarker';
import TileLayout from '../../organisms/TileLayout';
import PlayerTokens from '../../molecules/PlayerTokens';
import WhoGoesFirst from '../../molecules/WhoGoesFirst';
import TealOverlay from '../../atoms/TealOverlay';
import RollTheDiceContainer from '../../molecules/RollTheDiceContainer';
import PickupTreasureContainer from '../../molecules/PickupTreasureContainer';
import ForwardsOrBackwardsContainer from '../../molecules/ForwardsOrBackwardsContainer';
import useSound from 'use-sound';
import bubbleClickSFX from '../../sfx/bubbleClick.mp3';

// util allows us to read nested objects in the console in a user friendly way, i.e. instead of '[object Object]', it will log '{Tiles:[type:1, value:2]}'.
const util = require('util');

export interface PlayerMapPositions {
    [index: number]: number
}

const GameContainer = () => {
    const [appState, appAction] = useContext(GameContext);
    const [whoGoesFirstVisibility, setWhoGoesFirstVisibility] = useState(true);
    const [tealOverlayVisibility, setTealOverlayVisibility] = useState(true);
    const [announcerInnerText, setAnnouncerInnerText] = useState("");
    let navigate = useNavigate();
    const gameSpeed = appState.gameSpeed;
    const soundUrl = bubbleClickSFX;
    const [play] = useSound(soundUrl, { playbackRate: 1.0});

    const playAudio = () => {
        const newPlaybackRate = (0.5 + Math.random());
        play({ playbackRate: newPlaybackRate});
    };

    const handleEscapeButtonSubmit = () => {
        playAudio();
    }

    const handleHelpButtonSubmit = () => {
        const currentGameSaveState = JSON.stringify(appState);
        localStorage.setItem(`currentGame`, `${currentGameSaveState}`);
        playAudio();
    }

    useEffect(() => {
        if(appState.currentStep === 'begin_prestart'){
            setTimeout(() => {
                setWhoGoesFirstVisibility(false);
                setTealOverlayVisibility(false);
            }, 2000/gameSpeed);
            setTimeout(() => {
                setWhoGoesFirstVisibility(true);
                setTealOverlayVisibility(true);
                // This sets appState.currentRound: 1, currentPlayer: 0, and currentStep: 'rolling'. 
                appAction({
                    type: ActionType.START_GAME
                });
            }, 7000/gameSpeed)
        }
    }, [appState.currentStep]);

    useEffect(() => {
        // INCREDIBLY HELPFUL CODE TO LET ME SEE THE ENTIRE APPSTATE IN A CONSOLE LOG. 
        // console.log(util.inspect(appState, {showHidden: false, depth: null, colors: false}));
        if(appState.currentPlayer === -1) { 
            setAnnouncerInnerText('') 
        };
        // This code checks to see if a player is in the submarine.
        if(appState.currentStep === 'is_player_in_sub'){
            let isPlayerInSub = false;
            appState.returnedPlayerIDs.forEach((id) => {
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

        if(appState.currentStep === 'direction_logic' || appState.currentStep === 'end_of_round_adjustments'){
            // console.log(util.inspect(appState, {showHidden: false, depth: null, colors: false}));
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
                            }, 2000/gameSpeed);
                        }
                    }
                }
            }, 2000/gameSpeed);
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
                }, 2000/gameSpeed);
            }
        };

        if(appState.currentStep === 'rolled'){
            setTimeout(() => {
                setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} ${appState.currentStep} a ${appState.dice[0] + appState.dice[1]}!`);
                setTimeout(() => {
                    appAction({
                        type: ActionType.SHOW_DICE_RESULTS,
                    })
                }, 2000/gameSpeed);
            }, 2000/gameSpeed);
        };
        
        if(appState.currentStep === 'moving'){
            setTimeout(() => {
                let playerMapPositions: PlayerMapPositions = {};
                for(let i = 0; i < appState.players.length; i++){
                    playerMapPositions[appState.players[i].mapPosition] = appState.players[i].id;
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
            }, 2000/gameSpeed);
        };
        
        if(appState.currentStep === 'moved'){
            setTimeout(() => {
            if(appState.players[appState.currentPlayer].id === 1){
                if(appState.players[appState.currentPlayer].mapPosition === 0){
                    appAction({
                        type: ActionType.PLAYER_GOT_BACK,
                        payload: {
                            returnedPlayerID: appState.players[appState.currentPlayer].id
                        },
                    })
                }
            } else if (appState.players[appState.currentPlayer].id !== 1){
                    let anyTreasureThere = false;
                    // If the player moved and they arrived at the submarine, run ActionType.PLAYER_GOT_BACK.
                    if(appState.players[appState.currentPlayer].mapPosition === 0){
                        let newReturnedPlayers = [...appState.returnedPlayerIDs];
                            newReturnedPlayers.push(appState.players[appState.currentPlayer].id)
                        appAction({
                            type: ActionType.PLAYER_GOT_BACK,
                            payload: {
                                returnedPlayerID: appState.players[appState.currentPlayer].id
                            },
                        });
                    } 
                    // If the player moved and they are NOT in the submarine.. 
                    else if(appState.players[appState.currentPlayer].mapPosition !== 0){
                        // If the location of the player does have a tile there (i.e. tile.type !== 0), set anyTreasureThere to true. 
                        if(appState.tiles[appState.players[appState.currentPlayer].mapPosition-1].type !== 0){
                            anyTreasureThere = true;
                        }
                        // If there is treasure there..
                        if(anyTreasureThere){
                            // Run some basic logic to check and see if the player should risk picking up the treasure.
                            
                            // The logic here needs to be refined to take into account the amount of players currently playing, which 
                            // alters how quickly oxygen depletes. Currently it only checks the remaining oxygen and the treasure the player
                            // is carrying. 
                            // SEO revisit logic treasure pickup needs work ai strategy 

                            // If true, the conditions are met and the AI will pick up the treasure. 
                            if(appState.remainingOxygen > 15 && appState.players[appState.currentPlayer].treasure.length< 3){
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
                            } 
                            // Else if false, the AI will leave the treasure there. 
                            else {
                                appAction({
                                    type: ActionType.TREASURE_LEAVE_DECISION,
                                })
                            }
                        } 
                        // If there is no treasure there, the AI may leave a treasure token if they are behind and carrying too much treasure. 
                        else if(!anyTreasureThere){
                            if(appState.remainingOxygen < 15 && appState.players[appState.currentPlayer].treasure.length> 2){
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
                                // if(treasureToBeDropped === {}){
                                //     for(let i = 0; i < newPlayerTreasureArray.length; i++){
                                //         if(newPlayerTreasureArray[i].type === 2){
                                //             treasureToBeDropped = newPlayerTreasureArray[i];
                                //         }
                                //     }
                                // }
                                // if(treasureToBeDropped === {}){
                                //     for(let i = 0; i < newPlayerTreasureArray.length; i++){
                                //         if(newPlayerTreasureArray[i].type === 3){
                                //             treasureToBeDropped = newPlayerTreasureArray[i];
                                //         }
                                //     }
                                // }
                                // if(treasureToBeDropped === {}){
                                //     for(let i = 0; i < newPlayerTreasureArray.length; i++){
                                //         if(newPlayerTreasureArray[i].type === 4){
                                //             treasureToBeDropped = newPlayerTreasureArray[i];
                                //         }
                                //     }
                                // }
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
                            } else if(!(appState.remainingOxygen < 15 && appState.players[appState.currentPlayer].treasure.length> 2)){
                                appAction({
                                    type: ActionType.TREASURE_LEAVE_DECISION,
                                })
                            }
                        }
                    }
                }
            }, 2000/gameSpeed)
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
                // This code checks to see whether it's the end of the round (SEO END_THE_ROUND end_of_round)
                if(appState.remainingOxygen === 0 || appState.returnedPlayerIDs.length === appState.players.length){
                appAction({
                    type: ActionType.END_THE_ROUND
                })
                } else if(appState.remainingOxygen > 0 && appState.returnedPlayerIDs.length < appState.players.length){
                    appAction({
                        type: ActionType.NEXT_PLAYER_LOGIC
                    })
                }
            }, 2000/gameSpeed);
        };

        if(appState.currentStep === 'next_player_logic'){
            if(appState.currentPlayer+1 === appState.players.length){
                appAction({
                    type: ActionType.NEXT_PLAYER_TURN,
                    payload: {
                        newCurrentPlayer: 0,
                    }
                });
            } 
            else {
                appAction({
                    type: ActionType.NEXT_PLAYER_TURN,
                    payload: {
                        newCurrentPlayer: appState.currentPlayer+1,
                    }
                });
            };
        };

        if(appState.currentStep === 'end_of_round'){
            setAnnouncerInnerText(`The round is over!`);
            // This setTimeout allows 'The round is over!' to briefly display before moving on
            setTimeout(() => {
                // TO DO - The game needs to check.. I've forgotten what. But there nee.. oh yep, needs to check if it's the last round. 
                
                // Checking to see if the game ended due to a lack of oxygen, i.e. not everybody made it back.
                if(appState.remainingOxygen === 0){
                    setAnnouncerInnerText(`The oxygen ran out!`);
                }
                // Checking to see if the game ended due to everybody making it back to the submarine. 
                else if(appState.returnedPlayerIDs.length === appState.players.length){
                    setAnnouncerInnerText(`Everyone made it back!`);
                };
                setTimeout(() => {
                    setAnnouncerInnerText(`Let's prepare the board for round ${appState.currentRound+1}!`);
                    appAction({
                        type: ActionType.CLEAN_UP_THE_DROWNED,
                    });
                }, 2000/gameSpeed);
            }, 2000/gameSpeed);
        };

        if(appState.currentStep === 'clean_up_the_drowned'){
            // If nobody drowned, skip announcing who drowned.
            let newTileArray = JSON.parse(JSON.stringify(appState.tiles));
            const playersArrayByMapPosition =  JSON.parse(JSON.stringify(appState.players)).sort((a: any, b: any) => b.mapPosition - a.mapPosition);
            if(appState.returnedPlayerIDs.length === appState.players.length){} 
            // If somebody drowned, work out who did and announce it via setAnnouncerInnerText
            else if (appState.returnedPlayerIDs.length !== appState.players.length){
                // Declare a variable that lets us set the location for the tiles of drowned players, i.e. to the 
                // end of the tile array.
                let drownedTilesNewMapPosition = appState.tiles.length + 1;
                for(const player of playersArrayByMapPosition){
                    if(player.mapPosition !== 0){
                        for(let i = 0; i < player.treasure.length; i++){
                            player.treasure[i].location = drownedTilesNewMapPosition;
                            newTileArray.push(player.treasure[i]);
                        };
                    };
                    drownedTilesNewMapPosition ++;
                };
                setTimeout(() => {
                    let drownedPlayersText = ``;
                    for(let i = 0; i < appState.players.length; i++){
                        if(appState.players[i].mapPosition !== 0){
                            // If names added === 0;
                            // If there have been no names added to the string, add the first name, making the string "<name> drowned."
                            if(drownedPlayersText === ``){
                                drownedPlayersText += appState.players[i].name;
                            }
                            // If names added => 2;
                            // If the string includes 'and', that means there are at least two names in the string, i.e. "Matt and Ashley 
                            // drowned.", so the function will add to the list by adding "<name>,".
                            else if (drownedPlayersText.includes(`and`)){
                                drownedPlayersText = `${appState.players[i].name}, ${drownedPlayersText}`;
                            } 
                            // If names added === 1;
                            // If the string is not empty, does not include a `,` or `and`, it must mean the string is currently `<name> drowned.`.
                            else if (drownedPlayersText !== `` && !drownedPlayersText.includes(`,`) && !drownedPlayersText.includes(`and`)){
                                drownedPlayersText += ` and ${appState.players[i].name}`;
                            }
                        };
                    };
                    drownedPlayersText = `${drownedPlayersText} drowned.`;
                    setAnnouncerInnerText(`${drownedPlayersText}`);
                }, 2000/gameSpeed);
            };

            // Deep clone the appState.players array, in order to set everyones mapPosition = 0, to update the appState.
            // This is also used to set the direction for each player back to 'forwards' for the beginning of a new round. 
            setTimeout(() => {
                let newPlayerArray = JSON.parse(JSON.stringify(appState.players));
                console.log(util.inspect(appState, {showHidden: false, depth: null, colors: false}));
                for(let i = 0; i < newPlayerArray.length; i ++){
                    if(newPlayerArray[i].mapPosition !== 0){
                        newPlayerArray[i].mapPosition = 0;
                        newPlayerArray[i].treasure = [];
                        newPlayerArray[i].direction = 'forwards';
                    } 
                    else {
                        for(let j = 0; j < newPlayerArray[i].treasure.length; j++){
                            newPlayerArray[i].securedTreasure.push(newPlayerArray[i].treasure[j]);
                            
                        };
                    };
                };
                console.log(util.inspect(newPlayerArray, {showHidden: false, depth: null, colors: false}));
                appAction({
                    type: ActionType.MOVE_DROWNED_PLAYERS_HOME,
                    payload: {
                        newPlayersArray: newPlayerArray,
                        newTileArray: newTileArray,
                        farthestFromTheSub: playersArrayByMapPosition[0].id,
                    }
                });
            }, 4000/gameSpeed);
        };

        if(appState.currentStep === 'move_drowned_players_home'){
            // Deep clone the appState.tiles, in order to loop through the tiles array and remove any tiles where type===0,
            // before sending it to application-context. 
            setTimeout(() => {
                let newTileArray = JSON.parse(JSON.stringify(appState.tiles));
                let tilePositionCounter = 1;
                // Loop through the newTileArray, using a modifiable appState.tilesArrayLength to iterate through.
                let treasureLoopCounter = appState.tilesArrayLength;
                for(let i = 0; i < treasureLoopCounter; i ++){
                    // Remove any tiles that have tile type === 0 i.e. they were taken by a player. 
                    if(newTileArray[i].type === 0){
                        newTileArray.splice(i, 1);
                        i--;
                        treasureLoopCounter--;
                    }
                    // If the tile is not empty, set the tile location to the next position in the tile array. 
                    else if(newTileArray[i].type !== 0){
                        newTileArray[i].location = tilePositionCounter;
                        tilePositionCounter ++;
                    };
                };

                setTimeout(() => {
                    // Having removed all empty tiles, we now loop through the tile array in order to find the first tile 
                    // that doesn't belong to this rounds original array, by comparing the tile.location to treasureLoopCounter.
                    for(const tile of newTileArray){
                        // Once we find the first tile that doesn't belong to the original tile array, set its location as 
                        // the locationBundlerValue, to find any other tiles in the array that match. 
                        if(tile.location > treasureLoopCounter){
                            let locationBundlerValue = tile.location;
                            // Loop through the array again, looking for any tiles that matches the location of the tile that
                            // doesn't belong to the original game tile array, including the one originally found above.
                            // Once found, its location as set to the end of the tile array (treasureLoopCounter+1). 
                            for(const subTile of newTileArray){
                                if(subTile.location === locationBundlerValue){
                                    subTile.location = treasureLoopCounter+1;
                                };
                            };
                            // After moving the tile(s), add 1 to the treasureLoopCounter to iterate through the array again to find any 
                            // more drowned player treasure tiles, and to increment where to place the next tile(s).
                            treasureLoopCounter++;
                        };
                    };
                    appAction({
                        type: ActionType.REMOVE_EMPTY_TILE_LOCATIONS,
                        payload: {
                            newTileArray: newTileArray,
                        }
                    });
                }, 4000/gameSpeed);
            }, 2000/gameSpeed);
        };

        if(appState.currentStep === 'remove_empty_tile_locations'){
            // If someone drowned, i.e. If the amount of players who made it home is less than the total players, 
            // shuffle the player order around till the farthest person from the sub is the person going first in the next round.
            
            // This will need to be revisited when working on the game logic that executes at the end of the game, as it will
            // be unnecessary. 

            // END_OF_ROUND_ADJUSTMENTS also changes the remainingOxygen, currentRound, currentPlayer, returnedPlayerIDs, 
            // farthestFromTheSub, tileArrayLength, 
            setTimeout(() => {
                // Iterate through the appState.tiles array, to figure out the length of the new array to be updated
                // for the new round. 
                let newTileArrayLength = 0;
                for(let i = 0; i < appState.tiles.length; i++){
                    if(appState.tiles[i].location === 1){
                        newTileArrayLength = 1;
                    }
                    else if(appState.tiles[i].location !== appState.tiles[i-1].location){
                        newTileArrayLength ++;
                    }
                }
                // Set a new variable to update the appState.currentRound. 
                // If someone drowned, loop through the player array and shuffle the order so that the furthest from the sub goes first. 
                const newCurrentRound = appState.currentRound + 1;
                // Make a deep clone of the appState.players array, to iterate through, shuffling who is first until
                // the player who is first, is the player who was the furthest from the submarine. 
                const reorderedPlayersArray =  JSON.parse(JSON.stringify(appState.players));
                if(appState.returnedPlayerIDs.length < appState.players.length){
                    while(reorderedPlayersArray[0].id !== appState.farthestFromTheSub){
                        reorderedPlayersArray.unshift(reorderedPlayersArray[reorderedPlayersArray.length-1]);
                        reorderedPlayersArray.pop();
                    };
                    setAnnouncerInnerText(`${reorderedPlayersArray[0].name} is going first this round!`);
                }

                // Loop through the reorderedPlayersArray and set everybody's direction to 'forwards'. 
                // console.log(util.inspect(appState, {showHidden: false, depth: null, colors: false}));
                for(const player of reorderedPlayersArray){
                    player.direction = 'forwards';
                };

                // Submit the changes made to the players array, update the currentRound, and the tilesArrayLength.
                appAction({
                    type: ActionType.END_OF_ROUND_ADJUSTMENTS,
                    payload: {
                        reorderedPlayersArray: reorderedPlayersArray,
                        currentRound: newCurrentRound,
                        tilesArrayLength: newTileArrayLength,
                    }
                });
            }, 2000/gameSpeed);
        };

        // if(appState.currentStep === 'end_of_round_adjustments'){
        //     console.log(util.inspect(appState, {showHidden: false, depth: null, colors: false}));
        // }

        // THIS IS CURRENTLY COMMENTED OUT TO TRY AND IMPLEMENT A THREE ROUND GAME. AN ADJUSTED COPY OF THIS OLD CODE IS BEING USED ABOVE FOR THE EXTRA ROUNDS FEATURE.  
        // THE CODE BELOW CAN BE USED LATER WHEN DETERMINING WHO WON AT THE END OF THE GAME.

        // if(appState.currentStep === 'end_of_round'){
        //     setAnnouncerInnerText(`The round is over!`);
        //     // This setTimeout allows 'The round is over!' to briefly display before moving on
        //     setTimeout(() => {
        //         setAnnouncerInnerText(`Calculating who won the round!`);
        //         // 'roundHighScore' is used to determined who won in a single round version of the game.
        //         let roundHighScore = 0;
        //         // 'roundWinner' allows us to assign the highest scorer as the winner in a single round version of the game.
        //         let roundWinner = '';
        //         // Loop through the players in the game. 
        //         for(let i = 0; i < appState.players.length; i++){
        //             // If the player made it back to the submarine.
        //             if(appState.players[i].mapPosition === 0){
        //                 // 'newPlayerScore' acts as a place to store the total points of each player as we loop through the player array.
        //                 let newPlayerScore = appState.players[i].score;
        //                 // Loop through the loops current players current tokens and add it to their score. 
        //                 appState.players[i].treasure.forEach((item) => {
        //                     newPlayerScore += item.value;
        //                 })
        //                 // Check if the loops current player beats the high score, if so, make it the high score. 
        //                 if(newPlayerScore > roundHighScore){
        //                     roundHighScore = newPlayerScore;
        //                     roundWinner = `${appState.players[i].name}`;
        //                 } else if (newPlayerScore === roundHighScore && roundHighScore !== 0){
        //                     roundWinner += ` and ${appState.players[i].name}`;
        //                 }
        //                 // TALLY_SCORES triggers for each player in the player array, with the playerToUpdate communicating
        //                 // which is the correct player to update. 
        //                 appAction({
        //                     type: ActionType.TALLY_SCORES,
        //                     payload: {
        //                         newPlayerScore: newPlayerScore,
        //                         playerToUpdate: i,
        //                     }
        //                 })
        //             }
        //         }
        //         setTimeout(() => {
        //             setAnnouncerInnerText(`${roundWinner} won the round!`);
        //         }, 2000/gameSpeed)
        //     }, 2000/gameSpeed)
        // };
    }, [appState.currentStep]);

    return (
        <div className="game-container">
            <TileLayout />
            <PlayerTokens />
            <EscapeButton buttonFunction={handleEscapeButtonSubmit} style={{position: 'absolute', top: '15px', right: '0px'}}/>
            {/* <HelpButton buttonFunction={handleLoadButtonSubmit} style={{position: 'absolute', top:'5px', right:'245px', margin:'15px', zIndex:'1'}}/> */}
            <LoadButton buttonFunction={handleHelpButtonSubmit} style={{position: 'absolute', top: '15px', right: '50px'}}/>
            <OxygenSubmarine style={{position: 'absolute', top: '20px', left: '500px'}}/>
            <OxygenMarker style={{position: 'absolute', top: oxygenTokenLocations[appState.remainingOxygen].top, left: oxygenTokenLocations[appState.remainingOxygen].left}}/>
            <AnnouncerContainer dice={<DiceContainer />} announcerMessage={<AnnouncerMessage text={announcerInnerText}/>}/>
            <ScoreBoardContainer />
            {(appState.currentStep === 'direction_logic' && appState.players[appState.currentPlayer].id === 1 && appState.players[appState.currentPlayer].mapPosition !== 0 && appState.players[appState.currentPlayer].direction === 'forwards') ? <ForwardsOrBackwardsContainer /> : <></>}
            {(appState.currentStep === 'rolling' || appState.currentStep === 'next_players_turn') && appState.players[appState.currentPlayer].id === 1 ? <RollTheDiceContainer /> : <></>}
            {appState.currentStep === 'moved' && appState.players[appState.currentPlayer].id === 1 && appState.players[appState.currentPlayer].mapPosition !== 0? <PickupTreasureContainer /> : <></>}
            <TealOverlay hidden={tealOverlayVisibility} />
            <WhoGoesFirst hidden={whoGoesFirstVisibility} /> 
        </div>
    )
}

export default GameContainer;