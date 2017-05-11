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


import AMRouteNav from './AMRouteNav';
import PMRouteNav from './PMRouteNav';
import LunchRouteNav from './LunchRouteNav';


class AMTab extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'AM'
    }
  render() {
    return <AMRouteNav/>
  }
}

class PMTab extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'PM'
    }
  render() {
    return <PMRouteNav/>
  }
}

class LunchTab extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'LUNCH'
    }
    render(){
        return <LunchRouteNav/>
    }
}

const RouteTab = TabNavigator({
  AMRoute: { screen: AMTab },
  PMRoute: { screen: PMTab },
  LunchRoute: { screen: LunchTab}
},
    
    {
        mode: 'modal', // this is needed to make sure header is hidden on ios
        tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: 'lightgray',

          style: {
          backgroundColor: '#b510d3',
        },
      } 
    } 

);

const RouteStack = StackNavigator({
    Home: {screen: RouteTab}
})

RouteTab.navigationOptions = ({navigation})=> ({
  header: null,
 
});


export default RouteStack;