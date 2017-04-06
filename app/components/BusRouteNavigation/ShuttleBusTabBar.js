import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  ActivityIndicator, Platform
} from 'react-native';

import { TabViewAnimated, TabBar } from 'react-native-tab-view';


//import ShuttleBusInfo from './ShuttleBusInfo';
import AMRouteNav from './AMRouteNav';
import PMRouteNav from './PMRouteNav';
import LunchRouteNav from './LunchRouteNav';

//pull beeline api
var REQUEST_URL = 'https://api.beeline.sg/routes/search_by_region?regionId=24&areaName=North-east%20Region';



export default class ShuttleBusTabBar extends Component {
    //  constructor(props){
    //     super(props);
    //     //bus = this.props.bus;
    // }
        
 state = {
    title: 'Seletar Aerospace',
    index: -1,
    restoring: false,
  };

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
      return <AMRouteNav />; //<View style={[ styles.page, { backgroundColor: '#ff4081' } ]} />
    case '2':
      return <PMRouteNav />;
    case '3':
      return <LunchRouteNav />;
    default:
      return null;
    }
  };
    
    //render top tab bar
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

var styles = StyleSheet.create ({
    container: {
        flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#Ffcc00',
        // padding: 10
    },
    thumbnail: {
        width: 53,
        height: 81,
        marginRight: 10
    },
    rightContainer: {
        flex: 1
    },
    title: {
        fontSize: 20,
        marginBottom: 8
    },
    author: {
        color: '#656565'
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    listView: {
        backgroundColor: '#f5fcff' 
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#ffcc00',
        height: Platform.OS === 'ios' ? 44 : 56,
        
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
  }
});