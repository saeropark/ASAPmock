import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity,Text } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

import EventNav from './EventNav';
import PromotionNav from './PromotionNav';
import AboutOval from '../../js/AnnouncementLists/AboutOval';



export default class EventTabBar extends Component {

  static title = 'Event top bar';
  static appbarElevation = 0;

  static propTypes = {
    style: View.propTypes.style,
  };

  state = {
    index: 0,
    routes: [
      { key: '1', title: 'About OVAL' },
      { key: '2', title: 'Events' },
      { key: '3', title: 'Promotions' },
    ],
  };

  _handleChangeTab = (index) => {
    this.setState({
      index,
    });
  };

  _renderHeader = (props) => {
    var bColor = '#b510d3';
    return (
      <TabBar
        {...props}
        scrollEnabled
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        labelStyle={styles.label}
      />
    );
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return <AboutOval />; //<View style={[ styles.page, { backgroundColor: '#ff4081' } ]} />
    case '2':
      return <EventNav />;
    case '3':
      return <PromotionNav />;
    default:
      return null;
    }
  };

  render() {
    return (
      
      <TabViewAnimated
        style={[ styles.container, this.props.style ]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    
    );
  }

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: '#b510d3',
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    backgroundColor: '#ffeb3b',
  },
  label: {
    color: '#fff',
    fontWeight: '400',
  },
});