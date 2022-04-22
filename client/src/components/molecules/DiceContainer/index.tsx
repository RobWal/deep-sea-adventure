import { useContext, useEffect } from 'react';
import { GameContext } from '../../../application-context';
import DieOne from '../../atoms/VisualAssets/DieOne';
import DieThree from '../../atoms/VisualAssets/DieThree';
import DieTwo from '../../atoms/VisualAssets/DieTwo';
import './DiceContainer.css'

const DiceContainer = () => {
    const [appState, appAction] = useContext(GameContext);
    return (
        <div className="dice-container">
            {appState.dice[0] === 1 ? <DieOne /> : <></>}
            {appState.dice[0] === 2 ? <DieTwo /> : <></>}
            {appState.dice[0] === 3 ? <DieThree /> : <></>}
            {appState.dice[1] === 1 ? <DieOne /> : <></>}
            {appState.dice[1] === 2 ? <DieTwo /> : <></>}
            {appState.dice[1] === 3 ? <DieThree /> : <></>}
        </div>
    )
}

export default DiceContainer;