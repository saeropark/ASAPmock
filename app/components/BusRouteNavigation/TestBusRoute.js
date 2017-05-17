import React, {Component} from 'react';
import {
  Text,
  View,
  ListView,
  PropTypes,
  Image,
  StyleSheet, 
  Platform,
  Alert,
  TouchableOpacity,
  Dimensions,
  ScrollView,TouchableHighlight
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { TabNavigator } from "react-navigation";


//import AMRouteNav from './AMRouteNav';
// import PMRouteNav from './PMRouteNav';
// import LunchRouteNav from './LunchRouteNav';


import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

import MapView from 'react-native-maps';
import {Button, Icon} from 'react-native-elements';

var REQUEST_URL = 'https://asap-c4472.firebaseio.com/BusRoutes.json';
var CONTENT = [];

var {height, width} = Dimensions.get('window');
//var bus;
var markersArray = new Array();
var stopsArray = new Array();
var features;
var obj;


class AMTab extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'AM'
    }
  render() {
    return <AMList/>
  }
}

class PMTab extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'PM'
    }
  render() {
    return <PMList/>
  }
}

class LunchTab extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'LUNCH'
    }
    render(){
        return <LunchList/>
    }
}

//---------- EACH DETAIL PAGE ! ----------//

class AMList extends React.Component {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
        super(props);
        
        this.state = {
            visible: false,
            animating: true,
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
        return (
          <View style={styles.mainContainer}>
            {/*<NavBar />*/}
            <ListView
                dataSource = {this.state.dataSource}
                renderRow = {this.renderBus.bind(this)}
                style = {styles.listView}
            />
            </View>
            
        );
    }

