import ButtonCircle from "../../atoms/ButtonCircle";
import './EscapeButton.css'

const EscapeButton = ({style}: any) => {
    return (
        <div style={style}>
            <h2 className="escape-button-text">X</h2>
            <ButtonCircle />
        </div>
    )
}

export default EscapeButton;