import React, {useState} from 'react'
import Navbar from '../../components/Navbar'
import AppSidebar from '../../components/AppSidebar'
import BlocSidebar from '../../components/BlocSidebar'
import DragableRectangle from '../../components/DragableRectangle'


const Dashboard = () => {

    const [appSelected, setAppSelected] = useState({})
    const [rectanglePositions, setRectanglePositions] = useState([{type : '1', x : 600, y : 400},
    {type : '2', x : 900, y : 400}, {type : '3', x : 1300, y : 400}])

    return (
        <>
            <Navbar isOpen={false} isInDashboard={true}/>
            <AppSidebar setAppSelected={setAppSelected} />
            <BlocSidebar appSelected={appSelected}/>
            {rectanglePositions.map((position, index) => (
                <DragableRectangle key={index} index={index} rectanglePositions={rectanglePositions} 
                setRectanglePositions={setRectanglePositions} />
            ))}
        </>
    )
}

export default Dashboard
