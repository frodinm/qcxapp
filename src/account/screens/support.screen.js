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


export class SupportScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <WebView
        source={{ uri: 'https://support.quadrigacx.com/support/home' }}
        style={{ marginTop: -30 }}
      />
    );
  }
}

