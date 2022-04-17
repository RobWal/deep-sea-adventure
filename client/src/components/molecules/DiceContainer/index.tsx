import './DiceContainer.css'

const DiceContainer = ({diceOne, diceTwo}: any) => {
    return (
        <div className="dice-container">
            {diceOne}
            {diceTwo}
        </div>
    )
}

export default DiceContainer;