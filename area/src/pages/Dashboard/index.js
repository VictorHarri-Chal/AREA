import React, {useState} from 'react'
import Navbar from '../../components/Navbar'
import DragableRectangle from '../../components/DragableRectangle'
import AppSidebar from '../../components/AppSidebar'
import BlocSidebar from '../../components/BlocSidebar'

const Dashboard = () => {

    const [appSelected, setAppSelected] = useState({})

    return (
        <>
            <DragableRectangle />
            <Navbar isOpen={false} isInDashboard={true}/>
            <AppSidebar setAppSelected={setAppSelected} />
            <BlocSidebar appSelected={appSelected}/>
        </>
    )
}

export default Dashboard
