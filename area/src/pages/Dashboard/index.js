import React, {useState} from 'react'
import Navbar from '../../components/Navbar'
import DragableRectangle from '../../components/DragableRectangle'
import IconSidebarL from '../../components/IconSidebarL'

const Dashboard = () => {

    const [appSelected, setAppSelected] = useState("")

    console.log(appSelected)

    return (
        <>
            <DragableRectangle />
            <Navbar isOpen={false} isInDashboard={true}/>
            <IconSidebarL setAppSelected={setAppSelected} />
        </>
    )
}

export default Dashboard
