import { useContext } from 'react';
import { ActionType, GameContext } from '../../../application-context';
import AnnouncerButton from '../../atoms/AnnouncerButton';
import H1 from '../../atoms/H1';
import AnnouncerButtonContainer from '../AnnouncerButtonContainer';
import './PickupTreasureContainer.css'

const PickupTreasureContainer = () => {
    const [appState, appAction] = useContext(GameContext);
    return (
        <div className='roll-the-dice-container'>
            <H1 text={'What will you do with the treasure?'} style={{display: 'block', textAlign: 'center', color: 'white', fontSize: '27px', margin: '20px 0 10px 0'}} />
            <AnnouncerButtonContainer style={{}} text={'What will you do with the treasure?'} onClickFunction={()=>{appAction({
                    type: ActionType.TREASURE_PICKUP_DECISION})}}/>
        </div>
    )
}

export default PickupTreasureContainer;