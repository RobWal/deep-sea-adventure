import ButtonCircle from "../../atoms/ButtonCircle";
import './HelpButton.css'

const HelpButton = ({style}: any) => {
    return (
        <div style={style}>
            <h2 className="help-button-text">?</h2>
            <ButtonCircle />
        </div>
    )
}

export default HelpButton;