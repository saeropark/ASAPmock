/**
 * https://github.com/react-native-community/react-native-side-menu/blob/master/examples/Basic/Basic.js#L107
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View,  Image, Alert, TouchableOpacity} from 'react-native';
import { Tile, Icon ,SideMenu} from 'react-native-elements';
import Drawer from 'react-native-drawer';

//import Icon from 'react-native-vector-icons/MaterialIcons';
import NavBar from '../components/NavBar';
import img from '../../img/jtc.jpg';
import Menu from '../components/Sidebar/Menu';
import MenuNav from '../components/Sidebar/MenuNav';

import SimpleApp from '../components/Sidebar/SideMenu';

class Button extends Component {
  handlePress(e) {
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)}
        style={this.props.style}>
        <View>{this.props.children}</View>
      </TouchableOpacity>
    );
  }
}

export default class Home extends Component {
  //  state = {
  //   isOpen: false,
  //   // selectedItem: 'About',
  // };

  // toggle() {
  //   this.setState({
  //     isOpen: !this.state.isOpen,
  //   });
  // }

  // updateMenuState(isOpen) {
  //   this.setState({ isOpen, });
  // }

  // onMenuItemSelected = (item) => {
  //   this.setState({
  //     isOpen: false,
  //     selectedItem: item,
  //   });
  // }

    constructor(){
        super();
        this.closeControlPanel = this.closeControlPanel.bind(this);
        this.openControlPanel = this.openControlPanel.bind(this);
    }

    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        this._drawer.open()
    };

  render() {
        //const menu = <SideMenu/>
       //const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

        const drawerStyles = {
            drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
            main: {paddingLeft: 3},
        }
    return (
      /*<Drawer
                type="static"
                content={<MenuNav />}
                ref = {(ref) => this._drawer = ref}
                openDrawerOffset={100}
                styles={drawerStyles}
                tweenHandler={Drawer.tweenPresets.parallax}
            >
      <View>
                <Text onPress={this.openControlPanel}>
                    Drawer
                </Text>
                </View>
      </Drawer>
    );*/
      <View>
        <View style={styles.container}>
            <Button style={styles.button} onPress={() => this.toggle()}>
               <Icon
                name='menu'
                //type='ionicon'
                color='#ffcc00'
                />
            </Button>
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

/*<Tile
                
                imageSrc={img}
                title="Seletar Aerospace Park"
                featured
                caption="What would you like to do?"
                //icon= {{ name:'ios-american-football', type:'ionicon',color:'#517fa4'}}
            
                />*/
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
