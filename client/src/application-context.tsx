import React, { Reducer } from "react";
import NoTreasure from "./components/atoms/VisualAssets/NoTreasure";
import TreasureFour from "./components/atoms/VisualAssets/TreasureFour";
import TreasureFourInventory from "./components/atoms/VisualAssets/TreasureFourInventory";
import SecuredTreasureFourInventory from "./components/atoms/VisualAssets/SecuredTreasureFourInventory";
import TreasureOne from "./components/atoms/VisualAssets/TreasureOne";
import TreasureOneInventory from "./components/atoms/VisualAssets/TreasureOneInventory";
import SecuredTreasureOneInventory from "./components/atoms/VisualAssets/SecuredTreasureOneInventory";
import TreasurePointEight from "./components/atoms/VisualAssets/TreasurePointEight";
import TreasurePointEleven from "./components/atoms/VisualAssets/TreasurePointEleven";
import TreasurePointFifteen from "./components/atoms/VisualAssets/TreasurePointFifteen";
import TreasurePointFive from "./components/atoms/VisualAssets/TreasurePointFive";
import TreasurePointFour from "./components/atoms/VisualAssets/TreasurePointFour";
import TreasurePointFourteen from "./components/atoms/VisualAssets/TreasurePointFourteen";
import TreasurePointNine from "./components/atoms/VisualAssets/TreasurePointNine";
import TreasurePointOne from "./components/atoms/VisualAssets/TreasurePointOne";
import TreasurePointSeven from "./components/atoms/VisualAssets/TreasurePointSeven";
import TreasurePointSix from "./components/atoms/VisualAssets/TreasurePointSix";
import TreasurePointTen from "./components/atoms/VisualAssets/TreasurePointTen";
import TreasurePointThirteen from "./components/atoms/VisualAssets/TreasurePointThirteen";
import TreasurePointThree from "./components/atoms/VisualAssets/TreasurePointThree";
import TreasurePointTwelve from "./components/atoms/VisualAssets/TreasurePointTwelve";
import TreasurePointTwo from "./components/atoms/VisualAssets/TreasurePointTwo";
import TreasurePointZero from "./components/atoms/VisualAssets/TreasurePointZero";
import TreasureThree from "./components/atoms/VisualAssets/TreasureThree";
import TreasureThreeInventory from "./components/atoms/VisualAssets/TreasureThreeInventory";
import SecuredTreasureThreeInventory from "./components/atoms/VisualAssets/SecuredTreasureThreeInventory";
import TreasureTwo from "./components/atoms/VisualAssets/TreasureTwo";
import TreasureTwoInventory from "./components/atoms/VisualAssets/TreasureTwoInventory";
import SecuredTreasureTwoInventory from "./components/atoms/VisualAssets/SecuredTreasureTwoInventory";
// import { deflateSync } from "zlib";
// util allows us to read nested objects in the console in a user friendly way, i.e. instead of '[object Object]', it will log '{Tiles:[type:1, value:2]}'.
const util = require('util');

interface PlayerTokenHomeLocations {
    [index: number]: {
        top: string,
        left: string,
    }
}

// These locations are what the game considers each players 'home' location, i.e. when they're on the submarine. 
export const playerTokenHomeLocations: PlayerTokenHomeLocations = {
    1: {top: '50px', left: '1050px',},
    2: {top: '50px',left: '1020px',},
    3: {top: '50px',left: '990px',},
    4: {top: '50px', left: '960px',},
    5: {top: '50px',left: '930px',},
    6: {top: '50px',left: '900px',},
} 

interface OxygenTokenLocations {
    [index: number]: {
        top: string,
        left: string,
    }
}

