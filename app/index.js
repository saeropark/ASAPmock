import React, { Component } from 'react';
import {AppRegistry, Navigator, StyleSheet, View} from 'react-native';
//import Home from './js/Home';
import BottomTab from './components/BottomTab';
import Drawer from './components/Drawer';
// import ShuttleBusList from './js/ShuttleBusList';
// import ShuttleBusInfo from './js/ShuttleBusInfo';
// import AnnouncementList from './js/AnnouncementList';
// import AnnouncementInfo from './js/AnnouncementInfo';

export default class ASAPmock extends Component {
    render() {
        return (
            //<View style={styles.container}>
           <BottomTab />
            /*<Navigator
                initialRoute = {{ screen: 'BottomTab'}}
                renderScene = {(route, nav)=> {return this.renderScene(route, nav)}} />*/
            //</View>
        );
    }

    //need to call inside here if u wanna pass between pages
//   renderScene(route,nav) {
//     switch (route.screen) {
//         case "Home":
//             return <Home navigator={nav} />

//         case "ShuttleBusInfo":
//             return <ShuttleBusInfo navigator={nav} bus={route.data} />

//         case "ShuttleBusList":
//             return <ShuttleBusList navigator={nav} />

//         case "AnnouncementList":
//             return <AnnouncementList navigator={nav} />
        
//         case "BottomTab":
//             return <BottomTab navigator = {nav} />
        
//         case "TopTab":
//             return <TopTab navigator = {nav} />
    
    
//     }
//   }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFFFFF',
        borderColor: '#FFFFFF'
    }
});

AppRegistry.registerComponent('ASAPmock', () => ASAPmock);
