import { useContext, useEffect } from 'react';
import { GameContext } from '../../../application-context';
import ScoreBoardCurrentPlayer from '../../atoms/ScoreBoardCurrentPlayer';
import ScoreBoardScore from '../../atoms/ScoreBoardScore';
import ScoreBoardNames from '../../molecules/ScoreBoardNames';
import ScoreBoardTreasures from '../../molecules/ScoreBoardTreasures';
import './ScoreBoardContainer.css'

const ScoreBoardContainer = () => {
    const [appState, appAction] = useContext(GameContext);
    const player = appState.players;
    
    return (
        <div className='score-board-container'>
            <ScoreBoardTreasures />
            <ScoreBoardNames style={{color: player[0].color}} playerName={player[0].name}/>
            <ScoreBoardCurrentPlayer />
            <ScoreBoardScore />
            <ScoreBoardTreasures />
            <ScoreBoardNames style={{color: player[1].color}} playerName={player[1].name}/>
            <ScoreBoardCurrentPlayer />
            <ScoreBoardScore />
            <ScoreBoardTreasures />
            <ScoreBoardNames style={{color: player[2].color}} playerName={player[2].name}/>
            <ScoreBoardCurrentPlayer />
            <ScoreBoardScore />
            <ScoreBoardTreasures />
            <ScoreBoardNames style={{color: player[3].color}} playerName={player[3].name}/>
            <ScoreBoardCurrentPlayer />
            <ScoreBoardScore />
            <ScoreBoardTreasures />
            <ScoreBoardNames style={{color: player[4].color}} playerName={player[4].name}/>
            <ScoreBoardCurrentPlayer />
            <ScoreBoardScore />
            <ScoreBoardTreasures />
            <ScoreBoardNames style={{color: player[5].color}} playerName={player[5].name}/>
            <ScoreBoardCurrentPlayer />
            <ScoreBoardScore />
            {/* {player[0].name}
            {player[0] ? player[0].name : <></>}
            {player[1] ? player[1].name : <></>}
            {player[2] ? player[2].name : <></>}
            {player[3] ? player[3].name : <></>}
            {player[4] ? player[4].name : <></>}
            {player[5] ? player[5].name : <></>} */}
        </div>
    )
}

export default ScoreBoardContainer;