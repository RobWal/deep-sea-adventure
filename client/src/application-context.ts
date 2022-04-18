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
        tiles: {}
    };
}

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
                treasure: []
            }
        ],
        tiles: {
            oneDot: [
                {
                    id: 1,
                    location: 1,
                    value: 0
                },
                {
                    id: 2,
                    location: 2,
                    value: 0
                },
                {
                    id: 3,
                    location: 3,
                    value: 1
                },
                {
                    id: 4,
                    location: 4,
                    value: 1
                },
                {
                    id: 5,
                    location: 5,
                    value: 2
                },
                {
                    id: 6,
                    location: 6,
                    value: 2
                },
                {
                    id: 7,
                    location: 7,
                    value: 3
                },
                {
                    id: 8,
                    location: 8,
                    value: 3
                },
            ],
            twoDot: [
                {
                    id: 9,
                    location: 9,
                    value: 4
                },
                {
                    id: 10,
                    location: 10,
                    value: 4
                },
                {
                    id: 11,
                    location: 11,
                    value: 5
                },
                {
                    id: 12,
                    location: 12,
                    value: 5
                },
                {
                    id: 13,
                    location: 13,
                    value: 6
                },
                {
                    id: 14,
                    location: 14,
                    value: 6
                },
                {
                    id: 15,
                    location: 15,
                    value: 7
                },
                {
                    id: 16,
                    location: 16,
                    value: 7
                },
            ]
        }
    },
    // currentRound: 'MAIN_GAME'
    // currentPlayer: 'Rob',
    // currentStep: 'ROLL',
    // dice: [],
    // players: [
    //    {
    //       name: 'Alex',
    //       mapPosition: 14,
    //       treasure is picked up for Alex
    //       ...
    //    }
    // ],
    // treasure: [
    //    treasure Alex picked up is not available
    // ]
    // currentUser: null,
    // theme: "light",
    // settings: {},
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
