import React, { useRef, useEffect, useState } from 'react';
import { StyledButton } from './PlaygroundElements';

function Playground() {
	const [coordinates, setCoordinates] = useState({ x: 0, y: 0, width: 0, height: 0 });
  	const canvas = useRef();
  	let ctx = null;
  	const boxes = []
  	let isDown = false;
  	let dragTarget = null;
  	let startX = null;
  	let startY = null;

 	useEffect(() => {
    	const canvasEle = canvas.current;
    	canvasEle.width = window.innerWidth - (window.innerWidth*18/100);
    	canvasEle.height = window.innerHeight - (window.innerHeight*6/100);
 
    	ctx = canvasEle.getContext("2d");
  	}, []);

  	useEffect(() => {
    	draw();
  	}, []);
 
  	const draw = () => {
    	ctx.clearRect(0, 0, window.innerWidth - (window.innerWidth*18/100), window.innerHeight - (window.innerHeight*6/100));
    	boxes.map(info => drawFillRect(info));
  	}

  	const drawFillRect = (info, style = {}) => {
    const { x, y, w, h } = info;
    const { backgroundColor = 'red' } = style;

    ctx.beginPath();
    ctx.fillStyle = backgroundColor;
    ctx.roundRect(x, y, w, h, 10);
    ctx.stroke();
    ctx.fill();
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
    	if (!isDown)
			return;
		const mouseX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    	const mouseY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
    	const dx = mouseX - startX;
    	const dy = mouseY - startY;
    	startX = mouseX;
    	startY = mouseY;
    	console.log(dragTarget.x + 250 + dx);
    	console.log(window.innerWidth);
    	if (dragTarget.x + dx > 0 && ((dragTarget.x + 500 + dx) < window.innerWidth)) {
      		dragTarget.x += dx;
    	}
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

	const handleClick = () => {
    	boxes.unshift({ x: 500, y: 220, w: 250, h: 100 });
    	draw();
  	}

  	return (
    	<div className="Playground">
      		<canvas
        		style={{backgroundColor: 'white', top: '6%', left: '18%', position: 'relative'}}
        		onMouseDown={handleMouseDown}
        		onMouseMove={handleMouseMove}
        		onMouseUp={handleMouseUp}
        		onMouseOut={handleMouseOut}
        		ref={canvas}></canvas>
        	<StyledButton onClick={handleClick}>
          		Generate
        	</StyledButton>
    	</div>
	);
}
 
export default Playground;