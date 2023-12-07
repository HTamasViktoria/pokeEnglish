import React, { useState, useEffect } from 'react'

const ResultSelect = (props) => {

    const [months, setMonths] = useState([])
    const [isSelected, setIsSelected] = useState(false)
    const [toShowasSelected, setToShowAsSelected] = useState("")
    const [selectedMonths, setSelectedMonths] = useState([])

    useEffect(() => {
        const selector = () => {

            const newDates = props.statistics.map((statistic) => statistic.createdAt.slice(0, 7))
            let datesArray = []
            for (let newDate of newDates) {
                if (!datesArray.includes(newDate)) { datesArray.push(newDate) }
            }
            setMonths(datesArray)
        };

        selector();
    }, [props.statistics]);


    const selectHandler = (e) => {
        console.log(e.target.value);
        setToShowAsSelected(e.target.value);
        const selectedItems = props.statistics.filter((statistic) => statistic.createdAt.slice(0, 7) === e.target.value);
        setIsSelected(true);
        setSelectedMonths(selectedItems)
    };

    const goBackHandler = () => {
        setIsSelected(false)
    }

    return (
        <>
            {isSelected ? (
                <>
                    {selectedMonths.map((item) => (
                        <div key={item._id}>
                            <h1>{item.topic}</h1>
                            <h3>{item.createdAt.slice(0, 10)}</h3>
                            <h3>{item.percentage} %</h3>
                            <h1>{item.wrongAnswers}</h1>
                            <form className="result-select">
                                <label>
                                    Choose a month:
                                    <select value={toShowasSelected} onChange={selectHandler}>
                                        {months.map((month) => (
                                            <option key={month} value={month}>
                                                {month}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <button onClick={goBackHandler}>Go Back</button>
                            </form>
                        </div>
                    ))}
                </>
            ) : (<form className="result-select">
                <label>
                    Choose a month:
                    <select value={toShowasSelected} onChange={selectHandler}>
                        {months.map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </label>
            </form>
            )}
        </>
    );

}


export default ResultSelect