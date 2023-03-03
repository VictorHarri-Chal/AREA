import React, {useRef, useEffect, useState} from 'react'
import { FaBars } from 'react-icons/fa'
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink, ProfileLink, NavDashboard } from './NavbarElements'
import ProfileDDM from '../ProfileDDM'
import {animateScroll as scroll} from 'react-scroll'

const Navbar = ({toggleSideBar, isInDashboard}) => {

    const [appName, setAppName] = React.useState("FLOAP")
    const [profileOpen, setProfileOpen] = React.useState(false)
    const profileLinkRef = useRef(null)
    const profileLinkPos = profileLinkRef.current ? profileLinkRef.current.getBoundingClientRect() : {};
    const [position, setPosition] = React.useState({x: profileLinkPos.x, y: profileLinkPos.y})
    const [scrollNav, setScrollNav] = useState(false)

    const changeNav = () => {
        if (window.scrollY >= 80) {
            setScrollNav(true)
        } else {
            setScrollNav(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNav)
    }, [])


    useEffect(() => {
        const handleResize = () => {
            const profileLinkPos = profileLinkRef.current ? profileLinkRef.current.getBoundingClientRect() : {};
            setPosition({
                x: profileLinkPos.x,
                y: profileLinkPos.y
            });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [profileLinkRef]);

    const toggleProfile = () => {
        setProfileOpen(!profileOpen)
    }

    const toggleHome = () => {
        scroll.scrollToTop()
    }

    if (isInDashboard) {
        return (
            <>
                <NavDashboard>
                    <NavbarContainer>
                        <NavLogo to="/">{appName}</NavLogo>
                        <ProfileLink onClick={toggleProfile} ref={profileLinkRef}>{sessionStorage.initials}</ProfileLink>
                    </NavbarContainer>
                </NavDashboard>
                <ProfileDDM profileOpen={profileOpen} toggleProfile={toggleProfile} x={profileLinkPos.x} y={profileLinkPos.y}/>
            </>
        )
    } else {
        return (
            <>
                <Nav scrollNav={scrollNav}>
                    <NavbarContainer>
                        <NavLogo to="/" onClick={toggleHome}>{appName}</NavLogo>

                        <MobileIcon onClick={toggleSideBar}>
                            <FaBars />
                        </MobileIcon>

                        <NavMenu>
                            <NavItem>
                                <NavLinks to="about" smooth={true} duration={500} spy={true} exact='true' offset={-80}>About</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="discover" smooth={true} duration={500} spy={true} exact='true' offset={-80}>Discover</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="services" smooth={true} duration={500} spy={true} exact='true' offset={-80}>Services</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="signup" smooth={true} duration={500} spy={true} exact='true' offset={-80}>Sign Up</NavLinks>
                            </NavItem>
                        </NavMenu>

                        <NavBtn>
                            <NavBtnLink to="/login">Sign In</NavBtnLink>
                        </NavBtn>
                    </NavbarContainer>
                </Nav>
            </>
        )
    }
}

export default Navbar
