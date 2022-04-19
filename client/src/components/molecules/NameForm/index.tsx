import { useState } from "react";
import { isPropertySignature } from "typescript";
import ButtonNumberOfPlayers from "../../atoms/ButtonNumberOfPlayers";
import H1 from "../../atoms/H1";
import './NameForm.css'

import NameFormInput from "../../atoms/NameFormInput";
import NameFormLabel from "../../atoms/NameFormLabel";

const NameForm = ({style, addUser}: any) => {
    const [playerName, setPlayerName] = useState("");

    const handleChange = (event: any) => {
        setPlayerName(event.target.value);
    }

    const handleSubmit = () => {
        addUser(playerName);
    }
    return (
        <div className="number-of-players" style={style}>
            <H1 style={{display: 'block', textAlign: 'center', color: 'white', fontSize: '45px', margin: '0 0 10px 0'}} text='Player name:'/>
            <input type="text" value={playerName} onChange={handleChange} />
            <H1 style={{display: 'block', textAlign: 'center', color: 'white', fontSize: '45px', margin: '0 0 10px 0'}} text='Number of players:'/>
            <div className='button-block'>
                <ButtonNumberOfPlayers buttonFunction={()=>{handleSubmit()}} text={'2'}/>
                <ButtonNumberOfPlayers buttonFunction={()=>{handleSubmit()}} text={'3'}/>
                <ButtonNumberOfPlayers buttonFunction={()=>{handleSubmit()}} text={'4'}/>
                <ButtonNumberOfPlayers buttonFunction={()=>{handleSubmit()}} text={'5'}/>
                <ButtonNumberOfPlayers buttonFunction={()=>{handleSubmit()}} text={'6'}/>
            </div>
        </div>
    )
}

export default NameForm;