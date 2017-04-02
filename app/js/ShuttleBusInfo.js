import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
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
//            bus = this.props.bus;
       
//     }

    render() {
     
        var bus = this.props.bus;
        console.log("Shuttle bus info page");
        console.log(bus);
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
});