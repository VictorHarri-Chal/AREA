import React, { useState, useEffect, useRef } from 'react';
import { DropdownMenuButton, DropdownMenuContainer, DropdownMenuItem } from './DropdownMenuElements';

const DropdownMenu = ({ data, placeHolder, pos, chosenItem, setChosenItem }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentPos, setCurrentPos] = useState(pos);

    useEffect(() => {
        setCurrentPos({ x: pos.x + 150, y: pos.y + 30 });
    }, [pos]);

    const toggleIsOpen = () => {
        setIsOpen(!isOpen);
    };

    const changeItem = (item) => {
        setChosenItem(item);
    };

    const goodPlaceholder = () => {
        if (chosenItem === '') {
            return placeHolder;
        } else {
            return chosenItem;
        }
    };

    return (
        <div>
            <DropdownMenuButton
                style={{
                    top: currentPos.y,
                    left: currentPos.x,
                }}
                onClick={toggleIsOpen} isOpen={isOpen}>
                {goodPlaceholder()}
            </DropdownMenuButton>
            <DropdownMenuContainer
                style={{
                    top: currentPos.y,
                    left: currentPos.x,
                }}
                onClick={toggleIsOpen} isOpen={isOpen}>
                {data.map(item => {
                return (
                    <DropdownMenuItem onClick={() => changeItem(item.key)}>
                    {item.key}
                    </DropdownMenuItem>
                );
                })}
            </DropdownMenuContainer>
        </div>
    );
};

export default DropdownMenu;