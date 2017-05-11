import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  PropTypes,
  Image,
  StyleSheet, 
  Platform,
  ScrollView,
  ListView,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import { StackNavigator, navigate } from 'react-navigation';
import { TabNavigator } from "react-navigation";

import AnnouncementNav from './AnnouncementNav';
import AnnouncementList from '../../js/AnnouncementLists/AnnouncementList';
import AnnouncementInfo from '../../js/AnnouncementInfo';

var REQUEST_URL = 'https://asap-c4472.firebaseio.com/.json';
var event;
var someText;
//========= MAIN TABS: UPCOMING | PAST =============
class UpcomingTab extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Upcoming'
    }
  render() {
    return <EventList/>
  }
}

class PastTab extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Past'
    }
  render() {
    return <Text>List of Past Events</Text>
  }
}

class EventList extends React.Component {
  render() {
    return <AnnouncementNav/>
  }
}

class EventDetail extends React.Component {
    render() {
        return <AnnouncementInfo/>
    }
}
//======= UNDER UPCOMING TABS ==============
// class EventList extends React.Component {
  
//     constructor(props) {
//     super(props);
    
//     this.state = {
//         navigate: this.props.navigation,
//         isLoading: true, 
//         //dataSource is the interface
//         dataSource: new ListView.DataSource({
//         rowHasChanged: (row1, row2)=> row1 !== row2
//         })
//     };
//     }

//     componentDidMount() {
//         this.fetchData();
//     }

//     // --- calls Google API ---
//     fetchData() {
//         fetch(REQUEST_URL)
//         .then((response) => response.json())
//         .then((responseData) => {
//             //responseData = this.removeDuplicates(responseData);
//             this.setState({
//                 dataSource: this.state.dataSource.cloneWithRows(responseData.Event),
//                 //dataSource: this.state.dataSource.cloneWithRows(responseData["items"]),
//                 isLoading: false
//             });
//         })
//         .done();
//     }
//     render() {
       
        // if (this.state.isLoading) {
        //     this.renderLoadingView();   
             
        // }
      // const { navigate } = this.props.navigation;
        /*return (
            <ListView
                dataSource = {this.state.dataSource}
                renderRow = {this.renderEvent.bind(this)}
                style = {styles.listView}
            />
        );
    }*/

    /*renderLoadingView() {
        return (
            <View style = {styles.loading}>
                <ActivityIndicator
                    size = 'large' />
                <Text> Loading Announcement... </Text>
            </View>
        );
    }*/

    /*renderEvent(event) {
        var imageURI = '../../../img/SAP.png';
        if (typeof event.fileURL){
            imageURI = event.fileURL;
        }
        
        //var imageURI = (typeof event.fileURL !== 'undefined') ? event.fileURL : '../../../img/SAP.png';
        return (
           <TouchableHighlight 
                onPress={() => navigate('List', {}, {
                        type: "Navigate", 
                        routeName: "Info",
                        action: {
                            type: "Navigate", 
                            routeName: "EventDetail", 
                            params: {key: "Jo"}
                        }
                })
                
                }  underlayColor='#dddddd'>
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
    }*/

//     showAnnouncementInfo(event) {
//         // this.setState({
//         //     data: event,
//         // })
//         const { navigate } = this.props.navigation;
//         this.props.navigation.navigate('Info', {event: 'this is passed'});
//         console.log(event);
//     //    this.props.navigator.push({
//     //        //title: book.title,
//     //        //component: AnnouncementInfo,
//     //        //passProps: {book}
//     //        screen: 'AnnouncementInfo',
//     //        data: event });
       
//    }

//     //back to home
//     goHome() {
//       console.log("go Home");
//       this.props.navigator.pop({ screen: 'Home'});
//     }

//     /* to filter JSON data by making the name unique */
//     removeDuplicates(obj){
//         var array = obj;
//         var seenObj = {};
//         array = array.filter(function(currentObject) {
//             if (currentObject.name in seenObj) {
//                 return false;
//             } else {
//                 seenObj[currentObject.name] = true;
//                 return true;
//             }
//         });
//         return array;
//     }
// } 


// class EventDetail extends React.Component {
//     constructor(props) {
//         super(props);
//       //event = this.props.navigation.state.event;
      
//     }
    
//      render() {
//         //console.log(this.props.navigation.state.params.event);
//         //var event = this.props.data;
//         const {params} = this.props.navigation.state;
        
//         //var event = this.props.navigation.state.event;
        
//             //console.log(event);
            
//             // var imageURI = (typeof event.fileURL !== 'undefined') ? event.fileURL : '';
//             //var imageURI = event.fileURL;
//             console.log("Event info page");
           
            
        
      

//         return (
            
            /*<View style={styles.container}>
                <ScrollView>
                <View style={styles.contentContainer}>
                    
                        <Text> Text: {params.key}</Text>
                        <Image
                            style={{width: 300, height: 200}}
                            source={{uri: imageURI}}
                        />
                    </View>
                 */
                        {/*<Text style={styles.title}>{event.title}</Text>
                        <View style={styles.descriptionContainer}>
                        <View style={styles.iconColumn}>
                            <Icon
                                name='today'/>
                            <Icon
                                name='schedule'/>
                            <Icon
                                name='place'/>
                        </View>
                        <View style={styles.rightContainer}>
                            <Text style={styles.descriptionText}>  Date:{event.date}</Text>
                            <Text style={styles.descriptionText}>  Time: {event.time}</Text>
                            <Text style={styles.descriptionText}>  Location: {event.location}</Text>
                            <Text style={styles.descriptionText}> {event.description}</Text>
                        </View>
                        
                    </View>*/}
                    /*<TouchableOpacity onPress={this.goBack.bind(this)}>
                        <Text style={styles.buttonText}>Go Back</Text>
                    </TouchableOpacity>
                   
                    
                
                </ScrollView>
        </View>
        );
       
    }*/
    

//     goBack() {
//     console.log("go to back");
//     this.props.navigator.pop({ screen: 'AnnouncementList' });
//   }
//}

// const AnnStack = StackNavigator({
//     List: {screen: EventList},
//     Info: {screen: EventDetail},
// })

const EventTab = TabNavigator({
    Upcoming: { screen: UpcomingTab },
    Past: { screen: PastTab },
    // List: {screen: EventList},
    // Info: {screen: EventDetail},
},
    { mode: 'modal' } // this is needed to make sure header is hidden on ios
);

const EventStack = StackNavigator({
    Home: {screen: EventTab},
    List: {screen: EventList},
    Info: {screen: EventDetail},
})

EventTab.navigationOptions = {
  header: null,

};

export default EventStack;

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
