import styled from "styled-components";
import { keyframes } from "styled-components";

const slideIn = keyframes`
    from {
    transform: translateX(-100%);
    }
    to {
    transform: translateX(0%);
    }
`;

const slideOut = keyframes`
    from {
        transform: translateX(0%);
    }
    to {
        transform: translateX(-100%);
    }
`;

export const BSContainer = styled.div`
    background: #EEEEEE;
    height: 100%;
    width: 300px;
    position: absolute;
    display: flex;
    z-index: 0;
    align-items: flex-start;
    padding : 0px;
    position: flex;
    left: 150px;
    top: 0px;
    padding-top: 100px;
    animation: ${props => props.isOpen === true ? slideIn : slideOut} 0.5s ease-in-out forwards;


    @media screen and (max-width: 1000px) {
        z-index: 2;
        display : ${props => props.isOpen === true ? `block;` : `none`}
    }
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

    @media screen and (max-width: 1000px) {
        justify-content: right;
        margin-left: 130px;
        margin-top: -70px;
    }
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
    top : 230px;
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
    top : 230px;
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
    top : 300px;
    left :  ${props => props.which === false ? '70px' : '210px'};

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
        ${props => props.actionRea === true && `
            cursor: default;
            pointer-events: none;
        `}
    }

    display: ${props => props.login === undefined ? 'none' : (props.login === false ? 'none' :  'block')};
`;

export const BSBlocContainer = styled.ul`
    width: 250px;
    position: fixed;
    padding : 20px;

    display: grid;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    list-style-type: none;
    grid-gap: 20px;
`;

export const BSBloc = styled.li`
    background:  ${props => props.color};
    padding: 15px;
    border-radius: 10px;
    box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.3);
    width: '200px';
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-family: 'Open Sans', sans-serif;
    font-weight: bold;

    &:hover {
        transform: scale(1.05);
        cursor: pointer;
    }

    &:active {
        transform: scale(0.95);
    }

    transition: all 0.15s ease-in-out;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: break-word;

    user-select: none;
`;