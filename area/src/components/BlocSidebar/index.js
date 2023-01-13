import React from 'react'
import { BSContainer } from './BSElements'

const BlocSidebar = ({ appSelected }) => {
    return (
        <BSContainer>
            {appSelected.icon}
        </BSContainer>
    )
}

export default BlocSidebar
