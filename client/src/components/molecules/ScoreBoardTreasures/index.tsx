import { useContext } from 'react';
import { GameContext, inventoryTileTypes, shownInventoryTileTypes, tileTypes } from '../../../application-context';
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
    else if(appState.currentStep !== 'end_of_round'){
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
    else if(appState.currentStep === 'end_of_round'){
        return (
            <div className='score-board-treasures'>
                {appState.players[playerId].treasure.map((tile: Tile, index) => {
                    return (
                        <div key={index} className='individual-treasure-container'>
                            <Tile style={{width: '50px', height: '50px'}}  component={shownInventoryTileTypes[tile.value]} />
                        </div>
                    )
                })}
            </div>
        )
    } 
    else {
        return (
            <div></div>
        )
    }
}

export default ScoreBoardTreasures;
