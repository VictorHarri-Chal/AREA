import React, {useState} from 'react'
import Navbar from '../../components/Navbar'
import AppSidebar from '../../components/AppSidebar'
import BlocSidebar from '../../components/BlocSidebar'
import Playground from '../../components/Playground'

const Dashboard = () => {

    const [appSelected, setAppSelected] = useState({})

    const [isOpen, setIsOpen] = useState(false)

    const [newRectangle, setNewRectangle] = useState({isNewRect : false, x : 0, y : 0, key : ''})

    const toggleSideBar = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <Navbar isOpen={false} isInDashboard={true}/>
            <Playground newRectangle={newRectangle} setNewRectangle={setNewRectangle}/>
            <AppSidebar appSelected={appSelected} setAppSelected={setAppSelected} isOpen={isOpen} toggleSideBar={toggleSideBar} />
            <BlocSidebar appSelected={appSelected} isOpen={isOpen} newRectangle={newRectangle} setNewRectangle={setNewRectangle}/>
        </>
    )
}

export default Dashboard
