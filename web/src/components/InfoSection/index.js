import React from 'react'
import { InfoContainer, InfoWrapper, InfoRow, Column1, Column2, TextWrapper, TopLine, Heading, Subtitle, BtnWrap, ImgWrap, Img } from './InfoElements'
import { Button } from '../ButtonElements'

const InfoSection = () => {

    const [hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }


    return (
        <div>
            <InfoContainer>
                <InfoWrapper>
                    <InfoRow>
                        <Column1>
                            <TextWrapper>
                                <TopLine>TopLine</TopLine>
                                <Heading lightText={lightText}>Heading</Heading>
                                <Subtitle darkText={darkText}>Subtitle</Subtitle>
                                <BtnWrap>
                                    <Button to='home' onMouseEnter={onHover} onMouseLeave={onHover} primary='true' dark='true'>Button</Button>
                                </BtnWrap>
                            </TextWrapper>
                        </Column1>
                        <Column2>
                            <ImgWrap>
                                <Img />
                            </ImgWrap>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>
            </InfoContainer>
        </div>
    )
}

export default InfoSection
