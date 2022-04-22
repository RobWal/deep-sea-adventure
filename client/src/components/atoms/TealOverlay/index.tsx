import NamePlayersContainer from '../../organisms/NamePlayersContainer';
import './TealOverlay.css'

const TealOverlay = ({hidden}: any) => {
    if(hidden){
        return (<></>)
    } else {
        return (
            <div className='teal-overlay'></div>
        )
    }
}

export default TealOverlay;