/**
 * https://github.com/react-native-community/react-native-side-menu/blob/master/examples/Basic/Basic.js#L107
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View,  Image, Alert, TouchableOpacity,Linking,ScrollView} from 'react-native';
import { Tile, Icon ,SideMenu, SocialIcon} from 'react-native-elements';


//import Icon from 'react-native-vector-icons/MaterialIcons';

import img from '../../../img/oval.jpg';

export default class AboutOval extends Component {
  render() {
    return (
        <View style={styles.container}>
          <ScrollView>
            <Tile
                imageSrc={img}
                title="Seletar Aerospace Park"
                featured
                contentContainerStyle={{height: 70}}
                //icon= {{ name:'ios-american-football', type:'ionicon',color:'#517fa4'}}
            
            />

            <View style={styles.ovalDescription}>
              <Text style={styles.descriptionHeading}>ABOUT THE OVAL</Text>
              <Text>General description here..</Text>
              <Text> THE OVAL </Text>
              <Text> THE OVAL </Text>
              <Text> THE OVAL </Text>
              <Text> THE OVAL </Text>
              <Text> THE OVAL </Text>
              <Text> THE OVAL </Text>
              <Text> THE OVAL </Text>

              <Text> THE OVAL </Text>
              <Text> THE OVAL </Text>


              <View style={styles.followUs}>
                <Text>Follow us on Facebook!</Text>
      
                <TouchableOpacity onPress={()=> this.handleClick('https://www.facebook.com/ovalsap/')} >
                  <SocialIcon
                    type='facebook'
                  />
                  <Text> THE OVAL </Text>
                </TouchableOpacity>
              </View>
            </View>
          

            </ScrollView>
       </View>
 
   );
  }  

  handleClick(url) {
     Linking.openURL(url);
  }
        
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  ovalDescription: {
    padding: 20,
  },

  descriptionHeading: {
    fontSize: 24,
    color: '#b510d3'
  },
  followUs: {
    paddingTop: 100
  }

 
});
