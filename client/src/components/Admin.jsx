import AddNewWords from "./AddNewWords"
import AdminStats from "./AdminStats"
import LeaveMessage from "./LeaveMessage"
import Rewards from "./Rewards"
import NavBar from "./Navbar"

import React, { useState } from 'react'

/*admin page
szavak hozzáadása(+ezekhez pokémon kiválasztása)
megnézem a statokat
hagyok üzenetet a fókuszról
jutalmak kialakítása
egyszeri szómennyiség beállítása---nincs is még ilyen komponensem */


const Admin = () => {

    const [page, setPage] = useState("")

    const chosenNavbar = (chosen) => {
        setPage(chosen)
    }


    return (
        <>
            <NavBar onNavbarChose={chosenNavbar} />
            {page === "AddNewWords" && <AddNewWords />}
            {page === "AdminStats" && <AdminStats />}
            {page === "LeaveMessage" && <LeaveMessage />}
            {page === "Rewards" && <Rewards />}
        </>
    )
}

export default Admin