import React, {useState} from 'react'
import Navbar from '../../components/Navbar'
import DragableRectangle from '../../components/DragableRectangle'
import AppSidebar from '../../components/AppSidebar'

const Dashboard = () => {

    const [appSelected, setAppSelected] = useState("")

    console.log(appSelected)

    return (
        <>
            <DragableRectangle />
            <Navbar isOpen={false} isInDashboard={true}/>
            <AppSidebar setAppSelected={setAppSelected} />
        </>
    )
}

export default Dashboard
