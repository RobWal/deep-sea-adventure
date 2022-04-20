import React, { Reducer } from "react";

export interface Players {
    name: string,
    mapPosition: number,
    treasure: [],
    score: number,
    settings: {},
    color: string,
}

export enum ActionType {
    ADD_PLAYER = "add_player",
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

export const playersGenerator = () => {
    console.log('WOO I AM HERE')
}

export const DefaultGameState: GameState = {
    currentRound: 1,
    currentPlayer: 0,
    totalPlayers: 2,
    currentStep: '',
    dice: [1, 3],
    players: [
        {
            name: 'Tom',
            mapPosition: 0,
            treasure: [],
            score: 0,
            settings: {},
            color: '#FF1616',
        },
        {
            name: 'Sandy',
            mapPosition: 0,
            treasure: [],
            score: 0,
            settings: {},
            color: '#FFDE59',
        },
        {
            name: 'Cha-Cha',
            mapPosition: 0,
            treasure: [],
            score: 0,
            settings: {},
            color: '#008037',
        },
        {
            name: 'Danny',
            mapPosition: 0,
            treasure: [],
            score: 0,
            settings: {},
            color: '#5E17EB',
        },
        {
            name: 'Frenchy',
            mapPosition: 0,
            treasure: [],
            score: 0,
            settings: {},
            color: '#000000',
        }
    ],
    round: 1,
    tiles: tileGenerator(),
};

export type GameAction = AddUserAction;

export interface AddUserAction {
    type: ActionType.ADD_PLAYER;
    payload: {
        userName: Players["name"];
    };
}


export const GameContextReducer: Reducer<
    GameState,
    GameAction
> = (state, action) => {
    console.log(state);
    console.log(state.players)
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
    }
};
// action.payload.userName

export const GameContext = React.createContext<
    [GameState, React.Dispatch<GameAction>]
>([DefaultGameState, () => {}]);