import { useContext } from 'react';
import { 
    GameContext, 
    tileLocations, 
    tileTypes,
} from '../../../application-context';
import Tile from '../../atoms/Tile';
import './TileLayout.css';
// const util = require('util');

interface Tile {
    type: number,
    id: number,
    location: number,
    value: number
}

const TileLayout = () => {
    const [appState, appAction] = useContext(GameContext);
    // The code below alters the existing tileLocations from application-context, adding extra key:value pairs to account
    // for treasure tile stacks. 
    
    // Deep clone both the appState.tiles and tileLocations to modify them for our needs. 
    const modifiedAppstateTiles = JSON.parse(JSON.stringify(appState.tiles));
    const modifiedTileLocations = JSON.parse(JSON.stringify(tileLocations));
    if(appState.currentRound !== 1){
        let isThereATreasureTileStack = false; 
        // tileLocationIterator is used to set the last integer in the object key, in addition to masterTreasureStackLocation
        // with '0' as a buffer to ensure unique keys are created. For example, if the location of a treasure stack 
        // is 24, it would be '24' + '0' + '1', with the next tile in the stack being '24' + '0' + '2'. 
        let tileLocationIterator = 1;
        let masterTreasureStackLocation = 0;
        // The newTileLocationOffset is the amount of px (10) to offset the new location by to ensure they're all visible. 
        let newTileLocationOffsetLeft = 10;
        let newTileLocationOffsetTop = -3;
        for(let i = 1; i < appState.tiles.length; i++){
            // If the tile locations match..
            if(appState.tiles[i].location === appState.tiles[i - 1].location){
                isThereATreasureTileStack = true;
                // Set the masterTreasureStackLocation to the location (e.g. '24').
                masterTreasureStackLocation = appState.tiles[i].location;
                // Using the values above, create the key to be used for the key:value pair in the modifiedTileLocations object. 
                let modifiedTileLocationsKey = `${masterTreasureStackLocation}0${tileLocationIterator}`;
                // Similarly, use the values above to update the location of tiles in the treasure tile stack
                modifiedAppstateTiles[i].location = `${masterTreasureStackLocation}0${tileLocationIterator}`;
                // Take the existing value for that location (e.g. '24'), use it to get the original value for it's 'left' and 'top'
                //  value, remove the 'px' off the end, turn it into a float, and add the newTileLocationOffset. 
                let modifiedTileLeftLocation = `${parseFloat(modifiedTileLocations[masterTreasureStackLocation].left.slice(0, -2)) + newTileLocationOffsetLeft}px`;
                let modifiedTileTopLocation = `${parseFloat(modifiedTileLocations[masterTreasureStackLocation].top.slice(0, -2)) + newTileLocationOffsetTop}px`;
                // Using all of the above values, create the new key:value pair. 
                modifiedTileLocations[modifiedTileLocationsKey] = {top: `${modifiedTileTopLocation}`, left: `${modifiedTileLeftLocation}`};
                // Iterate these values to ensure a unique key value pair are created. 
                tileLocationIterator = tileLocationIterator + 1;
                newTileLocationOffsetLeft = newTileLocationOffsetLeft + 10;
                newTileLocationOffsetTop = newTileLocationOffsetTop - 3;
            }
            // If the location is not unique, reset the variables to their base value, ready to be used for the next tile stack. 
            else if(appState.tiles[i].location !== appState.tiles[i - 1].location){
                tileLocationIterator = 1;
                newTileLocationOffsetLeft = 10;
                newTileLocationOffsetTop = -3;
            };
        };
    };

    return (
        <div className='tile-layout'>
            {modifiedAppstateTiles.map((tile: Tile, index: any) => {
                return (
                    <div key={index}>
                        <Tile style={{top: modifiedTileLocations[tile.location].top, left: modifiedTileLocations[tile.location].left}} component={tileTypes[tile.type]}/>
                    </div>
                 ) 
                })} 
        </div>
    )
}

export default TileLayout;