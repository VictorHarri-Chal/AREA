import React, { useState } from 'react';
import * as Comp from './LoginElements';

const Login = () => {

    const [signIn, setSignIn] = React.useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, passwordConfirm }),
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            alert('User created successfully!');
            setSignIn(true);
        } catch (error) {
            console.error(error);
            alert("Couldn't create user. Please try again.");
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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Comp.Input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Comp.Input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Comp.Input
                        type='password'
                        placeholder='Confirm Password'
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                    <Comp.Button onClick={handleSubmit}> Sign Up </Comp.Button>
                </Comp.Form>
            </Comp.SignUpContainer>

            <Comp.SignInContainer signIn={signIn}>
                <Comp.Form>
                    <Comp.Title>Sign In</Comp.Title>
                    <Comp.Input type='email' placeholder='Email' />
                    <Comp.Input type='password' placeholder='Password' />
                    <Comp.Anchor href='#'>Forgot your password?</Comp.Anchor>
                    <Comp.Button> Sign In </Comp.Button>
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