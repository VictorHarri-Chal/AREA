import React, { useState, useEffect } from 'react';
import { DropdownMenuButton, DropdownMenuContainer, DropdownMenuItem } from './DropdownMenuElements';

const DropdownMenu = ({ data, placeHolder, pos }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [chosenItem, setChosenItem] = useState('');
    const [currentPos, setCurrentPos] = useState(pos);
    const [oldPos, setOldPos] = useState({x : null, y : null});

    useEffect(() => {
        if (pos.x !== oldPos.x || pos.y !== oldPos.y) {
            setCurrentPos({x : pos.x + 150, y : pos.y + 30});
            setOldPos({x : pos.x + 150, y : pos.y + 30});
        }
    }, [pos]);

    const toggleIsOpen = () => {
        setIsOpen(!isOpen);
    };

    const changeItem = item => {
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
            <DropdownMenuButton onClick={toggleIsOpen} isOpen={isOpen} y={currentPos.y} x={currentPos.x}>
                {goodPlaceholder()}
            </DropdownMenuButton>
            <DropdownMenuContainer onClick={toggleIsOpen} isOpen={isOpen} y={currentPos.y} x={currentPos.x}>
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