import React, { useState, useEffect, useRef } from 'react'
import { PlaygroundContainer, PlaygroundMain, PlaygroundBox, ButtonStartArrow, RectArrivedArrow, PlaygroundBin, StartFlag, ArrivedFlag } from './PlaygroundElements'
import { ASData } from '../AppSidebar/ASData';
import Arrow from '../Arrow';
import ValidateButton from '../ValidateButton'
import { Icon } from '@iconify/react';
import { v4 as uuidv4 } from 'uuid';

const Playground = ({ newRectangle, setNewRectangle }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [containerPosition, setContainerPosition] = useState({});
    const containerRef = useRef(null);
    const binRef = useRef(null);
    const [draggingId, setDraggingId] = useState(null);
    const [boxes, setBoxes] = useState([]);
    const [arrows, setArrows] = useState([{id : 1, exists : false, from : null, to : null}]);
    const [clientPosition, setClientPosition] = useState({x : 0, y : 0});
    const [blocSelected, setBlocSelected] = useState('');
    const [isHoldingFlag, setIsHoldingFlag] = useState(false);
    const [isHoldingFlagArrived, setIsHoldingFlagArrived] = useState(false);

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
                setBoxes(boxes => [...boxes, { id: uuidv4(), x: newRectangle.x - 475, y: newRectangle.y - 110, key: newRectangle.key, linkTo: '0', linkFrom: '0', startOfFlow: (boxes.length === 0) ? true : false, endOfFlow: (boxes.length === 1) ? true : false}]);
            }
            setNewRectangle({ isNewRect: false, x: 0, y: 0, key: '' });
        }

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [newRectangle, setNewRectangle, containerPosition]);


    const handleMouseDown = (id) => (e) => {
        setDraggingId(id);
        setIsDragging(true);
        setBlocSelected(id);
    };

    const handleMouseDownOnArrived = (id) => (e) => {
        let canLink = true;
        arrows.forEach(arrow => {
            if (arrow.to === '0' && arrow.from !== id) {
                arrows.forEach(tmp => {
                    if (tmp.from === id && tmp.to === arrow.from)
                        canLink = false;
                });
                if (canLink) {
                    const index = arrow.id;
                    const from = arrow.from;
                    setArrows(arrows.filter(arrow => arrow.to !== "0"));
                    setArrows(arrows => [...arrows, { id: index, exists: true, from: from, to: id}]);
                    setBoxes(boxes.map(box => box.id === from ? {...box, linkTo: id} : box));
                    setBoxes(boxes.map(box => box.id === id ? {...box, linkFrom: from} : box));
                }
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
                            return null;
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

    const handleClickOnBox = (id) => {
        let canTransfert = true;
        if (isHoldingFlag) {
            boxes.forEach(box => {
                if (box.id === id) {
                    if (box.endOfFlow === true)
                        canTransfert = false;
                }
            })
            if (canTransfert) {
                setArrows(arrows.filter(arrow => arrow.to !== id));
                setBoxes(boxes.map(box => box.id === id ? {...box, startOfFlow: true} : (box.startOfFlow === true ? {...box, startOfFlow: false} : box)));
                setIsHoldingFlag(false);
            }
        }
        if (isHoldingFlagArrived) {
            boxes.forEach(box => {
                if (box.id === id) {
                    if (box.startOfFlow === true)
                        canTransfert = false;
                }
            })
            if (canTransfert) {
                setArrows(arrows.filter(arrow => arrow.from !== id));
                setBoxes(boxes.map(box => box.id === id ? {...box, endOfFlow: true} : (box.endOfFlow === true ? {...box, endOfFlow: false} : box)));
                setIsHoldingFlagArrived(false);
            }
        }
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
            return null;
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
            setArrows(arrows => [...arrows, { id: uuidv4(), exists: true, from: id, to: '0'}]);
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

    const findFreeBloc = (flag) => {
        let freeBloc = null;
        boxes.forEach(box => {
            if (flag === "start" && box.startOfFlow === false  && box.endOfFlow === false && freeBloc === null) {
                freeBloc = box;
                return freeBloc;
            }
            if (flag === "end" && box.startOfFlow === false && box.endOfFlow === false && freeBloc === null) {
                freeBloc = box;
                return freeBloc;
            }
        });
        boxes.forEach(box => {
            if (flag === "start" && box.startOfFlow === false && freeBloc === null) {
                freeBloc = box;
                return freeBloc;
            }
        });
        return freeBloc;
    }

    const handleBin = () => {
        let bin = binRef.current.getBoundingClientRect();

        let bloc = document.querySelector(`#bloc${blocSelected}`);
        let blocRect = bloc.getBoundingClientRect();

        let tmp = boxes;
        let currBox = null;
        for (let i = 0; i !== tmp.length; i++) {
            if (tmp[i].id === blocSelected) {
                currBox = tmp[i];
            }
        }
        if (blocRect.x + 200 > bin.x && blocRect.x < bin.x + 200 && blocRect.y + 100 > bin.y && blocRect.y < bin.y + 100) {
            setArrows(arrows.filter(arrow => arrow.to !== blocSelected && arrow.from !== blocSelected));
            if(currBox.startOfFlow === true) {
                let foundBox = findFreeBloc("start");
                if (foundBox != null)
                    foundBox.startOfFlow = true;
                if (foundBox.endOfFlow === true) {
                    let foundBox2 = findFreeBloc("end");
                    if (foundBox2 != null)
                        foundBox2.endOfFlow = true;
                    if (foundBox != null)
                        foundBox.endOfFlow = false;
                }
            }
            if (currBox.endOfFlow === true) {
                let foundBox = findFreeBloc("end");
                if (foundBox != null)
                    foundBox.endOfFlow = true;
            }
            tmp = tmp.filter(verifBox => verifBox.id !== blocSelected)
            setBoxes([...tmp])
        }
    };

    const handleMouseClickOnFlag = (flag) => {
        if (flag === "start")
            setIsHoldingFlag(true);
        if (flag === "end")
            setIsHoldingFlagArrived(true);
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
                        // style.outline = "5px solid red";
                        // style.boxShadow = "0 0 30px red";
                        style.opacity = "0.5";
                    }
                    return (
                        <PlaygroundBox key={box.id} color={data.color} id={`bloc${box.id}`} style={style} onMouseDown={handleMouseDown(box.id)} onClick={() => handleClickOnBox(box.id)}>
                            <ButtonStartArrow color={() => handleButtonColorStart(box.id)} onClick={() => handleArrowGeneration(box.id)} endOfFlow={box.endOfFlow}></ButtonStartArrow>
                            <RectArrivedArrow color={() => handleButtonColorArrived(box.id)} onMouseDown={handleMouseDownOnArrived(box.id)} startOfFlow={box.startOfFlow}></RectArrivedArrow>
                            <StartFlag startOfFlow={box.startOfFlow} onClick={() => handleMouseClickOnFlag("start")} isHoldingFlag={isHoldingFlag}><Icon icon="mdi:flag-variant"/></StartFlag>
                            <ArrivedFlag endOfFlow={box.endOfFlow} onClick={() => handleMouseClickOnFlag("end")} isHoldingFlagArrived={isHoldingFlagArrived}><Icon icon="mdi:flag-variant"/></ArrivedFlag>
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