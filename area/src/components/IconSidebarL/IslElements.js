import React from "react";
import styled from "styled-components";

export const IslContainer = styled.div`
    background: #03A9F4;
    height: 100%;
    width: 150px;
    position: fixed;
    display: flex;
    z-index: 2;
    align-items: flex-start;
    padding : 30px;
    justify-content: center;
`;

export const IslIconList = styled.ul`
    display: grid;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

export const IslIcon = styled.li`
    display: grid;
    align-items: center;
    justify-content: center;
    width: 75px;
    height: 75px;
    margin: 20px;
    border-radius: 20%;
    border: solid 0px #000;
    background-color: #fff;
    &:hover {
        background-color: #eee;
    }

    svg {
        width: 50px;
        height: 50px;
    }
`;