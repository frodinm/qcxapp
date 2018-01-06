import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Keyboard,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import * as Animatable from 'react-native-animatable'; 
import {Button} from 'react-native-elements'
import {connect} from 'react-redux'
import {resetNavigation} from 'util'
import {setPin} from 'users'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const {height,width} = Dimensions.get('window')
const pinRef = null;

const pinStyle = {
  height:13,
  width:13,
  marginRight:10,
  marginLeft:10,
  borderRadius: 50,
  borderWidth:1,
  borderColor:'black',

}

const mapStateToProps = (state) => ({
  pin: state.user.pin
})
const mapDispatchToProps = (dispatch) => ({
  setPinDispatch : (pin) => dispatch(setPin(pin))
})




class AuthPincode extends Component {
  constructor(){
    super();
    this.state = {
      pinAuth:'',
      error:false,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handlePinReference = this.handlePinReference.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }
  componentDidMount(){
   this.refs.pin1.focus();
  
  }

  componentWillUnmount(){

  }
  handleClick(){
    const {navigation,pin} = this.props;
    if(this.state.pinAuth.length === 4) {
      if (this.state.pinAuth === pin) {
        resetNavigation('Auth', navigation)
      } else {
        this.refs.view1.shake()
        this.refs.view2.shake()
        this.refs.view3.shake()
        this.refs.view4.shake()
        this.setState({
          error: true
        })
      }

    } else {
      this.refs.view1.shake()
      this.refs.view2.shake()
      this.refs.view3.shake()
      this.refs.view4.shake()
      this.setState({
        error: true
      })
    }
  }
  handlePin1Style(){
    if(this.state.pinAuth.length >= 1){
      return {
        ...pinStyle,
        backgroundColor: 'orange',
       
      }
     }else if(this.state.error === true){
      return {
        ...pinStyle,
        backgroundColor: 'transparent',
        borderColor: 'red',
      }
    }else{
      return {
        ...pinStyle,
        backgroundColor: 'transparent',   
      }
    }
  }
  handlePin2Style(){
    if(this.state.pinAuth.length >= 2){
      return {
        ...pinStyle,
        backgroundColor: 'orange',
      }
     }else if(this.state.error === true){
      return {
        ...pinStyle,
        backgroundColor: 'transparent',
        borderColor: 'red',
      }
    }else{
      return {
        ...pinStyle,
        backgroundColor: 'transparent',  
      }
     }
  }
  handlePin3Style(){
    if(this.state.pinAuth.length >= 3){
      return {
        ...pinStyle,
        backgroundColor: 'orange',  
      }
     }else if(this.state.error === true){
      return {
        ...pinStyle,
        backgroundColor: 'transparent', 
        borderColor: 'red',
      }
    }else{
      return {
        ...pinStyle,
        backgroundColor: 'transparent',
      }
     }
  }
  handlePin4Style(){
    if(this.state.pinAuth.length === 4){
      return {
        ...pinStyle,
        backgroundColor: 'orange',   
      }
     }else if(this.state.error === true){
      return {
        ...pinStyle,
        backgroundColor: 'transparent',
        borderColor: 'red',
      }
    }else{
      return {
        ...pinStyle,
        backgroundColor: 'transparent',
       
      }
     }
  }
  handlePinReference(e){
    this.setState({
      pinAuth: e
    })
    setTimeout(()=>{
      if(e.length === 4){
        this.handleClick()
      }
    },100)
  }
  handleFocus(){
    console.log(this.refs.pin1.focus());
  }
  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={"always"} >
          <Text style={{fontSize:18,color:'orange',marginBottom:50}}> Please enter your PIN</Text>
          <View style={{flexDirection:'row'}}>
            <Animatable.View   useNativeDriver={true}  ref="view1" style={this.handlePin1Style()} />
            <Animatable.View   useNativeDriver={true}  ref="view2" style={this.handlePin2Style()} />
            <Animatable.View  useNativeDriver={true}  ref="view3" style={this.handlePin3Style()} />
            <Animatable.View  useNativeDriver={true}  ref="view4" style={this.handlePin4Style()} />
            </View>
          <TextInput secureTextEntry={true} style={styles.pin}  selectionColor={'transparent'} underlineColorAndroid={'transparent'} maxLength={4} ref={'pin1'} keyboardType={'numeric'} onChangeText={(event) => { this.handlePinReference(event) }}/>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: 'white',
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
  pin:{
    opacity: 0,
   
  },
  pin2:{
    ...pinStyle,
  
  },
  pin3:{
    ...pinStyle,
   
  },
  pin4:{
    ...pinStyle,
   
  }
});

export const AuthPinCodeScreen = connect(mapStateToProps,mapDispatchToProps)(AuthPincode);
