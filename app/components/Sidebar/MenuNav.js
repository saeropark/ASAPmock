import React, { Component } from 'react';
import { Navigator } from 'react-native';

import Menu from './Menu';
import AboutJTC from '../../js/SidebarList/AboutJTC';
import ContactUs from '../../js/SidebarList/ContactUs';
import SAPMap from '../../js/SidebarList/SAPMap';
import TenantDirectory from '../../js/SidebarList/TenantDirectory';

export default class MenuNav extends Component {
state = {
    title: 'Seletar Aerospace',
    index: 1,
    restoring: false,
  };
     //need to call inside here if u wanna pass between pages
  renderPageScene(route,nav) {
    switch (route.screen) {
         case "Menu":
            return <Menu navigator = {nav} />
        case "AboutJTC":
            return <AboutJTC navigator = {nav} />
        case "ContactUs":
            return <ContactUs navigator = {nav} />
        case "SAPMap":
            return <SAPMap navigator = {nav} />
        case "TenantDirectory":
            return <TenantDirectory navigator = {nav} />
    }
  }
    render() {
        return (
            <Navigator
                initialRoute = {{ screen: 'Menu'}}
                renderScene = {(route, nav)=> {return this.renderPageScene(route, nav)}} />
       
        );
    }
}
 
