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
        padding: 5,
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
    imgThumbnail: {
        flexDirection: 'column',
        flex: 0.2,
        height: 50,
    },
    detail: {
        padding: 5,
    }
});


export default class PromotionList extends Component {

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
                dataSource: this.state.dataSource.cloneWithRows(responseData.Promotion),
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
                renderRow = {this.renderPromo.bind(this)}
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

    renderPromo(event) {
       var imageURI = '../../../img/SAP.png';
        if (typeof event.fileURL){
            imageURI = event.fileURL;
        }else{
            imageURI;
        }
        // var img = '../../../img/SAP.png';
        // var imageURI = (  typeof event.fileURL !== 'undefined') ? event.fileURL:;
        return (
           <TouchableHighlight 
                onPress={() => this.showAnnouncementInfo(event)}  underlayColor='#dddddd'>
                <View>
                    <View style = {styles.container}>

                             <Image
                            style={{width: 100, height: 50}}
                            source={{uri: imageURI}}
                        />
    

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

