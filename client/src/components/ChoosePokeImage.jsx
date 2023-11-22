const ChoosePokeImage = (props) => {


    const imageChooseHandler = (e) => {
        props.onChoosePokeImage(e.target.id)
    }

    return (<div>
        {props.images.map((image) => (<div onClick={imageChooseHandler} id={image} key={image}>
            <img id={image} src={image} /></div>))}

    </div>)
}

export default ChoosePokeImage


