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
  ScrollView
} from 'react-native';
import MapView from 'react-native-maps';
import ShuttleBusList from './ShuttleBusList';
import Icon from 'react-native-vector-icons/MaterialIcons';

//var REQUEST_URL = 'https://api.beeline.sg/routes/63?include_trips=true&include_features=true';

var {height, width} = Dimensions.get('window');
var bus;
var id;
var markersArray = new Array();

export default class ShuttleBusInfo extends Component {
  //   state = {
  //   title: 'Route Detail',
  //   index: 2,
  //   restoring: false,
   
  // };
  constructor(props) {
    super(props);
    console.log("constructor(props)");
    bus = this.props.bus;
    id = bus.id;

    this.state ={
      markers: [],
      title: 'Route Details',
      index: 2,
      restoring: false,
    }
  }

  componentWillMount() {
    console.log("componentWillMount()");
    this.setState({ showLoading: true });
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
          this.setState({ showLoading: false });
      })
      .done();
  }

  requestURL(bus){
    return 'https://api.beeline.sg/routes/'+ id+'?include_trips=true&include_features=true';
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
    
  render() {

    console.log("render()");

    var results = this.requestURL(bus);
    console.log(bus);

    if (this.state.showLoading === true) {
      this.renderLoadingView();
    }

        return (
            //fetch json data and display
            <View style={styles.container}>
              <ScrollView>
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

                <View style = {styles.separator}/>

                <View style={styles.timeSignage}>
                  <Text> First & Last Bus Time Here </Text>
                  <View style={styles.rightContainer}>
                    <Text>Signage example:</Text>
                    <Text style={styles.rectangle}>{bus.notes.signage}</Text> 
                  </View>
                </View>

                <Text>IMPORTANT NOTES</Text>
                <Text style={styles.features}>{bus.features}</Text>
                <View style = {styles.separator}/>
                
                <View style={styles.listButton}>
                  <TouchableOpacity onPress={this.goDisplayList.bind(this)}>
                    <Text>Display List</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.goBack.bind(this)}>
                    <Text>Go Back</Text>
                  </TouchableOpacity>
                </View>
            </ScrollView>
            </View>
        );
    }

  getBusStopDescriptions(obj){
      console.log("On getBusStopDescriptions()");
      console.log(obj);

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

        // {
        //   title: desc,
        //   coordinates: {
        //     latitude: lat,
        //     longitude: lng
        //   }
        // }
        markersArray.push(stop);

        console.log("");
        console.log(stop);
        console.log("Bus stop " + busStopNo + " info");
        console.log("Name: " + desc);
        console.log("lat: " + lat + ", lng: " + lng);
      }

      // var descriptionObj = {};
      // // //Get descriptions only
      // // for (var i = 0; i < array.length; i++){
      // //     descriptionObj.push(array.trips.tripsStop.stop.descriptions);
      // // }
      // // console.log(this.descriptionObj);
      // return descriptionObj;


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
    },
    map: {
      width: width,
      height: height/2.5
   }
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