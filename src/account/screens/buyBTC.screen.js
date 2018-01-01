import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Foundation'
import {BuySellComponent} from 'components'
import {Button,Header} from 'react-native-elements'
import {connect} from 'react-redux'
import {encryptAuthenticationQuadriga,Logos} from 'util'
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



class BuySellBTC extends Component {
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
         headerTitle: ` XɃT/CAD `,
         headerTitleStyle:{
              ...headerStyle
        },
        headerStyle:{
              backgroundColor:'orange'
            },
        tabBarLabel: 'XɃT/CAD',
        tabBarIcon: ({ tintColor }) => (
          <Icon
          name="bitcoin-circle"
          color={tintColor}
          size={30}
        />
          )
        }
    };
    componentWillMount(){
      const {getQuadrigaOrdersDispatch} = this.props;
      getQuadrigaOrdersDispatch("btc_cad",0)
    }
  
    componentDidMount(){
      const {getQuadrigaOrdersDispatch} = this.props;
      const intervalInstance = setInterval(()=>{
        getQuadrigaOrdersDispatch("btc_cad",0)
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
        <BuySellComponent acronym="XɃT" quadrigaOrders={this.props.quadrigaOrders} />
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
export const BuySellBTCScreen = connect(mapStateToProps,mapDispatchToProps)(BuySellBTC);  
