import {
    ActionType,
    GameContext,
} from "../../../application-context";
import { useContext } from 'react';
import './TealOverlay.css';

const TealOverlay = ({className, onClickFunction}: any) => {
    const [appState, appAction] = useContext(GameContext);
    
    return (
        <div onClick={onClickFunction} className={className}></div>
    )
}

export default TealOverlay;