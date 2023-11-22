import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [isInventory, setIsInventory] = useState(false);

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

  const selectTask = (topic) => {
    navigate(`/home/Tasks/${topic}`);
  };


  const handleInventory = () => {
    setIsInventory(true);
  };

  const goBack = () => {
    setIsInventory(false);
  };

  const topicList = topics.map((topic, index) => {
    const isCompleted = inventory.some((item) => item.pokemon === topic.pokemon);
    return (
      <div
        key={index}
        className={`selectTopic ${isCompleted ? "completed" : ""}`}
        onClick={() => selectTask(topic.topic)}
      >
        <h2>{topic.topic}</h2>
        reward:
        <img src={topic.pokemon} alt={`Pokemon ${index}`} />
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
                    <button onClick={goBack}>Go Back</button>
                </>
            ) : (
                <>
                    <div>
                        <h1 className="topics">Topics</h1>
                        {topicList}
                    </div>
                    <button onClick={handleInventory}>Inventory</button>
                </>
            )}
        </>
    );
};

export default Tasks;