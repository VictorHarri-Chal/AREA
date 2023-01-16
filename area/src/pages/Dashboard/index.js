import React, {useState} from 'react'
import Navbar from '../../components/Navbar'
import Playground from '../../components/Playground'
import AppSidebar from '../../components/AppSidebar'
import BlocSidebar from '../../components/BlocSidebar'


const Dashboard = () => {

    const [appSelected, setAppSelected] = useState({})

    return (
        <>
            <Navbar isOpen={false} isInDashboard={true}/>
            <AppSidebar setAppSelected={setAppSelected} />
            <BlocSidebar appSelected={appSelected}/>
            <Playground />
        </>
    )
}

export default Dashboard
