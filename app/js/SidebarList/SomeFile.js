import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View,Alert
 } from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

export default class SomeComponent extends React.Component {

  constructor(props) {
    super();
    this.state = {
      visible: true
    };
  }

  /* eslint react/no-did-mount-set-state: 0 */
  componentDidMount() {
    setInterval(() => {
      this.setState({
        visible: false
      });
    }, 3000);
   
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  gray: {
    backgroundColor: '#cccccc',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
  },
});