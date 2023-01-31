import styled from 'styled-components';

export const DropdownMenuButton = styled.button`
    position: absolute;
    top: 500px;
    left : 500px;
    transform: translate(0%, -50%);
    background: white;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-out;
    min-width: fit-content;
    outline: 3px solid #f5f5f5;

    font-size: 16px;
    font-family: 'Open Sans', sans-serif;
    font-weight: bold;
    color: #333;

    padding: 10px 22px;
    border-radius: 10px;

    &:hover {
        background: #f5f5f5;
    }

    &:active {
        background: #e5e5e5;
    }

    display : ${props => props.isOpen ? 'none' : 'flex'};
`;

export const DropdownMenuContainer = styled.ul`
    position: absolute;
    top: ${props => props.y}px;
    left : ${props => props.x}px;
    width : 200px;
    height: 150px;
    transform: translate(0%, -50%);
    outline: 3px solid #f5f5f5;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    display: ${props => props.isOpen ? 'flex' : 'none'};
`;

export const DropdownMenuItem = styled.li`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-family: 'Open Sans', sans-serif;
    font-weight: bold;
    color: #333;
    cursor: pointer;
    transition: all 0.2s ease-out;

    &:hover {
        background: #f5f5f5;
    }

    &:active {
        background: #e5e5e5;
    }
`;