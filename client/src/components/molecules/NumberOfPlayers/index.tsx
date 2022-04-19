import ButtonNumberOfPlayers from "../../atoms/ButtonNumberOfPlayers";
import H1 from "../../atoms/H1";
import './NumberOfPlayers.css'

const NumberOfPlayers = () => {
    return (
        <div className='number-of-players'>
            <H1 style={{display: 'block', textAlign: 'center', color: 'white', fontSize: '45px', margin: '0 0 10px 0'}} text='Number of players:'/>
            <div className='button-block'>
                <ButtonNumberOfPlayers buttonFunction='console.log("adsad")' text={'2'}/>
                <ButtonNumberOfPlayers text={'3'}/>
                <ButtonNumberOfPlayers text={'4'}/>
                <ButtonNumberOfPlayers text={'5'}/>
                <ButtonNumberOfPlayers text={'6'}/>
            </div>
        </div>
    )
}

export default NumberOfPlayers;