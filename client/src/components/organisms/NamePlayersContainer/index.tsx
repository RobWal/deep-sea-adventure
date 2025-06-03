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

// util allows us to read nested objects in the console in a user friendly way, i.e. instead of '[object Object]', it will log '{Tiles:[type:1, value:2]}'.
const util = require('util');

type NamePlayersContainer = {
    className: string,
    escapeButtonFunction: () => void,
    loadButtonFunction: () => void,
    helpButtonFunction: () => void,
}

const NamePlayersContainer = ({className, escapeButtonFunction, loadButtonFunction, helpButtonFunction}: NamePlayersContainer) => {
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
                <HelpButton helpButtonFunction={helpButtonFunction} style={{position: 'absolute', top:'15px', right:'15px', margin:'15px', zIndex:'1'}}/>
                <EscapeButton escapeButtonFunction={escapeButtonFunction} style={{position: 'absolute', top:'15px', left:'15px', margin:'15px', zIndex:'1'}}/>
                <NameForm setTotalPlayers={setTotalPlayers} addPlayer={addPlayer} moveToGameContainer={moveToGameContainer} checkForPreviousGameData={checkForPreviousGameData} style={{position: 'absolute', top:'50px'}}/>
                <LoadButton loadButtonFunction={loadButtonFunction} style={{position: 'absolute', top:'5px', right:'245px', margin:'15px', zIndex:'1'}}/>
            </div>
         </div>
    )
}

export default NamePlayersContainer;