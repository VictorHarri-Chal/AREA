import React from 'react'
import { BSContainer, BSLogoApp } from './BSElements'

const BlocSidebar = ({ appSelected }) => {
    if (appSelected.key === undefined) return (<></>)
    return (
        <BSContainer>
            <BSLogoApp color={appSelected.color}>{appSelected.icon}</BSLogoApp>
        </BSContainer>
    )
}

export default BlocSidebar
