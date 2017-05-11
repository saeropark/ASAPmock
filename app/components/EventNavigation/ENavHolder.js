
import React, { Component } from 'react';
import { Navigator, StyleSheet,TouchableOpacity,Text,View, Platform , TouchableHighlight} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


import EventTabBar from './EventTabBar';
 
export default class ENavHolder extends Component {
   
    render() {
        return(
            <View style={styles.container}>
            <EventTabBar />
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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
   flex: 1,
    padding: Platform.OS === 'ios' ? 12 : 16,
  },
});
