import EscapeCircle from "../../atoms/VisualAssets/EscapeCircle";
import './EscapeButton.css'

type EscapeButton = {
    buttonFunction: any,
    style: object,
}

const EscapeButton = ({buttonFunction, style}: EscapeButton) => {
    return (
        <div onClick={buttonFunction} style={style}>
            <EscapeCircle />
        </div>
    )
}

export default EscapeButton;