import React, { Reducer } from "react";

export interface Players {
    name: string,
    mapPosition: number,
    treasure: number[],
    score: number | string,
    settings: {},
    color: string,
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

export const playerGenerator = (totalPlayers: number) => {
    const botNameArray = ['Claus', 'Stan', 'Francine', 'Hayley', 'Steve', 'Roger', 'Jeff', 'Billy-Bob', 'Lewis', 'Greg', 'Terry', 'Toshi', 'Avery']
    const botColorArray = ['#FF1616', '#FFDE59', '#008037', '#5E17EB', '#000000'];
    let newPlayersArray = [];
    let nameArrayIndex = 0;
    let colorArrayIndex = 0;
    for(let i = 0; i < totalPlayers - 1; i++){
        nameArrayIndex = (Math.floor(Math.random() * botNameArray.length));
        colorArrayIndex = (Math.floor(Math.random() * botColorArray.length));
        newPlayersArray.push({
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

export const DefaultGameState: GameState = {
    currentRound: 1,
    currentPlayer: 0,
    totalPlayers: 2,
    currentStep: '',
    dice: [1, 3],
    players: [],
    round: 1,
    tiles: tileGenerator(),
};

export enum ActionType {
    ADD_PLAYER = "add_player",
    SET_TOTAL_PLAYERS = "set_total_players",
    GENERATE_PLAYERS = "generate_players"
}

export type GameAction = AddUserAction | SetTotalPlayersAction | GeneratePlayersAction;

export interface AddUserAction {
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
            };
    }
};

export const GameContext = React.createContext<
    [GameState, React.Dispatch<GameAction>]
>([DefaultGameState, () => {}]);

// return {
//                 ...state,
//                 players: [
//                     {
//                         name: 'action.payload.userName',
//                         mapPosition: 0,
//                         treasure: [],
//                         score: 0,
//                         settings: {},
//                         color: '#FFFFFF',
//                     },

//                 ...state.players,
//             ]
//             };