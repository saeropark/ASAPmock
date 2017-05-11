

import React, { Component } from 'react';
import { Navigator, TouchableOpacity,View,Text, StyleSheet, ScrollView,Button ,Image} from 'react-native';
import Drawer from 'react-native-drawer';
import { Tile, Icon ,SideMenu} from 'react-native-elements';

import { StackNavigator } from 'react-navigation';
import { TabNavigator } from "react-navigation";
import {DrawerNavigator} from "react-navigation";

//import Home from './Home';
import ANavHolder from '../components/AnnouncementNavigation/ANavHolder';
import ENavHolder from '../components/EventNavigation/ENavHolder';
import BNavHolder from '../components/BusRouteNavigation/BNavHolder';
import ShuttleBusTabBar from '../components/BusRouteNavigation/ShuttleBusTabBar';
import EventTabBar from '../components/EventNavigation/EventTabBar';
import AnnounceTabBar from '../components/AnnouncementNavigation/AnnounceTabBar';

import AboutJTC from './SidebarList/AboutJTC';
import ContactUs from './SidebarList/ContactUs';
import SAPMap from './SidebarList/SAPMap';
import TenantDirectory from './SidebarList/TenantDirectory';

export default class MainNav extends Component {
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
        case "ShuttleBusTabBar":
            return <ShuttleBusTabBar navigator={nav} />
        case "EventTabBar":
            return <EventTabBar navigator={nav}/>
        case "AnnounceTabBar":
            return <AnnounceTabBar navigator={nav}/>
        case "ANavHolder":
            return <ANavHolder navigator={nav}/>
        case "BNavHolder":
            return <BNavHolder navigator={nav} />
        case "ENavHolder":
            return <ENavHolder navigator={nav}/>
        case "AboutJTC":
            return <AboutJTC navigator = {nav} />
        case "ContactUs":
            return <ContactUs navigator = {nav} />
        case "SAPMap":
            return <SAPMap navigator = {nav} />
        case "TenantDirectory":
            return <TenantDirectory navigator = {nav} />
        case "Menu":
            return <Menu navigator = {nav} />
    }
  }
    render() {
        return (
            <Navigator
                initialRoute = {{ screen: 'Home'}}
                renderScene = {this.renderPageScene}
                configureScene={(route) => {
                if (route.sceneConfig) {
                    return route.sceneConfig;
                }
                return Navigator.SceneConfigs.FloatFromBottom;}} />

        );
    }
}

class Menu extends Component {
    static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  };
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <ScrollView >

                <Text
                onPress={() => this.props.onItemSelected('AboutJTC')}
                style={styles.item}>
                AboutJTC
                </Text>

                <Text
                onPress={() => this.props.onItemSelected('TenantDirectory')}
                style={styles.item}>
                TenantDirectory
                </Text>

                <Text
                onPress={() => this.props.onItemSelected('SAPMap')}
                style={styles.item}>
                SAP Map
                </Text>

                <Text
                onPress={() => this.props.onItemSelected('ContactUs')}
                style={styles.item}>
                Contact Us
                </Text>
            </ScrollView>
        );
    }


}
class Home extends React.Component {
   constructor(props) {
        super(props);
        this.state = {};
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen,
        });
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen, });
    }

    onMenuItemSelected = (item) => {
        this.setState({
            isOpen: false,      
            selectedItem: item,
        });
        this.props.navigator.replace({ screen: item });
    }

    // constructor(){
    //     super();
    //     this.closeControlPanel = this.closeControlPanel.bind(this);
    //     this.openControlPanel = this.openControlPanel.bind(this);
    // }

    // closeControlPanel = () => {
    //     this._drawer.close()
    // };
    // openControlPanel = () => {
    //     this._drawer.open()
    // };

  render() {
        // const drawerStyles = {
        //     drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
        //     main: {paddingLeft: 3},
        // }

          const menu = <Menu onItemSelected={this.onMenuItemSelected} navigator={this.props.navigator}/>;
    return (
        <View style={styles.container}>
             <SideMenu
              menu={menu}
              isOpen={this.state.isOpen}
              onChange={(isOpen) => this.updateMenuState(isOpen)}>
                <View style={styles.container}>
                   
                    <Icon
                    style={styles.button} onPress={() => this.toggle()}
                        name='menu'
                        //type='ionicon'
                        color='#ffcc00'
                        />
                </View>

                <Image
                    source={require('../../img/SAPjtc.jpg')}
                    style={styles.imgContainer}>
                    <Text style={styles.welcome}>
                        What would you like to do?
                    </Text>
                    <Text style={styles.instructions}>
                        To get started, edit index.ios.js
                    </Text>
                    <View style={styles.iconCon}>

                        <Icon
                            reverse
                            name='announcement'
                            //type='ionicon'
                            color='#ffcc00'
                            onPress={() => {  this._onPressAnnouncementButton()}}
                            onLongPress={() => {this._onPressAnnouncementButton()}}
                        />
                        
                        <Icon
                            reverse
                            name='event'
                            //type='ionicon'
                            color='red'
                            onPress={() => {  this._onPressEventButton()}}
                            onLongPress={() => {this._onPressEventButton()}}
                        />

                        <Icon
                            reverse
                            name='directions-bus'
                            //type='ionicon'
                            color= '#b510d3'//color='#517fa4'
                            onPress={() => { this._onPressBusButton()}}
                            onLongPress={() => {this._onPressBusButton()}}
                            />
                    </View>
                </Image>
       </SideMenu>   
      {/*<Drawer
                type="static"
                content={ menu}
                ref = {(ref) => this._drawer = ref}
                openDrawerOffset={100}
                styles={drawerStyles}
                tweenHandler={Drawer.tweenPresets.parallax}
            >
     
                <Text onPress={this.openControlPanel}>
                    Drawer
                </Text>
                
      </Drawer>*/}
      </View>
    );
  }

   _onPressBusButton() {
      this.props.navigator.push({
           screen: 'ShuttleBusTabBar',
           
       });
  }

  _onPressEventButton() {
      this.props.navigator.push({
          screen: 'ENavHolder'
      });
  }

  _onPressAnnouncementButton() {
    this.props.navigator.push({
          screen: 'ANavHolder'
      });
  }
        

}



const styles = StyleSheet.create({

welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  instructions: {
    textAlign: 'center',
    fontColor: '#ffffff',
    marginBottom: 5,

  },
imgContainer: {
    flex:1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
},
button: {
    position: 'absolute',
    top: 20,
    padding: 10,
    },
iconCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingTop: -20,
},
  container: {
    flex: 0.1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    
    
  },
  instructions: {
    
    color: '#333333',
    marginBottom: 5,
  },
  navBar: {
    flex: 0.08,
    backgroundColor: '#942b3c'
  },
  contentContainer: {
    flex:0.8,
  },
  iconStyle: {
    textAlign: 'center',
    padding: 14,
    width: 50,
    color: 'white'
  },
  navText: {
    marginTop: -40,
    paddingLeft: 50,
    fontSize: 20,
    color: 'white'
  },

  eventContainer: {
    
    padding: 10,
    flex: 0.5,
    backgroundColor: 'pink'
  },

  announcementContainer: {

    padding: 10,
    flex:0.5,
    backgroundColor: 'yellow'
  },
  promotionContainer: {
 
    padding: 10,
    flex: 0.5,
    backgroundColor: 'green'
  }
});
