import styled from 'styled-components';

export const LoginContainer = styled.div`
    background-color: #393E46;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden;
    width: 678%;
    max-width: 50%;
    min-height: 400px;
    top : 50%;
    left : 50%;
    transform: translate(-50%, 50%);
`;

export const SignUpContainer = styled.div`
    background-color: #fff;
    position: absolute;
    top: 0;
    height: 100%;
    width: 50%;
    left: 0;
    transition : all 0.5s ease-in-out;
    opacity: 0;
    z-index:1;
    ${props => props.signinIn !== true ? ` transform: translateX(100%); opacity: 1; z-index: 5;` : null}
`;

export const SignInContainer = styled.div`
    background-color: #fff;
    position: absolute;
    top: 0;
    height: 100%;
    width: 50%;
    left: -50%;
    transition : all 0.5s ease-in-out;
    opacity: 0;
    z-index:1;
    ${props => props.signinIn !== true ? ` transform: translateX(100%); opacity: 1; z-index: 5;` : null}
`;

export const Form = styled.form`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 50px;
    text-align: center;
`;

export const Title = styled.h1`
    font-weight : bold;
    margin : 0;
`;

export const Input = styled.input`
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
`;

export const Button = styled.button`
    border-radius: 20px;
    border: 1px solid #00ADB5;
    background-color: #00ADB5;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    margin-top: 20px;

    &:hover {
        cursor: pointer;
        transform: scale(1.05);
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    }

    &:active{
        transform: scale(0.95);
    }

    &:focus {
        outline: none;
    }
`;

export const Anchor = styled.a`
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
`;