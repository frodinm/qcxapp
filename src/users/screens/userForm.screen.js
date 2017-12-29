/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';
import { Akira,Hideo,Hoshi,Sae,Isao  } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';


const mapStateToProps = (state) => ({

})
const mapDispatchToProps = (dispatch) => ({

})



class NewUserForm extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){


  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>

        </Text>
        <WebView
          source={{uri: 'https://www.quadrigacx.com'}}
          style={{marginTop: -30}}
        />

      </View>

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

export const NewUserFormScreen = connect(mapStateToProps,mapDispatchToProps)(NewUserForm);