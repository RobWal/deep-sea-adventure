import { useContext, useEffect, useState } from 'react';
// import { useNavigate } from "react-router-dom";
import AnnouncerMessage from '../../atoms/AnnouncerMessage';
import OxygenSubmarine from '../../atoms/VisualAssets/OxygenSubmarine';
import DiceContainer from '../../molecules/DiceContainer';
import AnnouncerContainer from '../../organisms/AnnouncerContainer';
import './GameContainer.css'
import {
    ActionType,
    GameContext,
    // GameContextReducer,
    // DefaultGameState,
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
import TealOverlayEndGame from '../../atoms/TealOverlayEndGame';

// util allows us to read nested objects in the console in a user friendly way, i.e. instead of '[object Object]', it will log '{Tiles:[type:1, value:2]}'.
const util = require('util');
// INCREDIBLY HELPFUL CODE TO LET ME SEE THE ENTIRE APPSTATE IN A CONSOLE LOG. 
// console.log(util.inspect(appState, {showHidden: false, depth: null, colors: false}));
        

export interface PlayerMapPositions {
    [index: number]: number
}

const GameContainer = () => {
    const [appState, appAction] = useContext(GameContext);
    const [whoGoesFirstVisibility, setWhoGoesFirstVisibility] = useState(true);
    const [tealOverlayVisibility, setTealOverlayVisibility] = useState(true);
    const [tealOverlayEndGameStyle, setTealOverlayEndGameStyle] = useState('teal-overlay-end-game-invisible');
    const [announcerInnerText, setAnnouncerInnerText] = useState("");
    // let navigate = useNavigate();
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
            }, 1000/gameSpeed);
            setTimeout(() => {
                setWhoGoesFirstVisibility(true);
                setTealOverlayVisibility(true);
                // This sets appState.currentRound: 1, currentPlayer: 0, and currentStep: 'rolling'. 
                appAction({
                    type: ActionType.START_GAME
                });
            }, 4000/gameSpeed)
        }
    }, [appState.currentStep]);

    useEffect(() => {
        if(appState.currentPlayer === -1) { 
            setAnnouncerInnerText('') 
        };

        if(appState.currentStep === 'is_player_in_sub'){
            let isPlayerInSub = false;
            appState.returnedPlayerIDs.forEach((id) => {
                if(id === appState.players[appState.currentPlayer].id){
                    isPlayerInSub = true;
                };
            });
    
            if(!isPlayerInSub){
                let newOxygenLevel =  (appState.remainingOxygen) - appState.players[appState.currentPlayer].treasurePickups;
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

        if(appState.currentStep === 'direction_logic' || (appState.currentStep === 'end_of_round_adjustments' && appState.currentRound !== 4)){
            setTimeout(() => {
                if(appState.players[appState.currentPlayer].direction === 'backwards'){
                    appAction({
                        type: ActionType.DEEPER_OR_BACK,
                        payload: {
                            currentPlayer: appState.currentPlayer,
                            direction: 'backwards',
                        }
                    })
                } 
                else if (appState.players[appState.currentPlayer].direction === 'forwards'){
                    // Below is the logic for the human player (player one)
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
                    } 
                    // Below is the logic for bot players
                    else if (appState.players[appState.currentPlayer].id !== 1){
                        // If the bot is already home, do nothing
                        if(appState.players[appState.currentPlayer].mapPosition === 0){
                            setAnnouncerInnerText('')
                            appAction({
                                type: ActionType.DEEPER_OR_BACK,
                                payload: {
                                    direction: 'forwards',
                                    currentPlayer: appState.currentPlayer,
                                }
                            })
                        } 
                        // If the bot is not in the submarine..
                        else if (appState.players[appState.currentPlayer].mapPosition !== 0){
                            // setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} is deciding whether to turn back!`);
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
                                    playerDecision = 'backwards';
                                    // setTimeout(() => {
                                        setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} is going back!`);
                                    // }, 2000/gameSpeed);
                                } 
                                else {
                                    playerDecision = 'forwards';
                                    // setTimeout(() => {
                                        setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} is going deeper!`);
                                    // }, 2000/gameSpeed);
                                }
                                appAction({
                                    type: ActionType.DEEPER_OR_BACK,
                                    payload: {
                                        currentPlayer: appState.currentPlayer,
                                        direction: playerDecision,
                                    }
                                })
                            }, 500/gameSpeed);
                        }
                    }
                }
            }, 1500/gameSpeed);
        };

        if(appState.currentStep === 'rolling'){
            if(appState.players[appState.currentPlayer].id === 1){
                setAnnouncerInnerText('') 
            } else if(appState.players[appState.currentPlayer].id !== 1){
                setTimeout(() => {
                    setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} is rolling!`);
                }, 1000/gameSpeed);  
                setTimeout(() => {
                    appAction({
                        type: ActionType.ROLL_DICE,
                    })
                }, 1500/gameSpeed);
            }
        };

        if(appState.currentStep === 'rolled'){
            setTimeout(() => {
                setAnnouncerInnerText(`${appState.players[appState.currentPlayer].name} ${appState.currentStep} a ${appState.dice[0] + appState.dice[1]}!`);
                setTimeout(() => {
                    appAction({
                        type: ActionType.SHOW_DICE_RESULTS,
                    })
                }, 500/gameSpeed);
            }, 500/gameSpeed);
        };
        
        if(appState.currentStep === 'moving'){
            setTimeout(() => {
                // The code below creates an object filled with key value pairs of playerMapPositions : playerIDs 
                // to be used later on when determining how many places the moving player should move. 
                let playerMapPositions: PlayerMapPositions = {};
                for(let i = 0; i < appState.players.length; i++){
                    playerMapPositions[appState.players[i].mapPosition] = appState.players[i].id;
                };
                
                // The code below determines what the last available tile is for players to land on, to ensure that 
                // players piling up at the end of the tile array do not stack on top of each other. 
                let lastAvailableTilePosition = 0;
                // Loop through the tile array from last to first.
                for(let i = appState.tiles.length - 1; i > 0; i--){
                    // While looping through the tile array backwards, if the location of the tile exists in the playerMapPositions 
                    // array, i.e. there is someone there, it does not qualify as a valid 'lastAvailableTilePostion'.
                    if(playerMapPositions[appState.tiles[i].location]){
                        // Do nothing
                    }
                    // If the location of the tile in the tile array doesn't exist on the playerMapPositions hashmap,
                    // this is a valid location for lastAvailableTilePosition. 
                    else if(!playerMapPositions[appState.tiles[i].location]){
                        lastAvailableTilePosition = appState.tiles[i].location;
                        i -= 50;
                    };
                };
                
                let totalPlacesToMove = (appState.dice[0] + appState.dice[1]) - appState.players[appState.currentPlayer].treasurePickups;
                let simulatedPlayerPosition = appState.players[appState.currentPlayer].mapPosition;
                if(appState.players[appState.currentPlayer].direction === 'forwards'){
                    // In the event that the player has more tiles in their inventory than pips on their movement dice,
                    // e.g. they roll a 2 and they have 3 treasures, this ensures they don't 'move backwards'. 
                    if(totalPlacesToMove < 0){
                        totalPlacesToMove = 0;
                    }
                    if(totalPlacesToMove > 0){
                        // Iterate the moving player through their steps, checking to see whether there's a player to 
                        // 'hop' over or not. If there is, increase the places to move by 1, else, move as normal. 
                        for(let i = 0; i < totalPlacesToMove; i++){
                            // Check to see if the position of the player is > or < the location of the last available
                            // tile in the tile array. 

                            // If the player is further along in the tile array than the last available tile,
                            // do not move them anywhere. 
                            // This is most likely to be the case if the player is either occupying the last tile space,
                            // or is part of a line of players at the end of the tile array. 
                            if(simulatedPlayerPosition >= lastAvailableTilePosition){
                                // Break the loop by increasing i by 10, and do nothing
                                i += 10; 
                            }
                            // Check to see if the next simiulated step is a tile occupied by a player. IF NOT, increase
                            // their simulatedPlayerPosition by one. 
                            else if(playerMapPositions[simulatedPlayerPosition+1] === undefined){
                                simulatedPlayerPosition++;
                            }
                            // Check to see if the next simulated step is a tile occupied by a player. IF SO, increase 
                            // their move count by one, and their simulatedPlayerPosition by one. 
                            else if(playerMapPositions[simulatedPlayerPosition+1] !== undefined){
                                totalPlacesToMove++;
                                simulatedPlayerPosition++;
                            };
                        };
                    };
                    appAction({
                        type: ActionType.MOVE_PLAYER_TOKEN,
                        payload: {
                            newMapPosition: simulatedPlayerPosition,
                            playerToMove: appState.currentPlayer,
                        }
                    })
                } 
                else if(appState.players[appState.currentPlayer].direction === 'backwards'){
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
            }, 1000/gameSpeed);
        };
        
        if(appState.currentStep === 'moved'){
            setTimeout(() => {
            if(appState.players[appState.currentPlayer].id === 1){
                // This executes if the current player is a person, and they made it back to the submarine. 
                // I'm not entirely sure why this check is necessary as a separate entity, but I will have to 
                // revisit it later. 
                // SEO revise fix to do code refactoring 
                if(appState.players[appState.currentPlayer].mapPosition === 0){
                    appAction({
                        type: ActionType.PLAYER_GOT_BACK,
                        payload: {
                            returnedPlayerID: appState.players[appState.currentPlayer].id
                        },
                    });
                };
            }
            else if (appState.players[appState.currentPlayer].id !== 1){
                    let anyTreasureThere = false;
                    // If the player (who isn't player 1) moved and they arrived at the submarine, 
                    // run ActionType.PLAYER_GOT_BACK.
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
                    // If the player, real or AI, moved and they are NOT in the submarine.. 
                    else if(appState.players[appState.currentPlayer].mapPosition !== 0){
                        // If the location of the player does have a tile there (i.e. tile.type !== 0), set anyTreasureThere to true. 
                        for(let i = 0; i < appState.tiles.length; i++){
                            if(appState.tiles[i].location === appState.players[appState.currentPlayer].mapPosition && appState.tiles[i].type !== 0){
                                anyTreasureThere = true;
                            }
                        }
                        // If there is treasure there..
                        if(anyTreasureThere){
                            // Run some basic logic to check and see if the player should risk picking up the treasure.
                            
                            // The logic here needs to be refined to take into account the amount of players currently playing, which 
                            // alters how quickly oxygen depletes. Currently it only checks the remaining oxygen and the treasure the player
                            // is carrying. 
                            // SEO revisit logic treasure pickup needs work ai strategy 

                            // If true, the conditions are met and the AI will pick up the treasure. 
                            if(appState.remainingOxygen > 15 && appState.players[appState.currentPlayer].treasure.length < 3){
                                let newPlayerTreasureArray = [...appState.players[appState.currentPlayer].treasure]
                                let newTileArray = [...appState.tiles];
                                // This line of code right here is the one responsible for adding the treasure from the treasure
                                // tile layout, into the players inventory. 
                                for(let i = 0; i < newTileArray.length; i++){
                                    if(newTileArray[i].location === appState.players[appState.currentPlayer].mapPosition){
                                        newPlayerTreasureArray.push(newTileArray[i]);
                                        newTileArray.splice(i, 1);
                                        i--;
                                    };
                                };
                                // This code inserts a type 0 treasure tile into the treasure array to replace the picked up treasure. 
                                // It works by iterating through the treasure tiles, checking the treasure tile location against the players 
                                // position. Once the tile position > the player position, it inserts a type 0 tile in the previous spot. 

                                // Unfortunately, the exception to this rule is when the player lands on the very last spot. Once the 
                                // player picks up that treasure, the tiles only go to X, where the player position is X+1, meaning the 
                                // condition is never met. This necessitates the first if check. 
                                
                                // If the tile being picked up is the last tile in the array, creating a situation where the 
                                // player map position is > the position of the last tile in the treasure tile array.
                                if(newTileArray[newTileArray.length-1].location < appState.players[appState.currentPlayer].mapPosition){
                                    newTileArray.push ({
                                        type: 0,
                                        location: appState.players[appState.currentPlayer].mapPosition,
                                    });
                                }
                                else if(newTileArray[newTileArray.length-1].location >= appState.players[appState.currentPlayer].mapPosition){
                                    for(let i = 0; i < newTileArray.length; i++){
                                        if(newTileArray[i].location > appState.players[appState.currentPlayer].mapPosition){
                                            newTileArray.splice(i, 0, 
                                                {
                                                    type: 0,
                                                    location: appState.players[appState.currentPlayer].mapPosition,
                                                }
                                            );
                                            i += 50;
                                        };
                                    };
                                };
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
                        // If there is no treasure where the player landed, the AI will decide what to do. 
                        else if(!anyTreasureThere){
                            // The line below is 'the AI deciding what to do', it's an incredibly simplistic check, and 
                            // will need to be more robust to account for things like the number of players. 
                            if(appState.remainingOxygen < 15 && appState.players[appState.currentPlayer].treasure.length > 2){
                                let newTileArray = [...appState.tiles];
                                let newPlayerTreasureArray = [...appState.players[appState.currentPlayer].treasure]
                                let treasureToBeDropped: any = [];
                                let iDOfTileToBeSpliced = 0;
                                // If the current player opting to drop a treasure has a treasure of type 1, drop that treasure
                                // as a priority. 
                                // The below code loops through the player treasure array, and selected the lowest value tile to drop. 
                                // First, it identifies which tile to drop (treasureToBeDropped), and then it removes it 
                                // (newPlayerTreasureArray.splice(i, 1))
                                for(let i = 0; i < newPlayerTreasureArray.length; i++){
                                    // If the tile[i] is type 1, drop that treasure. 
                                    if(newPlayerTreasureArray[i].type === 1){
                                        treasureToBeDropped[0] = newPlayerTreasureArray[i];
                                        iDOfTileToBeSpliced = newPlayerTreasureArray[i].id;
                                    } 
                                    // If tile[i] isn't type 1, but the treasureToBeDropped is empty, make it this treasure. 
                                    else if(JSON.stringify(treasureToBeDropped) === "[]"){
                                        treasureToBeDropped[0] = newPlayerTreasureArray[i];
                                        iDOfTileToBeSpliced = newPlayerTreasureArray[i].id;
                                    }
                                    // 
                                    else if(treasureToBeDropped.length !== 0){
                                        if(treasureToBeDropped[0].type > newPlayerTreasureArray[i].type){
                                            treasureToBeDropped[0] = newPlayerTreasureArray[i];
                                            iDOfTileToBeSpliced = newPlayerTreasureArray[i].id;
                                        };
                                    };
                                };
                                // This code is responsible for removing the empty tile from the location the players tile 
                                // will be dropped. It loops through the tile array to find the current tile that matches 
                                // the current players location, and removes it from the array. 
                                for(let i = 0; i < newTileArray.length; i++){
                                    if(newTileArray[i].location === appState.players[appState.currentPlayer].mapPosition){
                                        newTileArray.splice(i, 1);
                                        // At the same time, it adds the treasure selected to be dropped by the above logic 
                                        // and inserts it into the treasure tile array, by looping through the current players
                                        // treasure array and matching it against the ID. 
                                        for(let j = 0; j < newPlayerTreasureArray.length; j++){
                                            if(newPlayerTreasureArray[j].id === iDOfTileToBeSpliced){
                                                newPlayerTreasureArray[j].location = appState.players[appState.currentPlayer].mapPosition;
                                                newTileArray.splice(i, 0, newPlayerTreasureArray[j]);
                                                newPlayerTreasureArray.splice(j, 1);
                                            };
                                        }
                                    };
                                };

                                // I have no idea what the below code does. 
                                // Commenting it out to see if it breaks anything, fingers crossed! I'll keep it just in case.
                                // newPlayerTreasureArray = newPlayerTreasureArray.filter(function(element) {
                                //     return element !== treasureToBeDropped
                                // })

                                appAction({
                                    type: ActionType.TREASURE_DROP_DECISION,
                                    payload: {
                                        currentPlayer: appState.currentPlayer,
                                        newPlayerTreasureArray: newPlayerTreasureArray,
                                        newTileArray: newTileArray,
                                    }
                                })
                            } 
                            else if(!(appState.remainingOxygen < 15 && appState.players[appState.currentPlayer].treasure.length> 2)){
                                appAction({
                                    type: ActionType.TREASURE_LEAVE_DECISION,
                                })
                            }
                        }
                    }
                }
            }, 1000/gameSpeed)
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
            }, 1000/gameSpeed);
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
                    // If it is currently round 3, we don't need to prepare for round 4. 
                    if(appState.currentRound === 3){
                        // Do nothing
                    }
                    else if(appState.currentRound !== 3){
                        setAnnouncerInnerText(`Let's prepare the board for round ${appState.currentRound+1}!`);
                    };
                    appAction({
                        type: ActionType.CLEAN_UP_THE_DROWNED,
                    });
                }, 2000/gameSpeed);
            }, 2000/gameSpeed);
        };

        if(appState.currentStep === 'clean_up_the_drowned'){
            // If nobody drowned, skip announcing who drowned.
            let newTileArray = JSON.parse(JSON.stringify(appState.tiles));
            let newDrownedTreasuresArray: any = [];
            const playersArrayByMapPosition =  JSON.parse(JSON.stringify(appState.players)).sort((a: any, b: any) => b.mapPosition - a.mapPosition);
            // If nobody, drowned, do nothing. 
            if(appState.returnedPlayerIDs.length === appState.players.length){} 
            // If somebody drowned, work out who did and announce it via setAnnouncerInnerText
            else if (appState.returnedPlayerIDs.length !== appState.players.length){
                // Declare a variable that lets us set the location for the tiles of drowned players, i.e. to the 
                // end of the tile array.
                for(const player of playersArrayByMapPosition){
                    if(player.mapPosition !== 0){
                        let individualPlayerDrownedTreasure = [];
                        for(let i = 0; i < player.treasure.length; i++){
                            individualPlayerDrownedTreasure.push(player.treasure[i]);
                        };
                        // Do nothing if the drowned players array is empty.
                        if(individualPlayerDrownedTreasure.length === 0){}
                        else if(individualPlayerDrownedTreasure.length > 0){
                            newDrownedTreasuresArray.push(individualPlayerDrownedTreasure);
                        }
                    };
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
            // This is also used to set the direction for each player back to 'forwards' for the beginning of a new round, 
            // as well as resetting their treasurePickups to 0 for the new round. 
            setTimeout(() => {
                let newPlayerArray = JSON.parse(JSON.stringify(appState.players));
                for(let i = 0; i < newPlayerArray.length; i ++){
                    if(newPlayerArray[i].mapPosition !== 0){
                        newPlayerArray[i].mapPosition = 0;
                        newPlayerArray[i].direction = 'forwards';
                        // Loop through and send all treasure[] from each player to lostTreasure[] to be added to the tile array later.
                        for(let j = 0; j < newPlayerArray[i].treasure.length; j++){
                            newPlayerArray[i].treasure.splice(j, 1);
                            j--;
                        };
                    } 
                    // Here is where we're moving player treasure from the treasure[] to securedTreasure[]. Because we're already looping
                    // through the players array above, we can then loop through the players treasure array and push it to securedTreasure[].
                    else if(newPlayerArray[i].mapPosition === 0){
                        for(let j = 0; j < newPlayerArray[i].treasure.length; j++){
                            // The line below ensures that the treasure being transitioned from .treasure to .securedTreasure in the 
                            // player array, becomes the 'securedTreasure' type. 
                            newPlayerArray[i].treasure[j].type += 4;
                            newPlayerArray[i].securedTreasure.push(newPlayerArray[i].treasure[j]);
                            newPlayerArray[i].treasure.splice(j, 1);
                            j--;
                        };
                    };
                    // Reset the players treasurePickups to 0 
                    newPlayerArray[i].treasurePickups = 0;
                };
                appAction({
                    type: ActionType.MOVE_DROWNED_PLAYERS_HOME,
                    payload: {
                        newPlayersArray: newPlayerArray,
                        newTileArray: newTileArray,
                        farthestFromTheSub: playersArrayByMapPosition[0].id,
                        drownedPlayersTreasures: newDrownedTreasuresArray,
                    }
                });
            }, 4000/gameSpeed);
        };

        if(appState.currentStep === 'move_drowned_players_home'){
            setTimeout(() => {
                // First, we're going to loop through the array to remove any tiles where type === 0. 
                let currentTileLocation = 1;
                let newTileArray = JSON.parse(JSON.stringify(appState.tiles));
                // console.log(`\nWe're checking the newTileArray at the very start: ${util.inspect(newTileArray, {showHidden: false, depth: null, colors: false})}`);
                for(let i = 0; i < newTileArray.length; i++){
                    // This variable allows us to track any stacks of tiles we loop through, 
                    // allowing us to tell the loop to skip past those tiles, by iterating 'i' that many times. 
                    let tilesToMovePast = 0;
                    // If the tile type === 0, remove it from the array, and reduce the counter by 
                    // one to ensure no tiles are missed.
                    if(newTileArray[i].type === 0){
                        newTileArray.splice(i, 1);
                        i--;
                        currentTileLocation--;
                    }
                    // If the tile type !== 0
                    else if(newTileArray[i].type !== 0){
                        // If this treasure is the last treasure in the array
                        if(i === newTileArray.length - 1){
                            newTileArray[i].location = currentTileLocation;
                        }
                        // If this treasure is not a stack
                        else if(newTileArray[i].location !== newTileArray[i+1].location){
                            newTileArray[i].location = currentTileLocation;
                        }
                        // If this treasure is a stack, i.e. it has the same location as the next tile (at least)..
                        else if(newTileArray[i].location === newTileArray[i+1].location){
                            // Check the current tile against the next 10 tiles (it's impossible to have more than that)
                            // AND ensure j + i IS NOT greater than newTileArray.length to prevent overflow errors.
                            tilesToMovePast++;
                            for(let j = 2; j < 11 && j + i < newTileArray.length; j++){
                                // If the location of the third etc. tile in the stack..
                                if(newTileArray[i].location === newTileArray[i+j].location){
                                    // Set the location to the same location as the others.
                                    newTileArray[i+j].location = currentTileLocation;
                                    tilesToMovePast++;
                                }
                            };
                            // Set the location of the first and second tile in the stack to the same location as the others.
                            newTileArray[i+1].location = currentTileLocation;
                            newTileArray[i].location = currentTileLocation;
                        };
                    };
                    i += tilesToMovePast;
                    currentTileLocation++;
                };

                let drownedPlayerTreasureTileLocation = newTileArray[newTileArray.length-1].location + 1;
                let temporaryDrownedPlayersTreasures = JSON.parse(JSON.stringify(appState.drownedPlayersTreasures));
                for(let i = 0; i < temporaryDrownedPlayersTreasures.length; i++){
                    for(let j = 0; j < temporaryDrownedPlayersTreasures[i].length; j++){
                        temporaryDrownedPlayersTreasures[i][j].location = drownedPlayerTreasureTileLocation;
                        newTileArray.push(temporaryDrownedPlayersTreasures[i][j]);
                    };
                    drownedPlayerTreasureTileLocation ++;
                };
                // console.log(`\nWe're checking the newTileArray right before pushing it up appState: ${util.inspect(newTileArray, {showHidden: false, depth: null, colors: false})}`);
                appAction({
                    type: ActionType.REMOVE_EMPTY_TILE_LOCATIONS,
                    payload: {
                        newTileArray: newTileArray,
                    }
                });
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
                // This doesn't need to run if the newCurrentRound is 4. 
                if(newCurrentRound !== 4){
                        const reorderedPlayersArray =  JSON.parse(JSON.stringify(appState.players));
                        if(appState.returnedPlayerIDs.length < appState.players.length){
                            while(reorderedPlayersArray[0].id !== appState.farthestFromTheSub){
                                reorderedPlayersArray.unshift(reorderedPlayersArray[reorderedPlayersArray.length-1]);
                                reorderedPlayersArray.pop();
                            };
                            setAnnouncerInnerText(`${reorderedPlayersArray[0].name} is going first this round!`);
                        };
                        // Loop through the reorderedPlayersArray and set everybody's direction to 'forwards'. 
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
                }
                else if(newCurrentRound === 4){
                        setAnnouncerInnerText(`That was the final round!!`);
                        appAction({
                            type: ActionType.END_OF_ROUND_ADJUSTMENTS,
                            payload: {
                                reorderedPlayersArray: appState.players,
                                currentRound: newCurrentRound,
                                tilesArrayLength: newTileArrayLength,
                            }
                        });
                };
            }, 2000/gameSpeed);
        };

        if(appState.currentStep === 'end_of_round_adjustments' && appState.currentRound === 4){
            setTimeout(() => {
                setAnnouncerInnerText(`Let's see the treasures!`);
                // This setTimeout allows 'The round is over!' to briefly display before moving on
                setTimeout(() => {
                    setAnnouncerInnerText(`But who won the game..`);
                    // 'roundHighScore' is used to determined who won in a single round version of the game.
                    let roundHighScore = 0;
                    // 'roundWinner' allows us to assign the highest scorer as the winner in a single round version of the game.
                    let roundWinner = '';
                    // Loop through the players in the game. 
                    for(let i = 0; i < appState.players.length; i++){
                        // If the player made it back to the submarine.
                        if(appState.players[i].mapPosition === 0){
                            // 'newPlayerScore' acts as a place to store the total points of each player as we loop through the player array.
                            let newPlayerScore = appState.players[i].score;
                            // Loop through the loops current players current tokens and add it to their score. 
                            appState.players[i].securedTreasure.forEach((item) => {
                                newPlayerScore += item.value;
                            })
                            // Check if the loops current player beats the high score, if so, make it the high score. 
                            if(newPlayerScore > roundHighScore){
                                roundHighScore = newPlayerScore;
                                roundWinner = `${appState.players[i].name}`;
                            } else if (newPlayerScore === roundHighScore && roundHighScore !== 0){
                                roundWinner += ` and ${appState.players[i].name}`;
                            }
                            // TALLY_SCORES triggers for each player in the player array, with the playerToUpdate communicating
                            // which is the correct player to update. 
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
                        setAnnouncerInnerText(`${roundWinner} won the game!`);
                    }, 3000/gameSpeed)
                }, 3000/gameSpeed)
            }, 2000/gameSpeed)
        };
        if(appState.currentStep === 'tally_scores'){
            setTimeout(() => {
                setTealOverlayEndGameStyle('teal-overlay-end-game-visible');
            }, 4500/gameSpeed)
        };
    }, [appState.currentStep]);

    return (
        <div className="game-container">
            <TileLayout />
            <PlayerTokens />
            <EscapeButton buttonFunction={handleEscapeButtonSubmit} style={{position: 'absolute', top: '15px', right: '0px'}}/>
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
            <TealOverlayEndGame className={tealOverlayEndGameStyle} />
        </div>
    )
}

export default GameContainer;