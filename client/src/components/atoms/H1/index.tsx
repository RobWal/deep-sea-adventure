import './H1.css'

type H1 = {
    text: string,
    style: any,
}

const H1 = ({text, style}: H1) => {
    return (
        <h1 className='H1' style={style}>{text}</h1>
    )
}

export default H1;