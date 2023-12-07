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
            {statistics.length > 2 && (<><ResultEntity data={statistics[statistics.length - 1]} />
                <ResultEntity data={statistics[statistics.length - 2]} />
                <ResultEntity data={statistics[statistics.length - 3]} /></>)}

            {statistics.length > 1 && statistics.length < 2 && (<><ResultEntity data={statistics[statistics.length - 1]} />
                <ResultEntity data={statistics[statistics.length - 2]} /></>)}
            {statistics.length > 0 && statistics.length < 1 && (<><ResultEntity data={statistics[statistics.length - 1]} /></>)}


            <button onClick={showAllHandler}>Show all the test results</button>
            {showingAll ? (<>{statistics.map((statistic) => <div key={statistic._id} >
                <h1>Topic:{statistic.topic}</h1>
                <h3>Date of the test:{statistic.createdAt}</h3>
                <h3>Result of the test:{statistic.percentage} %</h3>
                <h3>Wrong answers:{statistic.wrongAnswers}</h3>
            </div>
            )}</>) : (null)}
            <ResultSelect statistics={statistics} />
        </>
    );
};

export default AdminStats;