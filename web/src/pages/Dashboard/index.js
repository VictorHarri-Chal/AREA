import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import AppSidebar from '../../components/AppSidebar'
import BlocSidebar from '../../components/BlocSidebar'
import Playground from '../../components/Playground'
import {ASData} from './../../components/AppSidebar/ASData'

const Dashboard = () => {

    const [appSelected, setAppSelected] = useState({})

    const [isOpen, setIsOpen] = useState(false)

    const [newRectangle, setNewRectangle] = useState({ isNewRect: false, x: 0, y: 0, key: '' })

    const toggleSideBar = () => {
        setIsOpen(!isOpen)
    }

    const verifyLogin = () => {
        ASData.map((item) => {
            if (sessionStorage.connectTogithub === 'true') {
                if (item.key === 'github') {
                    item.login = true
                }
            }
            if (sessionStorage.connectTodiscord === 'true') {
                if (item.key === 'discord') {
                    item.login = true
                }
            }
            if (sessionStorage.connectTospotify === 'true') {
                if (item.key === 'spotify') {
                    item.login = true
                }
            }
            if (sessionStorage.connectTotwitch === 'true') {
                if (item.key === 'twitch') {
                    item.login = true
                }
            }
        })
    }

    if (!sessionStorage.accessToken) {
        alert('Please connect as User to access Dashboard');
        window.location.href = 'http://localhost:8081/login';
    }

    return (
        <>
            {verifyLogin()}
            <Navbar isOpen={false} isInDashboard={true} />
            <Playground newRectangle={newRectangle} setNewRectangle={setNewRectangle} />
            <AppSidebar appSelected={appSelected} setAppSelected={setAppSelected} isOpen={isOpen} toggleSideBar={toggleSideBar} ASData={ASData} />
            <BlocSidebar appSelected={appSelected} isOpen={isOpen} newRectangle={newRectangle} setNewRectangle={setNewRectangle} ASData={ASData}/>
        </>
    )
}

export default Dashboard
