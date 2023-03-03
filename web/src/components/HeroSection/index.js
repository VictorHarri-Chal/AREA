import React, {useState} from 'react'
import { HeroContainer, HeroBg, VideoBg, HeroContent, HeroH1, HeroP } from './HeroElements'
import Video from '../../videos/video.mp4'

const HeroSection = () => {

    return (

        <HeroContainer>
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
            </HeroBg>

            <HeroContent>
                <HeroH1>The flow for your apps</HeroH1>
                <HeroP>
                    Welcome to the new gen web application where you can create your own action-reaction flow from many famous website
                </HeroP>
            </HeroContent>

        </HeroContainer>

    )
}

export default HeroSection
