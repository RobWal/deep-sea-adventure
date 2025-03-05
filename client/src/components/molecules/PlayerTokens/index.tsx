import { useContext } from 'react';
import { GameContext, playerTokenHomeLocations, tileLocations } from '../../../application-context';
import PlayerToken from '../../atoms/PlayerToken';
import './PlayerTokens.css'
import { Players } from '../../../application-context';

const PlayerTokens = () => {
    const [appState, appAction] = useContext(GameContext);
    return (
        <div className="player-tokens">
            {/* This code maps through the appState.players array, in order to render each player token at the correct location */}
            {appState.players.map((player: Players, index) => {
                // This if checks to see whether the player is out on a tile, or home in the submarine. Being on the submarine is considered mapPosition 0,
                // which is not in the tileLocations object, and therefore returns undefined. 
                if((tileLocations[player.mapPosition]) === undefined){
                    // If the player is in the submarine, it will return player.mapPosition as undefined, and run this code.
                    return (
                            <PlayerToken key={index} style={{top: playerTokenHomeLocations[appState.players.length - index].top, left: playerTokenHomeLocations[appState.players.length - index].left}} fill={player.color}/>
                    )
                }
                // If the player is outside of the submarine on a tile, it will correctly return player.mapPosition, and run this code.
                return (
                        <PlayerToken key={index} style={{top: tileLocations[player.mapPosition].top, left: tileLocations[player.mapPosition].left, paddingTop: '5px', paddingLeft: '16px'}} fill={player.color}/>
                    ) 
                })} 
        </div>
    )
}

export default PlayerTokens;