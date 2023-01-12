import React, {useState} from 'react'
import Navbar from '../../components/Navbar'
import DragableRectangle from '../../components/DragableRectangle'
import IconSidebarL from '../../components/IconSidebarL'

const Dashboard = () => {
    return (
        <>
            <DragableRectangle />
            <Navbar isOpen={false} isInDashboard={true}/>
            <IconSidebarL />
        </>
    )
}

export default Dashboard
