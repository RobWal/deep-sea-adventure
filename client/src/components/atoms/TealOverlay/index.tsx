import NamePlayersContainer from '../../organisms/NamePlayersContainer';
import {
    ActionType,
    GameContext,
} from "../../../application-context";
import { useContext, useEffect, useState } from 'react';
import './TealOverlay.css'
import useSound from 'use-sound';
import bubbleClickSFX from '../../sfx/bubbleClick.mp3';

const TealOverlay = ({hidden}: any) => {
    const [appState, appAction] = useContext(GameContext);
    const soundUrl = bubbleClickSFX;
    const [play] = useSound(soundUrl, { playbackRate: 1.0});
    
    const playAudio = () => {
        const newPlaybackRate = 0.5 + Math.random();
        play({ playbackRate: newPlaybackRate});
    };
    const handleTealClick = () => {
        playAudio();
        appAction({
            type: ActionType.RETURN_TO_HOMESCREEN
        })
    }



    if(hidden){
        return (<></>)
    } else {
        return (
            <div onClick={()=>handleTealClick()} className='teal-overlay'></div>
        )
    }
}

export default TealOverlay;