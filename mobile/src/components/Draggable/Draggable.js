import React, { Component } from 'react';
import { View, Text, PanResponder, StyleSheet, Dimensions } from 'react-native';

class Rectangle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            initialX: 0,
            initialY: 0,
            color: props.color,
            title: props.title
        };
        const windowWidth = Dimensions.get('window').width;
        const windowHeight = Dimensions.get('window').height;

        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return true;
            },
            onPanResponderMove: (evt, gestureState) => {
                if (this.state.initialX + gestureState.dx < 0 || this.state.initialX + gestureState.dx + styles.rectangle.width > windowWidth ||
                    this.state.initialY + gestureState.dy < 0 || this.state.initialY + gestureState.dy + styles.rectangle.height + 120 > windowHeight)
                    return;
                this.setState({
                    x: this.state.initialX + gestureState.dx,
                    y: this.state.initialY + gestureState.dy
                });
            },
            onPanResponderRelease: (evt, gestureState) => {
                this.setState({
                    initialX: this.state.x,
                    initialY: this.state.y
                });
            },
            onPanResponderTerminate: (evt, gestureState) => {
                this.setState({
                    initialX: this.state.x,
                    initialY: this.state.y
                });
            }
        });
    }

    render() {
        return (
            <>
                <View
                    {...this.panResponder.panHandlers}
                    style={[styles.rectangle, { left: this.state.x, top: this.state.y, backgroundColor: this.state.color}]}
                >
                    <Text style={styles.rectangleText}>{this.state.title}</Text>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    rectangle: {
        width: 100,
        height: 50,
        borderRadius: 5,
        position: 'absolute',
        justifyContent: 'center'
    },
    rectangleText: {
        color: 'black',
        fontSize: 15,
        padding: 5,
        textAlign: 'center'
    }
});

export default Rectangle;



// class MyCollision extends React.Component {
//     render() {
//         return (
//             <Collision shape="rect" coords={this.props.coords}>
//                 <View
//                     style={[
//                         styles.rectangle,
//                         {
//                             left: this.props.coords.x,
//                             top: this.props.coords.y
//                         }
//                     ]}
//                 />
//             </Collision>
//         );
//     }
// }