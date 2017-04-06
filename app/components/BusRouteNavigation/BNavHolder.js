
import React, { Component } from 'react';
import { Navigator, StyleSheet,TouchableHighlight,Text,View } from 'react-native';


import ShuttleBusTabBar from './ShuttleBusTabBar';

export default class BNavHolder extends Component {
    render() {
        return(
            <View style={styles.container}>
            <TouchableHighlight onPress={()=>this.onPressButton()}>
                <Text style={{color: 'white'}}>Back</Text>
            </TouchableHighlight>
            
            <ShuttleBusTabBar />
            </View>
        )
    }

    onPressButton() {
        this.props.navigator.pop();
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b510d3'
  },
});
