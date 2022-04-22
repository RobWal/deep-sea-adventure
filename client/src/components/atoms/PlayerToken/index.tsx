import './PlayerToken.css'

const PlayerToken = ({style, fill}: any) => {
    return (
        <div className='player-token' style={style}>
            <svg xmlns="http://www.w3.org/2000/svg" width='24' height='47' version="1.1" fill={fill} >
            <path d="M 12 18 A 1 1 0 0 0 12 0 A 1 1 0 0 0 12 18 L 8 17 C 0 18 0 18 0 41 C 0 45 2 47 5 47 L 19 47 C 22 47 24 45 24 41 C 24 18 24 18 16 17"/>
            </svg>
        </div>
    )
}

export default PlayerToken;
