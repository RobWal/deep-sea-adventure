import { useContext } from 'react';
import { ActionType, GameContext } from '../../../application-context';
import TwoChoicesButton from '../../atoms/TwoChoicesButton';
import './AnnouncerButtonContainer.css'

const AnnouncerButtonContainer = ({style}: any) => {
    const [appState, appAction] = useContext(GameContext);
    let anyTreasureThere = false;
    let currentPlayer = appState.players[appState.currentPlayer];
    if(appState.tiles[appState.players[appState.currentPlayer].mapPosition-1].type !== 0){
        anyTreasureThere = true;
    }
    return (
        <div className='announcer-button-container' style={style}>
            {anyTreasureThere ? 
                <TwoChoicesButton style={{}} text={'Pick it up!'} onClickFunction={()=>{
                    let newPlayerTreasureArray = [...appState.players[appState.currentPlayer].treasure]
                    newPlayerTreasureArray.push(appState.tiles[appState.players[appState.currentPlayer].mapPosition-1])
                    let newTileArray = [...appState.tiles];
                    newTileArray[appState.players[appState.currentPlayer].mapPosition-1] = {
                        type: 0,
                        location: appState.players[appState.currentPlayer].mapPosition,
                    }
                    appAction({
                        type: ActionType.TREASURE_PICKUP_DECISION,
                        payload: {
                            currentPlayer: appState.currentPlayer,
                            newPlayerTreasureArray: newPlayerTreasureArray,
                            newTileArray: newTileArray,
                        }
                    })
                }}
            />
                :
                currentPlayer.treasure.length > 0 ? <TwoChoicesButton style={{}} text={'Drop a treasure!'} onClickFunction={()=>{
                appAction({
                    type: ActionType.TREASURE_DROP_DECISION})}}/> 
                :
                <></>}
        </div>
    )
}
{/* <TwoChoicesButton style={{}} text={'Leave it!'} onClickFunction={()=>{
                
                appAction({
                    type: ActionType.TREASURE_LEAVE_DECISION})}}/> */}
export default AnnouncerButtonContainer;
