import { useContext } from 'react';
import { GameContext } from '../../../application-context';
import H1 from '../../atoms/H1';
import TwoChoicesButton from '../../atoms/TwoChoicesButton';
import AnnouncerButtonContainer from '../AnnouncerButtonContainer';
import TwoChoicesContainer from '../TwoChoicesContainer';
import './ForwardsOrBackwardsContainer.css'

const ForwardsOrBackwardsContainer = () => {
    const [appState, appAction] = useContext(GameContext);
    return (
        <div className='forwards-or-backwards-container'>
            <H1 text={'Deeper or resurface?'} style={{display: 'block', textAlign: 'center', color: 'white', fontSize: '27px', margin: '20px 0 40px 0'}} />
            <TwoChoicesContainer />
        </div>
    )   
}

export default ForwardsOrBackwardsContainer;