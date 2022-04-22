import './H1.css'

type HOne = {
    text: string,
    style: any,
}

const H1 = ({text, style}: HOne) => {
    return (
        <h1 className='H1' style={style}>{text}</h1>
    )
}

export default H1;