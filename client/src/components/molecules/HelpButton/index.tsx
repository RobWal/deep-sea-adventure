import ButtonCircle from "../../atoms/ButtonCircle";
import './HelpButton.css'

type HelpButton = {
    buttonFunction: any,
    style: object,
    text: string,
}

const HelpButton = ({buttonFunction, style, text}: any) => {
    return (
        <div onClick={buttonFunction} style={style}>
            <h2 className="help-button-text">{text}</h2>
            <ButtonCircle />
        </div>
    )
}

export default HelpButton;