import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  PropTypes,
  Image,
  StyleSheet, 
  Platform,
  ScrollView
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { TabNavigator } from "react-navigation";


import AboutOval from '../../js/AnnouncementLists/AboutOval';
import PromotionNav from './PromotionNav';

class OvalTab extends React.Component {
  static navigationOptions = {
        tabBarLabel: 'OVAL'
    }
  render() {
    return <AboutOval />
  }
}

class DirectoryTab extends React.Component {
  static navigationOptions = {
        tabBarLabel: 'Directory'
    }
  render() {
    return <Text>List of all contacts</Text>
  }
}

class PromoTab extends React.Component {
  static navigationOptions = {
        tabBarLabel: 'Promotion'
    }
    render(){
        return <PromotionNav/>
    }
}


class PromoDetail extends React.Component {
    render() {
        return <AnnouncementInfo/>
    }
}

const FoodTab = TabNavigator({
  Oval: { screen: OvalTab },
  Directory: { screen: DirectoryTab },
  Promotion: { screen: PromoTab}
},
    { mode: 'modal' } // this is needed to make sure header is hidden on ios

);

const FoodStack = StackNavigator({
    Home: {screen: FoodTab},
    Info: {screen: PromoDetail}
})

FoodTab.navigationOptions = ({navigation})=> ({
  header: null,
  style: {
    backgroundColor: '#b510d3',
  }, 
});

export default FoodStack;