    renderBus(bus) {

       // var replace = this.replaceText(bus)
        return (
            <TouchableHighlight 
                onPress={() => this.showShuttleBusInfo(bus)}  underlayColor='#dddddd'>
                <View>
                    <View style = {styles.container}>
                        <View style = {styles.iconContainer}>
                         <Icon
                            reverse
                            name='directions-bus'
                            color= '#b510d3'//color='#517fa4'
                            />
                            <Text style={styles.centering}>{bus.label}</Text>
                        </View>
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

    // replaceText() {

    // }

    showShuttleBusInfo(bus) {
       console.log("TestonPress");
        this.props.navigation.navigate('Info', {bus});
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

class PMList extends React.Component {
   static navigationOptions = {
    header: null,
  }
  constructor(props) {
        super(props);
        
        this.state = {
            visible: false,
            animating: true,
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
        return (
          <View style={styles.mainContainer}>
            {/*<NavBar />*/}
            <ListView
                dataSource = {this.state.dataSource}
                renderRow = {this.renderBus.bind(this)}
                style = {styles.listView}
            />
            </View>
            
        );
    }

    renderBus(bus) {

       // var replace = this.replaceText(bus)
        return (
            <TouchableHighlight 
                onPress={() => this.showShuttleBusInfo(bus)}  underlayColor='#dddddd'>
                <View>
                    <View style = {styles.container}>
                        <View style = {styles.iconContainer}>
                         <Icon
                            reverse
                            name='directions-bus'
                            color= '#b510d3'//color='#517fa4'
                            />
                            <Text style={styles.centering}>{bus.label}</Text>
                        </View>
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

    // replaceText() {

    // }

    showShuttleBusInfo(bus) {
       console.log("TestonPress");
        this.props.navigation.navigate('Info', {bus});
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
    displayPm(obj) {
        var array = obj;
        array = array.filter(function(currentObject) {
            if ((currentObject.label).includes("PM")){
                return true;
            } else {
                return false;
            }
        });
        return array; 
    }
  
  
}

class LunchList extends React.Component {
    static navigationOptions = {
    header: null,
  }
  constructor(props) {
        super(props);
        
        this.state = {
            visible: false,
            animating: true,
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
        return (
          <View style={styles.mainContainer}>
            {/*<NavBar />*/}
            <ListView
                dataSource = {this.state.dataSource}
                renderRow = {this.renderBus.bind(this)}
                style = {styles.listView}
            />
            </View>
            
        );
    }

    renderBus(bus) {

       // var replace = this.replaceText(bus)
        return (
            <TouchableHighlight 
                onPress={() => this.showShuttleBusInfo(bus)}  underlayColor='#dddddd'>
                <View>
                    <View style = {styles.container}>
                        <View style = {styles.iconContainer}>
                         <Icon
                            reverse
                            name='directions-bus'
                            color= '#b510d3'//color='#517fa4'
                            />
                            <Text style={styles.centering}>{bus.label}</Text>
                        </View>
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
       console.log("TestonPress");
        this.props.navigation.navigate('Info', {bus});
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

    /* Filter to Lunch */
    displayLunchR(obj) {
        var array = obj;
        array = array.filter(function(currentObject) {
            if (((currentObject.label).includes("PM")) || ((currentObject.label).includes("AM"))) {
                return false;
            } else {
                return true;
            }
        });
        return array; 
    }
  

  
}

class RouteDetail extends React.Component {
  static navigationOptions = {
    header: null,
  }
   constructor(props) {
    super(props);
    console.log("constructor(props)");
    //bus = this.props.busData;

    this.state ={
        visible: false,
        //bus: this.props.busData? this.props.busData: null,
        markers: [],
        restoring: false,
        animating: true,
        isLoading: false,
 
    }
    console.log(bus);
  }

  componentWillMount() {
    console.log("componentWillMount()");
    this.setState({ showLoading: true ,  });
    setInterval(() => {
            this.setState({
                visible: !this.state.visible
            });
        }, 3000);
    this.fetchStops();
    this.fetchData().done();
    
  }

  //fetchData fetches data from URL and get bus stop details from beeline for markers
  async fetchData() {
      fetch(this.requestURL(params.bus))
      .then((response) => response.json())
      .then((responseData) => {
          markersArray.length = 0;
          console.log(this.state.markers);
          console.log("On fetchData():");
          this.getBusStopDescriptions(responseData);

          console.log(markersArray);
            this.state.markers = markersArray;
          this.setState({ 
              showLoading: false 
            });
      })
      .done();
  }

  //fetchStops fetches data from URL and get bus stop timings from firebase
  fetchStops(){
      fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
          this.getBusStopTimings(responseData);
      })
  }

  //request url from beeline
  requestURL(bus){
     //id = bus.id;
     console.log(bus);
    return 'https://api.beeline.sg/routes/'+ bus.id +'?include_trips=true&include_features=true';
  }

  renderLoadingView() {
    return (
      <View ><Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#000000'}} />
      </View>
    );
  }
    
  render() {

    // console.log("render()");
    // var id =  (typeof bus.id !== 'undefined') ? bus.id: null;
    // var name = (typeof bus.name !== 'undefined') ? bus.name: null;
    // var signages = (typeof bus.notes.signage !== 'undefined') ? bus.notes.signage:  null;
  
    // console.log(id);
    // var results = this.requestURL.bind(id);
    // console.log(bus);
    // if (this.state.showLoading === true) {
    //   this.renderLoadingView();
    // }
       const {params} = this.props.navigation.state;
       const {goBack} = this.props.navigation;
        return (
            //fetch json data and display
            
            <View style={{flex:1}}>
              <ScrollView style={{flex:1, backgroundColor:'#ffffff'}}>
                  <View style={styles.timeSignage}>
                  <Text> {name}</Text>
                  <View style={styles.rightContainer}>
                    <Text>Signage example:</Text>
                    <Text style={styles.rectangle}>{params.bus.signages}</Text> 
                  </View>
                </View>
                <View style={styles.container}>
                <MapView style={styles.map} initialRegion={{
                    latitude: 1.357857, 
                    longitude: 103.828568,
                    latitudeDelta: 0.2,
                    longitudeDelta: 0.2,
                  }}
                  >  
                {this.state.markers.map(marker => (
                  <MapView.Marker 
                    coordinate={marker.coordinates}
                    title={marker.title}
                    key={marker.id}
                  />
                ))}
                
                </MapView>
                </View>
                <View style = {styles.separator}/>

                <View style={{flex:1}}>
                    <Text style={styles.timingHeader}> BUS TIMING </Text>
                    <TimingCollapse />
                </View>

               
                <View style = {styles.separator}/>
                
                <View style={styles.listButton}>
                    
                    <Button
                    color = '#000000'
                    title = 'More Information'
                    backgroundColor = '#ffffff' 
                    onPress={this.goImptNotes.bind(this)}/>

                  {/*<Button 
                    raised
                    title = "Display List of Stops"
                    backgroundColor = '#FFA500'
                    onPress={this.goDisplayList.bind(this)} />*/}
                    <Button
                    color = "#FFFFFF"
                    title ="Back"
                    backgroundColor="#FFA500"
                    onPress={() => goBack()}/>
                    
                  
                </View>
            </ScrollView>
            </View>
        );
    }

    getBusStopTimings(obj){
        console.log(obj);
        var keys = Object.keys(obj);
        console.log(keys);

        var routeKey;

        for (var i=0; i<keys.length; i++){
            var key = keys[i];
            if(obj[key].routeId = bus.id){
                console.log("FOUND! Key: " + key);
                routeKey = key;
                i = keys.length;
            }
        }

        stopsArray.length = 0;
        stopsArray = obj[routeKey].routeStops
        console.log(stopsArray);
    }

    //retrieve bus stop description from retrieved objects and pass into markersArray
  getBusStopDescriptions(obj){
    console.log("On getBusStopDescriptions()");
    console.log(obj);

    CONTENT.length = 0;

    try{
        var noOfTrips = obj.trips.length - 1;
        var noOfBusStops = obj.trips[noOfTrips].tripStops.length;

        for (var i = 0; i < noOfBusStops; i++){

            //get markers information
            var busStopNo = i + 1;
            var desc = obj.trips[noOfTrips].tripStops[i].stop.description;
            var lat = obj.trips[noOfTrips].tripStops[i].stop.coordinates.coordinates[1];
            var lng = obj.trips[noOfTrips].tripStops[i].stop.coordinates.coordinates[0];

            //create object and push markers info to markersArray
            var stop =  new Object();
            stop.title = desc;
            var latlng = new Object;
            latlng.latitude = lat;
            latlng.longitude = lng;
            stop.coordinates = latlng;
            stop.id = busStopNo;
            markersArray.push(stop);

            //create object and push timings to CONTENT
            var newStop = new Object();
            newStop.title = busStopNo + ". " + desc;
            if(stopsArray[i].timings != 'undefined'){
                newStop.content = stopsArray[i].timings;
            } else {
                newStop.content = "Timing to be added";
            }
            CONTENT.push(newStop);
      }
    }
    catch(err){
        console.log("error: " + err);
    }
  }


  goDisplayList() {

    var alertMessage = ("1. ").concat(markersArray[0].title);
    for(var i = 1; i < markersArray.length; i++){
      var index = i + 1;
      var indexText = ("\n").concat(index);
      var indexTextNo = indexText.concat(". ");
      var text = indexTextNo.concat(markersArray[i].title);
      alertMessage = alertMessage.concat(text);
    }
    Alert.alert("List of Bus Stops", alertMessage);
  }


  //display list of features
  goImptNotes() {
      
    features = bus.features;
    Alert.alert("Important Notes", features);
  }
}


//-------------- DROP DOWN MENU CLASS ----------------------//
class TimingCollapse extends React.Component {
  state = {
    activeSection: false,
    collapsed: true,
  };

  _toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  _setSection(section) {
    this.setState({ activeSection: section });
  }

  _renderHeader(section, i, isActive) {
    return (
      <Animatable.View duration={400} style={[styles.header, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  }

  _renderContent(section, i, isActive) {
    return (
      <Animatable.View duration={400}  style={[styles.content, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>{section.content}</Animatable.Text>
      </Animatable.View>
    );
  }

  _

  render() {
    return (
      <View style={styles.dContainer}>
          <Text> List of Stops </Text>
        <Accordion
          activeSection={this.state.activeSection}
          sections={CONTENT}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          duration={400}
          onChange={this._setSection.bind(this)}
        />

      </View>
    );
  }
}
  


const EachStack = StackNavigator ({
  AList: {screen: AMList},
  PList: {screen: PMList},
  LList: {screen: LunchList},
  Info: {screen: RouteDetail},
});

const RouteTab = TabNavigator({
  AMRoute: { screen: AMTab },
  PMRoute: { screen: PMTab },
  LunchRoute: { screen: LunchTab}
},
    
    {
        mode: 'modal', // this is needed to make sure header is hidden on ios
        tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: 'lightgray',

          style: {
          backgroundColor: '#b510d3',
        },
      } 
    } 

);

const RouteStack = StackNavigator({
    Home: {screen: RouteTab}
})

RouteTab.navigationOptions = ({navigation})=> ({
  header: null,
 
});


export default RouteStack;

var styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#Ffffff',
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
        
    },
    iconContainer: {
        flexDirection: 'column',
        height: undefined,
    },
    centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});
