import styled from 'styled-components';

export const ProfileDDMContainer = styled.div`
    position: absolute;
    top: calc(${props => props.y}px - 10px);
    left: calc(${props => props.x}px - 140px);
    width: 200px;
    height: 200px;
    background: #fff;
    display: flex;
    z-index: 9998;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

`;

export const ProfilePicture = styled.div`
    position: absolute;
    top: 35px;
    right: 10px;
    letter-spacing: 3px;
    border-radius: 50px;
    transform: translateY(-50%);
    background: #fac710;
    width: 50px;
    height: 50px;
    color: #010606;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    user-select: none;

    z-index: 9999;
`;

export const ProfileName = styled.div`
    position: absolute;
    top: 35px;
    left: 10px;
    transform: translateY(-50%);
    color: #010606;
    font-weight: bold;
    font-size: 20px;

    z-index: 9999;
`;

export const ProfileEmail = styled.div`
    position: absolute;
    top: 85px;
    left: 10px;
    transform: translateY(-50%);
    color: #010606;
    font-weight: bold;
    font-size: 17px;

    z-index: 9999;
`;

export const Separator = styled.div`
    position: relative;
    border-top: 2px solid #ccc;
    width: 100%;
    margin: auto 20px;
    bottom: -20px;
`;

export const Button = styled.div`
    border-radius: 50px;
    background: #00ADB5;
    white-space: nowrap;
    padding: 10px 22px;
    color: #010606;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`;

