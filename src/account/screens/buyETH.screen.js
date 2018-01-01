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
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import {

} from 'account'
import {iOSUIKit} from 'react-native-typography';



const {height,width} = Dimensions.get('window');

const mapStateToProps = (state) => ({
    apiKey: state.user.apiKey,
    clientId:state.user.clientId,
    privateKey:state.user.privateKey,
})
const mapDispatchToProps = (dispatch) => ({
 
})



class BuySellETH extends Component {
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

  static navigationOptions = ({ navigation  }) => {
    const headerStyle={
      alignSelf: 'center',
      color:'white',
      position: 'relative',
      ...Platform.select({
        android:{
          left: 30
        }
      })
    }
    return {
         headerTitle: `ΞTH `,
         headerTitleStyle:{
              ...headerStyle
        },
        headerStyle:{
              backgroundColor:'orange'
            },
        tabBarLabel: 'ΞTH',
        tabBarIcon: ({ tintColor }) => (
          <Icon
          name="currency-eth"
          color={tintColor}
          size={30}
        />
          )
        }
    };

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

  handleSelect(index){
    console.log(index);
  }


  render() {
    const {state} = this.props.navigation;
    return (
        <View style={styles.container}>
        
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
    
    backgroundColor: '#F5FCFF',
  },
  dropdownBtn:{
    width:width,
    backgroundColor:'green',
    
    height: height/12,
    justifyContent: 'center'
  },
  dropdownBtnStyle:{
    marginTop:10,
    width:width,
    alignSelf:'flex-start'
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

export const BuySellETHScreen = connect(mapStateToProps,mapDispatchToProps)(BuySellETH);  
