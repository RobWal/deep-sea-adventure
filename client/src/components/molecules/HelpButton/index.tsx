import HelpCircle from "../../atoms/VisualAssets/HelpCircle";
import './HelpButton.css'

type HelpButton = {
    buttonFunction: any,
    style: object,
}

const HelpButton = ({helpButtonFunction, style}: any) => {
    return (
        <div onClick={helpButtonFunction} style={style}>
            <HelpCircle />
        </div>
    )
}

export default HelpButton;