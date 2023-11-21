
import React, { useState } from 'react'

const NavBar = (props) => {
    //nem biztos, hogy kell a state is
    const [adminPage, setAdminPage] = useState("")

    const navbarChoseHandler = (e) => {
        setAdminPage(e.target.id);
        props.onNavbarChose(e.target.id)
    }

    return (
        <div className="navbar">
            <div id="AddNewWords" onClick={navbarChoseHandler}>Add new words</div>
            <div id="AdminStats" onClick={navbarChoseHandler}>View Statistics</div>
            <div id="LeaveMessage" onClick={navbarChoseHandler}>Leave a message</div>
            <div id="Rewards" onClick={navbarChoseHandler}>Rewards</div>
        </div>
    )

}

export default NavBar