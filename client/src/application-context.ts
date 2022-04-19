import React, { Reducer } from "react";

// TODO: move this type somewhere
export interface User {
    name: string;
}

export enum ActionType {
    LOGIN = "login",
    LOGOUT = "logout",
}

export interface GameState {
    gameState: {
        currentRound: number,
        currentPlayer: string,
        currentStep: string,
        dice: number[],
        players: object[],
        round: number,
        tiles: any[],
    };
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
                // value: Math.floor(Math.random()*(type.max - type.min + 1)) + type.min
            })
        }
    })
    return tiles;
}

// 0-3, 4-7, 

export const DefaultGameState: GameState = {
    gameState: {
        currentRound: 1,
        currentPlayer: 'PLACEHOLDER',
        currentStep: 'PLACEHOLDER',
        dice: [],
        players: [
            {
                name: 'Sandy',
                mapPosition: 0,
                treasure: [],
                score: 0,
                settings: {},
            }
        ],
        round: 1,
        tiles: tileGenerator(),
    },
};

export type ApplicationAction = LoginAction | LogoutAction;

export interface LoginAction {
    type: ActionType.LOGIN;
    payload: {
        user: User;
    };
}

export interface LogoutAction {
    type: ActionType.LOGOUT;
}



export const ApplicationContextReducer: Reducer<
    GameState,
    ApplicationAction
> = (state, action) => {
    switch (action.type) {
        case ActionType.LOGIN:
            return {
                ...state,
                currentUser: action.payload.user,
                theme: "dark",
            };
        case ActionType.LOGOUT:
            return {
                ...state,
                currentUser: null,
                theme: "light",
            };
    }
};

export const ApplicationContext = React.createContext<
    [GameState, React.Dispatch<ApplicationAction>]
>([DefaultGameState, () => {}]);


/*

OXYGEN LEVEL = OL
PLAYER TREASURES = PT
DISTANCE FROM SUB = DFB

TURNS TAKEN = DFB/(4 - PT) 


*/