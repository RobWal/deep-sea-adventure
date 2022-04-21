import './OxygenMarker.css'

const OxygenMarker = ({style}: any) => {
    return(
        <div style={style}>
            <svg xmlns="http://www.w3.org/2000/svg" width='28' height='28' version="1.1" fill="#FF1616">
            <circle cx="7" cy="7" r="7"/></svg>
        </div>
    )
}

export default OxygenMarker;