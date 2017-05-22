import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet, 
  Platform,
  TouchableOpacity,
} from 'react-native';

import Communications from 'react-native-communications';
import {Button} from 'react-native-elements';

export default class SendFeedback extends Component {
    //--- EMAIL PARAMETERS: ---//
    /**
     * email(to, cc, bcc, subject, body)
        to - String Array
        cc - String Array
        bcc - String Array
        subject - String
        body - String
     */
    render() {
        return (
            <View style={styles.container}>
            <Text style={styles.welcome}> Let us know your feedback!</Text>
            <Button
                    color = "#FFFFFF"
                    title ="Send an email feedback"
                    backgroundColor="#FFA500"
                    onPress={() => Communications.email(['jtc.saeropark@gmail.com'],null,null,'SAP App Feedback', 'Please leave your name and contact details behind.')}/>
            <Button
            color = "#FFFFFF"
            title ="General Enquiries"
            backgroundColor="#FFA500"
            onPress={() => Communications.email(['askjtc@jtc.gov.sg'],null,null,'JTC General Enquiries','Please leave your name and contact details behind.')}/>
          
            </View>
        );
        }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(253,253,253)',
  },
  holder: {
    flex: 0.25,
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    marginBottom: 5,
    padding: 10,

  },
});