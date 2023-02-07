import styled from 'styled-components';

export const DropdownMenuButton = styled.button`
    position: absolute;
    width: 200px;
    background: white;
    border: none;
    outline: none;
    cursor: pointer;
    min-width: fit-content;
    outline: 3px solid #f5f5f5;

    font-size: 16px;
    font-family: 'Open Sans', sans-serif;
    font-weight: bold;
    color: #333;

    align-items: center;
    justify-content: center;

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
    background: white;
    width : 200px;
    position: absolute;
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
    height: 30px;
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