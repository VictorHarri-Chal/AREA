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
                                <FooterLink to="/signin">Ceci est</FooterLink>
                                <FooterLink to="/signin">un easter geg</FooterLink>
                                <FooterLink to="/signin">Si tu</FooterLink>
                                <FooterLink to="/signin">lis ça</FooterLink>
                                <FooterLink to="/signin">appelle</FooterLink>
                            </FooterLinkItems>

                            <FooterLinkItems>
                                <FooterLinkTitle>Contact Us</FooterLinkTitle>
                                <FooterLink to="/signin">le 07 83 57 65 45</FooterLink>
                                <FooterLink to="/signin">pour tenter</FooterLink>
                                <FooterLink to="/signin">de gagner</FooterLink>
                                <FooterLink to="/signin">plus de</FooterLink>
                            </FooterLinkItems>

                        </FooterLinksWrapper>

                        <FooterLinksWrapper>

                            <FooterLinkItems>
                                <FooterLinkTitle>Videos</FooterLinkTitle>
                                <FooterLink to="/signin">500 000 €</FooterLink>
                                <FooterLink to="/signin">Je sais plus quoi</FooterLink>
                                <FooterLink to="/signin">ecrire ...</FooterLink>
                                <FooterLink to="/signin">Du coup je</FooterLink>
                            </FooterLinkItems>

                            <FooterLinkItems>
                                <FooterLinkTitle>Social Media</FooterLinkTitle>
                                <FooterLink to="/signin">vais laisser</FooterLink>
                                <FooterLink to="/signin">Victor parler :</FooterLink>
                                <FooterLink to="/signin">" Ouaf Ouaf "</FooterLink>
                                <FooterLink to="/signin">Merci Victor</FooterLink>
                            </FooterLinkItems>

                        </FooterLinksWrapper>
                    </FooterLinksContainer>
                </FooterWrap>
            </FooterContainer>
        </div>
    )
}

export default Footer
