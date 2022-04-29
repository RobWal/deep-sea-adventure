import { useContext } from 'react';
import { ActionType, GameContext } from '../../../application-context';
import TwoChoicesButton from '../../atoms/TwoChoicesButton';
import './TwoChoicesContainer.css'

const TwoChoicesContainer = ({style}: any) => {
    const [appState, appAction] = useContext(GameContext);
    let anyTreasureThere = false;
    if(appState.players[appState.currentPlayer].mapPosition <= 0){
        return(
            <div></div>
        )
    } else {
        if(appState.tiles[appState.players[appState.currentPlayer].mapPosition-1].type !== 0){
            anyTreasureThere = true;
        }
        return (
            <div className='two-choices-container' style={style}> 
                <TwoChoicesButton style={{}} text={'Deeper!'} onClickFunction={()=>{
                    appAction({
                        type: ActionType.DEEPER_OR_BACK,
                        payload: {
                            currentPlayer: appState.currentPlayer,
                            direction: 'forwards',
                        }
                    })
                }}/>
                <TwoChoicesButton style={{}} text={'Turn back!'} onClickFunction={()=>{
                    appAction({
                        type: ActionType.DEEPER_OR_BACK,
                        payload: {
                            currentPlayer: appState.currentPlayer,
                            direction: 'backwards',
                        }
                    })
                }}/> 
            </div>
        )
    }
}

export default TwoChoicesContainer;
