import { ActionType } from '../../../application-context';
import TwoChoicesButton from '../../atoms/TwoChoicesButton';
import './AnnouncerButtonContainer.css'

const AnnouncerButtonContainer = ({style}: any) => {
    return (
        <div className='announcer-button-container' style={style}>
            {/* <TwoChoicesButton style={{}} text={'Pick it up!'} onClickFunction={appAction({
                    type: ActionType.TREASURE_PICKUP_DECISION})}/>
            <TwoChoicesButton style={{}} text={'Leave it!'} onClickFunction={appAction({
                    type: ActionType.TREASURE_PICKUP_DECISION})}/> */}
        </div>
    )
}

export default AnnouncerButtonContainer;
