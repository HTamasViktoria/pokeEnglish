import React, { useState, useEffect } from 'react';
import NewTopicsWords from './NewTopicsWords';

const Addnew = (props) => {
  const [pokeImages, setPokeImages] = useState([])
  const [topic, setTopic] = useState('')
  const [chosenPoke, setChosenPoke] = useState('')
  const [topicAdded, setTopicAdded] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    fetch('/api/images')
      .then(response => response.json())
      .then(data => setPokeImages(data))
      .catch(error => console.error(error))
  }, [])
  console.log(chosenPoke);


  const topicSubmitHandler = (e) => {
    e.preventDefault();
    const newArr = [...pokeImages]
    const index = newArr.indexOf(e.target.id)
    newArr.splice(index, 1)

    setPokeImages(newArr)

    fetch('/api/addNewTopic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: topic,
        url: {
          default: chosenPoke.default,
          shiny: chosenPoke.shiny,
        },
        createdAt: Date.now(),
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error === "Existing topic name") {
          console.log("Existing!!!!");

          setErrorMessage("Existing topic name");

          throw new Error("Existing topic name");
        }


        setErrorMessage(null);


        setTopicAdded(true);
      })
      .catch(error => {

        if (error.message !== "Existing topic name") {
          setErrorMessage(error.message);
          console.error(error);
        }
      });
  };

  const goBackHandler = () => {
    setErrorMessage("")
  }
  const addnewGoBackHandler = () => {
    props.onGoBack(false)
  }

  return (
    <div>
      {errorMessage ? (
        <>
          <h1>Error: {errorMessage}</h1>
          <button onClick={goBackHandler}>Got it, go back</button>
        </>
      ) : (
        <>
          {topicAdded ? (
            <NewTopicsWords topic={topic} pokemon={chosenPoke} />
          ) : (
            <>
              <h1 className="nTopic">Add new topic</h1>
              <div className='topicsTable' >
                <form onSubmit={topicSubmitHandler}>
                  <label className="Tname">
                    Topic name:
                    <input type="text" onChange={(e) => setTopic(e.target.value)} />
                  </label>
                  <label>
                    <div className="pokeList">
                      {pokeImages.map((pokemon, index) => (
                        <div
                          id={pokemon.name}
                          key={pokemon._id}
                          className={`poke ${chosenPoke.default === pokemon.name ? 'selectedP' : ''
                            }`}
                        >
                          <img
                            onClick={() => setChosenPoke(props.images.find((img) => img.default === pokemon.name))}
                            id={pokemon.name}
                            src={pokemon.name}
                            alt={`Pokemon ${index}`}
                          />
                        </div>
                      ))}
                    </div>
                  </label>
                  <button type="submit" id="btn" className="moveIt">
                    Add Topic
                  </button>
                  <button onClick={addnewGoBackHandler}>Go Back</button>
                </form>
              </div>

            </>

          )}
        </>
      )}
    </div>
  );
};

export default Addnew;