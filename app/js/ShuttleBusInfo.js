import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  ScrollView,TouchableHighlight
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import * as firebase from 'firebase';

import MapView from 'react-native-maps';
import ShuttleBusList from './ShuttleBusList';
import {Button, Icon} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
//import TestCollapse from './SidebarList/TestCollapse';

//var REQUEST_URL = 'https://api.beeline.sg/routes/63?include_trips=true&include_features=true';

var {height, width} = Dimensions.get('window');
var bus;
var markersArray = new Array();
var stopsArray = new Array();
var features;
var obj;

var REQUEST_URL = 'https://asap-c4472.firebaseio.com/BusRoutes.json';
const BACON_IPSUM = 'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';
var CONTENT = [];
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDCB-XYhPG5_tps1ZPR4lMLs0p1X_uPGpQ",
    authDomain: "asap-c4472.firebaseapp.com",
    databaseURL: "https://asap-c4472.firebaseio.com/",
    storageBucket: "gs://asap-c4472.appspot.com",
    messagingSenderId: "625916539957",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
// const CONTENT = [
//   {
//     title: 'First',
//     content: BACON_IPSUM,
//   },
//   {
//     title: 'Second',
//     content: BACON_IPSUM,
//   },
//   {
//     title: 'Third',
//     content: BACON_IPSUM,
//   },
//   {
//     title: 'Fourth',
//     content: BACON_IPSUM,
//   },
//   {
//     title: 'Fifth',
//     content: BACON_IPSUM,
//   },
// ];

export default class ShuttleBusInfo extends Component {

  constructor(props) {
    super(props);
    console.log("constructor(props)");
    bus = this.props.busData;


    this.state ={
        visible: false,
        bus: this.props.busData? this.props.busData: null,
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

  async fetchData() {
      fetch(this.requestURL(bus))
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

  fetchStops(){
      fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
          this.getBusStopTimings(responseData);
      })
  }

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

    console.log("render()");
    //bus = this.props.busData;
    var id =  (typeof bus.id !== 'undefined') ? bus.id: null;
    var name = (typeof bus.name !== 'undefined') ? bus.name: null;
    var signages = (typeof bus.notes.signage !== 'undefined') ? bus.notes.signage:  null;
  
    console.log(id);
    var results = this.requestURL.bind(id);
    console.log(bus);
     //id = bus.id;
    //  name = bus.name;
    // signage: bus.notes.signage;
    if (this.state.showLoading === true) {
      this.renderLoadingView();
    }
       
        return (
            //fetch json data and display
            
            <View style={{flex:1}}>
              <ScrollView style={{flex:1, backgroundColor:'#ffffff'}}>
                  <View style={styles.timeSignage}>
                  <Text> {name}</Text>
                  <View style={styles.rightContainer}>
                    <Text>Signage example:</Text>
                    <Text style={styles.rectangle}>{signages}</Text> 
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
                  />
                ))}
                
                </MapView>
                </View>
                <View style = {styles.separator}/>

                <View style={{flex:1}}>
                    <Text style={styles.timingHeader}> BUS TIMING </Text>
                    <TestCollapse />
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
                    onPress={this.goBack.bind(this)}/>
                    
                  
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

  getBusStopDescriptions(obj){
    console.log("On getBusStopDescriptions()");
    console.log(obj);

    CONTENT.length = 0;

    try{

      
        var noOfTrips = obj.trips.length - 1;
        var noOfBusStops = obj.trips[noOfTrips].tripStops.length;

        for (var i = 0; i < noOfBusStops; i++){

            var busStopNo = i + 1;
            var desc = obj.trips[noOfTrips].tripStops[i].stop.description;
            var lat = obj.trips[noOfTrips].tripStops[i].stop.coordinates.coordinates[1];
            var lng = obj.trips[noOfTrips].tripStops[i].stop.coordinates.coordinates[0];

            var stop =  new Object();
            stop.title = desc;
            var latlng = new Object;
            latlng.latitude = lat;
            latlng.longitude = lng;
            stop.coordinates = latlng;
            markersArray.push(stop);

            var newStop = new Object();
            newStop.title = desc;
            if(stopsArray[i].timings != 'undefined'){
                newStop.content = stopsArray[i].timings;
            } else {
                newStop.content = "Timing to be added";
            }
            CONTENT.push(newStop);

            console.log("");
            console.log(stop);
            console.log("Bus stop " + busStopNo + " info");
            console.log("Name: " + desc);
            console.log("lat: " + lat + ", lng: " + lng);
        
      }
    }
    catch(err){
        console.log("error: " + err);
    }
  }

  goBack() {
    console.log("go to back");
    this.props.navigator.pop({ screen: 'ShuttleBusList' });
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
class TestCollapse extends React.Component {
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

var styles = StyleSheet.create({
    timingHeader: {
        fontSize: 20,
        color: '#b510d3',
        padding: 10,
    },
    contentContainer: {
       flex:1,
        marginTop: 75,
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    features: {
        padding: 10,
        fontSize: 15,
        color: '#656565'
    },
    separator: {
       borderRightWidth: 1,
       borderColor: '#dddddd',
       
   },
   rectangle: {
       height: 50,
       width: 50* 2,
       backgroundColor: 'white',
       borderColor: 'black',
       justifyContent: 'center',
       alignItems: 'center'
   },
   bigRect: {
       height: 200,
       width: 200*2,
       backgroundColor: 'white',
       borderColor: 'black',
       justifyContent: 'center',
       alignItems: 'center'
   },

   container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    image: {
        width: 107,
        height: 165,
        padding: 10
    },
    description: {
        padding: 10,
        fontSize: 15,
        color: '#656565'
    },
     navBar: {
    flex: 0.08,
    backgroundColor: '#942b3c'
    },
    // contentContainer: {
    //     flex:0.8,
    // },
    iconStyle: {
        textAlign: 'center',
        padding: 14,
        width: 50,
        color: 'white'
    },
    navText: {
        marginTop: -40,
        paddingLeft: 50,
        fontSize: 20,
        color: 'white'
    },
    timeSignage: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#Ffcc00',
        padding: 10
    }, 
    rightContainer: {
        flex: 0.3
    },
    listButton: {
        flex:1,
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center'
    },
    map: {
      width: width,
      height: height/2.5
   },
   centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },

  //------- Dropdowwn stylng -------//
  dContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
});



/*import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import ShuttleBusList from './ShuttleBusList';
import Icon from 'react-native-vector-icons/MaterialIcons';

var REQUEST_URL = 'https://api.beeline.sg/routes/63?include_trips=true&include_features=true';


export default class ShuttleBusInfo extends Component {
    state = {
    title: 'Route Detail',
    index: 2,
    restoring: false,
   
  };

//   constructor(props) {
//         super(props);
//            this.state = {
//                isLoading: true,
//            }
       
//     }
      renderLoadingView() {
        return (
            <View style = {styles.loading}>
                <ActivityIndicator
                    size = 'large' />
                <Text> Loading bus... </Text>
            </View>
        );
    }
    render() {
     
        var bus = this.props.bus;
        console.log("Shuttle bus info page");
        console.log(bus);

        // if (typeof bus === 'undefined') {
        //     if (this.state.isLoading) {
        //         this.renderLoadingView();
        //     }
            
        // }
        // else {
        //     this.setState({
        //         isLoading: false,
        //     });
        // }
        //var features = (typeof buses.features !== 'undefined') ? buses.features : 'no features';
        return (
            
            <View style={styles.container}>
                <ScrollView>
                <View style={styles.contentContainer}>
                    <Text style = {styles.bigRect}>Map View here</Text>
                  
                    <View style = {styles.separator}/>
                    <View style={styles.timeSignage}>
                        <Text> Bus start and end time </Text>
                        <View style={styles.rightContainer}>
                            <Text>Signage example:</Text>
                            <Text style={styles.rectangle}>{bus.notes.signage}</Text> 
                        </View>
                    </View>
                    <Text style={styles.features}>{bus.features}</Text>
                    <View style = {styles.separator}/>
                    
                    <View style={styles.listButton}>
                    <TouchableOpacity onPress={this.goBack.bind(this)}>
                        <Text style={styles.buttonText}>Display List</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.goBack.bind(this)}>
                        <Text style={styles.buttonText}>Go Back</Text>
                    </TouchableOpacity>
                    </View>
                    
                </View>
                </ScrollView>
        </View>
        );
    }

    goBack() {
    console.log("go to back");
    this.props.navigator.pop({ screen: 'ShuttleBusList' });
  }
}

var styles = StyleSheet.create({
    contentContainer: {
       flex:1,
        marginTop: 75,
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    features: {
        padding: 10,
        fontSize: 15,
        color: '#656565'
    },
    separator: {
       borderRightWidth: 1,
       borderColor: '#dddddd',
       
   },
   rectangle: {
       height: 100,
       width: 100* 2,
       backgroundColor: 'white',
       borderColor: 'black',
       justifyContent: 'center',
       alignItems: 'center'
   },
   bigRect: {
       height: 200,
       width: 200*2,
       backgroundColor: 'white',
       borderColor: 'black',
       justifyContent: 'center',
       alignItems: 'center'
   },

   container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    image: {
        width: 107,
        height: 165,
        padding: 10
    },
    description: {
        padding: 10,
        fontSize: 15,
        color: '#656565'
    },
     navBar: {
    flex: 0.08,
    backgroundColor: '#942b3c'
    },
    // contentContainer: {
    //     flex:0.8,
    // },
    iconStyle: {
        textAlign: 'center',
        padding: 14,
        width: 50,
        color: 'white'
    },
    navText: {
        marginTop: -40,
        paddingLeft: 50,
        fontSize: 20,
        color: 'white'
    },
    timeSignage: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#Ffcc00',
        padding: 10
    }, 
    rightContainer: {
        flex: 0.3
    },
    listButton: {
        flex:1,
        backgroundColor: '#ffcc00'
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center'
    }
});*/