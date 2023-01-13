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
    background: rgba(211, 211, 211, 0.8); // #D3D3D3
    height: 100%;
    width: 300px;
    position: fixed;
    display: flex;
    z-index: 0;
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
