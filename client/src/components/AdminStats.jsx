/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import ResultEntity from "./ResultEntity";
import ResultSelect from "./ResultSelect";

const AdminStats = () => {
    const [statistics, setStatistics] = useState([]);
    const [showingAll, setShowingAll] = useState(false)

    useEffect(() => {
        fetch('/api/results/', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => setStatistics(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    const showAllHandler = () => {
        if (showingAll === false) {
            setShowingAll(true)
        } else { setShowingAll(false) }
    }

    return (
        <>
            <NavBar />
            {statistics.length > 2 && (<div className="container"><ResultEntity data={statistics[statistics.length - 1]} />
                <ResultEntity data={statistics[statistics.length - 2]} />
                <ResultEntity data={statistics[statistics.length - 3]} /></div>)}

            {statistics.length > 1 && statistics.length < 2 && (<div className="container">
                <ResultEntity data={statistics[statistics.length - 1]} />
                <ResultEntity data={statistics[statistics.length - 2]} /></div>)}
            {statistics.length > 0 && statistics.length < 1 && (<div className="container">
                <ResultEntity data={statistics[statistics.length - 1]} /></div>)}


            <button onClick={showAllHandler}>Show all the test results</button>
            {showingAll ? (<div className="result-container" >{statistics.map((statistic) => <div key={statistic._id} >
                <h3>Topic:{statistic.topic}</h3>
                <span>Date of the test:{statistic.createdAt}</span><br />
                <span>Result of the test:{statistic.percentage} %</span><br />
                <span>Wrong answers:{statistic.wrongAnswers}</span><br />
            </div>
            )}</div>) : (null)}
            <ResultSelect statistics={statistics} />
        </>
    );
};

export default AdminStats;