import LoadCircle from "../../atoms/VisualAssets/LoadCircle";
import './LoadButton.css'

type LoadButton = {
    loadButtonFunction: ()=>void,
    style: object,
}

const LoadButton = ({loadButtonFunction, style}: LoadButton) => {
    return (
        <div onClick={loadButtonFunction} style={style}>
            <LoadCircle />
        </div>
    )
}

export default LoadButton;