export const oxygenTokenLocations: OxygenTokenLocations  = {
    0: {top: '185px',left: '665px',},
    1: {top: '155px',left: '747px',},
    2: {top: '155px',left: '715px',},
    3: {top: '155px', left: '682px',},
    4: {top: '155px',left: '648px',},
    5: {top: '155px',left: '615px',},
    6: {top: '155px',left: '580px',},
    7: {top: '124px',left: '532px',},
    8: {top: '124px',left: '565px',},
    9: {top: '124px',left: '598px',},
    10: {top: '124px',left: '631px',},
    11: {top: '124px',left: '664px',},
    12: {top: '124px',left: '697px',},
    13: {top: '124px', left: '730px',},
    14: {top: '124px',left: '763px',},
    15: {top: '124px',left: '796px',},
    16: {top: '93px',left: '811px',},
    17: {top: '93px',left: '778px',},
    18: {top: '93px',left: '745px',},
    19: {top: '93px',left: '712px',},
    20: {top: '93px',left: '679px',},
    21: {top: '93px',left: '646px',},
    22: {top: '93px',left: '613px',},
    23: {top: '93px', left: '580px',},
    24: {top: '93px',left: '547px',},
    25: {top: '93px',left: '513px',},
}

interface TileLocations {
    [index: number]: {
        top: string,
        left: string,
    }
}; 

export const tileLocations: TileLocations = {
    1: {top: `${60+(Math.random()*10)}px`,left: `${390+(Math.random()*10)}px`},
    2: {top: `${40+(Math.random()*10)}px`,left: `${320+(Math.random()*10)}px`},
    3: {top: `${30+(Math.random()*10)}px`,left: `${250+(Math.random()*10)}px`},
    4: {top: `${40+(Math.random()*10)}px`,left: `${180+(Math.random()*10)}px`},
    5: {top: `${60+(Math.random()*10)}px`,left: `${110+(Math.random()*10)}px`},
    6: {top: `${130+(Math.random()*10)}px`,left: `${60+(Math.random()*10)}px`},
    7: {top: `${200+(Math.random()*10)}px`,left: `${35+(Math.random()*10)}px`},
    8: {top: `${280+(Math.random()*10)}px`,left: `${45+(Math.random()*10)}px`},
    9: {top: `${360+(Math.random()*10)}px`,left: `${60+(Math.random()*10)}px`},
    10: {top: `${440+(Math.random()*10)}px`,left: `${55+(Math.random()*10)}px`},
    11: {top: `${520+(Math.random()*10)}px`,left: `${35+(Math.random()*10)}px`},
    12: {top: `${600+(Math.random()*10)}px`,left: `${55+(Math.random()*10)}px`},
    13: {top: `${640+(Math.random()*10)}px`,left: `${135+(Math.random()*10)}px`},
    14: {top: `${620+(Math.random()*10)}px`,left: `${215+(Math.random()*10)}px`},
    15: {top: `${540+(Math.random()*10)}px`,left: `${245+(Math.random()*10)}px`},
    16: {top: `${460+(Math.random()*10)}px`,left: `${265+(Math.random()*10)}px`},
    17: {top: `${378+(Math.random()*10)}px`,left: `${235+(Math.random()*10)}px`},
    18: {top: `${300+(Math.random()*10)}px`,left: `${245+(Math.random()*10)}px`},
    19: {top: `${250+(Math.random()*10)}px`,left: `${310+(Math.random()*10)}px`},
    20: {top: `${235+(Math.random()*10)}px`,left: `${390+(Math.random()*10)}px`},
    21: {top: `${300+(Math.random()*10)}px`,left: `${450+(Math.random()*10)}px`},
    22: {top: `${380+(Math.random()*10)}px`,left: `${470+(Math.random()*10)}px`},
    23: {top: `${450+(Math.random()*10)}px`,left: `${450+(Math.random()*10)}px`},
    24: {top: `${530+(Math.random()*10)}px`,left: `${430+(Math.random()*10)}px`},
    25: {top: `${610+(Math.random()*10)}px`,left: `${460+(Math.random()*10)}px`},
    26: {top: `${630+(Math.random()*10)}px`,left: `${540+(Math.random()*10)}px`},
    27: {top: `${610+(Math.random()*10)}px`,left: `${620+(Math.random()*10)}px`},
    28: {top: `${530+(Math.random()*10)}px`,left: `${640+(Math.random()*10)}px`},
    29: {top: `${445+(Math.random()*10)}px`,left: `${630+(Math.random()*10)}px`},
    30: {top: `${360+(Math.random()*10)}px`,left: `${625+(Math.random()*10)}px`},
    31: {top: `${280+(Math.random()*10)}px`,left: `${650+(Math.random()*10)}px`},
    32: {top: `${270+(Math.random()*10)}px`,left: `${730+(Math.random()*10)}px`},
    33: {top: '340px',left: '730px',},
    34: {top: '400px',left: '730px',},
    35: {top: '460px',left: '730px',},
    36: {top: '520px',left: '730px',},
    37: {top: '580px', left: '730px',},
    38: {top: '640px',left: '730px',},
}

