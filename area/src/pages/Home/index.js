import React, {useState} from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'

const Home = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleSideBar = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <Sidebar isOpen={isOpen} toggleSideBar={toggleSideBar}/>
            <Navbar toggleSideBar={toggleSideBar}/>
        </>
    )
}

export default Home
