import React, { useState } from 'react'
import { DropdownMenuButton, DropdownMenuContainer, DropdownMenuItem } from './DropdownMenuElements'

const DropdownMenu = ({data, placeHolder, pos}) => {

    const [isOpen, setIsOpen] = useState(false)

    const toggleIsOpen = () => {
        setIsOpen(!isOpen)
    }

    const [chosenItem, setChosenItem] = useState("");

    const changeItem = (item) => {
        setChosenItem(item);
    }

    const goodPlaceholder = () => {
        if (chosenItem === "") {
            return placeHolder;
        } else {
            return chosenItem;
        }
    }


    return (
        <div>
            <DropdownMenuButton onClick={toggleIsOpen} isOpen={isOpen} y={pos.y} x={pos.x}>{goodPlaceholder()}</DropdownMenuButton>
            <DropdownMenuContainer onClick={toggleIsOpen} isOpen={isOpen} y={pos.y} x={pos.x}>
                {data.map((item) => {
                    return <DropdownMenuItem onClick={() => changeItem(item)}>{item}</DropdownMenuItem>
                })}
            </DropdownMenuContainer>
        </div>
    )
}

export default DropdownMenu
