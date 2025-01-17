import './ButtonNumberOfPlayers.css'

type ButtonNumberOfPlayers = {
    buttonFunction: any,
    style: object,
    text: string,
}

const ButtonNumberOfPlayers = ({buttonFunction, style, text}: ButtonNumberOfPlayers) => {
    return (
        <button className="button-number-of-players" onClick={buttonFunction} style={style}>{text}</button>
    )
}

export default ButtonNumberOfPlayers