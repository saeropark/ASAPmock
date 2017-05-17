import React, {Component} from 'react';
import {
  Text,
  View,
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
import {Icon, Button} from "react-native-elements";

// import AnnouncementNav from './AnnouncementNav';
// import AnnouncementList from '../../js/AnnouncementLists/AnnouncementList';
// import AnnouncementInfo from '../../js/AnnouncementInfo';

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
    return <PastList/>
  }
}

//======= UNDER UPCOMING TABS ==============
class EventList extends React.Component {
    static navigationOptions = ({ navigation }) => ({
     header: null,
    });

    constructor(props) {
    super(props);
    const navigate = this.props.navigation;
    //const { navigate } = this.props.navigation;
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
                dataSource: this.state.dataSource.cloneWithRows(this.sortObjects(responseData)),
                //dataSource: this.state.dataSource.cloneWithRows(responseData["items"]),
                isLoading: false
            });
        })
        .done();
    }
    render() {
      //const { navigate } = this.props.navigation;
        return (
            <ListView
                dataSource = {this.state.dataSource}
                renderRow = {this.renderEvent.bind(this)}
                style = {styles.listView}
            />
        );
    }


    renderEvent(event) {
        return (
           <TouchableHighlight 
                onPress={() => this.testOnPress(event)}>
                <View>
                    <View style = {styles.container}>
                       <View style={styles.dateColumn}>
                            <View style={{backgroundColor: '#b510d3', flex:0.2}}>
                                <Text style={{color:'white', textAlign:'center'}}> {event.date} </Text>
                            </View>
                            <View style={{backgroundColor: 'white', flex:0.2}}>
                                <Text style={{color: '#b51d03', textAlign: 'center'}}> Month! </Text>
                            </View>
                        </View>
                   
                        <View style = {styles.rightContainer}>
                             <View style={{backgroundColor: 'white', flex:0.2}}>
                                <Text style={{color: '#b51d03', textAlign: 'center'}}> {event.postType} </Text>
                            </View>
                            <Text style = {styles.title}> {event.title}</Text>
                            <Text style = {styles.detail} numberOfLines={1} >{event.description}</Text>
                        </View>
                    </View>
                    <View style = {styles.separator}/>
                </View>
            </TouchableHighlight>
        );
    }

    testOnPress(event) {
        console.log("TestonPress");
        this.props.navigation.navigate('Info', {event});
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

    // Sort announcements and events based on upcoming
    sortObjects(obj){
        var announcements = obj.Announcement;
        var events = obj.Event;
        var announcementKeys = Object.keys(announcements);
        var eventKeys = Object.keys(events);
        var upcoming = {};
        var nowDate = new Date();

        for(var i = 0; i < eventKeys.length; i++) {
            var key = eventKeys[i];
            var eventDate = new Date(events[key].date);
            if (eventDate > nowDate){
                console.log(events[key].title + " is on Upcoming List");
                upcoming[key] = events[key];
            } else {
                console.log(events[key].title + " is on Past List");
            }
        }

        for(var x = 0; x < announcementKeys.length; x++) {
            var key = announcementKeys[x];
            var announcementDate = new Date(announcements[key].date);
            if (announcementDate > nowDate){
                console.log(announcements[key].title + " is on Upcoming List");
                upcoming[key] = announcements[key];
            } else {
                console.log(announcements[key].title + " is on Past List");
            }
        }

        return upcoming;
    }
} 


//======= UNDER PAST TABS ==============
class PastList extends React.Component {
    static navigationOptions = ({ navigation }) => ({
     header: null,
    });

    constructor(props) {
    super(props);
    const navigate = this.props.navigation;
    //const { navigate } = this.props.navigation;
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
                dataSource: this.state.dataSource.cloneWithRows(this.sortObjects(responseData)),
                //dataSource: this.state.dataSource.cloneWithRows(responseData["items"]),
                isLoading: false
            });
        })
        .done();
    }
    render() {
      //const { navigate } = this.props.navigation;
        return (
            <ListView
                dataSource = {this.state.dataSource}
                renderRow = {this.renderEvent.bind(this)}
                style = {styles.listView}
            />
        );
    }


    renderEvent(event) {

        console.log("PostType:" + event.postType);
        return (
           <TouchableHighlight 
                onPress={() => this.testOnPress(event)}>
                <View>
                    <View style = {styles.container}>
                       <View style={styles.dateColumn}>
                            <View style={{backgroundColor: '#b510d3', flex:0.2}}>
                                <Text style={{color:'white', textAlign:'center'}}> {event.date} </Text>
                            </View>
                            <View style={{backgroundColor: 'white', flex:0.2}}>
                                <Text style={{color: '#b51d03', textAlign: 'center'}}> MONTH!</Text>
                            </View>
                        </View>
                   
                        <View style = {styles.rightContainer}>
                            <View style={{backgroundColor: 'white', flex:0.2}}>
                                <Text style={{color: '#b51d03', textAlign: 'center'}}> {event.postType} </Text>
                            </View>
                            <Text style = {styles.title}> {event.title}</Text>
                            <Text style = {styles.detail} numberOfLines={1} >{event.description}</Text>
                        </View>
                    </View>
                    <View style = {styles.separator}/>
                </View>
            </TouchableHighlight>
        );
    }

    testOnPress(event) {
        console.log("TestonPress");
        this.props.navigation.navigate('Info', {event});
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

    // Sort announcements and events based on upcoming
    sortObjects(obj){
        var announcements = obj.Announcement;
        var events = obj.Event;
        var announcementKeys = Object.keys(announcements);
        var eventKeys = Object.keys(events);
        var upcoming = {};
        var nowDate = new Date();

        for(var i = 0; i < eventKeys.length; i++) {
            var key = eventKeys[i];
            var eventDate = new Date(events[key].date);
            if (eventDate <= nowDate){
                console.log(events[key].title + " is on Upcoming List");
                upcoming[key] = events[key];
            } else {
                console.log(events[key].title + " is on Past List");
            }
        }

        for(var x = 0; x < announcementKeys.length; x++) {
            var key = announcementKeys[x];
            var announcementDate = new Date(announcements[key].date);
            if (announcementDate <= nowDate){
                console.log(announcements[key].title + " is on Upcoming List");
                upcoming[key] = announcements[key];
            } else {
                console.log(announcements[key].title + " is on Past List");
            }
        }

        return upcoming;
    }
} 


