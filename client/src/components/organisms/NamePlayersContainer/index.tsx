import { useContext } from "react";
import { useNavigate } from "react-router-dom"
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
    let navigate = useNavigate();

    const handleEscapeButtonSubmit = () => {
        console.log(`We're clicking the button`);
        navigate("/");
    }

    const addNewUser = (value: string) => {
        appAction({
        type: ActionType.ADD_PLAYER,
        payload: {
          userName: value,
        }
      })
    }

    const setTotalPlayers = (value: number) => {
        appAction({
        type: ActionType.SET_TOTAL_PLAYERS,
        payload: {
          totalPlayers: value,
        }})
        appAction({
            type: ActionType.GENERATE_PLAYERS,
            payload: {
                totalPlayers: value,
            }
        })
    }
    return (
        <div>
            <div className='name-players-container'>
                <HelpButton style={{position: 'absolute', top:'15px', right:'0px'}}/>
                <EscapeButton buttonFunction={handleEscapeButtonSubmit} style={{position: 'absolute', top:'15px', left:'15px'}} text={'X'}/>
                <NameForm setTotalPlayers={setTotalPlayers} addUser={addNewUser} style={{position: 'absolute', top:'50px'}}/>
            </div>
        </div>
    )
}

export default NamePlayersContainer;