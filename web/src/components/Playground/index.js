import React, { useState, useEffect, useRef } from 'react'
import { PlaygroundContainer, PlaygroundMain, PlaygroundBox } from './PlaygroundElements'
import { BlocsData } from './BlocsData';
import { ASData } from '../AppSidebar/ASData';
import Arrow from '../Arrow';

const Playground = ({ newRectangle, setNewRectangle }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [containerPosition, setContainerPosition] = useState({});
    const containerRef = useRef(null);
    const [draggingId, setDraggingId] = useState(null);
    const [boxes, setBoxes] = useState(BlocsData);
    const [arrow, setArrow] = useState({ exists: false, from: null, to: null });

    useEffect(() => {
        const containerRect = containerRef.current.getBoundingClientRect();
        setContainerPosition({
            x: containerRect.x,
            y: containerRect.y,
            width: containerRect.width,
            height: containerRect.height,
        });
        if (newRectangle.isNewRect === true) {
            setBoxes(boxes => [...boxes, { id: boxes.length + 1, x: newRectangle.x - 475, y: newRectangle.y - 110, key: newRectangle.key}]);
            setNewRectangle({ isNewRect: false, x: 0, y: 0, key: '' });
        }

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [newRectangle]);


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
            let newX = e.pageX - containerPosition.x - 100;
            let newY = e.pageY - containerPosition.y - 50;
    
            if (newX < 0)
                newX = 0;
            if (newX + 100 > containerPosition.width)
                newX = containerPosition.width - 100;
            if (newY < 0)
                newY = 0;
            if (newY + 100 > containerPosition.height)
                newY = containerPosition.height - 100;
            
            boxes.forEach(otherBox => {
                if (otherBox.id !== draggingId) {
                    if (newX <= otherBox.x + 200 && newX + 200 >= otherBox.x && newY <= otherBox.y + 100 && newY + 100 >= otherBox.y) {
                        setBoxes(boxes.map(box => {
                            if (box.id === draggingId) {
                                    newX = box.x
                                    newY = box.y
                                }
                            })
                        )
                    }
                }
            });
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

    const getBlocData = (key) => {
        let blocData = {
            title: '',
            color: ''
        };
        ASData.find(el => {
            let actionBloc = undefined;
            if (el.action_blocs !== undefined)
                actionBloc = el.action_blocs.find(bloc => bloc.key === key);
            let reactionBloc = undefined;
            if (el.reaction_blocs !== undefined)
                reactionBloc = el.reaction_blocs.find(bloc => bloc.key === key);
            if (actionBloc !== undefined) {
                blocData.title = actionBloc.title;
                blocData.color = el.color;
            } else if (reactionBloc !== undefined) {
                blocData.title = reactionBloc.title;
                blocData.color = el.color;
            }
        });
        return blocData;
    }

    const handleArrowGeneration = (id) => {
        setArrow({ exists: true, from: id, to: '2' });
    };

    const handleArrowMove = (id) => {
        if (arrow.exists && arrow.from !== id) {
            setArrow({ ...arrow, to: id });
        }
    };

    return (
        <PlaygroundMain>
            <PlaygroundContainer onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} ref={containerRef}>
            {boxes.map(box => {
                let data = getBlocData(box.key);
                return (
                    <PlaygroundBox key={box.id} color={data.color}
                        style={{
                            left: box.x,
                            top: box.y,
                        }}
                        onMouseDown={handleMouseDown(box.id)}>
                        <button onClick={() => handleArrowGeneration(box.id)}>Generate Arrow</button>
                        {/* {data.title} */}
                    </PlaygroundBox>
                )
            })}
            {arrow.exists && <Arrow from={arrow.from} to={arrow.to} boxes={boxes} />}
            </PlaygroundContainer>
        </PlaygroundMain>
    );
};

export default Playground