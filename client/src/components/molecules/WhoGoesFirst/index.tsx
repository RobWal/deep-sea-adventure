import { useContext, useEffect, useState } from 'react';
import { GameContext, Players } from '../../../application-context';
import H1 from '../../atoms/H1';
import PlayerToken from '../../atoms/PlayerToken';
import EscapeButton from '../EscapeButton';
import HelpButton from '../HelpButton';
import NameForm from '../NameForm';
import './WhoGoesFirst.css'



const WhoGoesFirst = ({hidden}: any) => {
    const [appState, appAction] = useContext(GameContext);
    const [firstDecision, setFirstDecision] = useState(false);

    // TO DO WORK ON SHUFFLER --> NEEDS TO BE MADE INTO A FUNCTION THAT'S CALLED VIA APPACTION, OR DONE IN THE APPSTATE. 
    // const shufflePlayers = () => {
    //     let currentIndex = appState.players.length, randomIndex;
    //     while(currentIndex != 0){
    //         randomIndex = Math.floor(Math.random() * currentIndex);
    //         currentIndex--;
    //         [appState[currentIndex], array[randomIndex]] = [
    //         array[randomIndex], array[currentIndex]];
    //     }
    //     return array;
    // }
    useEffect(() => {
        setTimeout(() => {
            setFirstDecision(true)
        }, 1500)
    }, [])
    if(hidden){
        return (
            <div></div>
        )
    } else {
        return (
            <div>
                <div className='who-goes-first' >
                    <H1 style={{display: 'block', textAlign: 'center', color: 'white', fontSize: '45px', margin: '50px 0 10px 0'}} text='Who will go first?'/>
                    <div className='player-tokens-container'>
                        {appState.players.map((player: Players, index) => {
                            return (
                                <PlayerToken key={index} style={{margin: '0px', position: 'relative', display: 'inline'}} fill={player.color}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}


export default WhoGoesFirst;