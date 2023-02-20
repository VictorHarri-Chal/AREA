import React from 'react';
import { ValidateButtonStyle } from './ValidateButtonElements';
import { Icon } from '@iconify/react';

function findFirstBox(data, sendData) {
    const firstBox = data.find((box) => {
        if (box.startOfFlow === true) {
            return true;
        }
    });
    sendData.push(firstBox);
    if (firstBox.linkTo !== '0') {
        findNextBox(data, firstBox, sendData);
    }
    return sendData;
}

function findNextBox(data, firstBox, sendData) {
    const nextBox = data.find((box) => {
        if (box.id === firstBox.linkTo) {
            return true;
        }
    });
    sendData.push(nextBox);
    if (nextBox.linkTo !== '0') {
        findNextBox(data, nextBox, sendData);
    }
    return sendData;
}

async function genFlow(data) {
    let sendData = [];
    sendData = findFirstBox(data, sendData);


    console.log(sendData)

    try {
        const response = await fetch('http://localhost:8080/flow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
        });
        if (!response.ok) {
            throw new Error('Failed');
        }
    } catch (error) {
        console.error(error);
    }
}

function verifNextBox(data, box) {
    if (box.linkTo === '0') {
        if (box.startOfFlow === true)
            return false;
        if (box.endOfFlow === true)
            return true;
    }
    const nextBox = data.find((newBox) => {
        if (newBox.id === box.linkTo) {
            return true;
        }
    });

    if (nextBox.startOfFlow === true)
        return false;
    if (nextBox.endOfFlow === true)
        return true;

    return verifNextBox(data, nextBox);
}

function schemaIsCorrect(data) {
    const firstBox = data.find((box) => {
        if (box.startOfFlow === true) {
            return true;
        }
    });

    return verifNextBox(data, firstBox);
}

function ValidateButton( {data} ) {

    const State = {
        CANT : 0,
        CAN : 1,
        IS : 2
    }

    const [state, setState] = React.useState(State.CANT)
    const [icon, setIcon] = React.useState("mdi:close-thick")

    const [oldBoxes, setOldBoxes] = React.useRef(data);

    const handleClick = () => {
        if (state === State.CAN) {
            console.log("click can to is")
            setState(State.IS);
        }
        else if (state === State.IS) {
            console.log("click is to can")
            setState(State.CAN);
        }
    }

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (schemaIsCorrect(data) && state === State.CANT) {
                setState(State.CAN);
                setIcon("mdi:check-bold");
            } else if (state !== State.IS) {
                setState(State.CANT);
                setIcon("mdi:close-thick");
            }

            if (state == State.IS && data !== oldBoxes) {
                setState(State.CAN);
                setOldBoxes(data);
                //genFlow(data);
            }

        }, 1000);

        return () => clearInterval(interval);
    }, [data]);

    console.log(state)

    return (
        <ValidateButtonStyle onClick={handleClick} state={state} ><Icon icon={icon}/></ValidateButtonStyle>
    );
}


export default ValidateButton;