import './Tile.css'

const Tile = ({style, component, showComponent}: any) => {
    return (
        <div className='tile' style={style}>
            {component}
            {showComponent}
        </div>
    )
}

export default Tile;