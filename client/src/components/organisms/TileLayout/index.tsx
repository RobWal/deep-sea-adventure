import { useContext } from 'react';
import { GameContext, tileLocations, tileTypes } from '../../../application-context';
import PlayerToken from '../../atoms/PlayerToken';
// import { GameContext, tileLocations } from '../../../application-context';
import Tile from '../../atoms/Tile';
import TreasureOne from '../../atoms/VisualAssets/TreasureOne';
import TreasureTwo from '../../atoms/VisualAssets/TreasureTwo';
import './TileLayout.css'

interface Tile {
    type: number,
    id: number,
    location: number,
    value: number
}

const TileLayout = () => {
    const [appState, appAction] = useContext(GameContext);
        
    return (
        <div className='tile-layout'>
            {appState.tiles.map((tile: Tile, index) => {
                return (
                    <div key={index}>
                        <Tile style={{top: tileLocations[tile.location].top, left: tileLocations[tile.location].left}} component={tileTypes[tile.type]} />
                    </div>
                 ) 
                })} 
        </div>
    )
}

export default TileLayout;