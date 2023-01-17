import styled from 'styled-components';

export const DragableRectangleStyle = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
    background: blue;
    position: absolute;
    border-radius: 15px;
`;

export const DragableRectangleStyle2 = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    left: ${props => props.left}px;
    top: ${props => props.top}px;   
    background: red;
    position: absolute;
    border-radius: 15px;
`;

export const DragableRectangleStyle3 = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
    background: green;
    position: absolute;
    border-radius: 15px;
`;