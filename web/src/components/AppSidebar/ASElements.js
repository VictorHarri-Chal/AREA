import styled from "styled-components";

export const ASContainer = styled.div`
    background: #393E46;
    height: 100%;
    width: 150px;
    position: absolute;
    display: flex;
    align-items: flex-start;
    padding : 20px;
    z-index :1;

    @media screen and (max-width: 1000px) {

        transition: all 0.3s ease-in-out;

        ${props => props.isOpen === true ? `width: 100%;` : `width: 0%;`}
        ${props => props.isOpen === true ? `background: #393E46;` : `background: #FFF;`}
    }

`;

export const ASIconList = styled.ul`
    display: grid;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    list-style-type: none;
    z-index: 10;

    @media screen and (max-width: 1000px) {
        align-items: left;
        background : ${props => props.isOpen === true ? `#393E46;` : `#FFF;`}
        display : ${props => props.isOpen === true ? `block;` : `none`}
    }
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
    cursor: pointer;

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
    ${props => props.login === true ? `background-color: #4CAF50;` : `background-color: #F44336;`}
    ${props => props.login === undefined ? `opacity : 0%;` : `opacity : 100%;`}
`;

export const MobileIcon = styled.div`
    display: none;

    @media screen and (max-width: 1000px) {
        display: block;
        position: absolute;
        top: 30px;
        ${props => props.close === false ? `left: 30px;` : `right : 30px;`}
        font-size: 45px;
        cursor: pointer;
        color: #FFF;
        background: #00ADB5;
        border-radius: 20%;
        align-items: center;
        text-align: center;
        vertical-align: middle;
        padding: 10px;
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
        height : 70px;
        width : 70px;
        z-index: 1000;

        &:hover {
            transform: scale(1.05);
        }

        &:active {
            transform: scale(0.95);
        }

        display: ${props => props.isOpen === false ? (props.close === true ? 'none' :  'block') : (props.close === false ? 'none' :  'block')};

    }
`;