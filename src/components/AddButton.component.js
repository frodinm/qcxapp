import React,{Component} from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native'
import { iOSUIKit } from 'react-native-typography'
import IconMaterial from 'react-native-vector-icons/dist/MaterialIcons';
import IconIOS from 'react-native-vector-icons/dist/Ionicons';

export class AddButtonComponent extends Component {
  constructor(){
    super();
    this.handlePlatform = this.handlePlatform.bind(this);
  }

  handlePlatform(){
      const {onPressAction} = this.props;
    if(Platform.OS === 'android'){
        return <TouchableOpacity onPress={onPressAction}><IconMaterial name="add" size={30} color="#fff" style={{marginRight:20}}/></TouchableOpacity>
    }else{
        return <TouchableOpacity onPress={onPressAction}><IconIOS name="ios-add" size={30} color="#fff" style={{marginRight:20}}/></TouchableOpacity>
    }    
  }
  
  render(){
    return this.handlePlatform()
  } 

}
const styles = new StyleSheet.create({

})

