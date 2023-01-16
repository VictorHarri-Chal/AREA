import styled from "styled-components";
import { keyframes } from "styled-components";

const slideIn = keyframes`
    from {
    transform: translateX(-100%);
    }
    to {
    transform: translateX(0);
    }
`;

export const BSContainer = styled.div`
    background: #EEEEEE;
    height: 100%;
    width: 300px;
    position: fixed;
    display: flex;
    z-index: -1;
    align-items: flex-start;
    padding : 0px;
    position: flex;
    left: 150px;
    animation: ${slideIn} 0.5s ease-in-out forwards;
`;

export const BSLogoApp = styled.div`
    margin: 20px;
    border-radius: 20%;
    position: flex;

    svg {
        width: 70px;
        height: 70px;
        color: ${props => props.color};
    }
`;

export const BSAppName = styled.div`
    margin-top: 40px;
    margin-left: 20px;
    border-radius: 20%;
    justify-content: center;
    position: flex;
    font-size : 30px;
    font-weight: bold;
    color: ${props => props.color};
    transition: all 0.2s ease-in-out;
`;

export const BSConnectBtn = styled.div`
    border-radius: 50px;
    background: ${props => props.color};
    white-space: nowrap;
    padding: 10px 22px;
    color: #010606;
    font-size: 25px;
    font-weight: bold;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    position: absolute;
    transform: translate(-50%, -50%);
    top : 130px;
    left : 150px;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }

    display: ${props => props.login === undefined ? 'none' : (props.login === true ? 'none' : 'block')};
`;

export const BSConnected = styled.div`
    white-space: nowrap;
    padding: 10px 22px;
    color: #010606;
    font-size: 25px;
    font-weight: bold;
    outline: none;
    border: none;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    position: absolute;
    transform: translate(-50%, -50%);
    top : 130px;
    left : 150px;

    display: ${props => props.login === undefined ? 'none' : (props.login === false ? 'none' : 'block')};
`;

export const BSActionRea = styled.div`
    border-radius: 50px;
    background: ${props => props.actionRea === true ? props.color : 'none'};
    white-space: nowrap;
    padding: 10px 22px;
    color: #010606;
    font-size: 22px;
    font-weight: bold;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    position: absolute;
    transform: translate(-50%, -50%);
    top : 200px;
    left :  ${props => props.which == false ? '70px' : '210px'};

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
        ${props => props.actionRea == true && `
            cursor: default;
            pointer-events: none;
        `}
    }

    display: ${props => props.login === undefined ? 'none' : (props.login === false ? 'none' :  'block')};
`;
