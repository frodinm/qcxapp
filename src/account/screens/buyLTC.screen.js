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
import {BuySellComponent} from 'components'
import {connect} from 'react-redux'
import {encryptAuthenticationQuadriga} from 'util'
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../assets/config';
const Icon = createIconSetFromFontello(fontelloConfig);

import {
  getQuadrigaOrders
} from 'account'
import {iOSUIKit} from 'react-native-typography';



const {height,width} = Dimensions.get('window');

const mapStateToProps = (state) => ({
    apiKey: state.user.apiKey,
    clientId:state.user.clientId,
    privateKey:state.user.privateKey,
    quadrigaOrders: state.account.quadrigaOrders,
})
const mapDispatchToProps = (dispatch) => ({
  getQuadrigaOrdersDispatch:(book,group)=>{dispatch(getQuadrigaOrders(book,group))}
})



class BuySellLTC extends Component {
  constructor(){
    super();
    this.state = {
      nonce: null,
      interval: null,
    }
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
         headerTitle: ` LTC/CAD `,
         headerTitleStyle:{
              ...headerStyle
        },
        headerStyle:{
              backgroundColor:'orange'
            },
        }
    };

    componentWillMount(){
      const {getQuadrigaOrdersDispatch} = this.props;
      getQuadrigaOrdersDispatch("ltc_cad",0)
    }
  
    componentDidMount(){
      const {getQuadrigaOrdersDispatch} = this.props;
      const intervalInstance = setInterval(()=>{
        getQuadrigaOrdersDispatch("ltc_cad",0)
      },20000)
      this.setState({
        interval:intervalInstance
      })
    }
  
    componentWillUnmount(){
     clearInterval(this.state.interval)
    }


    render() {
      return (
        <BuySellComponent acronym="ŁTC" name="Litecoin" quadrigaOrders={this.props.quadrigaOrders} />
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      
      backgroundColor: '#F5FCFF',
    },
  });
export const BuySellLTCScreen = connect(mapStateToProps,mapDispatchToProps)(BuySellLTC);  
