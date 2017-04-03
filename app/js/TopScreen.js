import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';

import ViewPager from 'react-native-viewpager';
//var ViewPager = require('./ViewPager');
var deviceWidth = Dimensions.get('window').width;

var IMGS = [
  'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
  'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
  'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
  'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
  'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
  'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
  'https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024'
];

var TopScreen = React.createClass({
  getInitialState: function() {
    var dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });

    return {
      dataSource: dataSource.cloneWithPages(IMGS),
    };
  },

  render: function() {
    return (
     
          <ViewPager
                style={this.props.style}
                dataSource={this.state.dataSource}
                renderPage={this._renderPage}
                isLoop={true}
                autoPlay={false}/>
         
      
       
    );
  },

  _renderPage: function(
    data: Object,
    pageID: number | string,) {
    return (
        <View style={styles.container}>
        <ScrollView>
        <View style={styles.eventContainer}>
          <Text style={styles.welcome}> Events</Text>
      <Image
        source={{uri: data}}
        style={styles.page} />
         </View>

        <View style={styles.promotionContainer}>
          <Text style={styles.welcome}> Promotion </Text>
        </View>

        <View style={styles.announcementContainer}>
          <Text style={styles.welcome}> Announcement </Text>
         </View>
      </ScrollView>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  page: {
    width: deviceWidth,
  },
});

module.exports = TopScreen;