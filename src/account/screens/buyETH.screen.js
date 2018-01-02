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
import {BuySellComponent} from 'components'
import {encryptAuthenticationQuadriga} from 'util'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
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



class BuySellETH extends Component {
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
      const {getQuadrigaOrdersDispatch} = this.props;
      getQuadrigaOrdersDispatch("eth_cad",0)
    }
  
    componentDidMount(){
      const {getQuadrigaOrdersDispatch} = this.props;
      const intervalInstance = setInterval(()=>{
        getQuadrigaOrdersDispatch("eth_cad",0)
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
        <BuySellComponent acronym="ΞTH" name="Ethereum" quadrigaOrders={this.props.quadrigaOrders} />
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      
      backgroundColor: '#f1f1f1',
    },
  });

export const BuySellETHScreen = connect(mapStateToProps,mapDispatchToProps)(BuySellETH);  
