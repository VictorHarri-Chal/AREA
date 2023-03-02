import React, { useState, useEffect, useRef } from 'react'
import { PlaygroundContainer, PlaygroundMain, PlaygroundBox, ButtonStartArrow, RectArrivedArrow, PlaygroundBin, StartFlag, ArrivedFlag } from './PlaygroundElements'
import { ASData } from '../AppSidebar/ASData';
import Arrow from '../Arrow';
import ValidateButton from '../ValidateButton'
import { Icon } from '@iconify/react';
import DropdownMenu from '../../components/DropdownMenu'
import { v4 as uuidv4 } from 'uuid';
const cookies = require('../../utils/getCookie.js');


const Playground = ({ newRectangle, setNewRectangle }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [containerPosition, setContainerPosition] = useState({});
    const [isContainerInitialised, setIsContainerInitialised] = useState(false);
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
        if (!isContainerInitialised) {
            const containerRect = containerRef.current.getBoundingClientRect();
            setContainerPosition({
                x: containerRect.x,
                y: containerRect.y,
                width: containerRect.width,
                height: containerRect.height,
            });
            setIsContainerInitialised(true);
        }
        if (newRectangle.isNewRect === true) {
            if (newRectangle.x > containerPosition.x && newRectangle.x < containerPosition.x + containerPosition.width && newRectangle.y > containerPosition.y && newRectangle.y < containerPosition.y + containerPosition.height) {
                initDM(newRectangle.key);
                setBoxes(boxes => [...boxes, { id: uuidv4(), x: newRectangle.x - 475, y: newRectangle.y - 110, key: newRectangle.key, linkTo: '0', linkFrom: '0', startOfFlow: (boxes.length === 0) ? true : false, endOfFlow: (boxes.length === 1) ? true : false, chosenItem : ''}]);
            }
            setNewRectangle({ isNewRect: false, x: 0, y: 0, key: '' });
        }

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [newRectangle, setNewRectangle, containerPosition, isContainerInitialised]);


    async function askDMData(key) {

        const sendData = {
            key: key
        };

        try {
            const response = await fetch('http://localhost:8080/askDMData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': cookies.getCookie('jwtToken')
                },
                body: JSON.stringify(sendData),
            });
            if (response.ok && (key === "twitch_isOnStream")) {
                const data = await response.json();
                const follows = data.follows;
                return follows;
            } else if (response.ok && (key === "github_newCommit")) {
                const data = await response.json();
                const repositories = data.repositories;
                return repositories;
            } else if (response.ok && (key === "github_newIssue")) {
                const data = await response.json();
                const repositories = data.repositories;
                return repositories;
            } else if (response.ok && (key === "github_createIssue")) {
                const data = await response.json();
                const repositories = data.repositories;
                return repositories;
            }

        } catch (error) {
            console.error(error);
        }
    }

    async function initDM(key) {

        ASData.forEach(async (data) => {

            data.action_blocs.forEach(async (AB) => {
                if (AB.key === key) {
                    if (AB.getADM === true) {
                        let follows = await askDMData(AB.key);
                        let tmp = [];

                        for(let i = 0; i < follows.length; i++) {
                            let tmpObj = {
                                key: follows[i],
                            }
                            tmp.push(tmpObj);
                        }

                        AB.DM = tmp;
                    }
                }
            });

            data.reaction_blocs.forEach(async (RB) => {
                if (RB.key === key) {
                    if (RB.getADM === true) {
                        let follows = await askDMData(RB.key);
                        let tmp = [];

                        for(let i = 0; i < follows.length; i++) {
                            let tmpObj = {
                                key: follows[i],
                            }
                            tmp.push(tmpObj);
                        }

                        RB.DM = tmp;
                    }
                }
            });

        });
    }


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
                    setBoxes(boxes.map(box => {
                        if (box.id === id) {
                            box.linkFrom = from;
                        }
                        if (box.id === from) {
                            box.linkTo = id;
                        }
                        return box;
                    }));
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
            let decal = 100;
            boxes.forEach(box => {
                if (box.id === draggingId) {
                    let data = getBlocData(box.key);
                    if (data.getADM)
                        decal = 200;
                }
            });
            let newX = e.pageX - containerPosition.x - decal;
            let newY = e.pageY - containerPosition.y - 50;

            if (newX < 0)
                newX = 0;
            if (newX + decal > containerPosition.width)
                newX = containerPosition.width - decal;
            if (newY < 0)
                newY = 0;
            if (newY + (decal/2) > containerPosition.height)
                newY = containerPosition.height - (decal/2);

            boxes.forEach(otherBox => {
                if (otherBox.id !== draggingId) {
                    let offset = 200;
                    let dataBis = getBlocData(otherBox.key);
                    if (dataBis.getADM)
                        offset = 400;
                    if (newX <= otherBox.x + offset && newX + (decal*2) >= otherBox.x && newY <= otherBox.y + 100 && newY + 100 >= otherBox.y) {
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
            color: '',
            getADM: false
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
                blocData.getADM = actionBloc.getADM;
                blocData.DM = actionBloc.DM;
                blocData.placeHolder = actionBloc.placeHolder;
            } else if (reactionBloc !== undefined) {
                blocData.title = reactionBloc.title;
                blocData.color = el.color;
                blocData.getADM = reactionBloc.getADM;
                blocData.DM = reactionBloc.DM;
                blocData.placeHolder = reactionBloc.placeHolder;
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

                let blocFrom = boxes.find(box => box.id === arrow.from);
                let blocTo = boxes.find(box => box.id === arrow.to);
                blocFrom.linkTo = '0';
                blocTo.linkFrom = '0';

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
            console.log(currBox.linkFrom)
            if (currBox.linkFrom !=='0' && currBox.linkFrom !== null) {
                let tmpBox = boxes.find(box => box.id === currBox.linkFrom);
                tmpBox.linkTo = '0';
            }

            if (currBox.linkTo !== '0' && currBox.linkTo !== null) {
                let tmpBox = boxes.find(box => box.id === currBox.linkTo);
                tmpBox.linkFrom = '0';
            }

            setArrows(arrows.filter(arrow => arrow.to !== blocSelected && arrow.from !== blocSelected));

            if(currBox.startOfFlow === true) {
                let foundBox = findFreeBloc("start");
                if (foundBox != null)
                    foundBox.startOfFlow = true;
                if (foundBox !== null && foundBox.endOfFlow === true) {
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

    const getGoodTitle = (title, getADM) => {
        if (!getADM)
            return title
        let cleanedText = title.replace(/\[[^\]]*\]/g, "");
        return cleanedText
    }

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
                        style.opacity = "0.5";
                    }
                    let pos = {x : box.x, y : box.y}
                    return (
                        <div>
                            <PlaygroundBox key={box.id} color={data.color} id={`bloc${box.id}`} style={style} onMouseDown={handleMouseDown(box.id)} onClick={() => handleClickOnBox(box.id)} getADM={data.getADM}>
                                <ButtonStartArrow color={() => handleButtonColorStart(box.id)} onClick={() => handleArrowGeneration(box.id)} endOfFlow={box.endOfFlow}></ButtonStartArrow>
                                <RectArrivedArrow color={() => handleButtonColorArrived(box.id)} onMouseDown={handleMouseDownOnArrived(box.id)} startOfFlow={box.startOfFlow}></RectArrivedArrow>
                                <StartFlag startOfFlow={box.startOfFlow} onClick={() => handleMouseClickOnFlag("start")} isHoldingFlag={isHoldingFlag}><Icon icon="mdi:flag-variant"/></StartFlag>
                                <ArrivedFlag endOfFlow={box.endOfFlow} onClick={() => handleMouseClickOnFlag("end")} isHoldingFlagArrived={isHoldingFlagArrived} getADM={data.getADM} ><Icon icon="mdi:flag-variant"/></ArrivedFlag>
                                {getGoodTitle(data.title, data.getADM)}
                            </PlaygroundBox>
                            {data.getADM === true && (
                                <DropdownMenu data={data.DM} placeHolder={data.placeHolder} pos={pos} box={box}/>
                            )}
                        </div>
                    )
                })}
                <ValidateButton data={boxes} />
                <PlaygroundBin><Icon icon="mdi:bin-empty" ref={binRef} /></PlaygroundBin>
                {arrows[1] && <Arrow arrows={arrows} boxes={boxes} clientX={clientPosition.x} clientY={clientPosition.y} getBlocData={getBlocData}/>}
            </PlaygroundContainer>
        </PlaygroundMain>
    );
};

export default Playground