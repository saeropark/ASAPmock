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
import { Icon } from 'react-native-elements';


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
        var imageURI = (typeof event.fileURL !== 'undefined') ? event.fileURL : '../../../img/SAP.png';
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
                 
                        <Text style={styles.title}>{event.title}</Text>
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
                        
                    </View>
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
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    contentContainer: {
       flex:1,
        marginTop: 75,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    
    descriptionContainer: {
        padding: 10,
        flexDirection: 'row'
    },
    rightContainer: {
        flex: 1,
        padding: 5,
    },

    title: {
        padding: 10,
        fontSize: 20,
        paddingBottom: 8,
        color: '#b510d3',
    },

    buttonText: {
        padding: 10,
    },

    iconColumn: {
        flexDirection: 'column',
        flex: 0.2,
        height: 50,
    },
    
    descriptionText: {
        fontSize: 18,
    }
});