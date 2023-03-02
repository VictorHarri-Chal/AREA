import React from 'react';
import { ValidateButtonStyle } from './ValidateButtonElements';
import { Icon } from '@iconify/react';
const cookies = require('../../utils/getCookie.js');

function findFirstBox(data, sendData) {
    const firstBox = data.find((box) => {
        if (box.startOfFlow === true) {
            return true;
        }
        return false;
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
        return false;
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
                'x-access-token': cookies.getCookie('jwtToken')
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
        return false;
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
        return false;
    });

    return verifNextBox(data, firstBox);
}

function ValidateButton({ data }) {

    const State = {
        CANT: 0,
        CAN: 1,
        IS: 2,
    };

    const [state, setState] = React.useState(State.CANT);
    const [icon, setIcon] = React.useState("mdi:close-thick");

    const [oldBoxes, setOldBoxes] = React.useState(data);

    const handleClick = () => {
        if (state === State.CAN) {
            setState(State.IS);
            genFlow(data);
        } else if (state === State.IS) {
            setState(State.CAN);
        }
    };

    React.useEffect(() => {
        const interval = setInterval(() => {

            if (state === State.IS && schemaIsCorrect(data) && JSON.stringify(data) === JSON.stringify(oldBoxes)) {
                return;
            }

            if (JSON.stringify(data) !== JSON.stringify(oldBoxes)) {
                setOldBoxes(data);
                setState(State.CANT);
                setIcon("mdi:close-thick");
                return;
            }

            if (schemaIsCorrect(data) && state === State.CANT) {
                setState(State.CAN);
                setIcon("mdi:check-bold");
            } else if (!schemaIsCorrect(data) && state !== State.CANT) {
                setState(State.CANT);
                setIcon("mdi:close-thick");
            }

        }, [State.CAN, State.CANT, State.IS], 1000);

        return () => clearInterval(interval);
    }, [data, state, oldBoxes, State.CAN, State.CANT, State.IS]);

    return (
        <ValidateButtonStyle onClick={handleClick} state={state}>
            <Icon icon={icon} />
        </ValidateButtonStyle>
    );
}


export default ValidateButton;