export interface TileTypes {
    [index: number]: any
}

export const tileTypes: TileTypes = {
    0: <NoTreasure />,
    1: <TreasureOne />,
    2: <TreasureTwo />,
    3: <TreasureThree />,
    4: <TreasureFour />,
}

export const inventoryTileTypes: TileTypes = {
    1: <TreasureOneInventory />,
    2: <TreasureTwoInventory />,
    3: <TreasureThreeInventory />,
    4: <TreasureFourInventory />,
    5: <SecuredTreasureOneInventory />,
    6: <SecuredTreasureTwoInventory />,
    7: <SecuredTreasureThreeInventory />,
    8: <SecuredTreasureFourInventory />,
}

export const shownInventoryTileTypes: TileTypes = {
    0: <TreasurePointZero />,
    1: <TreasurePointOne />,
    2: <TreasurePointTwo />,
    3: <TreasurePointThree />,
    4: <TreasurePointFour />,
    5: <TreasurePointFive />,
    6: <TreasurePointSix />,
    7: <TreasurePointSeven />,
    8: <TreasurePointEight />,
    9: <TreasurePointNine />,
    10: <TreasurePointTen />,
    11: <TreasurePointEleven />,
    12: <TreasurePointTwelve />,
    13: <TreasurePointThirteen />,
    14: <TreasurePointFourteen />,
    15: <TreasurePointFifteen />,
}


// The purpose of this function is to declare the default unshuffled tiles ([0,0,1,etc. --> ,14,15,15]), shuffle those values, to be run  
// by the DefaultGameState initiator, prior to declaring gameStates. 
export const tileGenerator = () => {
    const numberOfTiles = 8;
    const tileTypes = [
        {
            type: 1,
            treasureValues: [0,0,1,1,2,2,3,3]
        },
        {
            type: 2,
            treasureValues: [4,4,5,5,6,6,7,7]
        },
        {
            type: 3,
            treasureValues: [8,8,9,9,10,10,11,11]
        },
        {
            type: 4,
            treasureValues: [12,12,13,13,14,14,15,15]
        }
    ]
    // This code initiates the tiles array, which will be used to store the current state of the tiles on the board. 
    const tiles: any[] = [];
    // This loop iterates through the tileTypes array, with the primary purpose of shuffling the tiles of each type.
    tileTypes.forEach((type, index) => {
        // As the main loop goes through tile types, this code takes the values from the current tile type array, and generates a shuffled version.
        // E.g tileTypes[0].treasureValues: [0,0,1,1,2,2,3,3] ---> tileTypes[0].treasureValues: [3,2,0,1,2,0,1,3]
        const treasureValues = type.treasureValues.sort((a: any,b: any)=>{
            return Math.random()-0.5
        });
        // The newly generated treasureValues array from the above code (e.g. tileTypes[1].treasureValues: [4,4,7,5,5,6,6,7]) is then pushed into the tiles array
        // one at a time, as numberOfTiles is 8, the number of tiles in each tile type. 
        for(let i = 0; i < numberOfTiles; i++){
            tiles.push({
                type: type.type,
                id: i+(index*numberOfTiles) + 1,
                location: i+(index*numberOfTiles) + 1,
                value: treasureValues[i],
            })
        }
    })
    return tiles;
}

export interface Players {
    id: number,
    name: string,
    mapPosition: number,
    treasure: any[],
    securedTreasure: any[],
    treasurePickups: number,
    score: number,
    settings: {},
    color: string,
    direction: string,
}

