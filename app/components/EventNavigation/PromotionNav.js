

import React, { Component } from 'react';
import { Navigator } from 'react-native';

import PromotionList from '../../js/AnnouncementLists/PromotionList';
import AnnouncementInfo from '../../js/AnnouncementInfo';

export default class PromotionNav extends Component {
state = {
    title: 'Seletar Aerospace',
    index: 1,
    restoring: false,
  };
     //need to call inside here if u wanna pass between pages
  renderPageScene(route,nav) {
    switch (route.screen) {
         case "PromotionList":
            return <PromotionList navigator = {nav} />
        case "AnnouncementInfo":
            return <AnnouncementInfo navigator={nav} event={route.data} />
    }
  }
    render() {
        return (
            <Navigator
                initialRoute = {{ screen: 'PromotionList'}}
                renderScene = {(route, nav)=> {return this.renderPageScene(route, nav)}} />
       
        );
    }
}
 
