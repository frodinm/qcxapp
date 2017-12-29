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
import {Button} from 'react-native-elements'
import {connect} from 'react-redux'
import {resetNavigation} from 'util'
import {setPin} from 'users'

const {height,width} = Dimensions.get('window')
const pinRef = null;

const pinStyle = {
  height:40,
  width:40,
  borderRadius: 50,
  borderWidth:2,
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
  //  console.log(this.refs.pin1)
  //  pinRef = this.refs.pin1;
  //  console.log(pinRef);
  }

  componentWillUnmount(){

  }
  handleClick(){
    const {navigation,pin} = this.props;
    if(this.state.pinAuth.length === 4) {
      if (this.state.pinAuth === pin) {
        resetNavigation('Auth', navigation)
      } else {
        alert('Entered pin was not valid');
        this.setState({
          error: true
        })
      }

    } else {
      alert('Entered pin was not valid');
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
        position: 'relative',
        right: 70,
      }
     }else if(this.state.error === true){
      return {
        ...pinStyle,
        backgroundColor: 'transparent',
        position: 'relative',
        right: 70,
        borderColor: 'red',
      }
    }else{
      return {
        ...pinStyle,
        backgroundColor: 'transparent',
        position: 'relative',
        right: 70,
      }
    }
  }
  handlePin2Style(){
    if(this.state.pinAuth.length >= 2){
      return {
        ...pinStyle,
        backgroundColor: 'orange',
        position: 'relative',
        top: -40,
        right:20

      }
     }else if(this.state.error === true){
      return {
        ...pinStyle,
        backgroundColor: 'transparent',
        position: 'relative',
        borderColor: 'red',
        top: -40,
        right:20
      }
    }else{
      return {
        ...pinStyle,
        backgroundColor: 'transparent',
        position: 'relative',
        top: -40,
        right:20
      }
     }
  }
  handlePin3Style(){
    if(this.state.pinAuth.length >= 3){
      return {
        ...pinStyle,
        backgroundColor: 'orange',
        position: 'relative',
        top: -40*2,
        right: -30,
      }
     }else if(this.state.error === true){
      return {
        ...pinStyle,
        backgroundColor: 'transparent',
        position: 'relative',
        top: -40*2,
        right: -30,
        borderColor: 'red',
      }
    }else{
      return {
        ...pinStyle,
        backgroundColor: 'transparent',
        position: 'relative',
        top: -40*2,
        right: -30,
      }
     }
  }
  handlePin4Style(){
    if(this.state.pinAuth.length === 4){
      return {
        ...pinStyle,
        backgroundColor: 'orange',
        position: 'relative',
        top: -40*3,
        right: -40*2,
      }
     }else if(this.state.error === true){
      return {
        ...pinStyle,
        backgroundColor: 'transparent',
        position: 'relative',
        top: -40*3,
        right: -40*2,
        borderColor: 'red',
      }
    }else{
      return {
        ...pinStyle,
        backgroundColor: 'transparent',
        position: 'relative',
        top: -40*3,
        right: -40*2,
      }
     }
  }
  handlePinReference(e){
    this.setState({
      pinAuth: e
    })
  }
  handleFocus(){
    console.log(this.refs.pin1.focus());
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={"always"} pointerEvents="none">
          <Text style={{fontSize:30,color:'orange',}}> Enter pin</Text>
          <TextInput secureTextEntry={true} style={styles.pin}  selectionColor={'transparent'} underlineColorAndroid={'transparent'} maxLength={4} ref={'pin1'} keyboardType={'numeric'} onChangeText={(event) => { this.handlePinReference(event) }}/>
          <View style={this.handlePin1Style()} />
          <View style={this.handlePin2Style()} />
          <View  style={this.handlePin3Style()} />
          <View  style={this.handlePin4Style()} />
          <Button
          raised
          large
          borderRadius={30}
          backgroundColor={'black'}
          color={'orange'}
          title='   Enter   '
          onPress={()=>this.handleClick()}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
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
    position: 'relative',
    left: -20
  },
  pin3:{
    ...pinStyle,
    position: 'relative',
    top: -68,
    left: 30
  },
  pin4:{
    ...pinStyle,
    position: 'relative',
    top: -68*2,
    left: 80
  }
});

export const AuthPinCodeScreen = connect(mapStateToProps,mapDispatchToProps)(AuthPincode);
