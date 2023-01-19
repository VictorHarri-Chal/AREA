import styled from "styled-components";

export const PlaygroundMain = styled.div`
    display: grid;
    place-items: center;
    margin-top: 10px;
    height: 800px;
    width: 100vw;
`;

export const PlaygroundContainer = styled.div`
    position: relative;
    border: 1px solid black;
    height: 800px;
    width: 800px;
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

