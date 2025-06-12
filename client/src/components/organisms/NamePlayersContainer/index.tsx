import { useContext } from "react";
import EscapeButton from "../../molecules/EscapeButton";
import HelpButton from "../../molecules/HelpButton";
import LoadButton from "../../molecules/LoadButton";
import NameForm from "../../molecules/NameForm";
import './NamePlayersContainer.css'
import {
    ActionType,
    GameContext,
} from "../../../application-context";
import HomescreenMenuButton from "../../molecules/HomescreenMenuButton";

// util allows us to read nested objects in the console in a user friendly way, i.e. instead of '[object Object]', it will log '{Tiles:[type:1, value:2]}'.
const util = require('util');

type NamePlayersContainer = {
    className: string,
    singlePlayerMenuBackButtonFunction: () => void;
}

const NamePlayersContainer = ({className, singlePlayerMenuBackButtonFunction}: NamePlayersContainer) => {
    const [appState, appAction] = useContext(GameContext);
    
    const checkForPreviousGameData = () => {
        appAction({
            type: ActionType.DELETE_PREVIOUS_GAME_DATA,
        })
    };

    // This function runs when the user has clicked the number of players they want their game to have, after putting in a valid name. 
    // It adds the players to the players[] array in the appState (or simply state in the appliaction-context.tsx).  
    const addPlayer = (value: string) => {
        appAction({
            type: ActionType.ADD_PLAYER,
            payload: {
                userName: value,
            }
        });
    };

    const setTotalPlayers = (value: number) => {
        appAction({
        type: ActionType.SET_TOTAL_PLAYERS,
        payload: {
        totalPlayers: value,
        }});
        appAction({
            type: ActionType.GENERATE_PLAYERS,
            payload: {
                totalPlayers: value,
            }
        });
    };
    const moveToGameContainer = () => {
        appAction({
            type: ActionType.MOVE_TO_GAME_CONTAINER,
        })
    };

    return (
        <div>
            <div className={className}>
                <NameForm setTotalPlayers={setTotalPlayers} addPlayer={addPlayer} moveToGameContainer={moveToGameContainer} checkForPreviousGameData={checkForPreviousGameData} style={{position: 'absolute', top:'30px'}}/>
                <HomescreenMenuButton className={'homescreen-single-player-menu-back-button'} innerText={'Back'} onClickFunction={singlePlayerMenuBackButtonFunction}/>
            </div>
         </div>
    )
}

export default NamePlayersContainer;