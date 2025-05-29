import './TealOverlay.css';

const TealOverlay = ({className, onClickFunction}: any) => {
    return (
        <div onClick={onClickFunction} className={className}></div>
    )
}

export default TealOverlay;