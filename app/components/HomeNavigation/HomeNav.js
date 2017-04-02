

import React, { Component } from 'react';
import { Navigator } from 'react-native';

import Home from '../../js/Home';
import AnnouncementInfo from '../../js/AnnouncementInfo';

export default class HomeNav extends Component {
state = {
    title: 'Seletar Aerospace',
    index: 1,
    restoring: false,
  };
     //need to call inside here if u wanna pass between pages
  renderPageScene(route,nav) {
    switch (route.screen) {
         case "Home":
            return <Home navigator = {nav} />
        case "AnnouncementInfo":
            return <AnnouncementInfo navigator={nav} event={route.data} />
    }
  }
    render() {
        return (
            <Navigator
                initialRoute = {{ screen: 'Home'}}
                renderScene = {(route, nav)=> {return this.renderPageScene(route, nav)}} />
       
        );
    }
}
 
