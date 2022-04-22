import { useContext } from 'react';
import { GameContext, playerTokenHomeLocations, tileLocations } from '../../../application-context';
import PlayerToken from '../../atoms/PlayerToken';
import './PlayerTokens.css'
import { Players } from '../../../application-context';

const PlayerTokens = () => {
    const [appState, appAction] = useContext(GameContext);
    return (
        <div className="troubleshooting">
            {appState.players.map((player: Players, index) => {
                if((tileLocations[player.mapPosition]) === undefined){
                    return (
                            <PlayerToken key={index} style={{top: playerTokenHomeLocations[player.id].top, left: playerTokenHomeLocations[player.id].left}} fill={player.color}/>
                    )
                }
                return (
                        <PlayerToken key={index} style={{top: tileLocations[player.mapPosition].top, left: tileLocations[player.mapPosition].left}} fill={player.color}/>
                 ) 
                })} 
        </div>
    )
}

export default PlayerTokens;