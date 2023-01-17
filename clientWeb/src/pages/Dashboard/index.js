import React, {useState} from 'react'
import Navbar from '../../components/Navbar'
import AppSidebar from '../../components/AppSidebar'
import BlocSidebar from '../../components/BlocSidebar'
import DragableRectangle from '../../components/DragableRectangle'

const Dashboard = () => {

    const [appSelected, setAppSelected] = useState({})

    const [isOpen, setIsOpen] = useState(false)

    const toggleSideBar = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <Navbar isOpen={false} isInDashboard={true}/>

            <AppSidebar setAppSelected={setAppSelected} isOpen={isOpen} toggleSideBar={toggleSideBar}/>
            <BlocSidebar appSelected={appSelected}/>

            <DragableRectangle newRectangle={{ x: 1400, y: 800 }}/>
            <DragableRectangle newRectangle={{ x: 800, y: 800 }}/>
        </>
    )
}

export default Dashboard
