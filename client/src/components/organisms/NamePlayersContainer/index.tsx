import { useContext } from "react";
import EscapeButton from "../../molecules/EscapeButton";
import HelpButton from "../../molecules/HelpButton";
import LoadButton from "../../molecules/LoadButton";
import NameForm from "../../molecules/NameForm";
import './NamePlayersContainer.css'
import {
    ActionType,
    GameContext,
    GameContextReducer,
    DefaultGameState,
    oxygenTokenLocations,
} from "../../../application-context";
import useSound from 'use-sound';
import bubbleClickSFX from '../../sfx/bubbleClick.mp3';

// util allows us to read nested objects in the console in a user friendly way, i.e. instead of '[object Object]', it will log '{Tiles:[type:1, value:2]}'.
const util = require('util');


const NamePlayersContainer = ({className, escapeButtonFunction, loadButtonFunction}: any) => {
    const [appState, appAction] = useContext(GameContext);
    const soundUrl = bubbleClickSFX;
    const [play] = useSound(soundUrl, { playbackRate: 1.0});
    
    const playAudio = () => {
        const newPlaybackRate = 0.5 + Math.random();
        play({ playbackRate: newPlaybackRate});
    };

    // This is a currently useless button that only plays audio and console logs that it's being clicked.
    // This will be turned into a button that explains this menu - That You must enter a name of at least one character, and
    // select the amount of opponents you want to play with. 
    const handleHelpButtonSubmit = () => {
        console.log(`We're clicking the help button.`);
        playAudio();
        appAction({
            type: ActionType.HOMESCREEN_HELP_BUTTON
        })
    }

    // This function runs when the user has clicked the number of players they want their game to have, after putting in a valid name. 
    // It adds the players to the players[] array in the appState (or simply state in the appliaction-context.tsx).  
    const addNewUser = (value: string) => {
        appAction({
        type: ActionType.ADD_PLAYER,
        payload: {
          userName: value,
        }
      })
    }

    const setTotalPlayers = (value: number) => {
        appAction({
        type: ActionType.SET_TOTAL_PLAYERS,
        payload: {
          totalPlayers: value,
        }})
        appAction({
            type: ActionType.GENERATE_PLAYERS,
            payload: {
                totalPlayers: value,
            }
        })
    }

    const beginPrestart = () => {
        appAction({
        type: ActionType.BEGIN_PRESTART,
      })
    }

    return (
        <div>
            <div className={className}>
                <HelpButton buttonFunction={handleHelpButtonSubmit} style={{position: 'absolute', top:'15px', right:'15px', margin:'15px', zIndex:'1'}}/>
                <EscapeButton escapeButtonFunction={escapeButtonFunction} style={{position: 'absolute', top:'15px', left:'15px', margin:'15px', zIndex:'1'}}/>
                <NameForm setTotalPlayers={setTotalPlayers} addUser={addNewUser} beginPrestart={beginPrestart} style={{position: 'absolute', top:'50px'}}/>
                <LoadButton loadButtonFunction={loadButtonFunction} style={{position: 'absolute', top:'5px', right:'245px', margin:'15px', zIndex:'1'}}/>
            </div>
         </div>
    )
}

export default NamePlayersContainer;