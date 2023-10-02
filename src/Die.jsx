
function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div className= "die" style={styles} onClick={props.onClick} >
            <p>{props.val}</p>
        </div>
    )
}

export default Die