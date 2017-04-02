import React, { Component } from 'react';
import { Navigator } from 'react-native';
import Home from '../js/Home';
//import BottomTab from './BottomTab';
import ShuttleBusList from '../js/ShuttleBusList';
import ShuttleBusInfo from '../js/ShuttleBusInfo';
import AnnouncementList from '../js/AnnouncementLists/AnnouncementList';
import AnnouncementInfo from '../js/AnnouncementInfo';
import TestRoute from './TestRoute';
import AMRoute from './BusRoute/AMRoute';
import PMRoute from './BusRoute/PMRoute';
import LunchRoute from './BusRoute/LunchRoute';

export default class TestNav extends Component {
state = {
    title: 'Seletar Aerospace',
    index: 1,
    restoring: false,
  };
     //need to call inside here if u wanna pass between pages
  renderPageScene(route,nav) {
    switch (route.screen) {
        case 'AMRoute':
        return <AMRoute navigator={nav}/>; //<View style={[ styles.page, { backgroundColor: '#ff4081' } ]} />
        case 'PMRoute':
        return <PMRoute navigator={nav} />;
        case 'LunchRoute':
        return <LunchRoute navigator={nav} />;
        case "ShuttleBusInfo":
            return <ShuttleBusInfo navigator={nav} bus={route.data} />

       
        
        case "TestRoute":
            return <TestRoute navigator = {nav} />
    }
  }
    render() {
        return (
        
            <Navigator
                initialRoute = {{ screen: 'TestRoute'}}
                renderScene = {(route, nav)=> {return this.renderPageScene(route, nav)}} />
       
        );
    }
}
 
