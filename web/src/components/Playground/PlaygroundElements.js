import styled from "styled-components";

export const PlaygroundMain = styled.div`
    position: absolute;
    top: 110px;
    left: 475px;
    width: calc(100vw - 495px);
    height: calc(100vh - 130px);

    transition: all 0.2s ease-in-out;

    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    user-select: none;
    overflow: scroll;

    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent;

    @media screen and (max-width: 1000px) {
        top: 110px;
        left: 15px;
        width: calc(100vw - 30px);
        height: calc(100vh - 130px);
    }

`;

export const PlaygroundContainer = styled.div`
    position: relative;
    width: calc(100vw - 495px);
    height: calc(100vh - 130px);
`;

export const PlaygroundBox = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background-color: hotpink;
    height: 100px;
    width: 100px;
    cursor: pointer;
`;

