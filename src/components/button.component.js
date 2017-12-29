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
      return(
        <TouchableNativeFeedback onPress={onPressAction} useForeground={true} background={TouchableNativeFeedback.Ripple()} delayPressIn={0}>
          <View style={{...buttonStyle,marginTop:10,backgroundColor:color}} pointerEvents='box-only' >
          <Image style={{height:50,width:50,}} resizeMode="contain"  source={imageSource}/>
          <Text>{tokenData.data.last} $</Text>
          <Text>{Math.round((tokenData.data.last / tokenData.data.low)*100)/100} %</Text>
          </View>
      </TouchableNativeFeedback>
      )
    }else{
      return(
        <View style={{margin:5,marginTop:10}}>
        <TouchableHighlight onPress={onPressAction}>
          <View style={{...buttonStyle,backgroundColor:color}} pointerEvents='box-only' >
          <Image style={{height:50,width:50,}} resizeMode="contain"  source={imageSource}/>
          <Text style={iOSUIKit.caption}>{tokenData.data.last} $</Text>
          <Text style={iOSUIKit.caption}>{Math.round((tokenData.data.last / tokenData.data.low)*100)/100} %</Text>
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

