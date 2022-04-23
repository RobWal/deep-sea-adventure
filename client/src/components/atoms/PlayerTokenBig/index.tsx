import './PlayerTokenBig.css'

const PlayerTokenBig = ({style, fill}: any) => {
    return (
        <div className='player-token-big' style={style}>
            <svg xmlns="http://www.w3.org/2000/svg" width='72' height='141' version="1.1" fill={fill} >
            <path d="M 36 54 A 3 3 0 0 0 36 0 A 3 3 0 0 0 36 54 L 24 51 C 0 54 0 54 0 123 C 0 135 6 141 15 141 L 55 141 C 66 141 72 135 72 123 C 72 54 72 54 48 51"/>
            </svg>
        </div>
    )
}

export default PlayerTokenBig;


// M 36 54 A 3 3 0 0 0 36 0 A 3 3 0 0 0 36 54 L 24 51 C 0 54 0 54 0 123 C 0 135 6 141 15 141 L 55 141 C 66 141 72 135 72 123 C 72 54 72 54 48 51