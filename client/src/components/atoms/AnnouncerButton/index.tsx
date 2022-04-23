import './AnnouncerButton.css'

const AnnouncerButton = ({onClickFunction, style, text}: any) => {
    return (
        <button className='announcer-button' onClick={onClickFunction} style={style}>{text}</button>
    )
}

export default AnnouncerButton;