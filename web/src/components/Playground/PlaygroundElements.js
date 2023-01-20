import styled from "styled-components";

export const PlaygroundMain = styled.div`
    position: absolute;
    top: 110px;
    left: 475px;
    width: calc(100vw - 485px);
    height: calc(100vh - 120px);

    transition: all 0.2s ease-in-out forwards;

    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    user-select: none;
    overflow: scroll;

    scrollbar-width: thin;

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

    @media screen and (max-width: 1000px) {
        top: 110px;
        left: 15px;
        width: calc(100vw - 30px);
        height: calc(100vh - 130px);
    }
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

    &:hover {
        transform: scale(1.05);
        cursor: pointer;
        transition: transform  0.15s ease-in-out;
    }

    &:active {
        transform: scale(0.95);
        transition: transform  0.15s ease-in-out;
    }


    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: break-word;
`;

export const PlaygroundBin = styled.div`
    background: #fff;
    position: fixed;
    border-radius: 20px;
    box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.3);
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    color : lightgrey;
    right: 50px;
    bottom: 50px;
`;