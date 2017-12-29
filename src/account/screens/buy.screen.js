import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput
} from 'react-native';
import {Button,Header} from 'react-native-elements'
import {connect} from 'react-redux'
import {encryptAuthenticationQuadriga} from 'util'

import {

} from 'account'



const {height,width} = Dimensions.get('window');

const mapStateToProps = (state) => ({
  
})
const mapDispatchToProps = (dispatch) => ({
 
})



class BuySell extends Component {
  constructor(){
    super();
    this.state = {
      nonce: null,
    }
    this.handleGetTicker = this.handleGetTicker.bind(this);
    this.handleGetBalance = this.handleGetBalance.bind(this);
    this.handleBalance = this.handleBalance.bind(this);
    this.handleTransactions = this.handleTransactions.bind(this);
  }

  componentWillMount(){
    
  }


  handleGetBalance(){
   
  }
  handleGetTicker(){
  
  }

  handleBalance(){
    
  }

  handleTransactions(){
   
  }


  render() {
    const {state} = this.props.navigation;
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Buy/Sell {state.params.coin}</Text>
        <View style={{flexDirection:'row',margin:10}}>
        <Text style={styles.amount}>Amount(cad) : </Text>
        <TextInput underlineColorAndroid={'transparent'} style={{fontSize:20,width:width/2,borderWidth:1,borderColor:'black'}} keyboardType={'numeric'}/>
        </View>
        <View style={{flexDirection:'row',margin:10}}>
        <Text style={styles.amount}>Amount(btc) : </Text>
        <TextInput underlineColorAndroid={'transparent'} style={{fontSize:20,width:width/2,borderWidth:1,borderColor:'black'}} keyboardType={'numeric'}/>
        </View>
        <View style={{flexDirection:'row'}}>
        <Button
        buttonStyle={{backgroundColor:'#ffb732',elevation:3}}
        large
        title='     Sell     '
        fontSize={22}
        />    
        <Button
        large
        backgroundColor={'#4ca64c'}
        title='     Buy     '
        fontSize={22}
        buttonStyle={{elevation:3}}
        />
        </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
  },
  title:{
      fontSize:20,
      color:'black'
  },
  amount:{
      fontSize:25,
      color:'black',
      marginTop:6
  }
});

export const BuySellScreen = connect(mapStateToProps,mapDispatchToProps)(BuySell);  
