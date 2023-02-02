import * as React from 'react';
import Rectangle from '../../components/Draggable/Draggable';
import { View, Text, Button } from 'react-native';

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

export default Login;