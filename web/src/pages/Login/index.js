import React, { useState } from 'react';
import * as Comp from './LoginElements';
// import Axios from "axios";
const cookies = require('../../utils/getCookie.js');

const Login = () => {

    const [signIn, setSignIn] = React.useState(true);

    const [usernameSignUp, setUsernameSignUp] = useState('');
    const [emailSignUp, setEmailSignUp] = useState('');
    const [passwordSignUp, setPasswordSignUp] = useState('');
    const [passwordConfirmSignUp, setPasswordConfirmSignUp] = useState('');

    const [usernameSignIn, setUsernameSignIn] = useState('');
    const [passwordSignIn, setPasswordSignIn] = useState('');

    const handleSubmitSignUp = async (event) => {
        event.preventDefault();
        try {
            await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usernameSignUp, emailSignUp, passwordSignUp, passwordConfirmSignUp }),
            }).then((response) => {
                if (response.ok) {
                    alert('User created successfully!');
                    setSignIn(true);
                    return response.json();
                }
                console.error('error on submit ' + response.statusText + '  code: ' + response);
                throw new Error('Something went wrong' + response.statusText);
            }).catch((error) => {
                console.error(error);
                return;
            });
        } catch (error) {
            alert("Couldn't create user. Please try again. " + error);
        }
    };

    async function loadLoggedServices(jsonAccessTokens) {
        sessionStorage.setItem("connectTogithub", false);
        sessionStorage.setItem("connectTodiscord", false);
        sessionStorage.setItem("connectTospotify", false);
        sessionStorage.setItem("connectToyoutube", false);
        sessionStorage.setItem("connectTotwitch", false);
        for (var i = 0; i < jsonAccessTokens.length; i = i + 1) {
            if (jsonAccessTokens[i].service === 'github') {
                sessionStorage.setItem("connectTogithub", true);
            }
            if (jsonAccessTokens[i].service === 'discord') {
                sessionStorage.setItem("connectTodiscord", true);
            }
            if (jsonAccessTokens[i].service === 'spotify') {
                sessionStorage.setItem("connectTospotify", true);
            }
            if (jsonAccessTokens[i].service === 'youtube') {
                sessionStorage.setItem("connectToyoutube", true);
            }
            if (jsonAccessTokens[i].service === 'twitch') {
                sessionStorage.setItem("connectTotwitch", true);
            }
        }
    }

    const handleSubmitSignIn = async (event) => {
        event.preventDefault();
        try {
            await fetch('http://localhost:8080/api/auth/signin', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usernameSignIn, passwordSignIn }),
            }).then((response) => response.json())
                .then((user) => {
                    if (user) {
                        sessionStorage.setItem("username", user.username)
                        sessionStorage.setItem("email", user.email)
                        sessionStorage.setItem("initials", user.username.charAt(0).toUpperCase() + user.username.charAt(1).toUpperCase())
                        document.cookie = "jwtToken=" + user.jwtToken;
                        fetch('http://localhost:8080/dashboard', {
                            method: 'GET',
                            headers: {
                                'x-access-token': cookies.getCookie('jwtToken')
                            }
                        }).then(function (responseGet) {
                            if (responseGet.status === 200) {
                                window.location.href = 'http://localhost:8081/dashboard';
                            } else {
                            }
                        }).catch(e => {
                            console.error(e);
                            return;
                        });
                        loadLoggedServices(user.userAccessTokens);
                    } else {
                        console.error('error on submit ');
                        throw new Error('Something went wrong');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    return;
                })
        } catch (error) {
            alert("Couldn't log in. Please try again. " + error);
        }
    };

    return (
        <Comp.LoginContainer>

            <Comp.SignUpContainer signIn={signIn}>
                <Comp.Form>
                    <Comp.Title>Create Account</Comp.Title>

                    <Comp.Input
                        type='text'
                        placeholder='Username'
                        value={usernameSignUp}
                        onChange={(e) => setUsernameSignUp(e.target.value)}
                    />
                    <Comp.Input
                        type='email'
                        placeholder='Email'
                        value={emailSignUp}
                        onChange={(e) => setEmailSignUp(e.target.value)}
                    />
                    <Comp.Input
                        type='password'
                        placeholder='Password'
                        value={passwordSignUp}
                        onChange={(e) => setPasswordSignUp(e.target.value)}
                    />
                    <Comp.Input
                        type='password'
                        placeholder='Confirm Password'
                        value={passwordConfirmSignUp}
                        onChange={(e) => setPasswordConfirmSignUp(e.target.value)}
                    />
                    <Comp.Button onClick={handleSubmitSignUp}> Sign Up </Comp.Button>
                </Comp.Form>
            </Comp.SignUpContainer>

            <Comp.SignInContainer signIn={signIn}>
                <Comp.Form>
                    <Comp.Title>Sign In</Comp.Title>
                    <Comp.Input
                        type='text' // AJOUTER SIGNIN ICI PEUTETRE
                        placeholder='Username'
                        value={usernameSignIn}
                        onChange={(e) => setUsernameSignIn(e.target.value)}
                    />
                    <Comp.Input
                        type='password'
                        placeholder='Password'
                        value={passwordSignIn}
                        onChange={(e) => setPasswordSignIn(e.target.value)}
                    />
                    <Comp.Anchor href='#'>Forgot your password?</Comp.Anchor>
                    <Comp.Button onClick={handleSubmitSignIn}> Sign In </Comp.Button>
                </Comp.Form>
            </Comp.SignInContainer>

            <Comp.OverlayContainer signinIn={signIn}>
                <Comp.Overlay signinIn={signIn}>

                    <Comp.LeftOverlayPanel signinIn={signIn}>
                        <Comp.Title>Welcome Back!</Comp.Title>
                        <Comp.Paragraph> To keep connected with us please login</Comp.Paragraph>
                        <Comp.GhostButton onClick={() => setSignIn(true)}>Sign In</Comp.GhostButton>
                    </Comp.LeftOverlayPanel>

                    <Comp.RightOverlayPanel signinIn={signIn}>
                        <Comp.Title>Hello !</Comp.Title>
                        <Comp.Paragraph>Enter Your personal details and start the Scandelaventure</Comp.Paragraph>
                        <Comp.GhostButton onClick={() => setSignIn(false)}>Sigin Up</Comp.GhostButton>
                    </Comp.RightOverlayPanel>

                </Comp.Overlay>
            </Comp.OverlayContainer>


        </Comp.LoginContainer>
    )
}

export default Login