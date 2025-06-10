import { useState } from 'react';
import HomescreenMenuButton from '../../molecules/HomescreenMenuButton';
import './HomescreenMenuContainer.css';

type HomescreenMenuContainer = {
    containerClassName: string,
    // buttonClassName: string,
    // HomescreenMenuButton: () => void,
    escapeButtonFunction: () => void,
    loadButtonFunction: () => void,
    singlePlayerButtonFunction: () => void,
};

const HomescreenMenuContainer = ({containerClassName, escapeButtonFunction, loadButtonFunction, singlePlayerButtonFunction}: HomescreenMenuContainer) => {
    // const [homescreenMenuButtonClassName, setHomescreenMenuButtonClassName] = useState('homescreen-menu-button-on-load');
    return (
        <div>
            <div className={containerClassName}>
                <HomescreenMenuButton className={'homescreen-menu-menu-button'} innerText={'Menu'} onClickFunction={()=>{}}/>
                <HomescreenMenuButton className={'homescreen-menu-single-player-button'} innerText={'Single Player'} onClickFunction={singlePlayerButtonFunction}/>
                <HomescreenMenuButton className={'homescreen-menu-multiplayer-button'} innerText={'Multiplayer'} onClickFunction={()=>{}}/>
                <HomescreenMenuButton className={'homescreen-menu-tutorial-button'} innerText={'Tutorial'} onClickFunction={()=>{}}/>
                <HomescreenMenuButton className={'homescreen-menu-load-game-button'} innerText={'Load Game'} onClickFunction={loadButtonFunction}/>
                <HomescreenMenuButton className={'homescreen-menu-exit-button'} innerText={'Exit'} onClickFunction={escapeButtonFunction}/>
            </div>
         </div>
    )
};

export default HomescreenMenuContainer;