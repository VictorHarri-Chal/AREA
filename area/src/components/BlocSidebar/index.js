import React from 'react'
import { BSAppName, BSContainer, BSLogoApp, BSConnectBtn, BSConnected } from './BSElements'

const BlocSidebar = ({ appSelected }) => {
    if (appSelected.key === undefined) return (<></>)
    return (
        <BSContainer>
            <BSLogoApp color={appSelected.color}>{appSelected.icon}</BSLogoApp>
            <BSAppName color={appSelected.color}>{appSelected.title}</BSAppName>
            <BSConnectBtn color={appSelected.color} login={appSelected.login}>Connect</BSConnectBtn>
            <BSConnected color={appSelected.color} login={appSelected.login}>Connected</BSConnected>
        </BSContainer>
    )
}

export default BlocSidebar
