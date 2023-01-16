import React, { useState } from 'react'
import { BSAppName, BSContainer, BSLogoApp, BSConnectBtn, BSConnected, BSActionRea} from './BSElements'

const BlocSidebar = ({ appSelected }) => {

    const [actionRea, setActionRea] = useState(true)

    const toggleActionRea = (which) => {
        if (which === actionRea) return
        setActionRea(!actionRea)
    }

    if (appSelected.key === undefined) return (<></>)
    return (
        <BSContainer>
            <BSLogoApp color={appSelected.color}>{appSelected.icon}</BSLogoApp>
            <BSAppName color={appSelected.color}>{appSelected.title}</BSAppName>
            <BSConnectBtn color={appSelected.color} login={appSelected.login}>Connect</BSConnectBtn>
            <BSConnected color={appSelected.color} login={appSelected.login}>Connected</BSConnected>
            <BSActionRea color={appSelected.color} actionRea={actionRea} onClick={() => toggleActionRea(true)} login={appSelected.login} which={false}>Action</BSActionRea>
            <BSActionRea color={appSelected.color} actionRea={!actionRea} onClick={() => toggleActionRea(false)} login={appSelected.login} which={true}>Reaction</BSActionRea>
        </BSContainer>
    )
}

export default BlocSidebar
