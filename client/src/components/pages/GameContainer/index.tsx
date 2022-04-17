import './GameContainer.css'

import TreasureOne from '../../atoms/TreasureOne';
import TreasureTwo from '../../atoms/TreasureTwo';
import TreasureThree from '../../atoms/TreasureThree';
import TreasureFour from '../../atoms/TreasureFour';
import NoTreasure from '../../atoms/NoTreasure';
import OxygenSubmarine from '../../atoms/OxygenSubmarine';
import DieTwo from '../../atoms/DieTwo';
import DieOne from '../../atoms/DieOne';
import DieThree from '../../atoms/DieThree';
import TreasurePointZero from '../../atoms/TreasurePointZero';
import TreasurePointOne from '../../atoms/TreasurePointOne';
import TreasurePointTwo from '../../atoms/TreasurePointTwo';
import TreasurePointThree from '../../atoms/TreasurePointThree';
import TreasurePointFour from '../../atoms/TreasurePointFour';
import TreasurePointFive from '../../atoms/TreasurePointFive';
import TreasurePointSix from '../../atoms/TreasurePointSix';
import TreasurePointSeven from '../../atoms/TreasurePointSeven';
import TreasurePointEight from '../../atoms/TreasurePointEight';
import TreasurePointNine from '../../atoms/TreasurePointNine';
import TreasurePointTen from '../../atoms/TreasurePointTen';
import TreasurePointEleven from '../../atoms/TreasurePointEleven';
import TreasurePointTwelve from '../../atoms/TreasurePointTwelve';
import TreasurePointThirteen from '../../atoms/TreasurePointThirteen';
import TreasurePointFourteen from '../../atoms/TreasurePointFourteen';
import TreasurePointFifteen from '../../atoms/TreasurePointFifteen';
import DSALogo from '../../atoms/DSALogo';
import DiceContainer from '../../molecules/DiceContainer';
import H1 from '../../atoms/H1';
import AnnouncerMessage from '../../atoms/AnnouncerMessage';
import AnnouncerContainer from '../../organisms/AnnouncerContainer';

const GameContainer = (props: any) => {
    return (
        <div className="game-container">

            <TreasureOne />
            <TreasureTwo />
            <TreasureThree />
            <TreasureFour />
            <OxygenSubmarine style={{position: 'absolute', top: '20px', left: '500px'}}/>
            <AnnouncerContainer dice={<DiceContainer diceOne={<DieOne />} diceTwo={<DieThree />}/>} announcerMessage={<AnnouncerMessage text='TomTomTomTom picked up the treasure!'/>}/>
            <div>
                
                {/* <DieTwo />
                <NoTreasure />
                <TreasurePointZero />
                <TreasurePointOne />
                <TreasurePointTwo />
                <TreasurePointThree />
                <TreasurePointFour />
                <TreasurePointFive />
                <TreasurePointSix />
                <TreasurePointSeven />
                <TreasurePointEight />
                <TreasurePointNine />
                <TreasurePointTen />
                <TreasurePointEleven />
                <TreasurePointTwelve />
                <TreasurePointThirteen />
                <TreasurePointFourteen />
                <TreasurePointFifteen /> */}
            </div>
        </div>
    )
}

export default GameContainer;