export const playerGenerator = (totalPlayers: number) => {
    const botNameArray = ['Klaus', 'Stan', 'Francine', 'Hayley', 'Steve', 'Roger', 'Jeff', 'Reggie', 'Lewis', 'Greg', 'Terry', 'Toshi', 'Avery', 'Barry', 'Snot']
    const botColorArray = ['#FF1616', '#FFDE59', '#008037', '#5E17EB', '#000000'];
    let newPlayersArray = [];
    let nameArrayIndex = 0;
    let colorArrayIndex = 0;
    for(let i = 0; i < totalPlayers - 1; i++){
        nameArrayIndex = (Math.floor(Math.random() * botNameArray.length));
        colorArrayIndex = (Math.floor(Math.random() * botColorArray.length));
        newPlayersArray.push({
            id: i+2,
            name: botNameArray[nameArrayIndex],
            mapPosition: 0,
            treasure: [],
            securedTreasure: [],
            treasurePickups: 0,
            score: 0,
            settings: {},
            color: botColorArray[colorArrayIndex],
            direction: 'forwards',
        })
        botColorArray.splice(colorArrayIndex, 1)
        botNameArray.splice(nameArrayIndex, 1)
    }
    return (newPlayersArray)
}

export interface GameState {
    currentRound: number,
    totalRounds: number,
    currentPlayer: number,
    totalPlayers: number,
    currentStep: string,
    dice: number[],
    players: Players[],
    // round: number,
    tiles: any[],
    tilesArrayLength: number,
    remainingOxygen: number,
    gameSpeed: number,
    returnedPlayerIDs: number[],
    drownedPlayersTreasures: number[],
    farthestFromTheSub: number,
}

export const DefaultGameState: GameState = {
    currentRound: 0,
    totalRounds: 3,
    currentPlayer: -1,
    totalPlayers: 2,
    currentStep: 'return_To_Homescreen',
    dice: [1, 3],
    players: [],
    tiles: tileGenerator(),
    tilesArrayLength: 32,
    remainingOxygen: 25,
    gameSpeed: 1,
    returnedPlayerIDs: [],
    drownedPlayersTreasures: [],
    farthestFromTheSub: 0,
};

export enum ActionType {
    RETURN_TO_HOMESCREEN = "return_to_homescreen",
    OPEN_HOMESCREEN_MENU = "open_homescreen_menu",
    SELECT_NAME_PLAYERS = "select_name_players",
    HOMESCREEN_HELP_BUTTON = "homescreen_help_button",
    HOMESCREEN_LOAD_BUTTON = "homescreen_load_button",
    ADD_PLAYER = "add_player",
    SET_TOTAL_PLAYERS = "set_total_players",
    GENERATE_PLAYERS = "generate_players",
    SHUFFLE_PLAYERS = "shuffle_players",
    MOVE_TO_GAME_CONTAINER = "move_to_game_container",
    BEGIN_PRESTART = "begin_prestart",
    START_GAME = "start_game",
    SET_CURRENT_PLAYER = "set_current_player",
    ROLL_DICE = "roll_dice",
    MOVE_PLAYER_TOKEN = "move_player_token",
    SHOW_DICE_RESULTS = "show_dice_results",
    TREASURE_PICKUP_DECISION = "treasure_pickup_decision",
    TREASURE_LEAVE_DECISION = "treasure_leave_decision",
    TREASURE_DROP_DECISION = "treasure_drop_decision",
    NEXT_PLAYER_TURN = "next_player_turn",
    SET_OXYGEN_LEVEL = "set_oxygen_level",
    DEEPER_OR_BACK = "deeper_or_back",
    PLAYER_GOT_BACK = "player_got_back",
    SKIP_PLAYERS_GO = "skip_players_go",
    END_THE_ROUND = "end_the_round",
    NEXT_PLAYER_LOGIC = "next_player_logic",
    CLEAN_UP_THE_DROWNED = "clean_up_the_drowned",
    MOVE_DROWNED_PLAYERS_HOME = "move_drowned_players_home",
    REMOVE_EMPTY_TILE_LOCATIONS = "remove_empty_tile_locations",
    END_OF_ROUND_ADJUSTMENTS = "end_of_round_adjustments",
    TALLY_SCORES = "tally_scores",
    RESET_APPSTATE_RETURN_TO_HOMESCREEN = "reset_appstate_return_to_homescreen",
    DELETE_PREVIOUS_GAME_DATA = "delete_previous_game_data",
}


