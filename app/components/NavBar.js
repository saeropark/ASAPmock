import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Drawer from 'react-native-drawer';
import ShuttleBusInfo from '../js/ShuttleBusInfo';
import ShuttleBusList from '../js/ShuttleBusList';

import AMRoute from '../js/BusRoute/AMRoute';


const drawerStyles = {
drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
main: {paddingLeft: 3},
}
const tintColor = 'white';

const LIST_COMPONENTS = [
  ShuttleBusList,
  ShuttleBusInfo,
  AMRoute
];

export default class NavBar extends Component {

  state = {
    title: 'Seletar Aerospace',
    index: 1,
    restoring: false,
  };

  // closeControlPanel = () => {
  //   this._drawer.close()
  // };
  // openControlPanel = () => {
  //   this._drawer.open()
  // };

  _handleNavigate = index => {
    this.setState({
      index,
    });
    //this._persistNavigationState(index);
  };

  _handleNavigateBack = () => {
    this._handleNavigate(-1);
  };

  

  render() {
    if (this.state.restoring) {
      return null;
    }

    const { index } = this.state;
     const ExampleComponent = LIST_COMPONENTS[index] || null;

    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
           {index === 2 ?
            <TouchableOpacity style={styles.button} onPress={this._handleNavigateBack}>
              <Ionicons
                name={Platform.OS === 'android' ? 'md-arrow-back' : 'ios-arrow-back'}
                size={24}
                color={tintColor}
              />
            </TouchableOpacity> : 
            <TouchableOpacity style={styles.button} onPress={this._onPressButton}>
            <Ionicons
                name= {Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                size={24}
                color={tintColor}
              />
          </TouchableOpacity>
          }
        
        <Text style={styles.title}>
            {index === 2 ? LIST_COMPONENTS[index].title : this.state.title}
          </Text>
        
        </View>
        {index !== 1 ? (
          ExampleComponent ? <ExampleComponent /> : null): null}
      </View>
    );
  }

  _onPressButton() {
      <Drawer
        type="overlay"
        content={<SamplePage />}
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
            main: { opacity:(2-ratio)/2 }
        })}/>
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? 44 : 56,
    backgroundColor: '#222',
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
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
title: {
    flex: 1,
    margin: 16,
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
    fontSize: Platform.OS === 'ios' ? 20 : 18,
    color: '#fff',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 56,
    padding: Platform.OS === 'ios' ? 12 : 16,
  },
});