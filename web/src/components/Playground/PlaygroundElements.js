import styled from "styled-components";

export const PlaygroundMain = styled.div`
    display: grid;
    place-items: center;
    margin: 0 auto;
    width: 90%;
    max-width: 1000px;
    height: 800px;
    margin-top: 20px;
`;

export const PlaygroundContainer = styled.div`
    position: relative;
    border: 1px solid black;
    width: 1000px;
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

