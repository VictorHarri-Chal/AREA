import styled, { keyframes } from 'styled-components';

export const ValidateButtonStyle = styled.button`
    background: white;
    position: absolute;
    border-radius: 20px;
    box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.3);
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    color : lightgrey;
    top: 25px;
    left: 1320px;
    border: none;

    cursor: pointer;
    transition: all 0.2s ease-out;
    &:hover {
        background: lightgrey;
        color: white;
        transform: translateY(-2px);
        box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
    }
`;