import React,{Component} from 'react'
import {
  View,
  StyleSheet,
  Text,
  Dimensions
} from 'react-native'
import {connect} from 'react-redux'

const {height,width} = Dimensions.get('window');


export class Orders extends Component {

  handleData(data){
    if(data !== null) {

    }
  }
  render(){
    const {data} = this.props
    return(
      <View style={styles.container}>
        <Text style={styles.title}>Orders</Text>
      
      </View>
    )
  }

}


const styles = new StyleSheet.create({
  container : {
    width: width,
    backgroundColor:'#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  orderInfo:{
    fontSize:18
  },
  title:{
    fontSize: 20
  }
})

