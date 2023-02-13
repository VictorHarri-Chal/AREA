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

function ValidateButton( {data} ) {

    const handleClick = () => {
        genFlow(data)
    }

    return (
        <ValidateButtonStyle onClick={handleClick} ><Icon icon="material-symbols:play-arrow-rounded" /></ValidateButtonStyle>
    );
}

export default ValidateButton;