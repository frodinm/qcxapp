import React,{Component} from 'react'
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableNativeFeedback,
  TouchableHighlight,
  Platform
} from 'react-native'
import { iOSUIKit } from 'react-native-typography'

const {height,width} = Dimensions.get('window');

export class ButtonComponent extends Component {
  constructor(){
    super();
  }

  handlePlatform(tokenData,imageSource,color,onPressAction,buttonStyle){
    if(Platform.OS === 'android'){
        if(TouchableNativeFeedback.canUseNativeForeground()){
          return(
            <TouchableNativeFeedback onPress={onPressAction} useForeground={true} background={TouchableNativeFeedback.Ripple()} delayPressIn={0}>
              <View style={{...buttonStyle,marginTop:10,backgroundColor:color}} pointerEvents='box-only' >
              <Image style={{height:50,width:50,marginBottom:5}} resizeMode="contain"  source={imageSource}/>
                <View style={{flexDirection:'row'}}>
                  <View style={{flexDirection:'column'}}>
                    <Text>High </Text>
                    <Text>Low </Text>
                    <Text>Last </Text>
                    <Text>Vmap </Text>
                  </View>
                  <View style={{flexDirection:'column'}}>
                    <Text style={iOSUIKit.caption}>{tokenData.data.high}</Text>
                    <Text style={iOSUIKit.caption}>{tokenData.data.low}</Text>
                    <Text style={iOSUIKit.caption}>{tokenData.data.last}</Text>
                    <Text style={iOSUIKit.caption}>{parseFloat(tokenData.data.vwap).toFixed(2)}</Text>
                  </View>
                </View>
              </View>
          </TouchableNativeFeedback>
          )
      }else{
        return(
            <View style={{margin:5,marginTop:10}}>
            <TouchableHighlight onPress={onPressAction}>
              <View style={{...buttonStyle,backgroundColor:color}} pointerEvents='box-only' >
              <Image style={{height:50,width:50,marginBottom:5}} resizeMode="contain"  source={imageSource}/>
                <View style={{flexDirection:'row'}}>
                  <View style={{flexDirection:'column'}}>
                    <Text>High </Text>
                    <Text>Low </Text>
                    <Text>Last </Text>
                    <Text>Vmap </Text>
                  </View>
                  <View style={{flexDirection:'column'}}>
                    <Text style={iOSUIKit.caption}>{tokenData.data.high}</Text>
                    <Text style={iOSUIKit.caption}>{tokenData.data.low}</Text>
                    <Text style={iOSUIKit.caption}>{tokenData.data.last}</Text>
                    <Text style={iOSUIKit.caption}>{parseFloat(tokenData.data.vwap).toFixed(2)}</Text>
                  </View>
                </View>
              </View>
          </TouchableHighlight>
          </View>
        )
      }
    }else{
      return(
        <View style={{margin:5,marginTop:10}}>
        <TouchableHighlight onPress={onPressAction}>
          <View style={{...buttonStyle,backgroundColor:color}} pointerEvents='box-only' >
          <Image style={{height:50,width:50,marginBottom:5}} resizeMode="contain"  source={imageSource}/>
            <View style={{flexDirection:'row'}}>
              <View style={{flexDirection:'column'}}>
                <Text>High </Text>
                <Text>Low </Text>
                <Text>Last </Text>
                <Text>Vmap </Text>
              </View>
              <View style={{flexDirection:'column'}}>
                <Text style={iOSUIKit.caption}>{tokenData.data.high}</Text>
                <Text style={iOSUIKit.caption}>{tokenData.data.low}</Text>
                <Text style={iOSUIKit.caption}>{tokenData.data.last}</Text>
                <Text style={iOSUIKit.caption}>{parseFloat(tokenData.data.vwap).toFixed(2)}</Text>
              </View>
            </View>
          </View>
      </TouchableHighlight>
      </View>
      )
    }
  }
  
  render(){
    const {tokenData,imageSource,color,onPressAction,buttonStyle} = this.props
    return(
      <View>
          {this.handlePlatform(tokenData,imageSource,color,onPressAction,buttonStyle)}
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

