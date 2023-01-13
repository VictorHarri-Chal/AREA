import styled from "styled-components";

export const ASContainer = styled.div`
    background: #03A9F4;
    height: 100%;
    width: 150px;
    position: fixed;
    display: flex;
    align-items: flex-start;
    padding : 20px;
    justify-content: center;
`;

export const ASIconList = styled.ul`
    display: grid;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    list-style-type: none;
`;

export const ASIcon = styled.li`
    display: grid;
    align-items: center;
    justify-content: center;
    width: 75px;
    height: 75px;
    margin: 15px;
    border-radius: 20%;
    border: solid 0px #000;
    background-color: #fff;
    position: relative;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);

    &:hover {
        svg {
            color: ${props => props.color};
        }
    }

    svg {
        width: 45px;
        height: 45px;
        color : #000;
    }

`;

export const ASLogin = styled.div`
    content: "";
    width: 12px;
    height: 12px;
    border-radius: 50%;
    position: absolute;
    top: 5px;
    right: 5px;
    ${props => props.login == true ? `background-color: #4CAF50;` : `background-color: #F44336;`}
    ${props => props.login == undefined ? `opacity : 0%;` : `opacity : 100%;`}
`;