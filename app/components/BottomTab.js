/**
 * Code example from https://github.com/react-native-community/react-native-tab-view 
 * Vector icons https://github.com/oblador/react-native-vector-icons
 */

import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet, Navigator} from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavBar from './NavBar';
import AnnTopTab from './AnnTopTab';
import BusTopTab from './BusTopTab';
import Home from '../js/Home';
import ShuttleBusTabBar from './BusRouteNavigation/ShuttleBusTabBar';
import Navigation from './Navigation';
import ShuttleBusList from '../js/ShuttleBusList';
import ShuttleBusInfo from '../js/ShuttleBusInfo';
import AnnouncementList from '../js/AnnouncementList';
import AnnouncementInfo from '../js/AnnouncementInfo';
import AMRoute from '../js/BusRoute/AMRoute';
import TestNav from '../js/TestNav';
import TestRoute from '../js/TestRoute';

export default class BottomTab extends Component {

  static title = 'Bottom bar with indicator';
  static appbarElevation = 4;

  static propTypes = {
    style: View.propTypes.style,
  };

  state = {
    index: 1,
    routes: [
      { key: '1', title: 'Home', icon: 'home' },
      { key: '2', title: 'Bus', icon: 'directions-bus' },
      //{ key: '3', title: 'Third', icon: 'delete' },
    ],
  };

  _handleChangeTab = (index) => {
    this.setState({
      index,
    });
  };

  _renderIndicator = (props) => {
    const { width, position } = props;

    const translateX = Animated.multiply(position, width);

    return (
      <Animated.View
        style={[ styles.container, { width, transform: [ { translateX } ] } ]}
      >
        <View style={styles.indicator} />
      </Animated.View>
    );
  };

  _renderIcon = ({ route }) => {
    return (
      <Icon
        name={route.icon}
        size={30}
        style={styles.icon}
      />
    );
  };

  /*_renderBadge = ({ route }) => {
    if (route.key === '2') {
      return (
        <View style={styles.badge}>
          <Text style={styles.count}>42</Text>
        </View>
      );
    }
    return null;
  };*/

  _renderFooter = (props) => {
    return (
      <TabBar
        {...props}
        renderIcon={this._renderIcon}
        //renderBadge={this._renderBadge}
        renderIndicator={this._renderIndicator}
        style={styles.tabbar}
        tabStyle={styles.tab}
      />
    );
  };

 

  _renderTabScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return <Home /> ; //<View style={[ styles.page, { backgroundColor: '#ff4081' } ]} />
    case '2':
      return <ShuttleBusTabBar /> ; //<View style={[ styles.page, { backgroundColor: '#673ab7' } ]} /> changeTab={this._handleChangeTab}
    // case '3':
    //   return <View style={[ styles.page, { backgroundColor: '#4caf50' } ]} />;
    default:
      return null;
    }
  };

  render() {
    return (
      <View style={styles.container}>
      <NavBar />
      <TabViewAnimated
        style={[ styles.container, this.props.style ]}
        navigationState={this.state}
        renderScene={this._renderTabScene}
        renderFooter={this._renderFooter}
        onRequestChangeTab={this._handleChangeTab}
      />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: '#222',
  },
  tab: {
    padding: 0,
  },
  icon: {
    backgroundColor: 'transparent',
    color: 'white',
  },
  indicator: {
    flex: 1,
    backgroundColor: '#0084ff',
    margin: 4,
    borderRadius: 2,
  },
  badge: {
    marginTop: 4,
    marginRight: 32,
    backgroundColor: '#f44336',
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  count: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: -2,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
