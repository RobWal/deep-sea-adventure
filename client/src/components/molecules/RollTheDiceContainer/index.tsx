import { useContext } from 'react';
import { ActionType, GameContext } from '../../../application-context';
import AnnouncerButton from '../../atoms/AnnouncerButton'
import H1 from '../../atoms/H1'
import './RollTheDiceContainer.css'

const RollTheDiceContainer = () => {
    const [appState, appAction] = useContext(GameContext);
    return (
        <div className='roll-the-dice-container'>
            <H1 text={'It is your turn to roll!'} style={{display: 'block', textAlign: 'center', color: 'white', fontSize: '27px', margin: '20px 0 10px 0'}} />
            <AnnouncerButton text={'Roll the dice!'} onClickFunction={()=>{
                appAction({
                    type: ActionType.ROLL_DICE,
                })}}/>
        </div>
    )
}

export default RollTheDiceContainer