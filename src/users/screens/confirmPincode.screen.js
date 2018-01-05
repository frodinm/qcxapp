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
} from 'react-native';
import {Button} from 'react-native-elements'
import {connect} from 'react-redux'
import {setPin} from 'users'
import {resetNavigation} from 'util'
import {
  getQuadrigaTickerBTC,
  getQuadrigaTickerETH,
  getQuadrigaTickerBCH,
  getQuadrigaTickerBTG,
  getQuadrigaTickerLTC,
  getQuadrigaTransactions
} from 'account'

const {height,width} = Dimensions.get('window')

const pinStyle = {
  fontSize: 35,

}

const mapStateToProps = (state) => ({
  toConfirmPin: state.user.toConfirmPin
})
const mapDispatchToProps = (dispatch) => ({
  setPinDispatch : (pin) => dispatch(setPin(pin)),
  getQuadrigaTickerDispatch: (ticker) =>{dispatch(getQuadrigaTickerBTC());dispatch(getQuadrigaTickerETH());dispatch(getQuadrigaTickerBCH());dispatch(getQuadrigaTickerBTG());dispatch(getQuadrigaTickerLTC())},
  getQuadrigaTransactionsDispatch: (book,time)=>{dispatch(getQuadrigaTransactions(book,time))},
})




class ConfirmPincode extends Component {
  constructor(){
    super();
    this.state = {
      pin1:'',
      pin2:'',
      pin3:'',
      pin4:'',
    }
    this.handleClick = this.handleClick.bind(this);
    this.handlePinReference = this.handlePinReference.bind(this);
  }
  componentDidMount(){
   this.refs.pin1.focus(); 
   console.log(this.props.pin)
  }

  componentWillMount(){
    const {getQuadrigaTickerDispatch,getQuadrigaTransactionsDispatch} = this.props;
    getQuadrigaTickerDispatch();
    getQuadrigaTransactionsDispatch("btc_cad","hour");
  }
  handleClick(){
    const {toConfirmPin,navigation,setPinDispatch} = this.props;
    const confirmPin = this.state.pin1+this.state.pin2+this.state.pin3+this.state.pin4
    
    if(confirmPin === toConfirmPin){
      setPinDispatch(confirmPin);
      resetNavigation('Auth',navigation)
    }else{
      alert('Pin is not valid');
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
  handlePinReference(e,num){
    if(num === 1){
      this.setState({
        pin1: e,
      })
      if(e != '' ){
       this.refs.pin2.focus();
      }
    }else if(num === 2){
      this.setState({
        pin2: e,
      })
      if(e != '' ){
        this.refs.pin3.focus();
       }else{
         this.refs.pin1.focus();
       }
    }else if(num === 3){
      this.setState({
        pin3: e,
      })
      if(e != '' ){
        this.refs.pin4.focus();
       }else{
         this.refs.pin2.focus();
       }
    }else if(num === 4){
      this.setState({
        pin4: e,
      })
      if(e == ''){
        this.refs.pin3.focus();
       }
    }
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container} >
          <Text style={{fontSize:30,color:'orange',}}> Confirm pin</Text>
          <TextInput secureTextEntry={true} style={styles.pin1}  selectionColor={'black'} underlineColorAndroid={'orange'} maxLength={1} ref={'pin1'} keyboardType={'numeric'} onChangeText={(event) => { this.handlePinReference(event,1) }}/>
          <TextInput secureTextEntry={true} style={styles.pin2} selectionColor={'black'} underlineColorAndroid={'orange'} maxLength={1} ref={'pin2'} keyboardType={'numeric'}  onChangeText={(event) => { this.handlePinReference(event,2) }}/>
          <TextInput  secureTextEntry={true} style={styles.pin3} selectionColor={'black'} underlineColorAndroid={'orange'} maxLength={1} ref={'pin3'} keyboardType={'numeric'} onChangeText={(event) => { this.handlePinReference(event,3)}}/>
          <TextInput  secureTextEntry={true} style={styles.pin4} selectionColor={'black'} underlineColorAndroid={'orange'} maxLength={1} ref={'pin4'} keyboardType={'numeric'}  onChangeText={(event) => { this.handlePinReference(event,4)}}/>
          <Button
          large
          borderRadius={30}
          backgroundColor={'black'}
          color={'orange'}
          title='   Confirm   ' 
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
  pin1:{
    ...pinStyle,
    position: 'relative',
    top: 68,
    left: -70,
    height:60,
    width:50
  },
  pin2:{
    ...pinStyle,
    position: 'relative',
    left: -20,
    height:60,
    width:50
  },
  pin3:{
    ...pinStyle,
    position: 'relative',
    top: -68,
    left: 30,
    height:60,
    width:50
  },
  pin4:{
    ...pinStyle,
    position: 'relative',
    top: -68*2,
    left: 80,
    height:60,
    width:50
  }
});

export const ConfirmPinCodeScreen = connect(mapStateToProps,mapDispatchToProps)(ConfirmPincode);