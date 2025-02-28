import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import EscapeButton from "../../molecules/EscapeButton";
import HelpButton from "../../molecules/HelpButton";
import NameForm from "../../molecules/NameForm";
import './NamePlayersContainer.css'
import {
    ActionType,
    GameContext,
    GameContextReducer,
    DefaultGameState,
} from "../../../application-context";
import useSound from 'use-sound';
import bubbleClickSFX from '../../sfx/bubbleClick.mp3';

// util allows us to read nested objects in the console in a user friendly way, i.e. instead of '[object Object]', it will log '{Tiles:[type:1, value:2]}'.
const util = require('util');


const NamePlayersContainer = () => {
    let navigate = useNavigate();
    const [appState, appAction] = useContext(GameContext);
    const soundUrl = bubbleClickSFX;
    const [play] = useSound(soundUrl, { playbackRate: 1.0});
    
    const playAudio = () => {
        const newPlaybackRate = 0.5 + Math.random();
        play({ playbackRate: newPlaybackRate});
    };

    const handleEscapeButtonSubmit = () => {
        playAudio();
        appAction({
            type: ActionType.RETURN_TO_HOMESCREEN
        })
    }

    // This is a function for a temporary button, to test and see if we can load the game state from Local Storage. 
    const handleLoadButtonSubmit = () => {
        // console.log(`We're clicking the load button.`);
        playAudio();  
        // console.log(localStorage.getItem('currentGame'));
        appAction({
            type: ActionType.HOMESCREEN_LOAD_BUTTON
        });
        // console.log(`I'm logging type: ${util.inspect(appState, {showHidden: false, depth: null, colors: false})}`);
        navigate("/gamecontainer");
    }

    const handleHelpButtonSubmit = () => {
        console.log(`We're clicking the help button.`);
        playAudio();
        appAction({
            type: ActionType.HOMESCREEN_HELP_BUTTON
        })
    }

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
            <div className='name-players-container'>
                <HelpButton buttonFunction={handleHelpButtonSubmit} style={{position: 'absolute', top:'15px', right:'15px', margin:'15px', zIndex:'1'}}/>
                <EscapeButton buttonFunction={handleEscapeButtonSubmit} style={{position: 'absolute', top:'15px', left:'15px', margin:'15px', zIndex:'1'}}/>
                <NameForm setTotalPlayers={setTotalPlayers} addUser={addNewUser} beginPrestart={beginPrestart} style={{position: 'absolute', top:'50px'}}/>
                <HelpButton buttonFunction={handleLoadButtonSubmit} style={{position: 'absolute', top:'5px', right:'245px', margin:'15px', zIndex:'1'}}/>
            </div>
        </div>
    )
}

export default NamePlayersContainer;