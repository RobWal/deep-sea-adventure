import './H1.css'

const H1 = ({text, style}: any) => {
    return (
        <h1 className='H1' style={style}>{text}</h1>
    )
}

export default H1;