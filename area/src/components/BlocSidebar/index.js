import React from 'react'
import { BSAppName, BSContainer, BSLogoApp } from './BSElements'

const BlocSidebar = ({ appSelected }) => {
    if (appSelected.key === undefined) return (<></>)
    return (
        <BSContainer>
            <BSLogoApp color={appSelected.color}>{appSelected.icon}</BSLogoApp>
            <BSAppName color={appSelected.color}>{appSelected.title}</BSAppName>
        </BSContainer>
    )
}

export default BlocSidebar
