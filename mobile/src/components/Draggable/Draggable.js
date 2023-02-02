import React, { Component } from 'react';
import { View, PanResponder, StyleSheet } from 'react-native';

class Rectangle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            initialX: 0,
            initialY: 0
        };

        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return true;
            },
            onPanResponderMove: (evt, gestureState) => {
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
            <View
                {...this.panResponder.panHandlers}
                style={[styles.rectangle, { left: this.state.x, top: this.state.y }]}
            />
        );
    }
}

const styles = StyleSheet.create({
    rectangle: {
        width: 100,
        height: 50,
        backgroundColor: 'red',
        position: 'absolute'
    }
});

export default Rectangle;



class MyCollision extends React.Component {
    render() {
        return (
            <Collision shape="rect" coords={this.props.coords}>
                <View
                    style={[
                        styles.rectangle,
                        {
                            left: this.props.coords.x,
                            top: this.props.coords.y
                        }
                    ]}
                />
            </Collision>
        );
    }
}