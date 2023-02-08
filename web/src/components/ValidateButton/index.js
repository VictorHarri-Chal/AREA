import React from 'react';
import { ValidateButtonStyle } from './ValidateButtonElements';
import { Icon } from '@iconify/react';

function findFirstBox(data) {
    const firstBox = data.find((box) => {
        if (box.startOfFlow === true) {
            return true;
        }
    });
    return firstBox;
}

function findEndBox(data) {
    const endBox = data.find((box) => {
        if (box.endOfFlow === true) {
            return true;
        }
    });
    return endBox;
}

async function genFlow(data) {
    const firstBox = findFirstBox(data);
    const endBox = findEndBox(data);

    let sendData = {"firstBox": firstBox, "endBox": endBox };

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