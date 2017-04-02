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
import AMRouteNav from '../components/Navigation/AMRouteNav';
import PMRouteNav from '../components/Navigation/PMRouteNav';
import LunchRouteNav from '../components/Navigation/LunchRouteNav';

// import AMRoute from './BusRoute/AMRoute';
// import PMRoute from './BusRoute/PMRoute';
// import LunchRoute from './BusRoute/LunchRoute';
// var FAKE_BOOK_DATA = [
//     {
//         volumeInfo: {
//             title: 'The Catcher in the Rye', 
//             authors: "J. D. Salinger", 
//             imageLinks: {
//                 thumbnail: 'http://books.google.com/books/content?id=PCDengEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'}}}
//];

//var REQUEST_URL = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction';
//var REQUEST_URL = 'https://asap-c4472.firebaseio.com/.json';
var REQUEST_URL = 'https://api.beeline.sg/routes/search_by_region?regionId=24&areaName=North-east%20Region';

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
  }
});

//var bus;
export default class TestRoute extends Component {
     constructor(props){
        super(props);
        //bus = this.props.bus;
    }
        
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
    //case "ShuttleBusInfo":
      //  return <ShuttleBusInfo listNameFromParent={bus} />
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

