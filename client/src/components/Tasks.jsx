import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [isInventory, setIsInventory] = useState(false);
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/messages');
      const data = await response.json();
      setMessages(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/topics");
      const data = await response.json();
      setTopics(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/inventory");
      const data = await response.json();
      setInventory(data);
    };
    fetchData();
  }, []);



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
  }

  const topicList = topics.map((topic, index) => {
    const isCompleted = inventory.some((item) => item.pokemon === topic.url);
    return (
      <div key={index} className={`selectTopic ${isCompleted ? "completed" : ""}`} onClick={() => selectTask(topic.name)}>
        <h2>{topic.name}</h2>
        <img src={topic.url} alt={`Pokemon ${index}`} />
        {isCompleted && <span className="completed-label">Completed</span>}
      </div>
    );
  });

  return (
    <>
      <NavBar />
      {isInventory ? (
        <>
          <h2>Inventory</h2>
          {inventory.map((item, index) => (
            <div key={index} className="item">
              <img src={item.pokemon} alt={`Pokemon ${index}`} />
            </div>
          ))}
          <button onClick={goBack} id="btn" >Go Back</button>
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
            <div className="topicsList" >
              {topicList}
            </div>
          </div>
          <button className="inventorybtn" onClick={handleInventory}>Inventory</button>
        </div>
      )}
    </>
  );
};

export default Tasks;