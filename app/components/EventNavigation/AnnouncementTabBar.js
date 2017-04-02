import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

import AnnouncementNav from './AnnouncementNav';
import EventNav from './EventNav';
import PromotionNav from './PromotionNav';



export default class AnnouncementTabBar extends Component {

  static title = 'Announcement top bar';
  static appbarElevation = 0;

  static propTypes = {
    style: View.propTypes.style,
  };

  state = {
    index: 1,
    routes: [
      { key: '1', title: 'Announcements' },
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
      return <AnnouncementNav />; //<View style={[ styles.page, { backgroundColor: '#ff4081' } ]} />
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