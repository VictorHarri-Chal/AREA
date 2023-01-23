import React, { useState, useEffect, useRef } from 'react'
import { PlaygroundContainer, PlaygroundMain, PlaygroundBox, PlaygroundBin } from './PlaygroundElements'
import { BlocsData } from './BlocsData';
import { ASData } from '../AppSidebar/ASData';
import { Icon } from '@iconify/react';

const Playground = ({ newRectangle, setNewRectangle }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [containerPosition, setContainerPosition] = useState({});
    const containerRef = useRef(null);
    const binRef = useRef(null);
    const [draggingId, setDraggingId] = useState(null);
    const [boxes, setBoxes] = useState(BlocsData)
    const [blocSelected, setBlocSelected] = useState('');

    useEffect(() => {
        const containerRect = containerRef.current.getBoundingClientRect();
        setContainerPosition({
            x: containerRect.x,
            y: containerRect.y,
            width: containerRect.width,
            height: containerRect.height,
        });
        if (newRectangle.isNewRect === true) {
            setBoxes(boxes => [...boxes, { id: boxes.length + 1, x: newRectangle.x , y: newRectangle.y, key: newRectangle.key}]);
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
        setBlocSelected(id);
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

            setBoxes(boxes.map(box => {
                if (box.id === draggingId) {
                    const binRect = binRef.current.getBoundingClientRect();
                    const distance = Math.sqrt(
                        Math.pow(binRect.x - newX - containerPosition.x, 2) +
                        Math.pow(binRect.y - newY - containerPosition.y, 2)
                    );
                    if (distance < 100) {
                        box.nextToBin = true;
                    } else {
                        box.nextToBin = false;
                    }
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
        handleBin();
        setBlocSelected('');
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

    const handleBin = () => {
        let bin = binRef.current.getBoundingClientRect();

        let bloc = document.querySelector(`#bloc${blocSelected}`);
        let blocRect = bloc.getBoundingClientRect();


        if (blocRect.x + 200 > bin.x && blocRect.x < bin.x + 200 && blocRect.y + 100 > bin.y && blocRect.y < bin.y + 100) {
            setBoxes(boxes.filter(verifBox => verifBox.id !== blocSelected));
        }
    };

    return (
        <PlaygroundMain>
            <PlaygroundContainer onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} ref={containerRef}>
                {boxes.map(box => {
                    let data = getBlocData(box.key);
                    let style = {
                        left: box.x,
                        top: box.y,
                    }
                    if (box.nextToBin === true) {
                        style.outline = "5px solid red";
                        style.boxShadow = "0 0 30px red";
                    }
                    return (
                        <PlaygroundBox key={box.id} color={data.color} id={`bloc${box.id}`} style={style} onMouseDown={handleMouseDown(box.id)}>
                            {data.title}
                        </PlaygroundBox>
                    )
                })}
                <PlaygroundBin><Icon icon="mdi:bin-empty" ref={binRef} /></PlaygroundBin>
            </PlaygroundContainer>
        </PlaygroundMain>
    );
};

export default Playground