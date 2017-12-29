import React,{Component} from 'react'
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableNativeFeedback,
  Platform
} from 'react-native'
import {Button} from 'react-native-elements'
import {ButtonComponent} from 'components'
import BTClogo from '../assets/logos/bitcoin.png'
import ETHlogo from '../assets/logos/ethereum.png'
import BCHlogo from '../assets/logos/BCH.png'
import BTGlogo from '../assets/logos/bitcoin-gold.png'
import LTClogo from '../assets/logos/litecoin.png'

const {height,width} = Dimensions.get('window');
const BTCETHStyle = {
  height:height/5,
  width:(width*0.464),
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'#fff',
  ...Platform.select({
    android:{
      margin:5,
      shadowOffset: { width: 10, height: 10 },
      shadowColor: 'black',
      shadowOpacity: 1,
      elevation:2
    }
  })
}
const OTHERStyle = {
  height:height/5,
  width:(width*0.30),
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'#fff',
  ...Platform.select({
    android:{
      margin:5,
      shadowOffset: { width: 0, height: 10 },
      shadowColor: 'black',
      shadowOpacity: 1,
      elevation:2
    }
  })
  
}



export class Modules extends Component {
  constructor(){
    super();
  }

  render(){
    const {dataBTC,dataETH,dataBCH,dataBTG,dataLTC,navigation,colorBTC,colorETH,colorBCH,colorBTG,colorLTC} = this.props
    return(
      <View style={styles.container}>
        <View style={{flexDirection:'row'}}>
          <ButtonComponent buttonStyle={BTCETHStyle} onPressAction={()=>navigation.navigate('BuySell',{coin:'BTC'})} tokenData={dataBTC} imageSource={BTClogo} color={colorBTC}/>
          <ButtonComponent buttonStyle={BTCETHStyle} onPressAction={()=>navigation.navigate('BuySell',{coin:'ETH'})} tokenData={dataETH} imageSource={ETHlogo} tokenName={'ETH'} color={colorETH}/>
        </View>
        <View style={{flex:1,flexDirection:'row'}}>
          <ButtonComponent buttonStyle={OTHERStyle} onPressAction={()=>navigation.navigate('BuySell',{coin:'BCH'})} tokenData={dataBCH} imageSource={BCHlogo} color={colorBCH}/>
          <ButtonComponent buttonStyle={OTHERStyle} onPressAction={()=>navigation.navigate('BuySell',{coin:'BTG'})} tokenData={dataBTG} imageSource={BTGlogo} color={colorBTG}/>
          <ButtonComponent buttonStyle={OTHERStyle} onPressAction={()=>navigation.navigate('BuySell',{coin:'LTC'})} tokenData={dataLTC} imageSource={LTClogo} color={colorLTC}/>
        </View>
      
      </View>
    )
  } 

}


const styles = new StyleSheet.create({
  container : {
      flex:1,
      flexDirection: 'column',
      alignItems:'center'
  },
  orderInfo:{
    fontSize:18
  },
  title:{
    fontSize:20,
    color: 'black'
  },
  titleSmaller:{
    fontSize:15,
    color:'black'
  }
})

