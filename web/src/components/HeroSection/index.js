import React, {useState} from 'react'
import { HeroContainer, HeroBg, VideoBg, HeroContent, HeroH1, HeroP, HeroBtnWrapper, ArrowForward, ArrowRight } from './HeroElements'
import Video from '../../videos/video.mp4'
import { Button } from '../ButtonElements'

const HeroSection = () => {

    const [hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }

    return (

        <HeroContainer>
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
            </HeroBg>

            <HeroContent>
                <HeroH1>The flow for your apps</HeroH1>
                <HeroP>
                    Welcome to the new gen web application where you can create your own action-reaction flow from multiple famous website
                </HeroP>
                <HeroBtnWrapper>
                    <Button to='signup' onMouseEnter={onHover} onMouseLeave={onHover} primary='true' dark='true'>
                        Get started {hover ? <ArrowForward /> : <ArrowRight />}
                    </Button>
                </HeroBtnWrapper>
            </HeroContent>

        </HeroContainer>

    )
}

export default HeroSection
