import React, {useRef} from 'react';
import { Animated, View, Text, Button, StyleSheet, PanResponder} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Rectangle from './src/components/Draggable/Draggable';

function Home({ navigation }) {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder =
      useRef(PanResponder.create({onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
        onPanResponderRelease: () => {
        pan.extractOffset();
      },
    }),
  ).current;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome Home</Text>
      <Button
        title="Sign in"
        onPress={() =>  navigation.navigate('Login')}
      />
      <Animated.View style={{transform: [{translateX: pan.x}, {translateY: pan.y}]}}
        {...panResponder.panHandlers}>
        <View styles={styles.box} />
      </Animated.View>
    </View>
  );
}
function Dashboard() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tu es dans le dashboard</Text>
    </View>
  );
}

class Login extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          rectangles: []
      };
  }

  createRectangle() {
      let rectangles = this.state.rectangles;
      rectangles.push(<Rectangle key={rectangles.length} />);
      this.setState({ rectangles });
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Sign in please</Text>
        <Button title="Create Rectangle" onPress={() => this.createRectangle()}/>
        {this.state.rectangles.map((rectangle) => rectangle)}
      </View>
    );
  }
}


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title:'AREAction',
            headerStyle: { backgroundColor: '#222831' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default App;