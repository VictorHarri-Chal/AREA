import React, { useState, useEffect } from 'react';
import { DropdownMenuButton, DropdownMenuContainer, DropdownMenuItem } from './DropdownMenuElements';

const DropdownMenu = ({ data, placeHolder, pos, box }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentPos, setCurrentPos] = useState(pos);
    const [currentItem, setCurrentItem] = useState('');

    useEffect(() => {
        setCurrentPos({ x: pos.x + 150, y: pos.y + 30 });
    }, [pos]);

    const toggleIsOpen = () => {
        setIsOpen(!isOpen);
    };

    const changeItem = (item) => {
        box.chosenItem = item;
        setCurrentItem(item);
    };

    const goodPlaceholder = () => {
        if (currentItem === '') {
            return placeHolder;
        } else {
            return currentItem;
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