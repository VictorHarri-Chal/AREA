import React, {useState} from 'react'
import PupSidebarR from '../../components/PupSidebarR'
import Navbar from '../../components/Navbar'

const Home = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleSideBar = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <PupSidebarR isOpen={isOpen} toggleSideBar={toggleSideBar}/>
            <Navbar toggleSideBar={toggleSideBar}/>
        </>
    )
}

export default Home
