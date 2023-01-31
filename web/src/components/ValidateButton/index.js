import React, { useState } from 'react';
import { ValidateButtonStyle } from './ValidateButtonElements';
import { Icon } from '@iconify/react';

function ValidateButton() {

    const handleClick = () => {
        alert('Processing...')
    }

    return (
        <ValidateButtonStyle onClick={handleClick} ><Icon icon="material-symbols:play-arrow-rounded" /></ValidateButtonStyle>
    );
}

export default ValidateButton;