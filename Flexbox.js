import React, { Component } from "react";
import { View, Text } from "react-native";

class materiFlexbox extends Component {
    render() {
        return (
                <View style={{ flexDirection: 'row', backgroundColor: 'black', alignItems: 'center'}}>
                    <View style={{ backgroundColor: 'red', flex: 3, height: 50 }} />
                    <View style={{ backgroundColor: 'yellow', flex: 2, height: 100 }} />
                    <View style={{ backgroundColor: 'green', flex:  3, height: 200}} />
                    <View style={{ backgroundColor: 'blue', flex: 1, height: 100 }} />
                </View>
        )
    }
}

export default materiFlexbox;