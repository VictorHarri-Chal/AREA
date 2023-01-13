import React from 'react'
import { BSContainer } from './BSElements'

const BlocSidebar = ({ appSelected }) => {
    if (appSelected.key === undefined) return (<></>)
    return (
        <BSContainer>
            {appSelected.icon}
        </BSContainer>
    )
}

export default BlocSidebar
