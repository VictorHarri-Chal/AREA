import styled from "styled-components";

export const PlaygroundMain = styled.div`
    display: grid;
    place-items: center;
    margin: 0 auto;
    width: 90%;
    max-width: 800px;
    height: 800px;
    background-color: #aaaeee;
`;

export const PlaygroundContainer = styled.div`
    position: relative;
    width: 800px;
    height: 800px;
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

