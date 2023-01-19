import React, {useState} from 'react'
import Navbar from '../../components/Navbar'
import AppSidebar from '../../components/AppSidebar'
import BlocSidebar from '../../components/BlocSidebar'
import Playground from '../../components/Playground'

const Dashboard = () => {

    const [appSelected, setAppSelected] = useState({})

    const [isOpen, setIsOpen] = useState(false)

    const toggleSideBar = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <Navbar isOpen={false} isInDashboard={true}/>

            <AppSidebar setAppSelected={setAppSelected} isOpen={isOpen} toggleSideBar={toggleSideBar} />
            <BlocSidebar appSelected={appSelected} isOpen={isOpen}/>

            <Playground />
        </>
    )
}

export default Dashboard
