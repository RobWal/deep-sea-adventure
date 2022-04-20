import './ScoreBoardNames.css'

type ScoreBoardNameProps = {
    playerName: string,
    style: any,
}

const ScoreBoardNames = ({playerName, style}: ScoreBoardNameProps) => {
    return (
        <div className='score-board-names' style={style}>{playerName}</div>
    )
}

export default ScoreBoardNames;