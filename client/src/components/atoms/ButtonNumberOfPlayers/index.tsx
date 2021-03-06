import './ButtonNumberOfPlayers.css'

const ButtonNumberOfPlayers = ({buttonFunction, style, text}: any) => {
    return (
        <button className="button-number-of-players" onClick={buttonFunction} style={style}>{text}</button>
    )
}

export default ButtonNumberOfPlayers