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
    // This checks to make sure that there's anything to return, if not, it returns an empty component.
    if(playerId === undefined){
        return <></>
    }
    // If it isn't the end of the game, display the (hidden) inventoryTileTypes[tile.type]
    // This can be changed to appState.currentStep !== 'end_of_round' if you want the values shown at the end of the round. 
    else if(appState.currentStep !== 'end_of_game'){
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
    // THIS IS CURRENTLY COMMENTED OUT TO TRY AND IMPLEMENT A THREE ROUND GAME. 
    // If it is the end of the round, display the value of the tokens. 
    // This code displays the values of the tiles by changing 'inventoryTileTypes[tile.type] to shownInventoryTileTypes[tile.value]
    
    // else if(appState.currentStep === 'end_of_round'){
    //     return (
    //         <div className='score-board-treasures'>
    //             {appState.players[playerId].treasure.map((tile: Tile, index) => {
    //                 return (
    //                     <div key={index} className='individual-treasure-container'>
    //                         <Tile style={{width: '50px', height: '50px'}}  component={shownInventoryTileTypes[tile.value]} />
    //                     </div>
    //                 )
    //             })}
    //         </div>
    //     )
    // } 
    else {
        return (
            <div></div>
        )
    }
}

export default ScoreBoardTreasures;
