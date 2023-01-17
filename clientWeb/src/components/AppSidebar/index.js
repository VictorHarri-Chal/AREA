import React from 'react'
import { ASContainer, ASIconList, ASIcon, ASLogin, MobileIcon, PupContainer } from './ASElements'
import {ASData} from './ASData'
import { FiX, FiMenu } from 'react-icons/fi'

const AppSidebar = ({ setAppSelected, isOpen, toggleSideBar }) => {

    const handleIconClick = (item) => {
        setAppSelected(item)
    }

    return (
        <ASContainer isOpen={isOpen}>

            <MobileIcon onClick={toggleSideBar} isOpen={isOpen} close={false}>
                <FiMenu />
            </MobileIcon>

            <MobileIcon onClick={toggleSideBar} isOpen={isOpen} close={true}>
                <FiX />
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
