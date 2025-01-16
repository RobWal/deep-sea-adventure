import { useState } from 'react';
import useSound from 'use-sound';
import DSALogo from '../../atoms/VisualAssets/DSALogo';
import H1 from '../../atoms/H1';
import NoTreasure from '../../atoms/VisualAssets/NoTreasure';
import OxygenSubmarine from '../../atoms/VisualAssets/OxygenSubmarine';
import TealOverlay from '../../atoms/TealOverlay';
import TreasureFour from '../../atoms/VisualAssets/TreasureFour';
import TreasureOne from '../../atoms/VisualAssets/TreasureOne';
import TreasureThree from '../../atoms/VisualAssets/TreasureThree';
import TreasureTwo from '../../atoms/VisualAssets/TreasureTwo';
import NamePlayersContainer from '../../organisms/NamePlayersContainer';
import './HomeScreen.css';
import bubbleClickSFX from '../../sfx/bubbleClick.mp3';

const playAudio = () => {
    let audio = new Audio(bubbleClickSFX);

    audio.play();
}

const HomeScreen = () => {
    const [playerIsReady, setPlayerIsReady] = useState(false);
    return (
        <div>
            <div className="home-screen" onClick={()=>{{playerIsReady ? <></> : playAudio()}{setPlayerIsReady(true)}}}>
                <div className='text-container'>
                    <H1 text={'DEEP SEA ADVENTURE'} style={{marginTop: '20px', fontSize:'82px', color: '#2AD2C5'}}/>
                    <H1 text={'Click to play!'} style={{marginTop: '60px',color: 'white', fontSize: '45px'}}/>
                    <H1 text={'Jun Sasaki & Goro Sasaki'} style={{marginTop: '350px',fontSize:'50px', color: '#2AD2C5'}}/>
                </div>
                <NoTreasure style={{position: 'absolute', top: '20px', left:'20px'}}/>
                <NoTreasure style={{position: 'absolute', top: '20px', right:'20px'}}/>
                <NoTreasure style={{position: 'absolute', bottom: '20px', left:'20px'}}/>
                <NoTreasure style={{position: 'absolute', bottom: '20px', right:'20px'}}/>
                <DSALogo style={{position: 'absolute', top: '340px', left: '50px', transform: 'rotate(15deg)'}}/>
                <OxygenSubmarine style={{position: 'absolute', top: '210px', right: '40px', transform: 'rotate(-15deg)'}}/>
                <div className="treasure-line">
                    <TreasureOne style={{position: 'absolute', left: '870px', top: '420px'}}/>
                    <TreasureOne style={{position: 'absolute', left: '830px', top: '500px'}}/>
                    <TreasureTwo style={{position: 'absolute', top: '530px', left: '740px'}}/>
                    <TreasureTwo style={{position: 'absolute', top: '500px', left: '650px'}}/>
                    <TreasureThree style={{position: 'absolute', top: '440px', left: '570px'}}/>
                    <TreasureThree style={{position: 'absolute', top: '380px', left: '500px'}}/>
                    <TreasureFour style={{position: 'absolute', top: '400px', left: '410px'}}/>
                    <TreasureFour style={{position: 'absolute', top: '450px', left: '330px'}}/>
                </div>
                {playerIsReady ? <TealOverlay /> : <></>}
                {playerIsReady ? <NamePlayersContainer /> : <></>}
            </div>
        </div>
    )
}

export default HomeScreen;