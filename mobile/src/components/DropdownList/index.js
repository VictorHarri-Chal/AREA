import React, { Component } from 'react';
import { Dropdown } from 'react-native-material-dropdown';

class DropdownList extends Component {
    render() {
        let data = [{
            value: "Banana",
        }, {
            value: "Mango",
        }, {
            value: "Pear",
        }];

        return (
            <Dropdown
                label="Favorite Fruit"
                data={data}
            />
        );
    }
}

export default DropdownList;
