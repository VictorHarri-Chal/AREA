import React, { Component } from 'react';
import { View, Text } from "react-native";

export default class DropdownList extends Component {
    constructor(props) {
    super(props);
    this.state = {
        text: ''
        };
    }

    render() {
        return (
            <View style={{flex: 1}}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    rectangle: {
        width: 290,
        height: 70,
        borderRadius: 5,
        backgroundColor: 'white',
        position: 'absolute',
        justifyContent: 'center'
    },
    rectangleText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 14,
        padding: 8,
    }
});