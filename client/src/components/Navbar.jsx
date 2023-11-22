import { Link } from "react-router-dom";
import React, { useState } from 'react'

const NavBar = () => {

    return (
        <div className="navbar">
            <Link to="/home/AddNewWords" id="AddNewWords" >Add new words</Link>
            <Link to="/home/AdminStats" id="AdminStats" >View Statistics</Link>
            <Link to="/home/LeaveMessage" id="LeaveMessage" >Leave a message</Link>
            <Link to="/home/Rewards" id="Rewards" >Rewards</Link>
            <Link to="/home/Tasks" id="Tasks" >Tasks</Link>
        </div>
    )

}

export default NavBar