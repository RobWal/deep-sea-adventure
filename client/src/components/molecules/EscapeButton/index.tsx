import ButtonCircle from "../../atoms/ButtonCircle";
import './EscapeButton.css'

type EscapeButton = {
    buttonFunction: any,
    style: object,
    text: string,
}

const EscapeButton = ({buttonFunction, style, text}: EscapeButton) => {
    return (
        <div onClick={buttonFunction} style={style}>
            <h2 className="escape-button-text">{text}</h2>
            <ButtonCircle />
        </div>
    )
}

export default EscapeButton;