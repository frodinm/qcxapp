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
  Switch,
  TouchableNativeFeedback,
  TouchableHighlight
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Button} from 'react-native-elements'
import {connect} from 'react-redux'
import {setTempPin} from 'users'
import {resetNavigation} from 'util'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DropdownAlert from 'react-native-dropdownalert';
import SplashScreen from 'react-native-splash-screen';
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
  height:13,
  width:13,
  marginRight:10,
  marginLeft:10,
  marginBottom:height/6,
  borderRadius: 50,
  borderWidth:1,
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

  handlePlatform(onPressAction,buttonStyle,text){
    if(Platform.OS === 'android'){
        if(TouchableNativeFeedback.canUseNativeForeground()){
            return(
                <TouchableNativeFeedback onPress={onPressAction} useForeground={true} background={TouchableNativeFeedback.Ripple()} delayPressIn={0} style={{height:40,width:width/2.3,margin:5,marginBottom:10,borderRadius:buttonStyle.borderRadius}}>
                <View style={{...buttonStyle,justifyContent:'center'}} pointerEvents='box-only' >
                <Text style={{textAlign:'center',fontSize:17,color:'white'}}>{text}</Text>
                </View>
            </TouchableNativeFeedback>
            )
        }else{
            return(
                <TouchableHighlight style={{...buttonStyle,borderRadius:buttonStyle.borderRadius}} onPress={onPressAction} >
                  <View style={{...buttonStyle,justifyContent:'center'}} pointerEvents='box-only' >
                  <Text style={{textAlign:'center',fontSize:17,color:'white'}}>{text}</Text>
                  </View>
              </TouchableHighlight>
              )
        }
    }else{
      return(
        <TouchableHighlight style={{...buttonStyle,borderRadius:buttonStyle.borderRadius}} onPress={onPressAction} >
          <View style={{...buttonStyle,justifyContent:'center'}} pointerEvents='box-only' >
          <Text style={{textAlign:'center',fontSize:17,color:'white'}}>{text}</Text>
          </View>
        </TouchableHighlight>
      )
    }
  }

  handleClick(){
    const {navigation,setPinDispatch} = this.props;
    if(this.state.pinAuth.length === 4) {
        setPinDispatch(this.state.pinAuth);
        this.dropdown.alertWithType('info', 'Info', `Your pin has been set to ${this.state.pinAuth}`);
        setTimeout(()=>{
          resetNavigation('Auth',navigation)
        },2000)
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
  }
  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={"always"}>
      <Text style={{fontSize:30,color:'orange',marginBottom:50}}> Set up pin</Text>
      <View style={{flexDirection:'row'}}>
            <Animatable.View   useNativeDriver={true}  ref="view1" style={this.handlePin1Style()} />
            <Animatable.View   useNativeDriver={true}  ref="view2" style={this.handlePin2Style()} />
            <Animatable.View  useNativeDriver={true}  ref="view3" style={this.handlePin3Style()} />
            <Animatable.View  useNativeDriver={true}  ref="view4" style={this.handlePin4Style()} />
      </View>
      {this.handlePlatform(()=>this.handleClick(),{backgroundColor:'orange',zIndex:5,borderRadius:5,height:60,width:120},'  Confirm   ')}
      <TextInput secureTextEntry={true} style={styles.pin}  selectionColor={'transparent'} underlineColorAndroid={'transparent'} maxLength={4} ref={'pin1'} keyboardType={'numeric'} onChangeText={(event) => { this.handlePinReference(event) }}/>
      <DropdownAlert updateStatusBar={false} translucent={true} ref={ref => this.dropdown = ref}  />
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
    bottom:40
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

export const PinCodeScreen = connect(mapStateToProps,mapDispatchToProps)(Pincode);