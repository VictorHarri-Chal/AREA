import styled from 'styled-components';

export const ValidateButtonStyle = styled.button`
    ${props => props.state !== 2 ? `background : white;` : `background : green;`};
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
    top: 135px;
    right: 50px;
    border: none;

    transition: all 0.2s ease-out;

    ${props => props.state !== 0 ? `cursor : pointer;` : ``};
    &:hover {
        ${props => props.state !== 0 ? `background: lightgrey;` : ``};
        ${props => props.state !== 0 ? `color: white;` : ``};
        ${props => props.state !== 0 ? `transform: translateY(-2px);` : ``};
        ${props => props.state !== 0 ? `box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);` : ``};
    }
`;
