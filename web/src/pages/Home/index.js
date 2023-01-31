import React, {useState} from 'react'
import PupSidebarR from '../../components/PupSidebarR'
import Navbar from '../../components/Navbar'
// import DropdownMenu from '../../components/DropdownMenu'

const Home = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleSideBar = () => {
        setIsOpen(!isOpen)
    }

    // const data = ["item1", "item2", "item3", "item4", "item5"]

    // const pos = { x: 500, y: 500 }

    return (
        <>
            <PupSidebarR isOpen={isOpen} toggleSideBar={toggleSideBar}/>
            <Navbar toggleSideBar={toggleSideBar}/>
            {/* <DropdownMenu data={data} placeHolder={"Choose your repository"} pos={pos}/> */}
        </>
    )
}

export default Home
