import React,{Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    ScrollView
} from 'react-native';

//import PhotoView from 'react-native-photo-view';
//import PDFView from 'react-native-pdf-view';
var DEFAULT_URL = '../../../img/SAP.png';

export default class SAPMap extends Component {
    constructor(props) {
        super(props);

        this.state ={
            url: DEFAULT_URL,
        }
    }

       

    render(){
        return (
            <View style={styles.pdf}>
            <Text>Hi</Text>
            </View>
        )
     
    }
}
var styles = StyleSheet.create({
    pdf: {
        flex:1
    }
});