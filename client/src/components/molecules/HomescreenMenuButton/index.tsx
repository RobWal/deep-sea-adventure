import './HomescreenMenuButton.css';
import HomescreenMenuButtonText from '../../atoms/HomescreenMenuButtonText';

type HomescreenMenuButton = {
    className: string,
    innerText: string,
    onClickFunction: () => void,
}

const HomescreenMenuButton = ({innerText, className, onClickFunction}: HomescreenMenuButton) => {
    return (
        <div className={className} onClick={onClickFunction}>
            <HomescreenMenuButtonText innerText={innerText}></HomescreenMenuButtonText>
        </div>
    )
}

export default HomescreenMenuButton;