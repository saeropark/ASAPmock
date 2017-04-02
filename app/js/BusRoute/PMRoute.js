import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableOpacity,
  ActivityIndicator, Platform, Navigator
} from 'react-native';
//import ShuttleBusInfo from '../ShuttleBusInfo';


var REQUEST_URL = 'https://api.beeline.sg/routes/search_by_region?regionId=24&areaName=North-east%20Region';

var styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#Ffcc00',
        padding: 10
    },
    thumbnail: {
        width: 53,
        height: 81,
        marginRight: 10
    },
    rightContainer: {
        flex: 1
    },
    title: {
        fontSize: 20,
        marginBottom: 8
    },
    author: {
        color: '#656565'
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    listView: {
        backgroundColor: '#f5fcff' 
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#ffcc00',
        height: Platform.OS === 'ios' ? 44 : 56,
        
    }
});

// var bus ;
// const routes = [
//     {screen: 'PMRoute', index: 0},
//     {screen: 'ShuttleBusInfo', index: 1},
// ]

export default class PMroute extends Component {
    state = {
        title: 'PMRoute',
        index: 1,
        restoring: false,
    // bus: this.props.bus,
  };

  
    constructor(props) {
        super(props);
        //bus = this.props.bus;
        //this.showShuttleBusInfo = this.showShuttleBusInfo.bind(this)

        this.state = {
            //objectFromChild: null,
            isLoading: true, 
            //dataSource is the interface
            dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2)=> row1 !== row2
            })
        };
    }
    /** retrieve props child 
    myCallback(dataFromChild) {
        this.setState({ objectFromChild: dataFromChild});
    }*/
    componentDidMount() {
        this.fetchData();
        this.showShuttleBusInfo();
    }

    // --- calls Google API ---
    fetchData() {
        fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
            responseData = this.removeDuplicates(responseData);
            responseData = this.displayPM(responseData);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData),
                //dataSource: this.state.dataSource.cloneWithRows(responseData["items"]),
                isLoading: false
            });
        })
        .done();
    }

    
    render() {
     

        if (this.state.isLoading) {
            this.renderLoadingView();   
        }
       
        
        return (
          <View style={styles.mainContainer}>
         
            {/*<NavBar />*/}
            <ListView
                dataSource = {this.state.dataSource}
                renderRow = {this.renderBook.bind(this)}
                style = {styles.listView}
               
           />
            
            </View>
            
        );
    }

    // _renderScene(route, nav) {
    //         switch (route.screen) {
           
    //         case "ShuttleBusInfo":
    //             return <ShuttleBusInfo navigator= {nav} bus={route.data} />

    //         default:
    //             return null;
    //         }
    //     };
    renderLoadingView() {
        return (
            <View style = {styles.loading}>
                <ActivityIndicator
                    size = 'large' />
                <Text> Loading bus... </Text>
            </View>
        );
    }

    

    renderBook(bus) {
        console.log("PM ROUTE check for bus:");
        console.log(bus);
        return (

            <View>
            
            <TouchableOpacity onPress={() => this.showShuttleBusInfo(bus)} >
                 {/*onPress={() => this.showShuttleBusInfo(bus)} */}
                
                    <View style = {styles.container}>
                        <View style = {styles.rightContainer}>
                            <Text style = {styles.title}>{bus.name}</Text>
                            <Text style = {styles.detail}>{bus.label}</Text>
                            <Text style = {styles.detail}>{bus.schedule}</Text>
                        </View>
                    </View>
                <View style = {styles.separator}/>
               
            </TouchableOpacity>
             </View>
        );
    }

   
    
    showShuttleBusInfo(bus) {
        console.log("showShuttleBusInfo(bus)");
        console.log(bus);

       this.props.navigator.push({
           screen: 'ShuttleBusInfo',
           data: bus
       });
    
   }

    //back to home
    goHome() {
      console.log("go Home");
      //this.props.navigator.pop({ screen: 'Home'});
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

    /* Filter to AM */
    displayPM(obj) {
        var array = obj;
        array = array.filter(function(currentObject) {
            if ((currentObject.label).includes("PM")){
                return true;
            } else {
                return false;
            }
        });
        return array; 
    }
}

