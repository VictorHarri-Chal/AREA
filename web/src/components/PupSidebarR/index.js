import React from 'react'

import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute } from './PupSidebarRElements'

function PupSidebarR( {isOpen, toggleSideBar}) {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggleSideBar}>
            <Icon onClick={toggleSideBar}>
                <CloseIcon />
            </Icon>

            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="about" onClick={toggleSideBar}>About</SidebarLink>
                    <SidebarLink to="discover" onClick={toggleSideBar}>Discover</SidebarLink>
                    <SidebarLink to="services" onClick={toggleSideBar}>Services</SidebarLink>
                    <SidebarLink to="signup" onClick={toggleSideBar}>Sign Up</SidebarLink>
                </SidebarMenu>
                <SideBtnWrap>
                    <SidebarRoute to="/signin">Sign In</SidebarRoute>
                </SideBtnWrap>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default PupSidebarR
