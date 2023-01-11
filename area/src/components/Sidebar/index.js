import React from 'react'

import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute } from './SidebarElements'

function Sidebar( {isOpen, toggle}) {
    return (
        <SidebarContainer isOpen={isOpen} onCLick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>

            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="about" onCLick={toggle}>About</SidebarLink>
                    <SidebarLink to="discover" onCLick={toggle}>Discover</SidebarLink>
                    <SidebarLink to="services" onCLick={toggle}>Services</SidebarLink>
                    <SidebarLink to="signup" onCLick={toggle}>Sign Up</SidebarLink>
                </SidebarMenu>
                <SideBtnWrap>
                    <SidebarRoute to="/signin">Sign In</SidebarRoute>
                </SideBtnWrap>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar
