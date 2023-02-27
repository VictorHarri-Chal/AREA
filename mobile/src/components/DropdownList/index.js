import React, { Component } from 'react';
import { View, Text, StyleSheet, PanResponder } from "react-native";

export default class DropdownList extends Component {
    state = {
        text: this.props.text,
        isOpen: false
    };

    panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
            return true;
        },
        onPanResponderGrant: (evt, gestureState) => {
            if (this.state.isOpen) {
                this.setState({ isOpen: false });
            } else if (!this.state.isOpen) {
                this.setState({ isOpen: true });
            }
        },
        onPanResponderMove: (evt, gestureState) => {

        },
        onPanResponderRelease: (evt, gestureState) => {

        },
        onPanResponderTerminate: (evt, gestureState) => {

        },
    });

    render() {
        return (
            <View {...this.panResponder.panHandlers} style={[styles.rectangle, { height: this.state.isOpen ? 90 : 45 }]}>
                <Text style={[styles.rectangleText]}>{this.state.text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rectangle: {
        width: 180,
        height: 45,
        left: 100,
        top: 12,
        borderRadius: 5,
        backgroundColor: 'grey',
        position: 'absolute',
    },
    rectangleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        padding: 8,
    }
});