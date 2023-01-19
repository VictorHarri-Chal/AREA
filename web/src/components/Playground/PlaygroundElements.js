import styled from "styled-components";

export const PlaygroundMain = styled.div`
    display: grid;
    place-items: center;
    margin: 0 auto;
    width: 90%;
    max-width: 1600px;
    height: 800px;
    margin-top: 20px;
`;

export const PlaygroundContainer = styled.div`
    position: relative;
    border: 1px solid black;
    width: 2050px;
    height: 1100px;
    overflow: hidden;
`;

export const PlaygroundBox = styled.div`
    position: absolute;
    background:  ${props => props.color};
    padding: 15px;
    border-radius: 10px;
    box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.3);
    width: 200px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-family: 'Open Sans', sans-serif;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: break-word;
`;
