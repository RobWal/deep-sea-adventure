import { useContext, useState } from "react";
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

const NamePlayersContainer = () => {
    const [appState, appAction] = useContext(GameContext);
    const [users, addUser] = useState("");

    const addNewUser = (value: string) => {
        addUser(users + value)
        console.log('Users: ')
        console.log(users)
    }

    const addNumberOfPlayers = (value: number) => {
        console.log(`We're in here! ${value}`)
        console.log('DefaultGameState in NamePlayersContainer.tsx');
        console.log(DefaultGameState);
    }

    return (
        <div>
            <div className='name-players-container'>
                <HelpButton style={{position: 'absolute', top:'15px', right:'0px'}}/>
                <EscapeButton style={{position: 'absolute', top:'15px', left:'15px'}}/>
                <NameForm addOpponents={addNumberOfPlayers} addUser={addNewUser} style={{position: 'absolute', top:'50px'}}/>
            </div>
        </div>
    )
}

export default NamePlayersContainer;