export type GameAction = ReturnToHomescreen | OpenHomescreenMenu | SelectNamePlayers | HomescreenHelpButton | HomescreenLoadButton | AddPlayerAction | SetTotalPlayersAction | GeneratePlayersAction | ShufflePlayers | MoveToGameContainer | BeginPrestart | StartGame | SetCurrentPlayer | RollDice | MovePlayerToken | ShowDiceResults | TreasurePickupDecision | TreasureLeaveDecision | TreasureDropDecision | NextPlayerTurn | SetOxygenLevel | DeeperOrBack | PlayerGotBack | SkipPlayersGo | EndTheRound | NextPlayerLogic | CleanUpTheDrowned | MoveDrownedPlayersHome | RemoveEmptyTileLocations | EndOfRoundAdjustments | TallyScores | ResetAppstateReturnToHomescreen | DeletePreviousGameData;

export interface ReturnToHomescreen { 
    type: ActionType.RETURN_TO_HOMESCREEN;
}

export interface OpenHomescreenMenu {
    type: ActionType.OPEN_HOMESCREEN_MENU;
}

export interface SelectNamePlayers { 
    type: ActionType.SELECT_NAME_PLAYERS;
}

export interface HomescreenHelpButton { 
    type: ActionType.HOMESCREEN_HELP_BUTTON;
}

export interface HomescreenLoadButton { 
    type: ActionType.HOMESCREEN_LOAD_BUTTON;
}

export interface AddPlayerAction {
    type: ActionType.ADD_PLAYER;
    payload: {
        userName: Players["name"];
    };
}

export interface SetTotalPlayersAction {
    type: ActionType.SET_TOTAL_PLAYERS;
    payload: {
        totalPlayers: number;
    };
}

export interface GeneratePlayersAction {
    type: ActionType.GENERATE_PLAYERS;
    payload: {
        totalPlayers: number;
    }
}

export interface ShufflePlayers {
    type: ActionType.SHUFFLE_PLAYERS;
    payload: {
        shuffledPlayersArray: Players[];
    }
}

export interface MoveToGameContainer {
    type: ActionType.MOVE_TO_GAME_CONTAINER;
}

export interface BeginPrestart {
    type: ActionType.BEGIN_PRESTART;
}

export interface StartGame {
    type: ActionType.START_GAME;
}

export interface SetCurrentPlayer {
    type: ActionType.SET_CURRENT_PLAYER;
    payload: {
        currentPlayer: number,
    }
}

export interface RollDice {
    type: ActionType.ROLL_DICE;
}

export interface MovePlayerToken {
    type: ActionType.MOVE_PLAYER_TOKEN;
    payload: {
        newMapPosition: number,
        playerToMove: number,
    }
}

export interface ShowDiceResults {
    type: ActionType.SHOW_DICE_RESULTS;
}

export interface TreasurePickupDecision {
    type: ActionType.TREASURE_PICKUP_DECISION,
    payload: {
        currentPlayer: number,
        newPlayerTreasureArray: object[],
        newTileArray: object[],
    }
}

export interface TreasureLeaveDecision {
    type: ActionType.TREASURE_LEAVE_DECISION;
}

export interface TreasureDropDecision {
    type: ActionType.TREASURE_DROP_DECISION,
    payload: {
        currentPlayer: number,
        newPlayerTreasureArray: object[],
        newTileArray: object[],
    }
}

export interface NextPlayerTurn {
    type: ActionType.NEXT_PLAYER_TURN;
    payload: {
        newCurrentPlayer: number,
    }
}

