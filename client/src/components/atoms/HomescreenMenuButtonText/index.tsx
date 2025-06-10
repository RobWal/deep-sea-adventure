import './HomescreenMenuButtonText.css'

type HomescreenMenuButtonText = {
    innerText: string,
}

const HomescreenMenuButtonText = ({innerText}: HomescreenMenuButtonText) => {
    return (
        <div className='homescreen-menu-button-text' >{innerText}</div>
    )
}

export default HomescreenMenuButtonText;