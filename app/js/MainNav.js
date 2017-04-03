

import React, { Component } from 'react';
import { Navigator } from 'react-native';

import Main from './Main';
import ShuttleBusTabBar from '../components/BusRouteNavigation/ShuttleBusTabBar';
import AnnouncementTabBar from '../components/EventNavigation/AnnouncementTabBar';

export default class PromotionNav extends Component {
state = {
    title: 'Seletar Aerospace',
    index: 1,
    restoring: false,
  };
     //need to call inside here if u wanna pass between pages
  renderPageScene(route,nav) {
    switch (route.screen) {
         case "Main":
            return <Main navigator = {nav} />
        case "ShuttleBusTabBar":
            return <ShuttleBusTabBar navigator={nav} />
        case "AnnouncementTabBar":
            return <AnnouncementTabBar navigator={nav}/>
    }
  }
    render() {
        return (
            <Navigator
                initialRoute = {{ screen: 'Main'}}
                renderScene = {(route, nav)=> {return this.renderPageScene(route, nav)}} />
       
        );
    }
}
 
