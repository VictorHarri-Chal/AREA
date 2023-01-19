import React, { useState, useEffect, useRef } from 'react'
import { PlaygroundContainer, PlaygroundMain, PlaygroundBox } from './PlaygroundElements'

const Playground = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [containerPosition, setContainerPosition] = useState({});
    const containerRef = useRef(null);


    useEffect(() => {
        const containerRect = containerRef.current.getBoundingClientRect();
        setContainerPosition({
            x: containerRect.x,
            y: containerRect.y,
            width: containerRect.width,
            height: containerRect.height,
        });
    }, []);

    const handleMouseDown = (e) => {
        setIsDragging(true);
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            let newX = e.pageX - containerPosition.x - 50;
            let newY = e.pageY - containerPosition.y - 50;

            if (newX < 0)
                newX = 0;
            if (newX + 100 > containerPosition.width)
                newX = containerPosition.width - 100;
            if (newY < 0)
                newY = 0;
            if (newY + 100 > containerPosition.height)
                newY = containerPosition.height - 100;

            setPosition({ x: newX, y: newY });
        }
    };

    const handleMouseUp = (e) => {
    setIsDragging(false);
    };

    return (
    <PlaygroundMain>
        <PlaygroundContainer onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} ref={containerRef}>
        <PlaygroundBox
            style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            }}
            onMouseDown={handleMouseDown}
        />
        </PlaygroundContainer>
    </PlaygroundMain>
    );
};

export default Playground