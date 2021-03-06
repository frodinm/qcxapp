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
  Dimensions
} from 'react-native';
import LottieView from 'lottie-react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const { height, width } = Dimensions.get('window');



export class OfflineScreen extends Component {


  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount(){
    this.animation.play();
    // Or set a specific startFrame and endFrame with:

  }

  handleReset() {
    if(!this.animation.play()) {
      this.animation.reset();
      this.animation.play();
    }else{
      this.animation.reset();
    }

  }

  render(){
    return (
      <View style={styles.container}>
        <View style={{height: height/5,width: width/1.2,}}>
          <LottieView
            style={styles.offlineLogo}
            ref={animation => {
            this.animation = animation;}}
            source={require('../assets/animation/no_internet_connection.json')} 
            />
            <Text style={styles.info}>
            Unable to load.{"\n"}No Internet Connection 
            </Text>
          </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems:'center',
    
  },
  info: {
    textAlign:'center',
    fontSize:20,
    color:'orange'
  },
  instructions: {
  
  },
  textInput:{
    color:'#000'
  },
  offlineLogo:{
    height: height/2,
    width: width/1.2,
   
    

  }
});