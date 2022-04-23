import React, { Reducer } from "react";
import TreasureFour from "./components/atoms/VisualAssets/TreasureFour";
import TreasureOne from "./components/atoms/VisualAssets/TreasureOne";
import TreasureThree from "./components/atoms/VisualAssets/TreasureThree";
import TreasureTwo from "./components/atoms/VisualAssets/TreasureTwo";

interface PlayerTokenHomeLocations {
    [index: number]: {
        top: string,
        left: string,
    }
}

export const playerTokenHomeLocations: PlayerTokenHomeLocations = {
    1: {top: '50px', left: '1100px',},
    2: {top: '50px',left: '1070px',},
    3: {top: '50px',left: '1040px',},
    4: {top: '50px', left: '1010px',},
    5: {top: '50px',left: '980px',},
    6: {top: '50px',left: '950px',},
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
    1: {top: '60px',left: '390px',},
    2: {top: '40px',left: '320px',},
    3: {top: '30px', left: '250px',},
    4: {top: '40px',left: '180px',},
    5: {top: '60px',left: '110px',},
    6: {top: '120px',left: '65px',},
    7: {top: '200px',left: '35px',},
    8: {top: '280px',left: '45px',},
    9: {top: '360px',left: '60px',},
    10: {top: '440px',left: '55px',},
    11: {top: '520px',left: '35px',},
    12: {top: '600px',left: '55px',},
    13: {top: '640px', left: '135px',},
    14: {top: '620px',left: '215px',},
    15: {top: '540px',left: '245px',},
    16: {top: '460px',left: '265px',},
    17: {top: '378px',left: '235px',},
    18: {top: '300px',left: '245px',},
    19: {top: '250px',left: '310px',},
    20: {top: '235px',left: '390px',},
    21: {top: '300px',left: '450px',},
    22: {top: '380px',left: '470px',},
    23: {top: '450px', left: '450px',},
    24: {top: '530px',left: '430px',},
    25: {top: '610px',left: '460px',},
    26: {top: '630px',left: '540px',},
    27: {top: '610px',left: '620px',},
    28: {top: '530px',left: '640px',},
    29: {top: '445px',left: '630px',},
    30: {top: '360px', left: '625px',},
    31: {top: '280px',left: '650px',},
    32: {top: '270px',left: '730px',},
}

export interface TileTypes {
    [index: number]: any
}

export const tileTypes: TileTypes = {
    1: <TreasureOne />,
    2: <TreasureTwo />,
    3: <TreasureThree />,
    4: <TreasureFour />,
}

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
    const tiles: any[] = [];
    tileTypes.forEach((type, index) => {
        const treasureValues = type.treasureValues.sort((a: any,b: any)=>{
            return Math.random()-0.5
        });
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
    treasure: number[],
    score: number | string,
    settings: {},
    color: string,
}

export const playerGenerator = (totalPlayers: number) => {
    const botNameArray = ['Klaus', 'Stan', 'Francine', 'Hayley', 'Steve', 'Roger', 'Jeff', 'Reggie', 'Lewis', 'Greg', 'Terry', 'Toshi', 'Avery']
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
            score: 0,
            settings: {},
            color: botColorArray[colorArrayIndex],
        })
        botColorArray.splice(colorArrayIndex, 1)
        botNameArray.splice(nameArrayIndex, 1)
    }
    return (newPlayersArray)
}

export interface GameState {
    currentRound: number,
    currentPlayer: number,
    totalPlayers: number,
    currentStep: string,
    dice: number[],
    players: Players[],
    round: number,
    tiles: any[],
    remainingOxygen: number,
}

export const DefaultGameState: GameState = {
    currentRound: 1,
    currentPlayer: 0,
    totalPlayers: 2,
    currentStep: '',
    dice: [1, 3],
    players: [],
    round: 1,
    tiles: tileGenerator(),
    remainingOxygen: 25,
};

export enum ActionType {
    ADD_PLAYER = "add_player",
    SET_TOTAL_PLAYERS = "set_total_players",
    GENERATE_PLAYERS = "generate_players",
    SHUFFLE_PLAYERS = "shuffle_players"
}

export type GameAction = AddPlayerAction | SetTotalPlayersAction | GeneratePlayersAction | ShufflePlayers;

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

export const GameContextReducer: Reducer<
    GameState,
    GameAction
> = (state, action) => {
    switch (action.type) {
        case ActionType.ADD_PLAYER:
            return {
                ...state,
                players: [ 
                {
                    id: 1,
                    name: action.payload.userName,
                    mapPosition: 0,
                    treasure: [],
                    score: 0,
                    settings: {},
                    color: '#FFFFFF',
                },
                ...state.players,
            ]
        };
        case ActionType.SET_TOTAL_PLAYERS:
            return {
                ...state,
                totalPlayers: action.payload.totalPlayers,
        }
        case ActionType.GENERATE_PLAYERS:
            let playerArray = playerGenerator(action.payload.totalPlayers);
            return {
                ...state,
                players: [
                ...playerArray,
                ...state.players,
            ]
        }
        case ActionType.SHUFFLE_PLAYERS:
            return {
                ...state, 
                players: [
                    ...action.payload.shuffledPlayersArray
            ]
        }
    }
};

export const GameContext = React.createContext<
    [GameState, React.Dispatch<GameAction>]
>([DefaultGameState, () => {}]);