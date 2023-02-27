import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from "react-native";

export default class FreeTextInput extends Component {
    state = {
        title: this.props.title,
        textInput: this.props.textInput,
    };

    handleTextChange = (newText) => {
        this.setState({ textInput: newText });
    };

    render() {
        return (
            <View style={[styles.container]}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={this.handleTextChange}
                    value={this.state.textInput}
                    placeholder={this.state.title}
                    placeholderTextColor="white"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        top: 16,
        alignItems: 'center',
        justifyContent: 'center',
      },
      textInput: {
        borderWidth: 2,
        borderColor: 'black',
        padding: 10,
        width: 240,
        height: 45,
      },
});