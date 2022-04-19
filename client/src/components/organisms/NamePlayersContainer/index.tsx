import { useState } from "react";
import EscapeButton from "../../molecules/EscapeButton";
import HelpButton from "../../molecules/HelpButton";
import NameForm from "../../molecules/NameForm";
import NumberOfPlayers from "../../molecules/NumberOfPlayers";
import './NamePlayersContainer.css'

const NamePlayersContainer = () => {
    const [users, addUser] = useState("");

    const addNewUser = (value: string) => {
        addUser(users + value)
        console.log(users)
    }

    return (
        <div>
            <div className='name-players-container'>
                <HelpButton style={{position: 'absolute', top:'15px', right:'0px'}}/>
                <EscapeButton style={{position: 'absolute', top:'15px', left:'15px'}}/>
                <NameForm addUser={addNewUser} style={{position: 'absolute', top:'50px'}}/>
                {/* <NumberOfPlayers /> */}
            </div>
        </div>
    )
}

export default NamePlayersContainer;