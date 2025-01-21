import { useContext } from "react";
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

    const handleEscapeButtonSubmit = () => {
        console.log(`We're clicking the button`);
        appAction({
            type: ActionType.RETURN_TO_HOMESCREEN
        })
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

    const beginPrestart = () => {
        appAction({
        type: ActionType.BEGIN_PRESTART,
      })
    }

    return (
        <div>
            <div className='name-players-container'>
                <HelpButton style={{position: 'absolute', top:'15px', right:'0px'}}/>
                <EscapeButton buttonFunction={handleEscapeButtonSubmit} style={{position: 'absolute', top:'15px', left:'15px'}} text={'X'}/>
                <NameForm setTotalPlayers={setTotalPlayers} addUser={addNewUser} beginPrestart={beginPrestart} style={{position: 'absolute', top:'50px'}}/>
            </div>
        </div>
    )
}

export default NamePlayersContainer;