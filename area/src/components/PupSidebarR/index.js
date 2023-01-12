import React from 'react'

import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute } from './PupSidebarRElements'

function PupSidebarR( {isOpen, toggleSideBar}) {
    return (
        <SidebarContainer isOpen={isOpen} onCLick={toggleSideBar}>
            <Icon onClick={toggleSideBar}>
                <CloseIcon />
            </Icon>

            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="about" onCLick={toggleSideBar}>About</SidebarLink>
                    <SidebarLink to="discover" onCLick={toggleSideBar}>Discover</SidebarLink>
                    <SidebarLink to="services" onCLick={toggleSideBar}>Services</SidebarLink>
                    <SidebarLink to="signup" onCLick={toggleSideBar}>Sign Up</SidebarLink>
                </SidebarMenu>
                <SideBtnWrap>
                    <SidebarRoute to="/signin">Sign In</SidebarRoute>
                </SideBtnWrap>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default PupSidebarR
