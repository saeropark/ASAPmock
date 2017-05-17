/* Example: https://github.com/react-community/react-navigation/blob/master/examples/NavigationPlayground/js/Drawer.js */

import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet, 
  Platform,
} from 'react-native';
import { StackNavigator, DrawerNavigator} from 'react-navigation';
import { Icon , Button} from 'react-native-elements'

import ContactUs from './SidebarList/ContactUs';
import AboutJTC from './SidebarList/AboutJTC';
import TenantDirectory from './SidebarList/TenantDirectory';
import SAPMap from './SidebarList/SAPMap';
import TestDir from './AnnouncementLists/TestDir';

import FoodStack from '../components/EventNavigation/TestFnB';
import EventStack from '../components/AnnouncementNavigation/TestEventAnn';
import RouteStack from '../components/BusRouteNavigation/TestBusRoute';

import TestCollapse from './SidebarList/TestCollapse';
//======== SCREEN ON LOAD ===========
class MyHomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({

    title: 'Seletar Aerospace Park',
    drawerLabel: 'Home',
    headerLeft: (
        <View style={{padding:10}}>
            <Icon
                onPress={() => navigation.navigate('DrawerOpen')}
                name='menu'
                //type='ionicon'
                color='black'
            />
        </View>
    )
  });

  render() {
    return (
        <View style= {styles.container}>
        
         <Image
          source={require('../../img/avia1.jpg')}
          style={styles.imgContainer}>
          
         <View style={{paddingHorizontal: 80, paddingBottom:40, backgroundColor: 'rgba(52, 52, 52, 0.6)', top: 200,}}>
          <Text style={styles.welcome}>
            What would you like to do?
          </Text>
          <Text style={styles.instructions}>
            Select one to begin
          </Text>
           <View style={styles.iconCon}>
               <View style={styles.iconContainer}>
                
            <Icon
                reverse
                name='event'
                //type='ionicon'
                color='#ffcc00'
                onPress={() => this.props.navigation.navigate('Announcement')}
            />
            <Text style={styles.instructions}>Events</Text>
            </View>
            
            <View style = {styles.iconContainer}>
            
            <Icon
                reverse
                name='local-dining'
                //type='ionicon'
                color='red'
                onPress={() => this.props.navigation.navigate('Food')}
            />
            <Text style={styles.instructions}>F&B</Text>
            </View>
            <View style={styles.iconContainer}>
            <Icon
                reverse
                name='directions-bus'
                //type='ionicon'
                color= '#b510d3'//color='#517fa4'
                onPress={() => this.props.navigation.navigate('Bus')}
                />
                <Text style={styles.instructions}>Shuttle bus</Text>
            </View>
        </View>
        </View>
      </Image>
      </View>
    );
  }
}


//======== CLASS TO CALL CONTACT US PAGE ============
class Contact extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Contact Us',
        drawerLabel: 'Contact Us'
    });
    render() {
        const { params } = this.props.navigation.state;
        return <ContactUs />
    }
}
//======== CLASS TO CALL About JTC PAGE ============
class About extends React.Component {
    static navigationOptions = ({navigation}) => ({
       
        title: 'About JTC',
        drawerLabel: 'About JTC'
    });
    render() {
        const { params } = this.props.navigation.state;
        return <AboutJTC />
    }
}

//======== CLASS TO CALL Tenant Directory PAGE ============
class Tenant extends React.Component {
    static navigationOptions = ({navigation}) => ({
       
        title: 'Tenant Directory',
        drawerLabel: 'Tenant Directory'
    });
    render() {
        const { params } = this.props.navigation.state;
        return <TestDir />
    }
}


//========CLASS TO CALL SAP MAP PAGE ============
class MapSAP extends React.Component {
    static navigationOptions = ({navigation}) => ({
       
        title: 'Map of SAP',
        drawerLabel: 'Map of SAP'
    });
    render() {
        const { params } = this.props.navigation.state;
        return <SAPMap />
    }
}

//========CLASS TO CALL SHUTTLE BUS PAGE ============
class ShuttleBus extends React.Component {
  static navigationOptions = ({navigation}) => ({
       
        title: 'Shuttle Bus service',
        drawerLabel: 'Shuttle Bus'
    });
    render() {
        const { params } = this.props.navigation.state;
        return <RouteStack />
    }
}

//========CLASS TO CALL ANNOUNCEMENT PAGE ============
class Announcement extends React.Component {
  static navigationOptions = ({navigation}) => ({
        title: 'Events & Announcements',
        drawerLabel: 'Events & Announcements'
    });
    render() {
        const { params } = this.props.navigation.state;
        return <EventStack />
    }
}

//========CLASS TO CALL FOOD N BEVERAGE PAGE ============
class FoodBev extends React.Component {
    static navigationOptions = ({navigation}) => ({
       
        title: 'Food & Beverage',
        drawerLabel: 'Food & Beverage'
    });
    render() {
        const { params } = this.props.navigation.state;
        return <FoodStack />
    }
}

class CollapseView extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Collapse View Test',
        drawerLabel: 'Collapse View'
    })
    render() {
        const { params } = this.props.navigation.state;
        return <TestCollapse/>
    }
}


/**
 * StackNavigator is like a collection to compile the different screens.\.
 * 
 */
const HomeStack = StackNavigator({
    //Home: {screen: DrawerExample},
    Home: {screen: MyHomeScreen},
    Announcement: {screen: Announcement},
    Food: {screen: FoodBev},
    Bus: {screen: ShuttleBus},
    ContactUs: {screen: Contact},
    AboutJTC: {screen: About},
    Tenant: {screen: Tenant},
    SAPMap: {screen: MapSAP},
    
    //Collapse: {screen: CollapseView},
},
    {
        header: {
            style: {
                backgroundColor: '#b510d3',
            }
        }
    }
)

/**
 * DrawerNavigator is a sidebar functionality that calls the sliding panel.
 * SideBar 'Home' will call HomeStack, a StackNavigator.
 * Announcements to Contact us will be the list of links for user to click. 
 */
const SideBar = DrawerNavigator({
    Home: {screen: HomeStack},
    AboutJTC: {screen: About},
    Announcement: {screen: Announcement},
    Food: {screen: FoodBev},
    Bus: {screen: ShuttleBus},
    Tenant: {screen: Tenant},
    SAPMap: {screen: MapSAP},
    ContactUs: {screen: Contact},
   // Collapse: {screen: CollapseView},
 }, 

{
//   initialRouteName: 'Drafts',
   contentOptions: {
     activeTintColor: '#e91e63',
   },
  
 }
);

HomeStack.navigationOptions = {
  
}
export default SideBar;




const styles = StyleSheet.create({
    iconContainer: {
        flexDirection: 'column',
        height: undefined,
        
    },
container: {
    flex:1,
},
 
welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  instructions: {
    textAlign: 'center',
    color: '#ffffff',
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
iconCon: {
    flexDirection: 'row',
    justifyContent: 'center',
 
    paddingTop: -20,
},
  contentContainer: {
    flex:0.8,
  },
  iconStyle: {
    textAlign: 'center',
    padding: 14,
    
    color: 'white'
  },
});
