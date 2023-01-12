import React, {useState} from 'react'
import Navbar from '../../components/Navbar'
import IconSidebarL from '../../components/IconSidebarL'

const Dashboard = () => {
    return (
        <>
            <Navbar isOpen={false} isInDashboard={true}/>
            <IconSidebarL />
        </>
    )
}

export default Dashboard
