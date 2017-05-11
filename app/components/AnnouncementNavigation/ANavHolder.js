
import React, { Component } from 'react';
import { Navigator, StyleSheet,TouchableOpacity,Text,View, Platform , TouchableHighlight} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


import AnnounceTabBar from './AnnounceTabBar';
 
export default class ANavHolder extends Component {
   
    render() {
        return(
            <View style={styles.container}>
            <AnnounceTabBar />
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
