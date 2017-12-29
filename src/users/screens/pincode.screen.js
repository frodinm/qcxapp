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
import {Button} from 'react-native-elements'
import {connect} from 'react-redux'
import {setTempPin} from 'users'

const {height,width} = Dimensions.get('window')

const pinStyle = {
  fontSize: 35,

}

const mapStateToProps = (state) => ({
  pin: state.user.pin
})
const mapDispatchToProps = (dispatch) => ({
  setTempPinDispatch : (pin) => dispatch(setTempPin(pin))
})




class Pincode extends Component {
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
   
  }

  componentWillUnmount(){
    
  }
  handleClick(){
    const {setTempPinDispatch,navigation} = this.props;
    const pin = this.state.pin1+this.state.pin2+this.state.pin3+this.state.pin4
    if(pin.length === 4){
      setTempPinDispatch(pin)
      navigation.navigate('ConfirmPin');
    }else{
      alert('Pin is not valid');
    }
  }
  handlePin1Style(){
    if(this.state.pin1 === ''){
      return {
        ...pinStyle,
        backgroundColor: 'transparent',
      }
     }else{
      return {
        ...pinStyle,
        backgroundColor: 'orange',
      }
     }
  }
  handlePin2Style(){
    if(this.state.pin2 === ''){
      return {
        ...pinStyle,
        backgroundColor: 'transparent',
      }
     }else{
      return {
        ...pinStyle,
        backgroundColor: 'orange',
      }
     }
  }
  handlePin3Style(){
    if(this.state.pin3 === ''){
      return {
        ...pinStyle,
        backgroundColor: 'transparent',
      }
     }else{
      return {
        ...pinStyle,
        backgroundColor: 'orange',
      }
     }
  }
  handlePin4Style(){
    if(this.state.pin4 === ''){
      return {
        ...pinStyle,
        backgroundColor: 'transparent',
      }
     }else{
      return {
        ...pinStyle,
        backgroundColor: 'orange',
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
      <ScrollView contentContainerStyle={styles.container}  >
          <Text style={{fontSize:30,color:'orange',}}> Set pin</Text>
           <TextInput secureTextEntry={true} style={styles.pin1} underlineColorAndroid={'orange'} maxLength={1} ref={'pin1'} keyboardType={'numeric'} onChangeText={(event) => { this.handlePinReference(event,1) }}/>
          <TextInput secureTextEntry={true} style={styles.pin2}  underlineColorAndroid={'orange'} maxLength={1} ref={'pin2'} keyboardType={'numeric'}  onChangeText={(event) => { this.handlePinReference(event,2) }}/>
          <TextInput  secureTextEntry={true} style={styles.pin3}  underlineColorAndroid={'orange'} maxLength={1} ref={'pin3'} keyboardType={'numeric'} onChangeText={(event) => { this.handlePinReference(event,3)}}/>
          <TextInput  secureTextEntry={true} style={styles.pin4}  underlineColorAndroid={'orange'} maxLength={1} ref={'pin4'} keyboardType={'numeric'}  onChangeText={(event) => { this.handlePinReference(event,4)}}/>
    
          <Button
          large
          borderRadius={30}
          backgroundColor={'black'}
          color={'orange'}
          title='   Next   ' 
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
    color:'black',
    height:60,
    width:50
  },
  pin2:{
    ...pinStyle,
    position: 'relative',
    left: -20,
    color:'black',
    height:60,
    width:50
  },
  pin3:{
    ...pinStyle,
    position: 'relative',
    top: -68,
    left: 30,
    color:'black',
    height:60,
    width:50
  },
  pin4:{
    ...pinStyle,
    position: 'relative',
    top: -68*2,
    left: 80,
    color:'black',
    height:60,
    width:50
  },
  t1: {
    margin: 10,
    backgroundColor: 'red',
    width: 200,
  },
  t2: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 200
  },
});

export const PinCodeScreen = connect(mapStateToProps,mapDispatchToProps)(Pincode);