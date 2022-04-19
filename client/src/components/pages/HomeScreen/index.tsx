// import { useNavigate } from "react-router-dom"
import { useState } from 'react';
import DSALogo from '../../atoms/DSALogo';
import H1 from '../../atoms/H1';
import NoTreasure from '../../atoms/NoTreasure';
import OxygenSubmarine from '../../atoms/OxygenSubmarine';
import TealOverlay from '../../atoms/TealOverlay';
import TreasureFour from '../../atoms/TreasureFour';
import TreasureOne from '../../atoms/TreasureOne';
import TreasureThree from '../../atoms/TreasureThree';
import TreasureTwo from '../../atoms/TreasureTwo';
import NamePlayersContainer from '../../organisms/NamePlayersContainer';
import './HomeScreen.css'


const HomeScreen = () => {
    const [playerIsReady, setPlayerIsReady] = useState(false);
    console.log(playerIsReady)
    // let navigate = useNavigate();
    return (
        <div>
            {/* <div className="home-screen" onClick={()=>{navigate("/gamecontainer")}}></div> */}
            <div className="home-screen" onClick={()=>{setPlayerIsReady(true)}}>
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