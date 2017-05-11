import React, { Component } from 'react';
import { Navigator } from 'react-native';


import LunchRoute from '../../js/BusRoute/LunchRoute';
import ShuttleBusInfo from '../../js/ShuttleBusInfo';

export default class AMRouteNav extends Component {
state = {
    title: 'Seletar Aerospace',
    index: 1,
    restoring: false,
  };
     //need to call inside here if u wanna pass between pages
  renderPageScene(route,nav) {
    switch (route.screen) {
         case "LunchRoute":
            return <LunchRoute navigator = {nav} />
        case "ShuttleBusInfo":
            return <ShuttleBusInfo navigator={nav} busData={route.data} />
    }
  }
    render() {
        return (
        
            <Navigator
                initialRoute = {{ screen: 'LunchRoute'}}
                renderScene = {(route, nav)=> {return this.renderPageScene(route, nav)}} />
       
        );
    }
}
 
