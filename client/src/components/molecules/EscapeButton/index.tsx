import EscapeCircle from "../../atoms/VisualAssets/EscapeCircle";
import './EscapeButton.css'

type EscapeButton = {
    escapeButtonFunction: () => void,
    style: object,
}

const EscapeButton = ({escapeButtonFunction, style}: EscapeButton) => {
    return (
        <div onClick={escapeButtonFunction} style={style}>
            <EscapeCircle />
        </div>
    )
}

export default EscapeButton;