class EventDetail extends React.Component {
    constructor(props) {
        super(props);
      //event = this.props.navigation.state.event;
      
    }

    static navigationOptions = ({ navigation }) => ({
        header: null,
       // title: `Title: ${navigation.state.params.data}`,
    });
    
     render() {
        const {params} = this.props.navigation.state;
        const {goBack} = this.props.navigation;
            console.log("Event info page");
            console.log(params);

        return (
            
            <View style={styles.container}>
                <ScrollView>
                <View style={styles.contentContainer}>
                        <Image
                            style={{width: 300, height: 200}}
                            source={{uri: params.event.fileURL}}
                        />
                    </View>
                        
                        <Text style={styles.title}>{params.event.title}</Text>
                        <View style={styles.descriptionContainer}>
                           
                            <View style={styles.iconText}>
                                <Icon
                                    name='today'/>
                                 <Text style={styles.descriptionText}> {params.event.date}</Text>
                            </View>
                            <View style={styles.iconText}>
                                <Icon
                                    name='schedule'/>
                                    <Text style={styles.descriptionText}> {params.event.time}</Text>
                            </View>
                            <View style={styles.iconText}>
                                <Icon
                                    name='place'/>
                                <Text style={styles.descriptionText}> {params.event.location}</Text>
                            </View>
                                <Text style={styles.descriptionText}> {params. event.description}</Text>
                            </View>
                    
                
                <Button
                    color = "#FFFFFF"
                    title ="Back"
                    backgroundColor="#FFA500"
                    onPress={() => goBack()} />

                </ScrollView>
        </View>
        );
       
    }
}
    
const PastStack = StackNavigator({
    PList: {screen: PastList},
    PInfo: {screen: EventDetail},
    
},
 { initialRoute: 'PList',
     mode: 'modal' } // this is needed to make sure header is hidden on ios
 );
 PastStack.navigationOptions = {
  header: null,

};

const AnnStack = StackNavigator({
    List: {screen: EventList},
    Info: {screen: EventDetail},
    
},
 { initialRoute: 'List',
     mode: 'modal' } // this is needed to make sure header is hidden on ios
 );
 AnnStack.navigationOptions = {
  header: null,

};



const EventTab = TabNavigator({
    Upcoming: { screen: AnnStack },
    Past: { screen: PastStack },
},
    { initialRoute: 'Upcoming',
        mode: 'modal' } // this is needed to make sure header is hidden on ios
);

const EventStack = StackNavigator({
    Home: {screen: EventTab},
    // List: {screen: EventList},
    // Info: {screen: EventDetail},
},{initialRoute: 'Home',}

);

EventStack.navigationOptions = {
    header: "22222",
    title: "Events & Announcements 2",

};

 
 export default EventTab;

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
        flexDirection: 'column',
        flex: 0.8,
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
        
    },
    iconText: {
        flex: 1,
        flexDirection: 'row',
        padding: 5
    }
});


// class EventList extends React.Component {
//   render() {
//     return <AnnouncementNav/>
//   }
// }

// class EventDetail extends React.Component {
//     render() {
//         return <AnnouncementInfo/>
//     }
// }
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

// const EventTab = TabNavigator({
//     Upcoming: { screen: UpcomingTab },
//     Past: { screen: PastTab },
//     // List: {screen: EventList},
//     // Info: {screen: EventDetail},
// },
//     { mode: 'modal' } // this is needed to make sure header is hidden on ios
// );

// const EventStack = StackNavigator({
//     Home: {screen: EventTab},
//     List: {screen: EventList},
//     Info: {screen: EventDetail},
// })

// EventTab.navigationOptions = {
//   header: null,

// };

// export default EventStack;

// var styles = StyleSheet.create ({
//     container: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//         padding: 10
//     },
//     thumbnail: {
//         width: 53,
//         height: 81,
//         marginRight: 10
//     },
//     rightContainer: {
//         flex: 1,
//         padding: 5,
//     },
//     title: {
//         fontSize: 20,
//         paddingBottom: 8,
//         color: '#b510d3',
//     },
//     author: {
//         color: '#656565'
//     },
//     separator: {
//         height: 1,
//         backgroundColor: '#dddddd'
//     },
//     listView: {
//         backgroundColor: '#F5FCFF'
//     },
//     loading: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     dateColumn: {
//         flexDirection: 'column',
//         flex: 0.2,
//         height: 50,
//     },
//     detail: {
//         padding: 5,
//     }
// });
