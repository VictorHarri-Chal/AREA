import React from 'react'
import { FaBars } from 'react-icons/fa'
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink } from './NavbarElements'

const Navbar = ({toggleSideBar, isInDashboard}) => {

    const [appName, setAppName] = React.useState("AREAction")

    if (isInDashboard === undefined) {
        isInDashboard = false
    }

    if (isInDashboard === true) {
        return (
            <>
                <Nav>
                    <NavbarContainer>
                        <NavLogo to="/">{appName}</NavLogo>
                    </NavbarContainer>
                </Nav>
            </>
        )
    } else {
        return (
            <>
                <Nav>
                    <NavbarContainer>
                        <NavLogo to="/">{appName}</NavLogo>

                        <MobileIcon onClick={toggleSideBar}>
                            <FaBars />
                        </MobileIcon>

                        <NavMenu>
                            <NavItem>
                                <NavLinks to="about">About</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="discover">Discover</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="services">Services</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="signup">Usage</NavLinks>
                            </NavItem>
                        </NavMenu>

                        <NavBtn>
                            <NavBtnLink to="/signin">Sign In</NavBtnLink>
                        </NavBtn>
                    </NavbarContainer>
                </Nav>
            </>
        )
    }
}

export default Navbar
