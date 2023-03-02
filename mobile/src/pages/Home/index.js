import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    sessionStorage.setItem("connectTodiscord", false);
    sessionStorage.setItem("connectTospotify", false);
    sessionStorage.setItem("connectTogithub", false);
    sessionStorage.setItem("connectToyoutube", false);
    sessionStorage.setItem("connectTotwitch", false);
      for (var i = 0; i < jsonAccessTokens.length; i = i + 1) {
          console.log('b - service: ' + JSON.stringify(jsonAccessTokens[i].service));
            if (jsonAccessTokens[i].service === 'discord') {
              sessionStorage.setItem("connectTodiscord", true);
            if (jsonAccessTokens[i].service === 'spotify') {
              sessionStorage.setItem("connectTospotify", true);
            if (jsonAccessTokens[i].service === 'youtube') {
              sessionStorage.setItem("connectToyoutube", true);
            if (jsonAccessTokens[i].service === 'twitch') {
              sessionStorage.setItem("connectTotwitch", true);
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
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={email}
        onChangeText={(e) => setUsernameSignIn(e.target.value)}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(e) => setPasswordSignIn(e.target.value)}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleSubmitSignIn}>
        <Text style={styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
  },
  forgotPassword: {
    marginTop: 20,
    color: 'blue',
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default LoginScreen;