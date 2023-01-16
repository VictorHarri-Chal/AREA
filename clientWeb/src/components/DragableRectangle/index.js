import React, { useState, useRef } from 'react';
import { DragableRectangleStyle } from './DragableRectElements';

const DragableRectangle = ({ newRectangle }) => {
  const [rectanglePosition, setRectanglePosition] = useState({ x: newRectangle.x, y: newRectangle.y });
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
    if (isDragging) {
      const { x, y } = rectanglePosition;
      const deltaX = event.clientX - initialMousePosition.x;
      const deltaY = event.clientY - initialMousePosition.y;
      setRectanglePosition({ x: x + deltaX, y: y + deltaY });
      setInitialMousePosition({ x: event.clientX, y: event.clientY });
    }
  };

  return (
      <DragableRectangleStyle
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        style={{
          transform: `translate(${rectanglePosition.x}px, ${rectanglePosition.y}px)`,
        }}
      />
  );
};

export default DragableRectangle;