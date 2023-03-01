import React from 'react'
import { ServicesContainer, ServicesH1, ServicesWrapper, ServicesCard, ServicesIcon, ServicesH2, ServicesP } from './ServicesElements'
import Icon1 from '../../images/undraw_social_media_re_sulg.svg'
import Icon2 from '../../images/undraw_code_inspection_bdl7.svg'
import Icon3 from '../../images/undraw_mello_otq1.svg'

const Services = () => {
    return (
        <div>
            <ServicesContainer id="services">
                <ServicesH1>Our Services</ServicesH1>
                <ServicesWrapper>
                    <ServicesCard>
                        <ServicesIcon src={Icon1} />
                        <ServicesH2>Gain time</ServicesH2>
                        <ServicesP>Floap automates tasks that would otherwise be manual and time-consuming, allowing users to save valuable time and focus on other aspects of their work or life.</ServicesP>
                    </ServicesCard>
                    <ServicesCard>
                        <ServicesIcon src={Icon2} />
                        <ServicesH2>Management helper</ServicesH2>
                        <ServicesP>Floap simplifies the process of managing multiple social media and streaming platforms, allowing users to create custom actions and reactions to manage their different accounts automatically.</ServicesP>
                    </ServicesCard>
                    <ServicesCard>
                        <ServicesIcon src={Icon3} />
                        <ServicesH2>Infinite customisation</ServicesH2>
                        <ServicesP>Floap allows users to create custom actions and reactions to meet their specific needs, offering a personalized experience with automations that perfectly match their preferences.</ServicesP>
                    </ServicesCard>
                </ServicesWrapper>
            </ServicesContainer>
        </div>
    )
}

export default Services
