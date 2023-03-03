import React, {useState} from 'react'
import { InfoContainer, InfoWrapper, InfoRow, Column1, Column2, TextWrapper, TopLine, Heading, Subtitle, ImgWrap, Img, BtnWrap } from './InfoElements'
import { Button } from '../ButtonElements'
import { ArrowForward, ArrowRight } from '../HeroSection/HeroElements'

const InfoSection = ({ lightBg, id, imgStart, topLine, headline, description, img, alt, lightText, darkText, btn }) => {

    const [hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }

    const downloadAPK = () => {
        fetch('/download')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Une erreur est survenue lors du téléchargement.');
                }
                return response.blob();
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'client.apk');
                document.body.appendChild(link);
                link.click();
            })
            .catch((err) => {
                console.error(err);
            });
    };

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
                                    {btn ? (
                                    <Button onMouseEnter={onHover} onMouseLeave={onHover} onClick={downloadAPK} primary={1} dark='true' smooth={true} duration={500} spy={true} exact='true' offset={-80}> Download {hover ? <ArrowForward /> : <ArrowRight />}</Button>
                                    ) : null }
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
