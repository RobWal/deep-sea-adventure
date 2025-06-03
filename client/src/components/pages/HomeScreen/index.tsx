import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    ActionType,
    GameContext,
} from "../../../application-context";
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
import useSound from 'use-sound';
import bubbleClickSFX from '../../sfx/bubbleClick.mp3';

const HomeScreen = () => { 
    const util = require('util');
    const [appState, appAction] = useContext(GameContext);
    let navigate = useNavigate();
    const soundUrl = bubbleClickSFX;
    const [play] = useSound(soundUrl, { playbackRate: 1.0});
    const [tealOverlayHomescreenClassName, setTealOverlayHomescreenClassName] = useState('teal-overlay-name-players-container-on-load');
    const [namePlayersContainerClassName, setNamePlayersContainerClassName] = useState('name-players-container-on-load');
    const playAudio = () => {
        const newPlaybackRate = 0.5 + Math.random();
        play({ playbackRate: newPlaybackRate});
    };

    const selectNamePlayers = () => {        
        if(appState.currentStep === 'return_To_Homescreen'){
            setNamePlayersContainerClassName('name-players-container-visible')
            setTealOverlayHomescreenClassName('teal-overlay-name-players-container-visible');
            playAudio();
            appAction({
                type: ActionType.SELECT_NAME_PLAYERS,
            });
        } else if(appState.currentStep === 'select_Name_Players'){
            //Currently does nothing
        };
    };
    const handleTealOverlayClick = () => {
        setNamePlayersContainerClassName('name-players-container-invisible')
        setTealOverlayHomescreenClassName('teal-overlay-name-players-container-invisible');
        playAudio();
        appAction({
            type: ActionType.RETURN_TO_HOMESCREEN
        })
    };
    // The functions below all handle functions used in the namePlayersContainer
    const handleLoadButtonSubmit = () => {
        // This checks to see if there is a save file, running an error message if there is no file.
        if(localStorage.getItem("currentGame") === null){
            // Placeholder message, need to imlpement a user friendly error message.
            console.log(`There is no save file`);
        } 
        // If there is a save file, the game will load the save file and continue the game. 
        else if(localStorage.getItem("currentGame") !== null){
            playAudio();
            appAction({
                type: ActionType.HOMESCREEN_LOAD_BUTTON
            });
            navigate("/gamecontainer");
        };
    };
    const handleEscapeButtonSubmit = () => {
        setNamePlayersContainerClassName('name-players-container-invisible')
        setTealOverlayHomescreenClassName('teal-overlay-name-players-container-invisible');
        playAudio();
        appAction({
            type: ActionType.RETURN_TO_HOMESCREEN
        });
    };
    // This is a currently useless button that only plays audio and console logs that it's being clicked.
    // This will be turned into a button that explains this menu - That You must enter a name of at least one character, and
    // select the amount of opponents you want to play with. 
    const handleHelpButtonSubmit = () => {
        playAudio();
        // appAction({
        //     type: ActionType.HOMESCREEN_HELP_BUTTON
        // });
    };

    // The two functions below work to prevent game crashes due to players using the 'back' button in their browser.
    // resetAppstateCurrentstep is triggered onLoad with the <div>home-screen</div>, triggering if the currentStep is
    // anything besides the two valid options.  
    
    // Unfortunately, the code below sometimes doesn't 100% 'work', if the player decides to use the back button
    // in the browser, while the game is in a state of change due to a setTimeout(()=>{}). Though the worst thing 
    // that happens is the namePlayersContainer needs to be re triggered by a click. 

    // The 'simplest' way to fix this would be to create a delay before the player can trigger the namePlayersContainer,
    // but that would likely require some kind of beginning animation to give the game a 'reason' to lock the player out
    // from starting the game immediately. However, it would need to be of considerable length, due to the length
    // of the event at the end of the game, from 'end_of_round' to 'tally_scores'. 

    // The more simple way would be to add a check to each step, to ensure that it's still necessary to run, i.e.
    // we're still in the gameContainer and not the homescreen. 
    
    // const resetAppstateCurentstep = () => {
    // };
    
    // The useEffect below performs a similar function to the above, but instead of resetting the currentStep in 
    // isolation, it deletes any unsaved game data that existed, resetting it back to defaultGameState.
    useEffect(() => {
        console.log(`${appState.currentStep}`);
        if(appState.players.length > 0 && (appState.currentStep === 'return_To_Homescreen' || appState.currentStep === 'select_Name_Players')){
            appAction({
                type: ActionType.DELETE_PREVIOUS_GAME_DATA
            });
        }
        // if(!(appState.currentStep === 'return_To_Homescreen' || appState.currentStep === 'select_Name_Players')){
        //     console.log(`We're in here appropriately`);
        //     appAction({
        //         type: ActionType.RESET_APPSTATE_RETURN_TO_HOMESCREEN
        //     });
        // };
    }, [appState.currentStep]);
    return (
        <div>
            <div className="home-screen" onClick={()=>selectNamePlayers()}>
            {/* <div className="home-screen" onClick={()=>selectNamePlayers()} onLoad={()=>resetAppstateCurentstep()}> */}
                <div className='text-container'>
                    <H1 text={'DEEP SEA ADVENTURE'} style={{marginTop: '20px', fontSize:'82px', color: '#2AD2C5'}}/>
                    <H1 text={'Click to play!'} style={{marginTop: '60px',color: 'white', fontSize: '45px'}}/>
                    <H1 text={'Jun Sasaki & Goro Sasaki'} style={{marginTop: '350px',fontSize:'50px', color: '#2AD2C5'}}/>
                </div>
                <NoTreasure className={'no-treasure-homescreen-one'} />
                <NoTreasure className={'no-treasure-homescreen-two'} />
                <NoTreasure className={'no-treasure-homescreen-three'} />
                <NoTreasure className={'no-treasure-homescreen-four'} />
                <DSALogo className={'DSALogo-homescreen'}/> 
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
                <TealOverlay className={tealOverlayHomescreenClassName} onClickFunction={handleTealOverlayClick}/>
                <NamePlayersContainer className={namePlayersContainerClassName} 
                escapeButtonFunction={handleEscapeButtonSubmit}
                helpButtonFunction={handleHelpButtonSubmit}
                loadButtonFunction={handleLoadButtonSubmit} />
            </div>
        </div>
    )
};

export default HomeScreen;