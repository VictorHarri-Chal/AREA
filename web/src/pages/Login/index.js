import React, { useState } from 'react';
import * as Comp from './LoginElements';
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
                console.log('error on submit ' + response.statusText + '  code: ' + response);
                throw new Error('Something went wrong' + response.statusText);
            }).catch((error) => {
                console.log(error);
                return;
            });
        } catch (error) {
            alert("Couldn't create user. Please try again. " + error);
        }
    };

    async function loadLoggedServices(jsonAccessTokens) {
        for (var i = 0; i < jsonAccessTokens.length; i = i + 1) {
            console.log('b - service: ' + JSON.stringify(jsonAccessTokens[i].service));
            if (jsonAccessTokens[i].service === 'discord') {
                console.log('Discord');
                console.log('Refresh token in discord: ' + JSON.stringify(jsonAccessTokens[i].refresh))

                const params = new URLSearchParams();
                params.append('client_id', '1063054273946058833');
                params.append('client_secret', 'Ie8_A2L-lNSnKFvjiXXQFfwX9Wwb2w_-');
                params.append('grant_type', 'refresh_token');
                params.append('refresh_token', JSON.stringify(jsonAccessTokens[i].refresh));

                await fetch('https://discord.com/api/oauth2/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: params
                }).then((response) => response.json())
                .then((jsonResponse) => {
                    console.log('refresh json zzz: ' + JSON.stringify(jsonResponse))
                    sessionStorage.setItem("connectTodiscord", true);
                })
            } else {
                sessionStorage.setItem("connectTodiscord", false);
            }
        }
        sessionStorage.setItem("connectTogithub", false);
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
                                console.log('response: ' + responseGet)
                                console.log('Code: ' + responseGet.status);
                            }
                        }).catch(e => {
                            console.log(e);
                            return;
                        });
                        loadLoggedServices(user.userAccessTokens);
                        alert('Logged in successfully!');
                    } else {
                        console.log('error on submit ');
                        throw new Error('Something went wrong');
                    }
                })
                .catch((error) => {
                    console.log(error);
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