import React from 'react'
import { IslContainer, IslIconList, IslIcon } from './IslElements'
import {IslData} from './IslData'

const IconSidebarL = ({ setAppSelected }) => {

    const handleIconClick = (key) => {
        setAppSelected(key)
    }

    return (
        <IslContainer>
            <IslIconList>
                {IslData.map((item, index) => {
                    return (
                        <IslIcon key={item.key} onClick={() => handleIconClick(item.key)}>
                            {item.icon}
                        </IslIcon>
                    )
                })}
            </IslIconList>
        </IslContainer>
    )
}

export default IconSidebarL