export interface SetOxygenLevel {
    type: ActionType.SET_OXYGEN_LEVEL;
    payload: {
        newOxygenLevel: number,
    }
}

export interface DeeperOrBack {
    type: ActionType.DEEPER_OR_BACK;
    payload: {
        currentPlayer: number,
        direction: string,
    }
}

export interface PlayerGotBack {
    type: ActionType.PLAYER_GOT_BACK;
    payload: {
        returnedPlayerID: number,
    }
}

export interface SkipPlayersGo {
    type: ActionType.SKIP_PLAYERS_GO;
}

export interface EndTheRound {
    type: ActionType.END_THE_ROUND;
}

export interface NextPlayerLogic {
    type: ActionType.NEXT_PLAYER_LOGIC;
}

export interface CleanUpTheDrowned {
    type: ActionType.CLEAN_UP_THE_DROWNED;
}

export interface MoveDrownedPlayersHome {
    type: ActionType.MOVE_DROWNED_PLAYERS_HOME;
    payload: {
        newPlayersArray: Players[],
        newTileArray: TileTypes[],
        farthestFromTheSub: number,
        drownedPlayersTreasures: [],
    }
}

export interface RemoveEmptyTileLocations {
    type: ActionType.REMOVE_EMPTY_TILE_LOCATIONS;
    payload: {
        newTileArray: TileTypes[]
    }
}

export interface EndOfRoundAdjustments {
    type: ActionType.END_OF_ROUND_ADJUSTMENTS;
    payload: {
        reorderedPlayersArray: Players[],
        currentRound: number,
        tilesArrayLength: number,
    }
}

export interface TallyScores {
    type: ActionType.TALLY_SCORES;
    payload: {
        newPlayerScore: number,
        playerToUpdate: number,
    }
}

export interface ResetAppstateReturnToHomescreen {
    type: ActionType.RESET_APPSTATE_RETURN_TO_HOMESCREEN;
}

export interface DeletePreviousGameData {
    type: ActionType.DELETE_PREVIOUS_GAME_DATA;
}

export const GameContextReducer: Reducer<
    GameState,
    GameAction
