import React from 'react'
import * as Comp from './LoginElements'

const Login = () => {

    const [signIn, setSignIn] = React.useState(true);

    return (
        <Comp.LoginContainer>

            <Comp.SignUpContainer signIn={signIn}>
                <Comp.Form>
                    <Comp.Title>Create Account</Comp.Title>
                    <Comp.Input type='text' placeholder='Username' />
                    <Comp.Input type='email' placeholder='Email' />
                    <Comp.Input type='password' placeholder='Password' />
                    <Comp.Input type='password' placeholder='Confirm Password' />
                    <Comp.Button> Sign Up </Comp.Button>
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