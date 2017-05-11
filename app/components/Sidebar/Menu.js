import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
  container: {
      flex: 1
  }
});

export default class Menu extends Component {
  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  };

  render() {
    return (
        <View>
          <TouchableOpacity onPress={this.goAbout.bind(this)}>
            <Text style={styles.buttonText}>About JTC</Text>
        </TouchableOpacity>
          </View>
      //<ScrollView scrollsToTop={false} style={styles.menu}>

        /*<Text
          onPress={() => this.props.onItemSelected('About')}
          style={styles.item}>
          About
        </Text>

        <Text
          onPress={() => this.props.onItemSelected('Contacts')}
          style={styles.item}>
          Contacts
        </Text>*/
        /*<View>*
        <TouchableHighlight onPress={this.goAbout.bind(this)}>
            <Text style={styles.buttonText}>About JTC</Text>
        </TouchableHighlight>
        {/*<TouchableOpacity onPress={this.goTenant.bind(this)}>
            <Text style={styles.buttonText}>Cotact Us</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.goMap.bind(this)}>
            <Text style={styles.buttonText}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.goContact.bind(this)}>
            <Text style={styles.buttonText}>Cotact Us</Text>
        </TouchableOpacity>
        </View>*/
      //</ScrollView>
      
    );
  }

  goAbout() {
    console.log("go to back");
    this.props.navigator.push({ screen: 'AboutJTC' });
  }
   goTenant() {
    console.log("go to back");
    this.props.navigator.push({ screen: 'TenantDirectory' });
  }
   goMap() {
    console.log("go to back");
    this.props.navigator.push({ screen: 'SAPMap' });
  }

  goContact() {
    console.log("go to back");
    this.props.navigator.pop({ screen: 'ContactUs' });
  }
};