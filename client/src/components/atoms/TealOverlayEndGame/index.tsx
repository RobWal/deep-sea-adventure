import NamePlayersContainer from '../../organisms/NamePlayersContainer';
import {
    ActionType,
    GameContext,
} from "../../../application-context";
import { useContext, useEffect, useState } from 'react';
import './TealOverlay.css'
import useSound from 'use-sound';
import bubbleClickSFX from '../../sfx/bubbleClick.mp3';

const TealOverlayEndGame = ({className}: any) => {
    const [appState, appAction] = useContext(GameContext);
    const soundUrl = bubbleClickSFX;
    const [play] = useSound(soundUrl, { playbackRate: 1.0});
    
    const playAudio = () => {
        const newPlaybackRate = 0.5 + Math.random();
        play({ playbackRate: newPlaybackRate});
    };
    const handleTealClick = () => {
        playAudio();
        // appAction({
        //     type: ActionType.RETURN_TO_HOMESCREEN
        // })
    }

    // if(){
        // return (<></>)
    // } else {
        return (
            <div onClick={()=>handleTealClick()} className={className}></div>
        )
    }
// }

export default TealOverlayEndGame;