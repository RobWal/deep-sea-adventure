import './PlayerToken.css'

const PlayerToken = ({style, fill}: any) => {
    console.log(style)
    return (
        <div className='player-token' style={style}>
            <svg xmlns="http://www.w3.org/2000/svg" width='20' height='50' version="1.1" fill={fill} >
            <path d="M 10 18 A 1 1 0 0 0 10 0 A 1 1 0 0 0 10 18 C 0 18 0 18 0 44 C 0 50 0 50 5 50 L 15 50 C 20 50 20 50 20 44 C 20 18 20 18 10 18"/>
            </svg>
        </div>
    )
}

export default PlayerToken;
