import React from 'react'
import { IslContainer, IslIconList, IslIcon } from './ASElements'
import {IslData} from './ASData'

const AppSidebar = ({ setAppSelected }) => {

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

export default AppSidebar
