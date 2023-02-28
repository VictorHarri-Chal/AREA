import React, {useState} from 'react'
import { InfoContainer, InfoWrapper, InfoRow, Column1, Column2, TextWrapper, TopLine, Heading, Subtitle, BtnWrap, ImgWrap, Img } from './InfoElements'
import { Button } from '../ButtonElements'
import { ArrowForward, ArrowRight } from '../HeroSection/HeroElements'

const InfoSection = ({ lightBg, id, imgStart, topLine, headline, description, buttonLabel, img, alt, lightText, darkText, primary }) => {

    const [hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }

    return (
        <div>
            <InfoContainer lightBg={lightBg} id={id}>
                <InfoWrapper>
                    <InfoRow imgStart={imgStart}>
                        <Column1>
                            <TextWrapper>
                                <TopLine>{topLine}</TopLine>
                                <Heading lightText={lightText}>{headline}</Heading>
                                <Subtitle darkText={darkText}>{description}</Subtitle>
                                <BtnWrap>
                                    <Button to='home' onMouseEnter={onHover} onMouseLeave={onHover} primary={primary ? 1 : 0} dark='true' smooth={true} duration={500} spy={true} exact='true' offset={-80}> {buttonLabel} {hover ? <ArrowForward /> : <ArrowRight />}</Button>
                                </BtnWrap>
                            </TextWrapper>
                        </Column1>
                        <Column2>
                            <ImgWrap>
                                <Img src={img} alt={alt}/>
                            </ImgWrap>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>
            </InfoContainer>
        </div>
    )
}

export default InfoSection
