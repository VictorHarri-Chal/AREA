import React, {useState} from 'react'
import PupSidebarR from '../../components/PupSidebarR'
import Navbar from '../../components/Navbar'
import HeroSection from '../../components/HeroSection'
import InfoSection from '../../components/InfoSection'
import { homeObjOne, homeObjTwo, homeObjThree } from '../../components/InfoSection/Data'
import Services from '../../components/Services'
import Footer from '../../components/Footer'

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
            <InfoSection {... homeObjOne}/>
            <InfoSection {... homeObjTwo}/>
            <Services />
            <InfoSection {... homeObjThree}/>
            <Footer />
        </>
    )
}

export default Home
