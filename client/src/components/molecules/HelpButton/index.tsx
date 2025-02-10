import HelpCircle from "../../atoms/VisualAssets/HelpCircle";
import './HelpButton.css'

type HelpButton = {
    buttonFunction: any,
    style: object,
}

const HelpButton = ({buttonFunction, style}: any) => {
    return (
        <div onClick={buttonFunction} style={style}>
            <HelpCircle />
        </div>
    )
}

export default HelpButton;