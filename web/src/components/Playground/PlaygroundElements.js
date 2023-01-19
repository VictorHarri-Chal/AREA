import styled from "styled-components";

export const PlaygroundMain = styled.div`
    position: absolute;
    margin-top: 40px;
    margin-left : 225px;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    transition: all 0.2s ease-in-out;

    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    user-select: none;
`;

export const PlaygroundContainer = styled.div`
    position: relative;
    width: 1450px;
    height: 830px;
    overflow: hidden;
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

