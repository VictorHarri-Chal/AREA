import React from 'react'
import { ASContainer, ASIconList, ASIcon, ASLogin, MobileIcon } from './ASElements'
import {ASData} from './ASData'
import { FiX, FiMenu } from 'react-icons/fi'

const AppSidebar = ({ appSelected, setAppSelected, isOpen, toggleSideBar }) => {

    const handleIconClick = (item) => {
        if (Object.is(item, appSelected)) {
            toggleSideBar()
            setAppSelected({})
            return
        }
        if (isOpen === false) {
            toggleSideBar()
        }
        setAppSelected(item)
    }

    return (
        <ASContainer isOpen={isOpen}>

            <MobileIcon onClick={() => {toggleSideBar(); setAppSelected({})}} isOpen={isOpen} close={false}>
                <FiMenu />
            </MobileIcon>

            <MobileIcon onClick={() => {toggleSideBar(); setAppSelected({})}} isOpen={isOpen} close={true}>
                <FiX />
            </MobileIcon>

            <ASIconList isOpen={isOpen}>
                {ASData.map((item, index) => {
                    return (
                        <ASIcon  onClick={() => handleIconClick(item)} login={item.login} color={item.color}>
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
