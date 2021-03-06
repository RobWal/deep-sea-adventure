import { useContext, useEffect, useState } from 'react';
import { ActionType, GameContext, Players } from '../../../application-context';
import H1 from '../../atoms/H1';
import PlayerToken from '../../atoms/PlayerToken';
import PlayerTokenBig from '../../atoms/PlayerTokenBig';
import './WhoGoesFirst.css'

const WhoGoesFirst = ({hidden}: any) => {
    const [appState, appAction] = useContext(GameContext);
    const [displayWhoGoesFirst, setDisplayWhoGoesFirst] = useState(false);
    
    let arrayForShuffling: Players[] = [];
    function shuffleArray() {
        arrayForShuffling = [...appState.players];
        for (var i = arrayForShuffling.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = arrayForShuffling[i];
            arrayForShuffling[i] = arrayForShuffling[j];
            arrayForShuffling[j] = temp;
        }
    }
    shuffleArray();
    const shufflePlayers = (array: Players[]) => {
        appAction({
            type: ActionType.SHUFFLE_PLAYERS,
            payload: {
                shuffledPlayersArray: array,
            }
        })
    }
    useEffect(() => {
        setTimeout(() => {
            setDisplayWhoGoesFirst(true);
            shufflePlayers(arrayForShuffling);
        }, 5000)
    }, [])
    if(hidden){
        return (
            <div></div>
        )
    } else {
        return (
            <div>
                <div className='who-goes-first' >
                    {displayWhoGoesFirst ?  <H1 text={`${appState.players[0].name} is going first!`} style={{display: 'block', textAlign: 'center', color: 'white', fontSize: '45px', margin: '50px 0 10px 0'}}></H1> : <H1 style={{display: 'block', textAlign: 'center', color: 'white', fontSize: '45px', margin: '50px 0 10px 0'}} text='Who will go first?'/>}
                    <div className='player-tokens-container'>
                        {appState.players.map((player: Players, index) => {
                            return (
                                <PlayerToken key={index} style={{margin: '0px', position: 'relative', display: 'inline'}} fill={player.color}/>
                            )
                        })}
                    </div>
                    {displayWhoGoesFirst ? <PlayerTokenBig style={{position: 'absolute', top: '140px'}} fill={appState.players[0].color}/> : <></>}
                </div>
            </div>
        )
    }
}


export default WhoGoesFirst;