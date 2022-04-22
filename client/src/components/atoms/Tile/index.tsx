import './Tile.css'

const Tile = ({style, component}: any) => {
    return (
        <div className='tile' style={style}>
            {component}
        </div>
    )
}

export default Tile;