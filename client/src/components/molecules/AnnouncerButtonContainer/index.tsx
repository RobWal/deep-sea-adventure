import { useContext } from 'react';
import { ActionType, GameContext } from '../../../application-context';
import TwoChoicesButton from '../../atoms/TwoChoicesButton';
import './AnnouncerButtonContainer.css'


const AnnouncerButtonContainer = ({style}: any) => {
    const util = require('util');

    const [appState, appAction] = useContext(GameContext);
    let anyTreasureThere = false;
    let currentPlayer = appState.players[appState.currentPlayer];
    if(appState.players[appState.currentPlayer].mapPosition <= 0) {
        return (
            <div></div>
        )
    } else {
        for(let i = 0; i < appState.tiles.length; i++){
            // console.log(`We're checking to see if there are any tiles in this location by comparing the following varaibles.`);
            // console.log(`appState.tiles[i].location: ${appState.tiles[i].location} and \n`);
            // console.log(`appState.players[appState.currentPlayer].mapPosition-1: ${appState.players[appState.currentPlayer].mapPosition-1}`);
            if(appState.tiles[i].location === appState.players[appState.currentPlayer].mapPosition && appState.tiles[i].type !== 0){
                anyTreasureThere = true;
            }
        }
        // if(appState.tiles[appState.players[appState.currentPlayer].mapPosition-1].type !== 0){
        //     anyTreasureThere = true;
        // }
        return (
            <div className='announcer-button-container' style={style}>
                {/* If there is treasure where the player landed, the player can choose between picking up
                the treasure, dropping a treasure, and doing nothing. */}
                {anyTreasureThere ? 
                    <div className='announcer-button-container'>
                        <TwoChoicesButton style={{}} text={'Pick it up!'} onClickFunction={()=>{
                            let newPlayerTreasureArray = [...appState.players[appState.currentPlayer].treasure];
                            let newTileArray = [...appState.tiles];
                            // This line of code right here is the one responsible for adding the treasure from the treasure
                            // tile layout, into the players inventory. 
                            for(let i = 0; i < newTileArray.length; i++){
                                if(newTileArray[i].location === appState.players[appState.currentPlayer].mapPosition){
                                    newPlayerTreasureArray.push(newTileArray[i]);
                                    newTileArray.splice(i, 1);
                                    i--;
                                };
                            };
                            // This code inserts a type 0 treasure tile into the treasure array to replace the picked up treasure. 
                            // It works by iterating through the treasure tiles, checking the treasure tile location against the players 
                            // position. Once the tile position > the player position, it inserts a type 0 tile in the previous spot. 

                            // Unfortunately, the exception to this rule is when the player lands on the very last spot. Once the 
                            // player picks up that treasure, the tiles only go to X, where the player position is X+1, meaning the 
                            // condition is never met. This necessitates the first if check. 
                            
                            // If the tile being picked up is the last tile in the array, creating a situation where the 
                            // player map position is > the position of the last tile in the treasure tile array.
                            if(newTileArray[newTileArray.length-1].location < appState.players[appState.currentPlayer].mapPosition){
                                newTileArray.push ({
                                    type: 0,
                                    location: appState.players[appState.currentPlayer].mapPosition,
                                });
                            }
                            else if(newTileArray[newTileArray.length-1].location >= appState.players[appState.currentPlayer].mapPosition){
                                for(let i = 0; i < newTileArray.length; i++){
                                    if(newTileArray[i].location > appState.players[appState.currentPlayer].mapPosition){
                                        newTileArray.splice(i, 0, 
                                            {
                                                type: 0,
                                                location: appState.players[appState.currentPlayer].mapPosition,
                                            }
                                        );
                                        i += 50;
                                    };
                                };
                            };
                            // newTileArray.push({
                            //     type: 0,
                            //     location: appState.players[appState.currentPlayer].mapPosition,
                            // });
                            appAction({
                                type: ActionType.TREASURE_PICKUP_DECISION,
                                payload: {
                                    currentPlayer: appState.currentPlayer,
                                    newPlayerTreasureArray: newPlayerTreasureArray,
                                    newTileArray: newTileArray,
                                }
                            })
                        }}/>
                        <TwoChoicesButton style={{}} text={'Do nothing!'} onClickFunction={()=>{
                        appAction({
                            type: ActionType.TREASURE_LEAVE_DECISION})}}/>
                    </div>
                    :
                    // If there is no treasure on the tile the player landed AND If the player has treasure.. 
                    currentPlayer.treasure.length > 0 ?
                    <div className='announcer-button-container'> 
                        <TwoChoicesButton style={{}} text={'Drop a treasure!'} onClickFunction={()=>{
                            let newTileArray = [...appState.tiles];
                            let newPlayerTreasureArray = [...appState.players[appState.currentPlayer].treasure]
                            let treasureToBeDropped: any = {};
                            let iDOfTileToBeSpliced = 0;
                            // If the current player opting to drop a treasure has a treasure of type 1, drop that treasure
                            // as a priority. 
                            // The below code loops through the player treasure array, and selected the lowest value tile to drop. 
                            // First, it identifies which tile to drop (treasureToBeDropped), and then it removes it 
                            // (newPlayerTreasureArray.splice(i, 1))
                            for(let i = 0; i < newPlayerTreasureArray.length; i++){
                                // If the tile[i] is type 1, drop that treasure. 
                                if(newPlayerTreasureArray[i].type === 1){
                                    treasureToBeDropped[0] = newPlayerTreasureArray[i];
                                    iDOfTileToBeSpliced = newPlayerTreasureArray[i].id;
                                } 
                                // If tile[i] isn't type 1, but the treasureToBeDropped is empty, make it this treasure. 
                                else if(JSON.stringify(treasureToBeDropped) === "{}"){
                                    treasureToBeDropped[0] = newPlayerTreasureArray[i];
                                    iDOfTileToBeSpliced = newPlayerTreasureArray[i].id;
                                }
                                else if(treasureToBeDropped.length !== undefined){
                                    if(treasureToBeDropped[0].type > newPlayerTreasureArray[i].type){
                                        treasureToBeDropped[0] = newPlayerTreasureArray[i];
                                        iDOfTileToBeSpliced = newPlayerTreasureArray[i].id;
                                    };
                                };
                            };
                            // This code is responsible for removing the empty tile from the location the players tile 
                            // will be dropped. It loops through the tile array to find the current tile that matches 
                            // the current players location, and removes it from the array. 
                            for(let i = 0; i < newTileArray.length; i++){
                                if(newTileArray[i].location === appState.players[appState.currentPlayer].mapPosition){
                                    newTileArray.splice(i, 1);
                                    // At the same time, it adds the treasure selected to be dropped by the above logic 
                                    // and inserts it into the treasure tile array, by looping through the current players
                                    // treasure array and matching it against the ID. 
                                    for(let j = 0; j < newPlayerTreasureArray.length; j++){
                                        if(newPlayerTreasureArray[j].id === iDOfTileToBeSpliced){
                                            newPlayerTreasureArray[j].location = appState.players[appState.currentPlayer].mapPosition;
                                            newTileArray.splice(i, 0, newPlayerTreasureArray[j]);
                                            newPlayerTreasureArray.splice(j, 1);
                                        };
                                    }
                                };
                            };

                            // I have no idea what the below code does. 
                            // Commenting it out to see if it breaks anything, fingers crossed! I'll keep it just in case.    
                            // newPlayerTreasureArray = newPlayerTreasureArray.filter(function(element) {
                            //     return element != treasureToBeDropped
                            // })
                            appAction({
                                type: ActionType.TREASURE_DROP_DECISION,
                                payload: {
                                    currentPlayer: appState.currentPlayer,
                                    newPlayerTreasureArray: newPlayerTreasureArray,
                                    newTileArray: newTileArray,
                                }
                            })
                        }}/> 
                        <TwoChoicesButton style={{}} text={'Do nothing!'} onClickFunction={()=>{
                        appAction({
                            type: ActionType.TREASURE_LEAVE_DECISION})}}/>
                    </div>
                    :
                    <TwoChoicesButton style={{}} text={'Do nothing!'} onClickFunction={()=>{
                    
                    appAction({
                        type: ActionType.TREASURE_LEAVE_DECISION})}}/>}
            </div>
        )
    }
}

export default AnnouncerButtonContainer;
