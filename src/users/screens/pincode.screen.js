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
  Switch
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Button} from 'react-native-elements'
import {connect} from 'react-redux'
import {setTempPin} from 'users'
import {resetNavigation} from 'util'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  getQuadrigaTickerBTC,
  getQuadrigaTickerETH,
  getQuadrigaTickerBCH,
  getQuadrigaTickerBTG,
  getQuadrigaTickerLTC,
  getQuadrigaTransactions
} from 'account'
import {setPin} from 'users'

const {height,width} = Dimensions.get('window')

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
  setPinDispatch : (pin) => dispatch(setPin(pin)),
  getQuadrigaTickerDispatch: (ticker) =>{dispatch(getQuadrigaTickerBTC());dispatch(getQuadrigaTickerETH());dispatch(getQuadrigaTickerBCH());dispatch(getQuadrigaTickerBTG());dispatch(getQuadrigaTickerLTC())},
  getQuadrigaTransactionsDispatch: (book,time)=>{dispatch(getQuadrigaTransactions(book,time))},
})




class Pincode extends Component {
  constructor(){
    super();
    this.state = {
      pinAuth:'',
      error:false,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handlePinReference = this.handlePinReference.bind(this);
  }
  componentDidMount(){
    const {getQuadrigaTickerDispatch,getQuadrigaTransactionsDispatch} = this.props;
    this.refs.pin1.focus();
    getQuadrigaTickerDispatch();
    getQuadrigaTransactionsDispatch("btc_cad","hour");
  }

  componentWillUnmount(){
    
  }
  handleClick(){
    const {navigation,setPinDispatch} = this.props;
    if(this.state.pinAuth.length === 4) {
        setPinDispatch(this.state.pinAuth);
        alert("your pin is "+this.state.pinAuth)
        resetNavigation('Auth',navigation)
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
  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={"always"}>
      <Text style={{fontSize:30,color:'orange',marginBottom:50}}> Set up pin</Text>
      <Animatable.View   useNativeDriver={true}  ref="view1" style={this.handlePin1Style()} />
      <Animatable.View   useNativeDriver={true}  ref="view2" style={this.handlePin2Style()} />
      <Animatable.View  useNativeDriver={true}  ref="view3" style={this.handlePin3Style()} />
      <Animatable.View  useNativeDriver={true}  ref="view4" style={this.handlePin4Style()} />
      <Button
      raised
      large
      buttonStyle={{backgroundColor:'black',zIndex:5}}
      borderRadius={30}
    
      color={'orange'}
      title='   Confirm   '
      onPress={()=>this.handleClick()}/>
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
    position:'relative',
    bottom:60
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

export const PinCodeScreen = connect(mapStateToProps,mapDispatchToProps)(Pincode);