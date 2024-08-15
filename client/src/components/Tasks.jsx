import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Tasks = (props) => {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [isInventory, setIsInventory] = useState(false);
  const [messages, setMessages] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [selectedReward, setSelectedReward] = useState(null);
  const user = props.user


  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const [messagesResponse, inventoryResponse, topicsResponse, rewardsResponse] = await Promise.all([
          fetch('/api/messages'),
          fetch('/api/inventory'),
          fetch('/api/topics'),
          fetch('/api/rewards')
        ]);

        const [messagesData, inventoryData, topicsData, rewardsData] = await Promise.all([
          messagesResponse.json(),
          inventoryResponse.json(),
          topicsResponse.json(),
          rewardsResponse.json()
        ]);


        setInventory(inventoryData);
        setTopics(topicsData);
        setMessages(messagesData.filter((data) => data.user === user._id));
        setRewards(rewardsData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleRewardClick = (reward) => {
    setSelectedReward((prevSelectedReward) => (prevSelectedReward === reward ? null : reward));
  };

  const handleClaim = async () => {
    if (!selectedReward || user.points < selectedReward.points) {
      alert('Cannot claim the reward. Please select a valid reward or earn more points.')
      return;
    }
    try {
      const Useresponse = await fetch(`/api/users/${user._id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({points: user.points - selectedReward.points})
      })
      const Rewardesponse = await fetch(`/api/reward/${selectedReward._id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({claimed: true})
      })

      setRewards(prevRewards => prevRewards.map(reward => {
        if (reward._id === selectedReward._id) {
          return {...reward, claimed: true};
        }
        return reward;
      }));
      props.setUser({ ...user, points: user.points - selectedReward.points })
      setSelectedReward(null);
    } catch(err) {
      console.error(err)
    }
  }


  const selectTask = (selectedTopic) => {
    const isCompleted = inventory.find((item) => item.name === selectedTopic);

    if (isCompleted && isCompleted.name === selectedTopic) {
      navigate(`/Tasks/Answer/${selectedTopic}`);
    } else {
      navigate(`/Tasks/Quiz/${selectedTopic}`);
    }
  };

  const handleInventory = () => {
    setIsInventory(true);
  };

  const goBack = () => {
    setIsInventory(false);
  };

  const handleDelete = async (messageId) => {
    try {
      const response = await fetch(`/api/message/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message._id !== messageId)
      );
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };
  console.log(topics);

  const topicList = topics.map((topic, index) => {
    const isCompleted = inventory.some((item) => item.pokemon.default === topic.url.default);
    const bothCompleted = inventory.some((item) => item.pokemon.default === topic.url.default && item.bothCompleted);

    const containerClass = `selectTopic ${isCompleted ? "completed" : ""}`;

    if (bothCompleted) {
      return (
        <div key={index} className={`${containerClass} gold-bg`} onClick={() => selectTask(topic.name)}>
          <h2>{topic.name}</h2>
          <img src={topic.url.shiny} alt={`Shiny Pokemon ${index}`} />
          {isCompleted && <span className="completed-label">Completed</span>}
        </div>
      );
    } else {
      
      return (
        <div key={index} className={containerClass} onClick={() => selectTask(topic.name)}>
          <h2>{topic.name}</h2>
          <img src={topic.url.default} alt={`Pokemon ${index}`} />
          {isCompleted && <span className="completed-label">Completed</span>}
        </div>
      );
    }
  });

  return (
    <>
      <NavBar />
      <>
        {isInventory ? (
          <>
            <h1>Inventory</h1>
            {inventory.map((item, index) => {
              const bothCompleted = inventory.some(
                (invItem) => invItem.pokemon.default === item.pokemon.default && invItem.bothCompleted
              );

              return (
                <div key={index} className="invPokemons">
                  {bothCompleted ? (
                    <img className="pokeSize" src={item.pokemon.shiny} alt={`Shiny Pokemon ${index}`} />
                  ) : (
                    <img className="pokeSize" src={item.pokemon.default} alt={`Pokemon ${index}`} />
                  )}
                </div>
              );
            })}
            <h1>Available Rewards</h1>
            <h2>Points: {user.points}</h2>
            {rewards
              .filter((reward) => !reward.claimed)
              .map((reward) => (
                <div
                  key={reward._id}
                  className={`${reward.points > user.points ? "selectRewardLow" : "selectReward"
                    } ${selectedReward === reward ? "selectedReward" : ""}`}
                  onClick={() => handleRewardClick(reward)}
                >
                  <p>{reward.text}</p>
                  <p>{reward.points}</p>
                </div>
              ))}
            <div>
            <button id="btn" onClick={handleClaim}>Claim</button>
            <h1>Claimed</h1>
            {rewards
              .filter((reward) => reward.claimed)
              .map((reward) => (
                <div
                  key={reward._id}
                  className='claimedReward'
                >
                  <p>{reward.text}</p>
                  <p>{reward.points}</p>
                </div>
              ))}
            
            </div>
            <button onClick={goBack} id="btn">Go Back</button>
          </>
        ) : (
          <div>
            <div className="messages-container">
              {messages.map((message, index) => (
                <div className="messages" key={index}>
                  <p>{message.text}</p>
                  <button className="close" onClick={() => handleDelete(message._id)}>x</button>
                </div>
              ))}
            </div>
            <h1 className="topics">Topics</h1>
            <div>
              <div className="topicsList">
                {topicList}
              </div>
            </div>
            <button className="inventorybtn" onClick={handleInventory}>Inventory & Rewards</button>
          </div>
        )}
      </>
    </>
  );
};

export default Tasks;