import LoadCircle from "../../atoms/VisualAssets/LoadCircle";
import './LoadButton.css'

type LoadButton = {
    buttonFunction: any,
    style: object,
}

const LoadButton = ({buttonFunction, style}: any) => {
    return (
        <div onClick={buttonFunction} style={style}>
            <LoadCircle />
        </div>
    )
}

export default LoadButton;