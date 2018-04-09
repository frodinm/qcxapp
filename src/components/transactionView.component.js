import React,{Component} from 'react'
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform
} from 'react-native'
import {connect} from 'react-redux'
import { iOSUIKit } from 'react-native-typography'
import I18n from 'react-native-i18n'

const {height,width} = Dimensions.get('window');


export class TransactionView extends Component {

  handleSideTranslation(side){
    if(side === 'sell'){
      return I18n.t('sell');
    }else{
      return I18n.t('buy');
    }
  }

  handleData(data){
      return <View style={styles.container}>
      <Text style={iOSUIKit.title3}>{"\n\n"}{I18n.t('last20')} {"\n\n"}</Text>
      {data.map((e,index) => {
        return <View style={styles.textWrapper}  key={index}><Text style={iOSUIKit.body}>{e.amount + " " + e.price + " " + this.handleSideTranslation(e.side)}</Text></View>
      })}</View>
  }
  render(){
    const {data} = this.props
    return(
      this.handleData(data)
    )
  }

}


const styles = new StyleSheet.create({
  container : {
      flex:1,
      width: width*0.95,
      justifyContent:'center',
      alignItems: 'center',
      margin:10,
      backgroundColor:'#fff',
      ...Platform.select({
        android:{
          shadowOffset: { width: 10, height: 10 },
          shadowColor: 'black',
          shadowOpacity: 1,
          elevation: 3
        }
      })
     
  },
  title:{
    fontSize:20,
    color:'black'
  },
  orderInfo:{
    fontSize:18
  },
  textWrapper:{
    justifyContent:'center',
    alignItems: 'center',
    width:width,
    margin:2
  }
})