> = (state, action) => {
    switch (action.type) {
        case ActionType.RETURN_TO_HOMESCREEN: 
            return {
                ...state,
                currentStep: 'return_To_Homescreen',
            }
        case ActionType.OPEN_HOMESCREEN_MENU:
            return {
                ...state,
                currentStep: 'open_Homescreen_Menu',
            }
        case ActionType.SELECT_NAME_PLAYERS: 
            return {
                ...state,
                currentStep: 'select_Name_Players',
            }
        case ActionType.HOMESCREEN_HELP_BUTTON: 
            return {
                ...state,
                currentStep: 'homescreen_Help_Button',
            }              
        case ActionType.HOMESCREEN_LOAD_BUTTON: 
            const currentSaveGameData: GameState = JSON.parse(localStorage.getItem("currentGame") || "{}");
            return { 
                ...state,
                currentRound: currentSaveGameData.currentRound,
                totalRounds: currentSaveGameData.totalRounds,
                currentPlayer: currentSaveGameData.currentPlayer,
                totalPlayers: currentSaveGameData.totalPlayers,
                currentStep: currentSaveGameData.currentStep,
                dice: currentSaveGameData.dice,
                players: currentSaveGameData.players,
                // round: currentSaveGameData.round,
                tiles: currentSaveGameData.tiles,
                tilesArrayLength: currentSaveGameData.tilesArrayLength,
                remainingOxygen: currentSaveGameData.remainingOxygen,
                gameSpeed: currentSaveGameData.gameSpeed,
                returnedPlayerIDs: currentSaveGameData.returnedPlayerIDs, 
                drownedPlayersTreasures: currentSaveGameData.drownedPlayersTreasures,
                farthestFromTheSub: currentSaveGameData.farthestFromTheSub,
            };
        case ActionType.SET_TOTAL_PLAYERS:
            return {
                ...state,
                totalPlayers: action.payload.totalPlayers,
            };
        case ActionType.GENERATE_PLAYERS:
            let playerArray = playerGenerator(action.payload.totalPlayers);
            return {
                ...state,
                players: [
                ...playerArray,
                ...state.players,
            ]};
        // This code is run after the 'SET_TOTAL_PLAYERS' and 'GENERATE_PLAYERS' ActionTypes, in the 'NamePlayersContainer' Organism., once the player enters a valid 
        // name. It takes the input value 'playerName' and adds them as player 1 (id: 1). This is immediately followed by the 'BEGIN_PRESTART' ActionType.
        case ActionType.ADD_PLAYER:
            return {
                ...state,
                players: [ 
                {
                    id: 1,
                    name: action.payload.userName,
                    mapPosition: 0,
                    treasure: [],
                    securedTreasure: [],
                    treasurePickups: 0,
                    score: 0,
                    settings: {},
                    color: '#FFFFFF',
                    direction: 'forwards',
                },
                ...state.players,
            ]};
        case ActionType.SHUFFLE_PLAYERS:
            return {
                ...state, 
                players: [
                    ...action.payload.shuffledPlayersArray
            ]};
        case ActionType.MOVE_TO_GAME_CONTAINER: 
            return {
                ...state,
                currentStep: 'move_to_game_container',
            };
        case ActionType.BEGIN_PRESTART: 
            return {
                ...state,
                currentStep: 'begin_prestart',
            };
        case ActionType.START_GAME: 
            return {
                ...state,
                currentStep: 'rolling',
                currentPlayer: 0,
                currentRound: 1
            };
        case ActionType.SET_CURRENT_PLAYER:
            return {
                ...state,
                currentPlayer: action.payload.currentPlayer
            };
        case ActionType.ROLL_DICE:
            let firstDie = (Math.ceil(Math.random() * 3))
            let secondDie = (Math.ceil(Math.random() * 3))
            return {
                ...state,
                currentStep: 'rolled',
                dice: [firstDie,secondDie],
            };
        case ActionType.SHOW_DICE_RESULTS:
            return {
                ...state,
                currentStep: 'moving',
            };
        case ActionType.MOVE_PLAYER_TOKEN:
            let updatedPositionPlayers = [...state.players];
            updatedPositionPlayers[action.payload.playerToMove] = {
                ...updatedPositionPlayers[action.payload.playerToMove],
                mapPosition: action.payload.newMapPosition
            };    
            return {
                ...state,
                players: updatedPositionPlayers,
                currentStep: 'moved',
        }
        case ActionType.TREASURE_PICKUP_DECISION:
            let updatedTreasurePlayersPickup = [...state.players];
            updatedTreasurePlayersPickup[action.payload.currentPlayer] = {
                ...updatedTreasurePlayersPickup[action.payload.currentPlayer],
                treasure: action.payload.newPlayerTreasureArray,
                treasurePickups: updatedTreasurePlayersPickup[action.payload.currentPlayer].treasurePickups + 1,
            }
            return {
                ...state,
                players: updatedTreasurePlayersPickup,
                currentStep: 'decided_pickup_treasure',
                tiles: action.payload.newTileArray,
            }
        case ActionType.TREASURE_LEAVE_DECISION:
            return {
                ...state,
                currentStep: 'decided_leave_treasure',
            }
        case ActionType.TREASURE_DROP_DECISION:
            let updatedTreasurePlayersDrop = [...state.players];
            updatedTreasurePlayersDrop[action.payload.currentPlayer] = {
                ...updatedTreasurePlayersDrop[action.payload.currentPlayer],
                treasure: action.payload.newPlayerTreasureArray,
                treasurePickups: updatedTreasurePlayersDrop[action.payload.currentPlayer].treasurePickups - 1,
            }
            return {
                ...state,
                players: updatedTreasurePlayersDrop,
                currentStep: 'decided_drop_treasure',
                tiles: action.payload.newTileArray,
            }
        case ActionType.NEXT_PLAYER_TURN:
            return {
                ...state,
                currentStep: 'is_player_in_sub',
                currentPlayer: action.payload.newCurrentPlayer,
            }
        case ActionType.SET_OXYGEN_LEVEL:
            return {
                ...state,
                remainingOxygen: action.payload.newOxygenLevel,
                currentStep: 'direction_logic',
            }
        case ActionType.DEEPER_OR_BACK:
            let updatedPlayerDirection = [...state.players];
            updatedPlayerDirection[action.payload.currentPlayer] = {
                ...updatedPlayerDirection[action.payload.currentPlayer],
                direction: action.payload.direction
            }
            return {
                ...state,
                players: updatedPlayerDirection,
                currentStep: 'rolling'
            }
        case ActionType.PLAYER_GOT_BACK:
            let updatedReturnedPlayerIDs = [...state.returnedPlayerIDs];
            updatedReturnedPlayerIDs.push(action.payload.returnedPlayerID);
                return {
                    ...state,
                    returnedPlayerIDs: updatedReturnedPlayerIDs,
                    currentStep: 'player_got_back',
            }
        case ActionType.SKIP_PLAYERS_GO:
            return {
                ...state,
                currentStep: 'skip_players_turn',
            }
        case ActionType.END_THE_ROUND:
            return {
                ...state,
                currentStep: 'end_of_round'
            }
        case ActionType.NEXT_PLAYER_LOGIC:
            return {
                ...state,
                currentStep: 'next_player_logic'
            }
        case ActionType.CLEAN_UP_THE_DROWNED: 
            return {
                ...state,
                currentStep: 'clean_up_the_drowned'
            }
        case ActionType.MOVE_DROWNED_PLAYERS_HOME: 
            return {
                ...state,
                players: action.payload.newPlayersArray,
                tiles: action.payload.newTileArray,
                currentStep: 'move_drowned_players_home',
                farthestFromTheSub: action.payload.farthestFromTheSub,
                drownedPlayersTreasures: action.payload.drownedPlayersTreasures,
            }
        case ActionType.REMOVE_EMPTY_TILE_LOCATIONS:
            return {
                ...state,
                tiles: action.payload.newTileArray,
                currentStep: 'remove_empty_tile_locations',
            }
        case ActionType.END_OF_ROUND_ADJUSTMENTS:
            return {
                ...state,
                players: action.payload.reorderedPlayersArray,
                currentStep: 'end_of_round_adjustments',
                remainingOxygen: 25,
                currentRound: action.payload.currentRound,
                currentPlayer: 0,
                returnedPlayerIDs: [],
                farthestFromTheSub: 0,
                tilesArrayLength: action.payload.tilesArrayLength,
                drownedPlayersTreasures: [],
            }
        case ActionType.TALLY_SCORES:
            // updatedScorePlayers takes the existing players array.
            let updatedScorePlayers = [...state.players];
            // As the loop in GameContainer calling TALLY_SCORES executes, it assigns payload.playerToUpdate 
            // the variable 'i' as it loops through. 
            updatedScorePlayers[action.payload.playerToUpdate] = {
                ...updatedScorePlayers[action.payload.playerToUpdate],
                score: action.payload.newPlayerScore,
            };    
            return {
                ...state,
                players: updatedScorePlayers,
                currentStep: 'tally_scores',
            }
        case ActionType.RESET_APPSTATE_RETURN_TO_HOMESCREEN:
            return {
                ...state,
                currentStep: 'return_To_Homescreen',
            }
        case ActionType.DELETE_PREVIOUS_GAME_DATA:
            return {
                ...state, 
                currentRound: 0,
                totalRounds: 3,
                currentPlayer: -1,
                totalPlayers: 2,
                currentStep: 'return_To_Homescreen',
                dice: [1, 3],
                players: [],
                tiles: tileGenerator(),
                tilesArrayLength: 32,
                remainingOxygen: 25,
                gameSpeed: 1,
                returnedPlayerIDs: [],
                drownedPlayersTreasures: [],
                farthestFromTheSub: 0,
            }
    }
};

export const GameContext = React.createContext<
    [GameState, React.Dispatch<GameAction>]
>([DefaultGameState, () => {}]);