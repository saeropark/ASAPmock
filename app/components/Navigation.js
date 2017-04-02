import React, { Component } from 'react';
import { Navigator } from 'react-native';
import Home from '../js/Home';
import BottomTab from './BottomTab';
import ShuttleBusList from '../js/ShuttleBusList';
import ShuttleBusInfo from '../js/ShuttleBusInfo';
import AnnouncementList from '../js/AnnouncementLists/AnnouncementList';
import AnnouncementInfo from '../js/AnnouncementInfo';

export default class Navigation extends Component {
state = {
    title: 'Seletar Aerospace',
    index: 1,
    restoring: false,
  };
     //need to call inside here if u wanna pass between pages
  renderPageScene(route,nav) {
    switch (route.screen) {
        case "Home":
            return <Home navigator={nav} />

        case "ShuttleBusInfo":
            return <ShuttleBusInfo navigator={nav} bus={route.data} />

        case "ShuttleBusList":
            return <ShuttleBusList navigator={nav} />

        case "AnnouncementList":
            return <AnnouncementList navigator={nav} />
        
        case "BottomTab":
            return <BottomTab navigator = {nav} />
        
        case "TopTab":
            return <TopTab navigator = {nav} />
    }
  }
    render() {
        return (
        
            <Navigator
                initialRoute = {{ screen: 'ShuttleBusList'}}
                renderScene = {(route, nav)=> {return this.renderPageScene(route, nav)}} />
       
        );
    }
}
 
