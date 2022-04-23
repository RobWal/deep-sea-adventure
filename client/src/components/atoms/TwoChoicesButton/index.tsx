import './TwoChoicesButton.css'

const TwoChoicesButton = ({style, onClickFunction, text}: any) => {
    return (
        <button className='two-choices-button' style={style} onClick={onClickFunction}>{text}</button>
    )
}

export default TwoChoicesButton;