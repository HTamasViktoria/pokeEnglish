
{
    topicSubmitted == "" ? (<form onSubmit={topicSubmitHandler}>
        <label>Date or topic: <input type="text" onChange={onTopicChange} /></label>

        {showAll === true ? (<ChoosePokeImage images={pokeImages} onChoosePokeImage={chosePoke} />) : (<>
            <button onClick={showPokeHandler}>
                Choose pokemon
            </button>
            <div></div></>)}

        <button type="submit">Submit date or topic</button>
    </form>) : (<h3>Topic: {topicSubmitted}</h3>)
}
{/*If topic is submitted, just show it, if not, show the input for it */ }

<br />
{ addingNew === false ? (<button onClick={addNewHandler}>+ Add word</button>) : (<NewWord addedMessage={addedMessage} onAddingNewWord={newHandler} />) }
