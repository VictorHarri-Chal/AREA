import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const cookies = require('../../utils/getCookie.js');

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

  const handleUsernameChange = (text) => {
    setUsernameSignIn(text);
  };
  const handlePwdChange = (text) => {
    setPasswordSignIn(text);
  };
     
  // const handleSubmitSignIn = async (event) => {
  //     try {
  //       await fetch('http://10.0.2.2:8080/api/auth/signin', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           usernameSignIn,
  //           passwordSignIn,
  //         }),
  //       })
  //         .then((response) => response.json())
  //         .then((data) => {
  //           Alert.alert('NOICE') 
  //         })
  //         .catch((error) => {
  //           Alert.alert('ERROR')
  //         })
  //     } catch (error) {
  //              Alert.alert("Couldn't log in. Please try again. " + error);
  //       }
  //   }
      
  // const handleSubmitSignIn = async (event) => {
  //   event.preventDefault();
  //   try {
  //       await fetch('http://10.0.2.2:8080/api/auth/signin', {
  //           method: 'POST',
  //           mode: 'cors',
  //           headers: {
  //               'Content-Type': 'application/json',               
  //           },
  //           body: JSON.stringify({ usernameSignIn, passwordSignIn }),
  //       }).then((response) => response.json())
  //           .then((user) => {
  //               if (user) {
  //                   document.cookie = "jwtToken=" + user.jwtToken;
  //                   fetch('http://10.0.2.2:8080/dashboard', {
  //                       method: 'GET',
  //                       headers: {
  //                            'x-access-token': cookies.getCookie('jwtToken')
  //                       }
  //                   }).then(function (responseGet) {
  //                       Alert.alert("reponse = " + responseGet.status)
  //                       if (responseGet.status === 200) {
  //                           navigation.navigate('Dashboard')
  //                       } else {
  //                           console.log('response: ' + responseGet)
  //                           console.log('Code: ' + responseGet.status);
  //                       }
  //                   }).catch(e => {
  //                       Alert.alert('Erreur 3')
  //                       console.log(e);
  //                       return;
  //                   });
  //                   // loadLoggedServices(user.userAccessTokens);
  //                   // sessionStorage.setItem("connectTodiscord", false);
  //                   // sessionStorage.setItem("connectTospotify", false);
  //                   // sessionStorage.setItem("connectTogithub", false);
  //                   // sessionStorage.setItem("connectToyoutube", false);
  //                   // sessionStorage.setItem("connectTotwitch", false);
  //               } else {
  //                   console.log('error on submit ');
  //                   throw new Error('Something went wrong');
  //               }
  //           })
  //           .catch((error) => {
  //               Alert.alert("Erreur 4 : " + error);
  //               console.log(error);
  //               return;
  //           })
  //   } catch (error) {
  //       Alerte.alert("Couldn't log in. Please try again. " + error);
  //   }
  // }
  const handleSubmitSignIn = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8080/api/auth/signin', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernameSignIn, passwordSignIn }),
      });
      const user = await response.json();
      if (user) {
        await AsyncStorage.setItem('jwtToken', user.jwtToken); // stockage du jeton JWT localement sur l'appareil
        const responseGet = await fetch('http://10.0.2.2:8080/dashboard', {
          method: 'GET',
          headers: {
            'x-access-token': await AsyncStorage.getItem('jwtToken'), // récupération du jeton JWT stocké localement sur l'appareil
          },
        });
        Alert.alert("reponse = " + responseGet.status)
        if (responseGet.status === 200) {
          navigation.navigate('Dashboard');
        } else {
          console.log('response: ' + responseGet)
          console.log('Code: ' + responseGet.status);
        }
      } else {
        console.log('error on submit ');
        throw new Error('Something went wrong');
      }
    } catch (error) {
      Alert.alert("Erreur 4 : " + error);
      console.log(error);
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="username"
        value={usernameSignIn}
        onChangeText={handleUsernameChange}  
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={passwordSignIn}
        onChangeText={handlePwdChange} 
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSubmitSignIn}>
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