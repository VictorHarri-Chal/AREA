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
        </Comp.LoginContainer>
    )
}

export default Login