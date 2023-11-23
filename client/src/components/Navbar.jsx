import { Link } from "react-router-dom";
import React from 'react'

const NavBar = () => {

    return (
        <div className="navbar">
            <Link to="/AddNewWords" id="AddNewWords" >Add new words</Link>
            <Link to="/AdminStats" id="AdminStats" >View Statistics</Link>
            <Link to="/LeaveMessage" id="LeaveMessage" >Leave a message</Link>
            <Link to="/Rewards" id="Rewards" >Rewards</Link>
            <Link to="/Tasks" id="Tasks" >Tasks</Link>
        </div>
    )

}

export default NavBar