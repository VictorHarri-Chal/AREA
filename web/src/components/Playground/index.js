import React, { useState, useEffect, useRef } from 'react'
import { PlaygroundContainer, PlaygroundMain, PlaygroundBox, ButtonStartArrow, RectArrivedArrow, PlaygroundBin } from './PlaygroundElements'
import { BlocsData } from './BlocsData';
import { ASData } from '../AppSidebar/ASData';
import Arrow from '../Arrow';
import ValidateButton from '../ValidateButton'
import { Icon } from '@iconify/react';

const Playground = ({ newRectangle, setNewRectangle }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [containerPosition, setContainerPosition] = useState({});
    const containerRef = useRef(null);
    const binRef = useRef(null);
    const [draggingId, setDraggingId] = useState(null);
    const [boxes, setBoxes] = useState(BlocsData);
    const [arrows, setArrows] = useState([{id : 1, exists : false, from : null, to : null}]);
    const [clientPosition, setClientPosition] = useState({x : 0, y : 0});
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
            if (newRectangle.x > containerPosition.x && newRectangle.x < containerPosition.x + containerPosition.width && newRectangle.y > containerPosition.y && newRectangle.y < containerPosition.y + containerPosition.height) {
                setBoxes(boxes => [...boxes, { id: boxes.length + 1, x: newRectangle.x - 475, y: newRectangle.y - 110, key: newRectangle.key}]);
            }
            setNewRectangle({ isNewRect: false, x: 0, y: 0, key: '' });
            console.log(boxes);
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

    const handleMouseDownOnArrived = (id) => (e) => {
        arrows.forEach(arrow => {
            if (arrow.to === '0' && arrow.from !== id) {
                const index = arrow.id;
                const from = arrow.from;
                setArrows(arrows.filter(arrow => arrow.to !== "0"));
                setArrows(arrows => [...arrows, { id: index, exists: true, from: from, to: id}]);
            }
        });
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
        setClientPosition({ x: e.clientX, y: e.clientY});
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

    const handleArrowGeneration = (id) => {
        let found = false;
        arrows.forEach(arrow => {
            if (!found && arrow.exists && arrow.from === id) {
                found = true;
                setArrows(arrows.filter(arrow => arrow.from !== id));
            }
        });
        arrows.forEach(arrow => {
            if (arrow.to === "0")
                found = true;
        })
        if (!found) {
            setArrows(arrows => [...arrows, { id: arrows.length + 1, exists: true, from: id, to: '0'}]);
        }
    };

    const handleButtonColorStart = (id) => {
        let color = '#F9E4B7'
        arrows.forEach(arrow => {
            if (arrow.from === id && (arrow.to !== '0' || arrow.to !== null)) {
                color = '#C8AD7F';
            }
        });
        return color;
    };

    const handleButtonColorArrived = (id) => {
        let color = '#F9E4B7'
        arrows.forEach(arrow => {
            if (arrow.to === id) {
                color = '#C8AD7F';
            }
        });
        return color;
    };

    const handleBin = () => {
        let bin = binRef.current.getBoundingClientRect();

        let bloc = document.querySelector(`#bloc${blocSelected}`);
        let blocRect = bloc.getBoundingClientRect();


        if (blocRect.x + 200 > bin.x && blocRect.x < bin.x + 200 && blocRect.y + 100 > bin.y && blocRect.y < bin.y + 100) {
            arrows.forEach(arrow => {
                if (arrow.exists && blocSelected === arrow.from) {
                    setArrows(arrows.filter(arrow => arrow.from !== blocSelected));
                }
            });
            arrows.forEach(arrow => {
                if (arrow.exists && blocSelected === arrow.to) {
                    setArrows(arrows.filter(arrow => arrow.to !== blocSelected));
                }
            });
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
                        <ButtonStartArrow color={() => handleButtonColorStart(box.id)} onClick={() => handleArrowGeneration(box.id)}></ButtonStartArrow>
                        <RectArrivedArrow color={() => handleButtonColorArrived(box.id)} onMouseDown={handleMouseDownOnArrived(box.id)}></RectArrivedArrow>
                            {/* {data.title} */}
                        </PlaygroundBox>
                    )
                })}
                <ValidateButton />
                <PlaygroundBin><Icon icon="mdi:bin-empty" ref={binRef} /></PlaygroundBin>
                {arrows[1] && <Arrow arrows={arrows} boxes={boxes}  clientX={clientPosition.x} clientY={clientPosition.y}/>}
            </PlaygroundContainer>
        </PlaygroundMain>
    );
};

export default Playground