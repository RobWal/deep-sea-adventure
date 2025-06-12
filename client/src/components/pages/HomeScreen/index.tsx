import { useContext, useEffect, useState, KeyboardEvent } from 'react';
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
import HomescreenMenuContainer from '../../organisms/HomescreenMenuContainer';
import './HomeScreen.css';
import useSound from 'use-sound';
import bubbleClickSFX from '../../sfx/bubbleClick.mp3';

const HomeScreen = () => { 
    const util = require('util');
    const [appState, appAction] = useContext(GameContext);
    const [loadingSaveFile, setLoadingSaveFile] = useState(false);
    let navigate = useNavigate();
    const soundUrl = bubbleClickSFX;
    const [play] = useSound(soundUrl, { playbackRate: 1.0});
    const [tealOverlayHomescreenClassName, setTealOverlayHomescreenClassName] = useState('teal-overlay-name-players-container-on-load');
    const [namePlayersContainerClassName, setNamePlayersContainerClassName] = useState('name-players-container-on-load');
    const [homescreenMenuContainerClassName, setHomescreenMenuContainerClassName] = useState('homescreen-menu-container-on-load');
    const playAudio = () => {
        const newPlaybackRate = 0.5 + Math.random();
        play({ playbackRate: newPlaybackRate});
    };

    
    const openHomescreenMenu = () => {
        // If the currentStep is 'return_To_Homescreen', open the homescreen menu and teal overlay.
        if(appState.currentStep === 'return_To_Homescreen'){
            setNamePlayersContainerClassName('name-players-container-on-load');
            setTealOverlayHomescreenClassName('teal-overlay-name-players-container-visible');
            setHomescreenMenuContainerClassName('homescreen-menu-container-visible');
            playAudio();
            appAction({
                type: ActionType.OPEN_HOMESCREEN_MENU,
            });
        } else if(appState.currentStep === 'open_Homescreen_Menu'){
            //Currently does nothing
        };
    };
    const handleTealOverlayClick = () => {
        // If the user clicks the tealOverlay and it makes the currentStep: 'return_To_Homescreen', set the menu's and teal
        //  overlay to invisible. 
        if(appState.currentStep === 'return_To_Homescreen'){
            setNamePlayersContainerClassName('name-players-container-invisible'); 
            setTealOverlayHomescreenClassName('teal-overlay-name-players-container-invisible');
            setHomescreenMenuContainerClassName('homescreen-menu-container-invisible');
        }
        // If the user clicks the tealOverlay and it makes the currentStep: 'open_Homescreen_Menu', set the menu's and teal
        //  overlay to invisible. 
        else if(appState.currentStep === 'open_Homescreen_Menu'){
            setNamePlayersContainerClassName('name-players-container-on-load');
            setTealOverlayHomescreenClassName('teal-overlay-name-players-container-invisible');
            setHomescreenMenuContainerClassName('homescreen-menu-container-invisible');
        }
        else if(appState.currentStep === 'select_Name_Players'){
            setNamePlayersContainerClassName('name-players-container-on-load');
            setTealOverlayHomescreenClassName('teal-overlay-name-players-container-invisible');
            setHomescreenMenuContainerClassName('homescreen-menu-container-invisible');
        };
        playAudio();
        appAction({
            type: ActionType.RETURN_TO_HOMESCREEN
        })
    };

    const handleSinglePlayerButtonSubmit = () => {
        if(appState.currentStep === 'open_Homescreen_Menu'){
            setNamePlayersContainerClassName('name-players-container-visible');
            setTealOverlayHomescreenClassName('teal-overlay-name-players-container-visible');
            setHomescreenMenuContainerClassName('homescreen-menu-container-invisible');
            playAudio();
            appAction({
                type: ActionType.SELECT_NAME_PLAYERS,
            });
        } else if(appState.currentStep === 'select_Name_Players'){
            //Currently does nothing
        };
    };

    const singlePlayerMenuBackButtonSubmit = () => {
        if(appState.currentStep === 'select_Name_Players'){
            setNamePlayersContainerClassName('name-players-container-invisible');
            setTealOverlayHomescreenClassName('teal-overlay-name-players-container-visible');
            setHomescreenMenuContainerClassName('homescreen-menu-container-visible');
            playAudio();
            appAction({
                type: ActionType.OPEN_HOMESCREEN_MENU,
            });
        };
    };

    // The functions below all handle functions used in the namePlayersContainer
    const handleLoadButtonSubmit = () => {
        // This checks to see if there is a save file, running an error message if there is no file.
        if(localStorage.getItem("currentGame") === null){
            // Placeholder message, need to imlpement a user friendly error message.
            // console.log(`There is no save file`);
        } 
        // If there is a save file, the game will load the save file and continue the game. 
        else if(localStorage.getItem("currentGame") !== null){
            setLoadingSaveFile(true);
            playAudio();
            appAction({
                type: ActionType.HOMESCREEN_LOAD_BUTTON
            });
            navigate("/gamecontainer");
        };
    };

    // Handle the use of the Exit button in the homescreen Menu. 
    const handleExitButtonSubmit = () => {
        setNamePlayersContainerClassName('name-players-container-on-load');
        setTealOverlayHomescreenClassName('teal-overlay-name-players-container-invisible');
        setHomescreenMenuContainerClassName('homescreen-menu-container-invisible');
        playAudio();
        appAction({
            type: ActionType.RETURN_TO_HOMESCREEN
        });
    };

    // This allows users to use the escape button to back out through the menu's. 
    const handleEscapeButtonKeyDown = (e: KeyboardEvent<HTMLImageElement>) => {
        if(e.key === "Escape"){
            if(appState.currentStep === "return_To_Homescreen"){
                // Do nothing.
            }
            else if(appState.currentStep == "open_Homescreen_Menu"){

                setTealOverlayHomescreenClassName('teal-overlay-name-players-container-invisible');
                setHomescreenMenuContainerClassName('homescreen-menu-container-invisible');
                playAudio();
                appAction({
                    type: ActionType.RETURN_TO_HOMESCREEN
                });
            }
        }
    };

    // The two functions below work to prevent game crashes due to players using the 'back' button in their browser.
    // resetAppstateCurrentstep is triggered onLoad with the <div>home-screen</div>, triggering if the currentStep is
    // anything besides the two valid options.  
    
    // The useEffect below performs a similar function to the above, but instead of resetting the currentStep in 
    // isolation, it deletes any unsaved game data that existed, resetting it back to defaultGameState.
    useEffect(() => {
        console.log(appState.currentStep);
        // Check to make sure the player isn't loading a save file. If they are, don't interfere with the loading process. 
        if(!loadingSaveFile){
            if(appState.players.length > 0 && (appState.currentStep === 'return_To_Homescreen' || appState.currentStep === 'select_Name_Players')){
                appAction({
                    type: ActionType.DELETE_PREVIOUS_GAME_DATA
                });
            }
            if(!(appState.currentStep === 'return_To_Homescreen' ||  appState.currentStep === 'open_Homescreen_Menu' || appState.currentStep === 'select_Name_Players' || appState.currentStep === 'move_to_game_container')){
                appAction({
                    type: ActionType.RESET_APPSTATE_RETURN_TO_HOMESCREEN
                });
            };
        }
    }, [appState.currentStep]);

    return (
        <div>
            <div tabIndex={0} className="homescreen" onClick={openHomescreenMenu} onKeyDown={handleEscapeButtonKeyDown}>
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
                singlePlayerMenuBackButtonFunction={singlePlayerMenuBackButtonSubmit}/>
                <HomescreenMenuContainer containerClassName={homescreenMenuContainerClassName} 
                singlePlayerButtonFunction={handleSinglePlayerButtonSubmit}
                loadButtonFunction={handleLoadButtonSubmit}
                exitButtonFunction={handleExitButtonSubmit}/>
            </div>
        </div>
    )
};

export default HomeScreen;