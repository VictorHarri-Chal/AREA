import React from 'react'
import { ASContainer, ASIconList, ASIcon, ASLogin, MobileIcon,  } from './ASElements'
import {ASData} from './ASData'
import { FaBars } from 'react-icons/fa'

const AppSidebar = ({ setAppSelected }) => {

    const handleIconClick = (item) => {
        setAppSelected(item)
    }

    return (


        <ASContainer>
            <MobileIcon>
                <FaBars />
            </MobileIcon>
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
