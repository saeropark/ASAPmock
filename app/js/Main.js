import React, { Component } from 'react';
import { StyleSheet, Text, View,  Image, Alert} from 'react-native';
import { Tile, Icon } from 'react-native-elements';


//import Icon from 'react-native-vector-icons/MaterialIcons';
import NavBar from '../components/NavBar';
import img from '../../img/jtc.jpg';


export default class Main extends Component {
 
  
  render() {
    return (
    <View style={styles.container}>
      <Tile
        imageSrc={img}
        title="Seletar Aerospace Park"
        featured
        caption="What would you like to do?"
        //icon= {{ name:'ios-american-football', type:'ionicon',color:'#517fa4'}}
      
        />
        <View style={styles.iconCon}>

        <Icon
        reverse
        name='announcement'
        //type='ionicon'
        color='#ffcc00'
            onPress={() => { 
            this._onPressAnnouncementButton()
        }}
        onLongPress={() => {
            this._onPressAnnouncementButton()
        }}
        />
      
        <Icon
            reverse
            name='directions-bus'
            //type='ionicon'
            color= '#b510d3'//color='#517fa4'
             onPress={() => { 
               this._onPressBusButton()
            }}
            onLongPress={() => {
                this._onPressBusButton()
            }}
            />

            
        </View>
    </View>
            );
  }  

  _onPressBusButton() {
      this.props.navigator.push({
           screen: 'ShuttleBusTabBar',
           
       });
  }

  _onPressAnnouncementButton() {
      this.props.navigator.push({
          screen: 'AnnouncementTabBar'
      });
  }
        
}

const styles = StyleSheet.create({
    iconCon: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingTop: -20,
    },
  container: {
    flex: 1,
    //backgroundColor: '#F5FCFF',
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
