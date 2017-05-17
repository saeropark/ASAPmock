import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet, 
  ScrollView,
  ListView, 
  TouchableHighlight
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { TabNavigator } from "react-navigation";
import {Icon, Button} from "react-native-elements";

import AboutOval from '../../js/AnnouncementLists/AboutOval';
import PromotionNav from './PromotionNav';
import TestDir from '../../js/AnnouncementLists/TestDir';

var REQUEST_URL = 'https://asap-c4472.firebaseio.com/.json';

class OvalTab extends React.Component {
  static navigationOptions = {
        tabBarLabel: 'OVAL'
    }
  render() {
    return <AboutOval />
  }
}

class DirectoryTab extends React.Component {
  static navigationOptions = {
        tabBarLabel: 'Directory'
    }
  render() {
    return <TestDir/>
  }
}

class PromoTab extends React.Component {
  static navigationOptions = {
        tabBarLabel: 'Promotion'
    }
  render() {
    return <PromoList/>
  }
}
class PromoList extends React.Component {
  static navigationOptions = ({ navigation }) => ({
     header: null,
    });
    constructor(props) {
    super(props);
    const navigate = this.props.navigation;
    //const { navigate } = this.props.navigation;
    this.state = {
        isLoading: true, 
        //dataSource is the interface
        dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2)=> row1 !== row2
        })
    };
    }

    componentDidMount() {
        this.fetchData();
    }

    // --- calls Google API ---
    fetchData() {
        fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
            //responseData = this.removeDuplicates(responseData);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData.Promotion),
                //dataSource: this.state.dataSource.cloneWithRows(responseData["items"]),
                isLoading: false
            });
        })
        .done();
    }
    render() {
      //const { navigate } = this.props.navigation;
        return (
            <ListView
                dataSource = {this.state.dataSource}
                renderRow = {this.renderPromotion.bind(this)}
                style = {styles.listView}
            />
        );
    }


    renderPromotion(event) {
        return (
           <TouchableHighlight 
                onPress={() => this.testOnPress(event)}>
                <View>
                    <View style = {styles.container}>
                       <View style={styles.dateColumn}>
                            <View style={{backgroundColor: '#b510d3', flex:0.2}}>
                                <Text style={{color:'white', textAlign:'center'}}> {event.date} </Text>
                            </View>
                            <View style={{backgroundColor: 'white', flex:0.2}}>
                                <Text style={{color: '#b51d03', textAlign: 'center'}}> Month! </Text>
                            </View>
                        </View>
                   
                        <View style = {styles.rightContainer}>
                            <Text style = {styles.title}> {event.title}</Text>
                            <Text style = {styles.detail} numberOfLines={1} >{event.description}</Text>
                        </View>
                    </View>
                    <View style = {styles.separator}/>
                </View>
            </TouchableHighlight>
        );
    }

    testOnPress(event) {
        console.log("TestonPress");
        this.props.navigation.navigate('Info', {event});
    }

    /* to filter JSON data by making the name unique */
    removeDuplicates(obj){
        var array = obj;
        var seenObj = {};
        array = array.filter(function(currentObject) {
            if (currentObject.name in seenObj) {
                return false;
            } else {
                seenObj[currentObject.name] = true;
                return true;
            }
        });
        return array;
    }
}


class PromoDetail extends React.Component {
    constructor(props) {
        super(props);
      //event = this.props.navigation.state.event;
      
    }

    static navigationOptions = ({ navigation }) => ({
        header: null,
       // title: `Title: ${navigation.state.params.data}`,
    });
    
     render() {
        const {params} = this.props.navigation.state;
        const {goBack} = this.props.navigation;
            console.log("Event info page");
            console.log(params);

        return (
            
            <View style={styles.container}>
                <ScrollView>
                <View style={styles.contentContainer}>
                        <Image
                            style={{width: 300, height: 200}}
                            source={{uri: params.event.fileURL}}
                        />
                    </View>
                        
                        <Text style={styles.title}>{params.event.title}</Text>
                        <View style={styles.descriptionContainer}>
                           
                            <View style={styles.iconText}>
                                <Icon
                                    name='today'/>
                                 <Text style={styles.descriptionText}> {params.event.date}</Text>
                            </View>
                            <View style={styles.iconText}>
                                <Icon
                                    name='schedule'/>
                                    <Text style={styles.descriptionText}> {params.event.time}</Text>
                            </View>
                            <View style={styles.iconText}>
                                <Icon
                                    name='place'/>
                                <Text style={styles.descriptionText}> {params.event.location}</Text>
                            </View>
                                <Text style={styles.descriptionText}> {params. event.description}</Text>
                            </View>
                    
                
                <Button
                    color = "#FFFFFF"
                    title ="Back to List"
                    backgroundColor="#FFA500"
                    onPress={() => goBack()} />

                </ScrollView>
        </View>
        );
       
    }
}

const PromoStack = StackNavigator( {
  List: {screen: PromoList},
  Info: {screen: PromoDetail}
})
const FoodTab = TabNavigator({
  Oval: { screen: OvalTab },
  Directory: { screen: DirectoryTab },
  Promotion: { screen: PromoStack}
},
    { mode: 'modal' } // this is needed to make sure header is hidden on ios

);

const FoodStack = StackNavigator({
    Home: {screen: FoodTab},
})

FoodTab.navigationOptions = ({navigation})=> ({
  header: null,
  style: {
    backgroundColor: '#b510d3',
  }, 
});

export default FoodStack;

var styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    thumbnail: {
        width: 53,
        height: 81,
        marginRight: 10
    },
    rightContainer: {
        flexDirection: 'column',
        flex: 0.8,
        padding: 5,
    },
    title: {
        fontSize: 20,
        paddingBottom: 8,
        color: '#b510d3',
    },
    author: {
        color: '#656565'
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    listView: {
        backgroundColor: '#F5FCFF'
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dateColumn: {
        flexDirection: 'column',
        flex: 0.2,
        height: 50,
    },
    detail: {
        padding: 5,
        
    },
    iconText: {
        flex: 1,
        flexDirection: 'row',
        padding: 5
    }
});
