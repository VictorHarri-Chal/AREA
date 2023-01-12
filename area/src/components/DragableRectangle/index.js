import React, { useState } from 'react';
import { DragableRectangleContainer , RectangleContainer } from './DragableRectElements';

const DragableRectangle = () => {
  const [rectanglePosition, setRectanglePosition] = useState({ x: 450, y: 250 });
  const [isDragging, setIsDragging] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 });

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
    setRectanglePosition({ x: x + deltaX, y: y + deltaY });
    setInitialMousePosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <DragableRectangleContainer
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <RectangleContainer
          style={{
            left: rectanglePosition.x,
            top: rectanglePosition.y,
          }}
        />
    </DragableRectangleContainer>
  );
};

export default DragableRectangle;