import React, { useRef, useEffect } from 'react';
 
function Playground() {
  const canvas = useRef();
  let ctx = null;
  const boxes = [
    { x: 200, y: 220, w: 100, h: 50 },
    { x: 100, y: 120, w: 100, h: 50 }
  ]
  let isDown = false;
  let dragTarget = null;
  let startX = null;
  let startY = null;
 
  useEffect(() => {
    const canvasEle = canvas.current;
    canvasEle.width = window.innerWidth - (window.innerWidth*6/100);
    canvasEle.height = window.innerHeight - (window.innerHeight*6/100);
 
    ctx = canvasEle.getContext("2d");
  }, []);
 
  useEffect(() => {
    draw();
  }, []);
 
  const draw = () => {
    ctx.clearRect(0, 0, canvas.current.clientWidth, canvas.current.clientHeight);
    boxes.map(info => drawFillRect(info));
  }
 
  const drawFillRect = (info, style = {}) => {
    const { x, y, w, h } = info;
    const { backgroundColor = 'red' } = style;
 
    ctx.beginPath();
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(x, y, w, h);
  }
 
  const hitBox = (x, y) => {
    let isTarget = null;
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      if (x >= box.x && x <= box.x + box.w && y >= box.y && y <= box.y + box.h) {
        dragTarget = box;
        isTarget = true;
        break;
      }
    }
    return isTarget;
  }
 
  const handleMouseDown = e => {
    startX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    startY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
    isDown = hitBox(startX, startY);
  }
  const handleMouseMove = e => {
    if (!isDown) return;
 
    const mouseX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    const mouseY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
    const dx = mouseX - startX;
    const dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;
    dragTarget.x += dx;
    dragTarget.y += dy;
    draw();
  }
  const handleMouseUp = e => {
    dragTarget = null;
    isDown = false;
  }
  const handleMouseOut = e => {
    handleMouseUp(e);
  }
 
  return (
    <div className="Playground">
      <canvas
        style={{backgroundColor: 'yellow', top: '6%', left: '6%', position: 'absolute', display: 'none'}}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
        ref={canvas}></canvas>
    </div>
  );
}
 
export default Playground;