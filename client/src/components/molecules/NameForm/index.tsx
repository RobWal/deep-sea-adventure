import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonNumberOfPlayers from "../../atoms/ButtonNumberOfPlayers";
import H1 from "../../atoms/H1";
import './NameForm.css';
import useSound from 'use-sound';
import bubbleClickSFX from '../../sfx/bubbleClick.mp3';

const NameForm = ({style, addPlayer, setTotalPlayers, moveToGameContainer}: any) => {
    const [nameIsValid, setNameIsValid] = useState(false);
    let navigate = useNavigate();
    const [playerName, setPlayerName] = useState("");
    const [areButtonsClickable, setAreButtonsClickable] = useState(true);
    const soundUrl = bubbleClickSFX;
    const [play] = useSound(soundUrl, {playbackRate: 1.0});

    const playAudio = () => {
        const newPlaybackRate = 0.5;
        play({ playbackRate: newPlaybackRate});

    };    
    const handleChange = (event: any) => {
        setPlayerName(event.target.value);
    }

    useEffect(() => {
        if(playerName.length <= 0){
            setNameIsValid(false);
        } else if(playerName.length >= 0){
            setNameIsValid(true);
        }
    })

    // When a person clicks the number of opponents they'd like to face, once they've submitted a valid name (>0 length)
    const handleSubmit = (e: any) => {
        // If the buttons are clickable - A value used to lock players out from clicking the button repeatedly before
        // the game moves to the GameContainer.
        if(areButtonsClickable){
            // Set areButtonsClickable to false, to ensure players can't repeatedly click the button. 
            setAreButtonsClickable(false);
            playAudio();
            setTotalPlayers(e.target.innerHTML)
            addPlayer(playerName);
            moveToGameContainer();
            navigate("/gamecontainer");
        };
    };

    const ignoreSubmit = (e: any) => {}

    return (
        <div className="number-of-players" style={style}>
            <H1 style={{display: 'block', textAlign: 'center', color: 'white', fontSize: '45px', margin: '0 0 10px 0'}} text='Your name:'/>
            <input placeholder={"Dave"} autoFocus type="text" value={playerName} onChange={handleChange} maxLength={10}/>
            <H1 style={{display: 'block', textAlign: 'center', color: 'white', fontSize: '45px', margin: '0 0 10px 0'}} text='Number of players:'/>
            {nameIsValid ? <div className='button-block'>
                <ButtonNumberOfPlayers buttonFunction={handleSubmit} style={{}} text={'2'}/>
                <ButtonNumberOfPlayers buttonFunction={handleSubmit} style={{}} text={'3'}/>
                <ButtonNumberOfPlayers buttonFunction={handleSubmit} style={{}} text={'4'}/>
                <ButtonNumberOfPlayers buttonFunction={handleSubmit} style={{}} text={'5'}/>
                <ButtonNumberOfPlayers buttonFunction={handleSubmit} style={{}} text={'6'}/>
            </div> 
            : 
            <div className='button-block'>
                <ButtonNumberOfPlayers buttonFunction={ignoreSubmit} style={{'backgroundColor': '#5aa2c5'}} text={'2'}/>
                <ButtonNumberOfPlayers buttonFunction={ignoreSubmit} style={{'backgroundColor': '#5aa2c5'}} text={'3'}/>
                <ButtonNumberOfPlayers buttonFunction={ignoreSubmit} style={{'backgroundColor': '#5aa2c5'}} text={'4'}/>
                <ButtonNumberOfPlayers buttonFunction={ignoreSubmit} style={{'backgroundColor': '#5aa2c5'}} text={'5'}/>
                <ButtonNumberOfPlayers buttonFunction={ignoreSubmit} style={{'backgroundColor': '#5aa2c5'}} text={'6'}/>
            </div>}
        </div>
    )
    
}

export default NameForm;