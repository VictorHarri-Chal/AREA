import React from 'react'
import { ASContainer, ASIconList, ASIcon, ASLogin } from './ASElements'
import {ASData} from './ASData'

const AppSidebar = ({ setAppSelected }) => {

    const handleIconClick = (item) => {
        setAppSelected(item)
    }

    return (
        <ASContainer>
            <ASIconList>
                {ASData.map((item, index) => {
                    return (
                        <ASIcon key={item.key} onClick={() => handleIconClick(item)} login={item.login} color={item.color}>
                            <ASLogin login={item.login} />
                            {item.icon}
                        </ASIcon>
                    )
                })}
            </ASIconList>
        </ASContainer>
    )
}

export default AppSidebar
