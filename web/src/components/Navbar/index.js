import React, {useRef, useEffect} from 'react'
import { FaBars } from 'react-icons/fa'
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink, ProfileLink } from './NavbarElements'
import ProfileDDM from '../ProfileDDM'

const Navbar = ({toggleSideBar, isInDashboard}) => {

    const [appName] = React.useState("AREAction")
    const [profileOpen, setProfileOpen] = React.useState(false)
    const profileLinkRef = useRef(null)
    const profileLinkPos = profileLinkRef.current ? profileLinkRef.current.getBoundingClientRect() : {};
    const userData = { initials: "GC", username: "GuyClaude", email: "guyfraude@gerking.fr" }
    const [position, setPosition] = React.useState({x: profileLinkPos.x, y: profileLinkPos.y})

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

    if (isInDashboard) {
        return (
            <>
                <Nav>
                    <NavbarContainer>
                        <NavLogo to="/">{appName}</NavLogo>
                        <ProfileLink onClick={toggleProfile} ref={profileLinkRef}>{userData.initials}</ProfileLink>
                    </NavbarContainer>
                </Nav>
                <ProfileDDM profileOpen={profileOpen} toggleProfile={toggleProfile} x={profileLinkPos.x} y={profileLinkPos.y} userData={userData}/>
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
                            <NavBtnLink to="/login">Sign In</NavBtnLink>
                        </NavBtn>
                    </NavbarContainer>
                </Nav>
            </>
        )
    }
}

export default Navbar
