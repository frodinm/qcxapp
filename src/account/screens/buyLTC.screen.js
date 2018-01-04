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
import {BuySellComponent,TradingButtonComponent} from 'components'
import {connect} from 'react-redux'
import {encryptAuthenticationQuadriga} from 'util'
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../assets/config';
const Icon = createIconSetFromFontello(fontelloConfig);

import {
  setTradingBook,
  getQuadrigaOrders,
  postUserQuadrigaBalance,
  postUserOpenOrdersQuadriga,
  postUserLookupOrderQuadriga,
  postUserCancelOrderQuadriga,
  postUserBuyAtPriceQuadriga,
  postUserBuyMarketOrderQuadriga,
  postUserSellLimitQuadriga,
  postUserSellMarketOrderQuadriga
} from 'account'
import {iOSUIKit} from 'react-native-typography';


const apiKey = "PoDWcWznpm"
const secret = "534158c052093441c9bb309788f4e3d5"
const clientId = "2515766"

const {height,width} = Dimensions.get('window');

const mapStateToProps = (state) => ({
  apiKey: state.user.apiKey,
  clientId:state.user.clientId,
  privateKey:state.user.privateKey,
  quadrigaOrders: state.account.quadrigaOrders,
  quadrigaUserBalance: state.account.quadrigaUserBalance,
  isGettingUserQuadrigaBalance: state.account.isGettingUserQuadrigaBalance,
  tradingBook: state.account.tradingBook,
})
const mapDispatchToProps = (dispatch) => ({
setTradingBookDispatch:(book)=>{dispatch(setTradingBook(book))},
getQuadrigaOrdersDispatch:(book,group)=>{dispatch(getQuadrigaOrders(book,group))},
postUserQuadrigaBalanceDispatch:(key,sign,nonce)=>{dispatch(postUserQuadrigaBalance(key,sign,nonce))},
postUserOpenOrdersQuadrigaDispatch:(key,sign,nonce,book)=>{dispatch(postUserOpenOrdersQuadriga(key,sign,nonce,book))},
postUserLookupOrderQuadrigaDispatch:(key,sign,nonce,id)=>{dispatch(postUserLookupOrderQuadriga(key,sign,nonce,id))},
postUserCancelOrderQuadrigaDispatch:(key,sign,nonce,id)=>{dispatch(postUserCancelOrderQuadriga(key,sign,nonce,id))},
postUserBuyAtPriceQuadrigaDispatch:(key,sign,nonce,amount,price,book)=>{dispatch(postUserBuyAtPriceQuadriga(key,sign,nonce,amount,price,book))},
postUserBuyMarketOrderQuadrigaDispatch:(key,sign,nonce,amount,book)=>{dispatch(postUserBuyMarketOrderQuadriga(key,sign,nonce,amount,book))},
postUserSellLimitQuadrigaDispatch:(key,sign,nonce,amount,price,book)=>{dispatch(postUserSellLimitQuadriga(key,sign,nonce,amount,price,book))},
postUserSellMarketOrderQuadrigaDispatch:(key,sign,nonce,amount,book)=>{dispatch(postUserSellMarketOrderQuadriga(key,sign,nonce,amount,book))}
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
        headerRight: <TradingButtonComponent/>,
        headerStyle:{
              backgroundColor:'orange'
            },
        }
    };

    componentWillMount(){
      const {getQuadrigaOrdersDispatch,setTradingBookDispatch} = this.props;
      getQuadrigaOrdersDispatch("ltc_cad",0)
      setTradingBookDispatch('ltc_cad')
    }
  
    componentDidMount(){
 
    }
  
    componentWillUnmount(){
     clearInterval(this.state.interval)
    }


    render() {
      const {
        tradingBook,
        quadrigaUserBalance,
        isGettingUserQuadrigaBalance,
        postUserQuadrigaBalanceDispatch,
        postUserOpenOrdersQuadrigaDispatch,
        postUserLookupOrderQuadrigaDispatch,
        postUserCancelOrderQuadrigaDispatch,
        postUserBuyAtPriceQuadrigaDispatch,
        postUserBuyMarketOrderQuadrigaDispatch,
        postUserSellLimitQuadrigaDispatch,
        postUserSellMarketOrderQuadrigaDispatch
      } = this.props;
      return (
        <BuySellComponent acronym="ŁTC" name="Litecoin" quadrigaOrders={this.props.quadrigaOrders} 
        trading={{
          apiKey: apiKey,
          clientId: clientId,
          secret: secret,
          token: "eth",
          tradingBook: tradingBook,
          quadrigaUserBalance: quadrigaUserBalance,
          isGettingUserQuadrigaBalance:isGettingUserQuadrigaBalance,
          userBalance:(key,sign,nonce)=>postUserQuadrigaBalanceDispatch(key,sign,nonce),
          userOpenOrders:(key,sign,nonce,book)=>postUserOpenOrdersQuadrigaDispatch(key,sign,nonce,book),
          userLookupOrder:(key,sign,nonce,id)=>postUserLookupOrderQuadrigaDispatch(key,sign,nonce,id),
          userCancelOrder:(key,sign,nonce,id)=>postUserCancelOrderQuadrigaDispatch(key,sign,nonce,id),
          userBuyAtPrice:(key,sign,nonce,amount,price,book)=>{postUserBuyAtPriceQuadrigaDispatch(key,sign,nonce,amount,price,book)},
          userBuyMarketPrice:(key,sign,nonce,amount,book)=>{postUserBuyMarketOrderQuadrigaDispatch(key,sign,nonce,amount,book)},
          userSellAtPrice:(key,sign,nonce,amount,price,book)=>{postUserSellLimitQuadrigaDispatch(key,sign,nonce,amount,price,book)},
          userSellMarketPrice:(key,sign,nonce,amount,book)=>{postUserSellMarketOrderQuadrigaDispatch(key,sign,nonce,amount,book)}
        }}/>
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
