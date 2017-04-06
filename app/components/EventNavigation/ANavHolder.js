
import React, { Component } from 'react';
import { Navigator, StyleSheet,TouchableOpacity,Text,View, Platform , TouchableHighlight} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


import AnnouncementTabBar from './AnnouncementTabBar';
 
export default class ANavHolder extends Component {
   
    render() {
        return(
            <View style={styles.container}>
            {/*<TouchableOpacity style={styles.button} onPress={this.onPressButton()}>
              <Ionicons
                name={Platform.OS === 'android' ? 'md-arrow-back' : 'ios-arrow-back'}
                size={24}
                color={tintColor}
              />
            </TouchableOpacity>*/}
            <TouchableHighlight onPress={()=>this.onPressButton()}>
                
                <Text style={{color: 'white'}}>Back</Text>
            </TouchableHighlight>
            
            <AnnouncementTabBar />
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
