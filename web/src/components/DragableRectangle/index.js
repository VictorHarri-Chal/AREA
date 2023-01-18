import React, { useState } from 'react';
import { DragableRectangleStyle, DragableRectangleStyle2, DragableRectangleStyle3 } from './DragableRectElements';

const DragableRectangle = ({ index, rectanglePositions, setRectanglePositions}) => {
    const [rectanglePosition, setRectanglePosition] = useState({ x: rectanglePositions[index].x, y: rectanglePositions[index].y });
    const [rectangleDimension, setRectangleDimension] = useState({ width: getRectangleWidth(), height: getRectangleHeight() });
    const [isDragging, setIsDragging] = useState(false);
    const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 });

    function getRectangleWidth() {
        if (rectanglePositions[index].type === '1') {
            return 200;
        } else if (rectanglePositions[index].type === '2') {
            return 300;
        } else if (rectanglePositions[index].type === '3') {
            return 400;
        }
    }

    function getRectangleHeight() {
        if (rectanglePositions[index].type === '1') {
            return 100;
        } else if (rectanglePositions[index].type === '2') {
            return 200;
        } else if (rectanglePositions[index].type === '3') {
            return 300;
        }
    }

    const handleMouseDown = (event) => {
        setInitialMousePosition({ x: event.clientX, y: event.clientY });
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (event) => {
        if (!isDragging) {
            return;
        }
        const { x, y } = rectanglePosition;
        const deltaX = event.clientX - initialMousePosition.x;
        const deltaY = event.clientY - initialMousePosition.y;
        if ((x + deltaX) > 450 && (y + deltaY) > 75 && 
        (x + deltaX + rectangleDimension.width) < window.innerWidth &&
        (y + deltaY + rectangleDimension.height) < window.innerHeight) {
            setRectanglePosition({ x: x + deltaX, y: y + deltaY });
        }
        setInitialMousePosition({ x: event.clientX, y: event.clientY });
    };

    return (
        <div>
            {rectanglePositions[index].type === '1' && 
                <DragableRectangleStyle width={rectangleDimension.width} height={rectangleDimension.height} 
                    left={rectanglePosition.x} top={rectanglePosition.y}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                />
            }
            {rectanglePositions[index].type === '2' &&
                <DragableRectangleStyle2 width={rectangleDimension.width} height={rectangleDimension.height} 
                    left={rectanglePosition.x} top={rectanglePosition.y}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                />
            }
            {rectanglePositions[index].type === '3' &&
                <DragableRectangleStyle3 width={rectangleDimension.width} height={rectangleDimension.height} 
                    left={rectanglePosition.x} top={rectanglePosition.y}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                />
            }
        </div>
    );
};

export default DragableRectangle;