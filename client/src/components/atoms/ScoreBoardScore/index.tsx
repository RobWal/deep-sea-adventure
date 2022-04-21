import './ScoreBoardScore.css'

const ScoreBoardScore = ({style, score}: any) => {
    return (
        <div className='score-board-score' style={style}>{score}</div>
    )
}

export default ScoreBoardScore