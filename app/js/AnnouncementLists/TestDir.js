import React,{Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    ListView,
    TouchableOpacity, Linking
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

var REQUEST_URL = 'https://asap-c4472.firebaseio.com/.json';
var DIR_LIST =[];
export default class TestDir extends Component {

  constructor(props) {
        super(props);
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
           this.getList(responseData.Directory);
           this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData.Directory),
                //dataSource: this.state.dataSource.cloneWithRows(responseData["items"]),
                isLoading: false
            });
        })
        .done();
    }

    //----- getList will create as a new object called newList and store into an array called DIR_LIST. Will be called later under ListCollapseView
    getList(obj){
        DIR_LIST.length=0;
        try{
            var noOfDir = obj.length;   
            for (var i=1; i<noOfDir+1; i++ ){
                var newName = obj[i].name; 
                var newAddress = obj[i].address;
                var newHours = obj[i].hours;
                var newType = obj[i].type;
                var newWebsite = obj[i].website;

                var newList = new Object();
                newList.title = newName;
                newList.desc = newAddress;
                if(obj[i]!= 'undefined') {
                    newList.hour = newHours;
                    newList.site = newWebsite;
                } else {
                    newList.hour = "Currently nothing available";
                    newList.site = "No Website or Facebook";
                }
                DIR_LIST.push(newList);
            }
        }
        catch (err) {
            console.log("error: " + err);
        }
    }

    render() {
        return (
           <View style={styles.container}>
                <ListCollapseView/>
            </View>
        );
    }
}

//-------------- DROP DOWN MENU CLASS ----------------------//
class ListCollapseView extends React.Component {
  state = {
    activeSection: false,
    collapsed: true,
  };

  _toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  _setSection(section) {
    this.setState({ activeSection: section });
  }

  

  _renderHeader(section, i, isActive) {
    return (
      <Animatable.View duration={400} style={[styles.header, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
        <Text style={styles.headerText}>{section.title}</Text>
        <Text style={{padding: 10,}}>{section.desc}</Text>
      </Animatable.View>
    );
  }

  _renderContent(section, i, isActive) {
    return (
      <Animatable.View duration={400}  style={[styles.content, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>Operating Hours: {section.hour}</Animatable.Text>
         <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>Website: {section.site}</Animatable.Text>
      </Animatable.View>
    );
  }
  handleClick(url) {
      //  var myurl = url.site;
      //  console.log("URL: "+ myurl);
      Linking.openURL(url);
    }

   
  render() {
    return (
      <View style={styles.dContainer}>
        <ScrollView>
        <Accordion
          activeSection={this.state.activeSection}
          sections={DIR_LIST}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          duration={400}
          onChange={this._setSection.bind(this)}
        />
        </ScrollView>

      </View>
    );
  }
}

var styles = StyleSheet.create({
   container: {
       flex:1,
       backgroundColor: '#FFFFFF',
   },

  //------- Dropdowwn stylng -------//
  dContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  headerText: {
    color: '#d510d3',
    fontSize: 18,
    fontWeight: '500',
    padding: 10,
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  inactive: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  active: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
});
