import HomescreenMenuButton from '../../molecules/HomescreenMenuButton';
import './HomescreenMenuContainer.css';

type HomescreenMenuContainer = {
    containerClassName: string,
    exitButtonFunction: () => void,
    loadButtonFunction: () => void,
    singlePlayerButtonFunction: () => void,
};

const HomescreenMenuContainer = ({containerClassName, exitButtonFunction, loadButtonFunction, singlePlayerButtonFunction}: HomescreenMenuContainer) => {
    return (
        <div>
            <div className={containerClassName}>
                <HomescreenMenuButton className={'homescreen-menu-menu-button'} innerText={'Menu'} onClickFunction={()=>{}}/>
                <HomescreenMenuButton className={'homescreen-menu-single-player-button'} innerText={'Single Player'} onClickFunction={singlePlayerButtonFunction}/>
                <HomescreenMenuButton className={'homescreen-menu-multiplayer-button'} innerText={'Multiplayer'} onClickFunction={()=>{}}/>
                <HomescreenMenuButton className={'homescreen-menu-tutorial-button'} innerText={'Tutorial'} onClickFunction={()=>{}}/>
                <HomescreenMenuButton className={'homescreen-menu-load-game-button'} innerText={'Load Game'} onClickFunction={loadButtonFunction}/>
                <HomescreenMenuButton className={'homescreen-menu-exit-button'} innerText={'Exit'} onClickFunction={exitButtonFunction}/>
            </div>
         </div>
    )
};

export default HomescreenMenuContainer;