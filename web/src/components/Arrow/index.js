import React from 'react';

const Arrow = ({ arrows, boxes, clientX, clientY }) => {

    return (
        <svg width="2000" height="1200">
            {arrows.map(arrow => {
                if (arrow.exists) {
                    const fromBox = boxes.find(box => box.id === arrow.from);
                    const toBox = boxes.find(box => box.id === arrow.to);
                    console.log(fromBox);
                    const decal = (fromBox.key === 'blocs_and' || 'blocs_or' ? 80 : 180)
                    if (arrow.to === '0') {
                        return (
                            <line x1={fromBox.x + decal} y1={fromBox.y + 50} x2={clientX - 475} y2={clientY - 110} stroke="#C8AD7F" strokeWidth="8"/>
                        )
                    } else {
                        return (
                            <line x1={fromBox.x + decal} y1={fromBox.y + 50} x2={toBox.x + 10} y2={toBox.y + 50} stroke="#C8AD7F" strokeWidth="8"/>
                        )
                    }
                }
            })}
        </svg>
    );
};

export default Arrow;
