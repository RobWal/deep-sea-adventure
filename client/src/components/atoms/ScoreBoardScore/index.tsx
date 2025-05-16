import './ScoreBoardScore.css';
import {
    GameContext,
} from "../../../application-context";
import { useContext } from 'react';


const ScoreBoardScore = ({style, score}: any) => {
    const [appState, appAction] = useContext(GameContext);
    const currentRound = appState.currentRound === 4;
    const placeHolderScore = '';

    return (
        <div className='score-board-score' style={style}>
            {
                currentRound ? 
                score 
                : 
                placeHolderScore
            }
        </div>
    )
}

export default ScoreBoardScore