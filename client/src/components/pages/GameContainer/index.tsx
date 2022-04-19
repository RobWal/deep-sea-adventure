import AnnouncerMessage from '../../atoms/AnnouncerMessage';
import DieOne from '../../atoms/DieOne';
import DieThree from '../../atoms/DieThree';
import OxygenSubmarine from '../../atoms/OxygenSubmarine';
import DiceContainer from '../../molecules/DiceContainer';
import AnnouncerContainer from '../../organisms/AnnouncerContainer';
import './GameContainer.css'


const GameContainer = () => {
    return (
        <div  className="game-container">
            <OxygenSubmarine style={{position: 'absolute', top: '20px', left: '500px'}}/>
            <AnnouncerContainer dice={<DiceContainer diceOne={<DieOne />} diceTwo={<DieThree />}/>} announcerMessage={<AnnouncerMessage text='TomTomTomTom picked up the treasure!'/>}/>
        </div>
    )
}

export default GameContainer;