import { useContext } from 'react';
import { GameContext } from '../../../application-context';
import ScoreBoardCurrentPlayer from '../../atoms/ScoreBoardCurrentPlayer';
import ScoreBoardScore from '../../atoms/ScoreBoardScore';
import ScoreBoardNames from '../../molecules/ScoreBoardNames';
import ScoreBoardTreasures from '../../molecules/ScoreBoardTreasures';
import './ScoreBoardContainer.css'

const ScoreBoardContainer = () => {
    const util = require('util');
    const [appState, appAction] = useContext(GameContext);
    const player = appState.players;
    
    // Check to see if there is game data for the game to render correctly, if so, render the scoreBoardContainer.
    if(player[0]){
        return (
            <div className='score-board-container'>
                <ScoreBoardTreasures playerId={0}/>
                <ScoreBoardNames style={{color: player[0].color}} playerName={player[0].name}/>
                <ScoreBoardCurrentPlayer />
                <ScoreBoardScore style={{color: player[0].color}} score={player[0].score}/>
                <ScoreBoardTreasures playerId={1}/>
                <ScoreBoardNames style={{color: player[1].color}} playerName={player[1].name}/>
                <ScoreBoardCurrentPlayer />
                <ScoreBoardScore style={{color: player[1].color}} score={player[1].score}/>
                {player[2] ? 
                <div className='score-board-row'>
                    <ScoreBoardTreasures playerId={2}/>
                    <ScoreBoardNames style={{color: player[2].color}} playerName={player[2].name}/>
                    <ScoreBoardCurrentPlayer />
                    <ScoreBoardScore style={{color: player[2].color}} score={player[2].score}/>
                </div>
                : 
                <div className='score-board-row'>
                    <ScoreBoardTreasures />
                    <ScoreBoardNames style={{}} playerName={''}/>
                    <ScoreBoardCurrentPlayer />
                    <ScoreBoardScore style={{}} score={''}/>
                </div>
                }
                {player[3] ? 
                <div className='score-board-row'>
                    <ScoreBoardTreasures playerId={3}/>
                    <ScoreBoardNames style={{color: player[3].color}} playerName={player[3].name}/>
                    <ScoreBoardCurrentPlayer />
                    <ScoreBoardScore style={{color: player[3].color}} score={player[3].score}/>
                </div>
                : 
                <div className='score-board-row'>
                    <ScoreBoardTreasures />
                    <ScoreBoardNames style={{}} playerName={''}/>
                    <ScoreBoardCurrentPlayer />
                    <ScoreBoardScore style={{}} score={''}/>
                </div>
                }
                {player[4] ? 
                <div className='score-board-row'>
                    <ScoreBoardTreasures playerId={4}/>
                    <ScoreBoardNames style={{color: player[4].color}} playerName={player[4].name}/>
                    <ScoreBoardCurrentPlayer />
                    <ScoreBoardScore style={{color: player[4].color}} score={player[4].score}/>
                </div>
                : 
                <div className='score-board-row'>
                    <ScoreBoardTreasures />
                    <ScoreBoardNames style={{}} playerName={''}/>
                    <ScoreBoardCurrentPlayer />
                    <ScoreBoardScore style={{}} score={''}/>
                </div>
                }
                {player[5] ? 
                <div className='score-board-row'>
                    <ScoreBoardTreasures playerId={5}/>
                    <ScoreBoardNames style={{color: player[5].color}} playerName={player[5].name}/>
                    <ScoreBoardCurrentPlayer />
                    <ScoreBoardScore style={{color: player[5].color}} score={player[5].score}/>
                </div>
                : 
                <div className='score-board-row'>
                    <ScoreBoardTreasures />
                    <ScoreBoardNames style={{}} playerName={''}/>
                    <ScoreBoardCurrentPlayer />
                    <ScoreBoardScore style={{}} score={''}/>
                </div>
                }
            </div>
        )
    }
    // If there is no game data for the game to render, render an empty div to allow the redirect() in /GameContainer to bring the
    // player back to the homeScreen. 
    else if(!player[0]){
        <div></div>
    }
}

export default ScoreBoardContainer;