import React, { Component } from 'react';
import { View, Text, PanResponder, StyleSheet, Dimensions } from 'react-native';

class Rectangle extends Component {
    state = {
        x: 0,
        y: 0,
        initialX: 0,
        initialY: 0,
        color: this.props.color,
        title: this.props.title,
    };

    panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
            return true;
        },
        onPanResponderMove: (evt, gestureState) => {
            const windowWidth = Dimensions.get('window').width;
            const windowHeight = Dimensions.get('window').height;
            let isCollide = false;

            if (this.state.initialX + gestureState.dx < 0 || this.state.initialX + gestureState.dx + styles.rectangle.width > windowWidth ||
                this.state.initialY + gestureState.dy < 0 || this.state.initialY + gestureState.dy + styles.rectangle.height + 136 > windowHeight)
                return;
            this.props.listSlot.forEach(slot => {
                if (this.state.initialY + gestureState.dy <= slot.top + 8 && this.state.initialY + gestureState.dy + 70 >= slot.top) {
                    isCollide = true;
                    return;
                }
            });
            if (!isCollide) {
                this.setState({
                    x: this.state.initialX + gestureState.dx,
                    y: this.state.initialY + gestureState.dy
                });
            }
            this.props.box.x = this.state.initialX;
            this.props.box.y = this.state.initialY;
            this.props.setBoxes([...this.props.boxes]);
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
        },
    });


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
        width: 150,
        height: 70,
        borderRadius: 5,
        position: 'absolute',
        justifyContent: 'center'
    },
    rectangleText: {
        color: 'white',
        fontSize: 15,
        padding: 5,
        textAlign: 'center'
    }
});

export default Rectangle;
