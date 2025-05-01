import { useContext } from 'react';
import { GameContext } from '../../../application-context';
import H1 from '../../atoms/H1';
import AnnouncerButtonContainer from '../AnnouncerButtonContainer';
import './PickupTreasureContainer.css'

const PickupTreasureContainer = () => {
    const [appState, appAction] = useContext(GameContext);
    return (
        <div className='pickup-treasure-container'>
            <H1 text={'What will you do?'} style={{display: 'block', textAlign: 'center', color: 'white', fontSize: '27px', margin: '20px 0 40px 0'}} />
            {/* The AnnouncerButtonContainer contains the logic for picking up, 
            leaving, and dropping treasure. */}
            <AnnouncerButtonContainer style={{}} text={'What will you do?'} />
        </div>
    )
}

export default PickupTreasureContainer;