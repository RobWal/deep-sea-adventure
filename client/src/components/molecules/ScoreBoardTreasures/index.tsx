import { useContext } from 'react';
import { GameContext, inventoryTileTypes, tileTypes } from '../../../application-context';
import Tile from '../../atoms/Tile';
import './ScoreBoardTreasures.css'

interface Tile {
    type: number,
    id: number,
    location: number,
    value: number
}

const ScoreBoardTreasures = ({playerId}: any) => {
    const [appState, appAction] = useContext(GameContext);
    if(playerId === undefined){
        return <></>
    }
    // else if (appState.players[playerId-1].treasure.length === 0){
    //     return (
    //         <div className='score-board-treasures'>
    //                 {appState.players[playerId-1].treasure.map((tile: Tile, index) => {
    //                     return (
    //                         <div key={index}>
    //                             <Tile style={{position: 'relative'}}  component={tileTypes[tile.type]} />
    //                         </div>
    //                     )
    //                 })}
    //             </div>
    //     )
    // } 
    else {
        return (
            <div className='score-board-treasures'>
                {appState.players[playerId].treasure.map((tile: Tile, index) => {
                    return (
                        <div key={index} className='individual-treasure-container'>
                            <Tile style={{width: '50px', height: '50px'}}  component={inventoryTileTypes[tile.type]} />
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default ScoreBoardTreasures;
