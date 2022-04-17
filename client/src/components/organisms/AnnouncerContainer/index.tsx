import './AnnouncerContainer.css'

const AnnouncerContainer = ({announcerMessage, dice}: any) => {
    return (
        <div className='announcer-container'>
            {dice}
            {announcerMessage}
        </div>
    )
}

export default AnnouncerContainer;