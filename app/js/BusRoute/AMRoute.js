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
import ShuttleBusInfo from '../ShuttleBusInfo';

var REQUEST_URL = 'https://api.beeline.sg/routes/search_by_region?regionId=24&areaName=North-east%20Region';

var styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#Ffcc00',
        padding: 10
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
        
    }
});

export default class AMroute extends Component {
    state = {
    title: 'AM Route',
    index: 1,
    restoring: false,
  };
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true, 
            //dataSource is the interface
            dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2)=> row1 !== row2
            })
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    // --- calls Google API ---
    fetchData() {
        fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
            responseData = this.removeDuplicates(responseData);
            responseData = this.displayAm(responseData);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData),
                //dataSource: this.state.dataSource.cloneWithRows(responseData["items"]),
                isLoading: false
            });
        })
        .done();
    }
    render() {
        if (this.state.isLoading) {
            this.renderLoadingView();   
        }
        return (
          <View style={styles.mainContainer}>
            {/*<NavBar />*/}
            <ListView
                dataSource = {this.state.dataSource}
                renderRow = {this.renderBook.bind(this)}
                style = {styles.listView}
            />
            </View>
            
        );
    }

    renderLoadingView() {
        return (
            <View style = {styles.loading}>
                <ActivityIndicator
                    size = 'large' />
                <Text> Loading bus... </Text>
            </View>
        );
    }

     

    renderBook(bus) {
        return (

            <TouchableHighlight 
                onPress={() => this.showShuttleBusInfo(bus)}  underlayColor='#dddddd'>
                <View>
                    <View style = {styles.container}>
                        <View style = {styles.rightContainer}>
                            <Text style = {styles.title}>{bus.name}</Text>
                            <Text style = {styles.detail}>{bus.label}</Text>
                            <Text style = {styles.detail}>{bus.schedule}</Text>
                        </View>
                    </View>
                    <View style = {styles.separator}/>
                </View>
            </TouchableHighlight>
            
        );
    }

    showShuttleBusInfo(bus) {
       this.props.navigator.push({
           //title: book.title,
           //component: ShuttleBusInfo,
           //passProps: {book}
           screen: 'ShuttleBusInfo',
           data: bus
       });
   }

    //back to home
    goHome() {
      console.log("go Home");
      this.props.navigator.pop({ screen: 'Home'});
    }

    /* to filter JSON data by making the name unique */
    removeDuplicates(obj){
        var array = obj;
        var seenObj = {};
        array = array.filter(function(currentObject) {
            if (currentObject.name in seenObj) {
                return false;
            } else {
                seenObj[currentObject.name] = true;
                return true;
            }
        });
        return array;
    }

    /* Filter to AM */
    displayAm(obj) {
        var array = obj;
        array = array.filter(function(currentObject) {
            if ((currentObject.label).includes("AM")){
                return true;
            } else {
                return false;
            }
        });
        return array; 
    }
}

