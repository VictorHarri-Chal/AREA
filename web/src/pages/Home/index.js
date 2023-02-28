import React, {useState} from 'react'
import PupSidebarR from '../../components/PupSidebarR'
import Navbar from '../../components/Navbar'
import HeroSection from '../../components/HeroSection'

const Home = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleSideBar = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <PupSidebarR isOpen={isOpen} toggleSideBar={toggleSideBar}/>
            <Navbar toggleSideBar={toggleSideBar}/>
            <HeroSection />
        </>
    )
}

export default Home
