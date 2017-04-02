import React, { Component } from 'react';
import { Navigator } from 'react-native';


import PMRoute from '../../js/BusRoute/PMRoute';
import ShuttleBusInfo from '../../js/ShuttleBusInfo';

export default class PMRouteNav extends Component {
state = {
    title: 'Seletar Aerospace',
    index: 1,
    restoring: false,
  };
     //need to call inside here if u wanna pass between pages
  renderPageScene(route,nav) {
    switch (route.screen) {
         case "PMRoute":
            return <PMRoute navigator = {nav} />
        case "ShuttleBusInfo":
            return <ShuttleBusInfo navigator={nav} bus={route.data} />
    }
  }
    render() {
        return (
        
            <Navigator
                initialRoute = {{ screen: 'PMRoute'}}
                renderScene = {(route, nav)=> {return this.renderPageScene(route, nav)}} />
       
        );
    }
}
 
