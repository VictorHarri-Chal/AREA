import React, {useRef} from 'react';
import { Animated, View, Text, Button, PanResponder, StyleSheet} from 'react-native';

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

const styles = StyleSheet.create({
   box: {
      height: 150,
      width: 150,
      backgroundColor: 'blue',
      borderRadius: 5,
   },
});

export default Home;