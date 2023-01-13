import React, {useState} from 'react'
import Navbar from '../../components/Navbar'
import DragableRectangle from '../../components/Playground'
import IconSidebarL from '../../components/IconSidebarL'
import Playground from '../../components/Playground'

const Dashboard = () => {
    return (
        <>
            <Navbar isOpen={false} isInDashboard={true}/>
            <IconSidebarL />
            <Playground />
        </>
    )
}

export default Dashboard
