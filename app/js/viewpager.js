import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView, Dimensions, Image} from 'react-native';


import Icon from 'react-native-vector-icons/MaterialIcons';
import NavBar from '../components/NavBar';

import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator, ViewPager} from 'rn-viewpager';
var IMGS = [
  'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
  'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
  'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
  'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
];
export default class Home extends Component {
 
  
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.eventContainer}>
          <Text style={styles.welcome}> Events</Text>
        </View>

        <View style={styles.promotionContainer}>
          <Text style={styles.welcome}> Promotion </Text>
        </View>

        <View style={styles.announcementContainer}>
          <Text style={styles.welcome}> Announcement </Text>
        </View>
      </ScrollView>
      </View>
    );
  }     

   
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    
    
  },
  instructions: {
    
    color: '#333333',
    marginBottom: 5,
  },
  navBar: {
    flex: 0.08,
    backgroundColor: '#942b3c'
  },
  contentContainer: {
    flex:0.8,
  },
  iconStyle: {
    textAlign: 'center',
    padding: 14,
    width: 50,
    color: 'white'
  },
  navText: {
    marginTop: -40,
    paddingLeft: 50,
    fontSize: 20,
    color: 'white'
  },

  eventContainer: {
    
    padding: 10,
    flex: 0.5,
    backgroundColor: 'pink'
  },

  announcementContainer: {

    padding: 10,
    flex:0.5,
    backgroundColor: 'yellow'
  },
  promotionContainer: {
 
    padding: 10,
    flex: 0.5,
    backgroundColor: 'green'
  }
});
