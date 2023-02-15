import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import Home from './src/pages/Home';
import Dashboard from './src/pages/Dashboard';

const Stack = createStackNavigator();

const MyHeaderOption = {
    title: 'AREAction',
    headerStyle:{backgroundColor: '#222831'},
    headerTintColor: '#fff',
}
function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} options={MyHeaderOption}/>
                <Stack.Screen name="Dashboard" component={Dashboard} options={MyHeaderOption}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
  }

export default App;
