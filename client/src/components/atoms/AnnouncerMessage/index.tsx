import './AnnouncerMessage.css';

type AnnouncerMessageProps = {
    text: string;
}

const AnnouncerMessage = ({text}: AnnouncerMessageProps) => {
    return (
        <h2 className='announcer-message'>{text}</h2>
    )
}

export default AnnouncerMessage;