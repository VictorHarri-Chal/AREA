import styled from 'styled-components';

export const DragableRectangleStyle = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
    background: ${props => props.color};
    position: absolute;
    border-radius: 15px;
    z-index : -3;
`;