import React, {useState} from 'react'
import Navbar from '../../components/Navbar'
import DragableRectangle from '../../components/DragableRectangle'

const Dashboard = () => {
    return (
        <>
            <DragableRectangle />
            <Navbar isOpen={false} isInDashboard={true}/>
        </>
    )
}

export default Dashboard
