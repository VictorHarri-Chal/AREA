import React from 'react';

const Arrow = ({ from, to, boxes }) => {

    const fromBox = boxes.find(box => box.id === from);
    const toBox = boxes.find(box => box.id === to);

    if (!fromBox || !toBox) {
        console.log("fromBox or toBox not found");
        return null;
    }

    const startX = fromBox.x + 200;
    const startY = fromBox.y + 100;
    const endX = toBox.x + 200;
    const endY = toBox.y + 100;
    const distance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);

    return (
        <svg>
            <line x1={startX} y1={startY} x2={endX} y2={endY} stroke="black" strokeWidth="6" strokeDasharray={`${distance} ${distance}`} />
            <path d={`M ${endX} ${endY} L ${endX - 10} ${endY - 10} L ${endX - 10} ${endY + 10} Z`} fill="black" />
        </svg>
    );
};

export default Arrow;
