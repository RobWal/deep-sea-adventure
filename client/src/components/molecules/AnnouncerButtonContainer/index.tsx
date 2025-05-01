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
        if(appState.tiles[appState.players[appState.currentPlayer].mapPosition-1].type !== 0){
            anyTreasureThere = true;
        }
        return (
            <div className='announcer-button-container' style={style}>
                {/* If there is treasure where the player landed, the player can choose between picking up
                the treasure, and doing nothing. */}
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
                            // Replace the picked up tile(s) with a single type 0 tile. 
                            newTileArray.push({
                                type: 0,
                                location: appState.players[appState.currentPlayer].mapPosition,
                            });
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
                            // If the current player opting to drop a treasure has a treasure of type 1, drop that treasure
                            // as a priority. 
                            for(let i = 0; i < newPlayerTreasureArray.length; i++){
                                if(newPlayerTreasureArray[i].type === 1 || treasureToBeDropped.type > 1){
                                    treasureToBeDropped = newPlayerTreasureArray[i];
                                }
                                else if(JSON.stringify(treasureToBeDropped) === '{}'){
                                    treasureToBeDropped = newPlayerTreasureArray[i];
                                };
                            }
                            // if(treasureToBeDropped === {}){
                            //     for(let i = 0; i < newPlayerTreasureArray.length; i++){
                            //         if(newPlayerTreasureArray[i].type === 2){
                            //             treasureToBeDropped = newPlayerTreasureArray[i];
                            //         }
                            //     }
                            // }
                            // if(treasureToBeDropped === {}){
                            //     for(let i = 0; i < newPlayerTreasureArray.length; i++){
                            //         if(newPlayerTreasureArray[i].type === 3){
                            //             treasureToBeDropped = newPlayerTreasureArray[i];
                            //         }
                            //     }
                            // }
                            // if(treasureToBeDropped === {}){
                            //     for(let i = 0; i < newPlayerTreasureArray.length; i++){
                            //         if(newPlayerTreasureArray[i].type === 4){
                            //             treasureToBeDropped = newPlayerTreasureArray[i];
                            //         }
                            //     }
                            // }
                            newTileArray[appState.players[appState.currentPlayer].mapPosition-1] = {
                                type: treasureToBeDropped.type,
                                id: treasureToBeDropped.id,
                                location: appState.players[appState.currentPlayer].mapPosition,
                                value: treasureToBeDropped.value,
                            }
                            newPlayerTreasureArray = newPlayerTreasureArray.filter(function(element) {
                                return element != treasureToBeDropped
                            })

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
