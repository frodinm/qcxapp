import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Animated,
  WebView
} from 'react-native';


export class RegisterScreen extends Component {

  constructor(props) {
    super(props);
  }

  render(){
    return (
        <WebView
          source={{uri: 'https://www.quadrigacx.com/?ref=ung7r61g9m76cswgv7jpwycx'}}
          style={{marginTop: -30}}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textInput:{
    color:'#000'
  }
});

