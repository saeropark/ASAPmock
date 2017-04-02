import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

import AMRoute from '../js/BusRoute/AMRoute';
import PMRoute from '../js/BusRoute/PMRoute';
import LunchRoute from '../js/BusRoute/LunchRoute';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: '#222',
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

export default class TopTab extends Component {

  static title = 'List of Bus';
  static appbarElevation = 0;

  static propTypes = {
    style: View.propTypes.style,
  };

  state = {
    index: 1,
    routes: [
      { key: '1', title: 'AM' },
      { key: '2', title: 'PM' },
      { key: '3', title: 'Lunch' },
    ],
  };

  _handleChangeTab = (index) => {
    this.setState({
      index,
    });
  };

  _renderHeader = (props) => {
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
      return <AMRoute />; //<View style={[ styles.page, { backgroundColor: '#ff4081' } ]} />
    case '2':
      return <PMRoute />;
    case '3':
      return <LunchRoute />;
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