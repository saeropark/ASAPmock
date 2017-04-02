import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  
} from 'react-native';
import ShuttleBusList from './ShuttleBusList';
import Icon from 'react-native-vector-icons/MaterialIcons';

var REQUEST_URL = 'https://api.beeline.sg/routes/63?include_trips=true&include_features=true';

export default class AnnouncementInfo extends Component {
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
     
        var event = this.props.event;
        var imageURI = (typeof event.fileURL !== 'undefined') ? event.fileURL : '';
        //var imageURI = event.fileURL;
        console.log("Event info page");
        console.log(event);

        return (
            
            <View style={styles.container}>
                <ScrollView>
                <View style={styles.contentContainer}>
                    
                        <Text> IMAGE GOES HERE </Text>
                        <Image
                            style={{width: 300, height: 200}}
                            source={{uri: imageURI}}
                        />
                    </View>
                    <Text>Date:{event.date}</Text>
                    <Text>Time: {event.time}</Text>
                    <Text>Location: {event.location}</Text>
       
                    <Text>{event.description}</Text>

                    <TouchableOpacity onPress={this.goBack.bind(this)}>
                        <Text style={styles.buttonText}>Go Back</Text>
                    </TouchableOpacity>
                   
                    
                
                </ScrollView>
        </View>
        );
    }

    goBack() {
    console.log("go to back");
    this.props.navigator.pop({ screen: 'AnnouncementList' });
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