import { useContext } from "react";
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

const NamePlayersContainer = () => {
    const [appState, appAction] = useContext(GameContext);
    const soundUrl = bubbleClickSFX;
    const [play] = useSound(soundUrl, { playbackRate: 1.0});
    
    const playAudio = () => {
        const newPlaybackRate = 0.5 + Math.random();
        play({ playbackRate: newPlaybackRate});
    };

    const handleEscapeButtonSubmit = () => {
        console.log(`We're clicking the button`);
        playAudio();
        appAction({
            type: ActionType.RETURN_TO_HOMESCREEN
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
                <HelpButton style={{position: 'absolute', top:'15px', right:'15px', margin:'15px', zIndex:'1'}}/>
                <EscapeButton buttonFunction={handleEscapeButtonSubmit} style={{position: 'absolute', top:'15px', left:'15px', margin:'15px', zIndex:'1'}} text={'X'}/>
                <NameForm setTotalPlayers={setTotalPlayers} addUser={addNewUser} beginPrestart={beginPrestart} style={{position: 'absolute', top:'50px'}}/>
            </div>
        </div>
    )
}

export default NamePlayersContainer;