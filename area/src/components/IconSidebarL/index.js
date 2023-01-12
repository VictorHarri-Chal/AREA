import React from 'react'
import { IslContainer, IslIconList, IslIcon } from './IslElements'
import {IslData} from './IslData'
import { Icon } from '@iconify/react';

const IconSidebarL = () => {
    return (
        <IslContainer>
            <IslIconList>
                {IslData.map((item, index) => {
                    return (
                        <IslIcon key={index}>
                            {item.icon}
                        </IslIcon>
                    )
                })}
            </IslIconList>
        </IslContainer>
    )
}

export default IconSidebarL
