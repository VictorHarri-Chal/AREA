import React, { useState, useEffect, useRef } from 'react'
import { PlaygroundContainer, PlaygroundMain, PlaygroundBox } from './PlaygroundElements'

const Playground = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [containerPosition, setContainerPosition] = useState({});
    const containerRef = useRef(null);
    const [draggingId, setDraggingId] = useState(null);
    const [boxes, setBoxes] = useState([
        { id: 1, x: 0, y: 0 },
        { id: 2, x: 150, y: 150 },
        { id: 3, x: 300, y: 300 },
    ]);

    useEffect(() => {
        const containerRect = containerRef.current.getBoundingClientRect();
        setContainerPosition({
            x: containerRect.x,
            y: containerRect.y,
            width: containerRect.width,
            height: containerRect.height,
        });

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleMouseDown = (id) => (e) => {
        setDraggingId(id);
        setIsDragging(true);
    };

    const handleResize = () => {
        const containerRect = containerRef.current.getBoundingClientRect()
        setContainerPosition({
            x: containerRect.x,
            y: containerRect.y,
            width: containerRect.width,
            height: containerRect.height,
        });
    }

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

            setBoxes(boxes.map(box => {
                if (box.id === draggingId) {
                    return {
                        ...box,
                        x: newX,
                        y: newY
                    }
                }
                return box;
            }));
        }
    };

    const handleMouseUp = (e) => {
    setIsDragging(false);
    };

    return (
        <PlaygroundMain>
            <PlaygroundContainer onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} ref={containerRef}>
            {boxes.map(box => (
                <PlaygroundBox
                    key={box.id}
                    style={{
                        left: box.x,
                        top: box.y,
                    }}
                onMouseDown={handleMouseDown(box.id)}
            />
            ))}
            </PlaygroundContainer>
        </PlaygroundMain>
    );
};

export default Playground