import React, { useState } from 'react'
import { BSAppName, BSContainer, BSLogoApp, BSConnectBtn, BSConnected, BSActionRea, BSBlocContainer, BSBloc} from './BSElements'
const Services = require('./HandleConnect.js');


const BlocSidebar = ({ appSelected, isOpen, newRectangle, setNewRectangle }) => {
    const [actionRea, setActionRea] = useState(true)
    const [isDragging, setIsDragging] = useState(false)
    const [rectanglePosition, setRectanglePosition] = useState({x : 25, y : 350})
    const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 });
    const [blocSelected, setBlocSelected] = useState({})

    const toggleActionRea = (which) => {
        if (which === actionRea) return
        setActionRea(!actionRea)
    }

    const handleMouseDown = (e, item) => {
        setInitialMousePosition({ x: e.clientX, y: e.clientY });
        setIsDragging(true);
        setBlocSelected(item)
    }

    const handleMouseMove = (e) => {
        if (!isDragging) {
            return
        }
        const { x, y } = rectanglePosition;
        const deltaX = e.clientX - initialMousePosition.x;
        const deltaY = e.clientY - initialMousePosition.y;
        setRectanglePosition({ x: x + deltaX, y: y + deltaY });
        setInitialMousePosition({ x: e.clientX, y: e.clientY });
    }

    const handleMouseUp = (e) => {
        if (isDragging && rectanglePosition.x != 25 && rectanglePosition.y != 350) {
            setNewRectangle({isNewRect : true, x : rectanglePosition.x + 180, y : rectanglePosition.y + 20, key : blocSelected.key})
        }
        setIsDragging(false)
        setRectanglePosition({ x: 25, y: 350 });
    }

    const handleConnectTest = (key) => {
        Services[key].handleConnection();
    }

    return (
        <BSContainer isOpen={isOpen}>
            <BSLogoApp color={appSelected.color}>{appSelected.icon}</BSLogoApp>
            <BSAppName color={appSelected.color}>{appSelected.title}</BSAppName>

            <BSConnectBtn color={appSelected.color} login={appSelected.login} onClick={() => handleConnectTest(appSelected.key)}>Connect</BSConnectBtn>
            <BSConnected color={appSelected.color} login={appSelected.login}>Connected</BSConnected>

            <BSActionRea color={appSelected.color} actionRea={actionRea} onClick={() => toggleActionRea(true)} login={appSelected.login} which={false}>Action</BSActionRea>
            <BSActionRea color={appSelected.color} actionRea={!actionRea} onClick={() => toggleActionRea(false)} login={appSelected.login} which={true}>Reaction</BSActionRea>

            {appSelected && appSelected.login ? (
                <BSBlocContainer
                style={{
                    left : rectanglePosition.x,
                    top : rectanglePosition.y,
                }}>
                    {(actionRea && "action_blocs" in appSelected ? appSelected.action_blocs : "reaction_blocs" in appSelected ? appSelected.reaction_blocs : []).map((item, index) => {
                        return (
                            <BSBloc
                                key={index}
                                color={appSelected.color}
                                onMouseDown={e => handleMouseDown(e, item)}
                                onMouseMove={e => handleMouseMove(e)}
                                onMouseUp={e => handleMouseUp(e)}
                                special = {item.key === 'blocs_and' ? true : (item.key === 'blocs_or' ? true : false)}
                            >
                                {item.title}
                            </BSBloc>
                        )
                    })}
                </BSBlocContainer>)
            : (<></>)}
        </BSContainer>
    )
}

export default BlocSidebar