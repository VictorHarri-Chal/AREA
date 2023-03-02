import React from 'react'
import { FooterContainer, FooterWrap, FooterLinksContainer, FooterLinksWrapper, FooterLinkItems, FooterLinkTitle, FooterLink } from './FooterElements'

const Footer = () => {
    return (
        <div>
            <FooterContainer>
                <FooterWrap>
                    <FooterLinksContainer>
                        <FooterLinksWrapper>

                            <FooterLinkItems>
                                <FooterLinkTitle>About Us</FooterLinkTitle>
                                <FooterLink to="/signin">Victor Harri-Chal</FooterLink>
                                <FooterLink to="/signin">Titouan Deschannels</FooterLink>
                                <FooterLink to="/signin">Baptiste Friboulet</FooterLink>
                                <FooterLink to="/signin">Keon Savic</FooterLink>
                                <FooterLink to="/signin">Ismael Brossaud</FooterLink>
                            </FooterLinkItems>

                            <FooterLinkItems>
                                <FooterLinkTitle>Contact Us</FooterLinkTitle>
                                <FooterLink to="/signin">victor.harri-chal@epitech.eu</FooterLink>
                                <FooterLink to="/signin">titouan.deschannels@epitech.eu</FooterLink>
                                <FooterLink to="/signin">baptiste.friboulet@epitech.eu</FooterLink>
                                <FooterLink to="/signin">keon.savic@epitech.eu</FooterLink>
                                <FooterLink to="/signin">ismael.brossaud@epitech.eu</FooterLink>
                            </FooterLinkItems>

                        </FooterLinksWrapper>
                    </FooterLinksContainer>
                </FooterWrap>
            </FooterContainer>
        </div>
    )
}

export default Footer
