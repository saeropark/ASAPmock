import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

import AnnouncementInfo from '../AnnouncementInfo.js';

var REQUEST_URL = 'https://asap-c4472.firebaseio.com/.json';
//var REQUEST_URL = 'https://api.beeline.sg/routes/search_by_region?regionId=24&areaName=North-east%20Region';

var styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    thumbnail: {
        width: 53,
        height: 81,
        marginRight: 10
    },
    rightContainer: {
        flex: 1,
        padding: 5,
    },
    title: {
        fontSize: 20,
        paddingBottom: 8,
        color: '#b510d3',
    },
    author: {
        color: '#656565'
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    listView: {
        backgroundColor: '#F5FCFF'
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dateColumn: {
        flexDirection: 'column',
        flex: 0.2,
        height: 50,
    },
    detail: {
        padding: 5,
    }
});

export default class AnnouncementList extends Component {

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
            //responseData = this.removeDuplicates(responseData);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData.Announcement),
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
            <ListView
                dataSource = {this.state.dataSource}
                renderRow = {this.renderBook.bind(this)}
                style = {styles.listView}
            />
        );
    }

    renderLoadingView() {
        return (
            <View style = {styles.loading}>
                <ActivityIndicator
                    size = 'large' />
                <Text> Loading Announcement... </Text>
            </View>
        );
    }

    renderBook(event) {
        return (
            <TouchableHighlight 
                onPress={() => this.showAnnouncementInfo(event)}  underlayColor='#dddddd'>
                <View>
                     <View style = {styles.container}>
                        <View style={styles.dateColumn}>
                            <View style={{backgroundColor: '#b510d3', flex:0.2}}>
                                <Text style={{color:'white', textAlign:'center'}}>15</Text>
                            </View>
                            <View style={{backgroundColor: 'white', flex:0.2}}>
                                <Text style={{color: '#b51d03', textAlign: 'center'}}>APRIL </Text>
                            </View>
                        </View>
    
                        <View style = {styles.rightContainer}>
                            <Text style = {styles.title}> {event.title}</Text>
                            <Text style = {styles.detail}>{event.description}</Text>
                        </View>
                    </View>
                    <View style = {styles.separator}/>
                </View>
            </TouchableHighlight>
        );
    }

    showAnnouncementInfo(event) {
       this.props.navigator.push({
           //title: book.title,
           //component: AnnouncementInfo,
           //passProps: {book}
           screen: 'AnnouncementInfo',
           data: event
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
}

