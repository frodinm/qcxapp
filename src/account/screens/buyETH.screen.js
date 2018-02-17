import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity
} from 'react-native';
import {Button,Header} from 'react-native-elements'
import {connect} from 'react-redux'
import {BuySellComponent,TradingButtonComponent} from 'components'
import {encryptAuthenticationQuadriga} from 'util'
import {
  getQuadrigaTickersAll,
  clearQuadrigaTickers,
  setTradingBook,
  getQuadrigaOrders,
  postUserQuadrigaBalance,
  postUserOpenOrdersQuadriga,
  postUserLookupOrderQuadriga,
  postUserCancelOrderQuadriga,
  postUserBuyAtPriceQuadriga,
  postUserBuyMarketOrderQuadriga,
  postUserSellLimitQuadriga,
  postUserSellMarketOrderQuadriga,
  postUserQuadrigaBalanceAndOpenOrders
} from 'account'
import {iOSUIKit} from 'react-native-typography';

const {height,width} = Dimensions.get('window');

const mapStateToProps = (state) => ({
    apiKey: state.user.apiKey,
    clientId:state.user.clientId,
    privateKey:state.user.privateKey,
    quadrigaOrders: state.account.quadrigaOrders,
    quadrigaUserBalance: state.account.quadrigaUserBalance,
    isGettingUserQuadrigaBalance: state.account.isGettingUserQuadrigaBalance,
    tradingBook: state.account.tradingBook,
    quadrigaUserBuyAt:state.account.quadrigaUserBuyAt,
    quadrigaUserBuyMarket:state.account.quadrigaUserBuyMarket,
    quadrigaUserCancelOrder:state.account.quadrigaUserCancelOrder,
    quadrigaUserSellLimit:state.account.quadrigaUserSellLimit,
    quadrigaUserSellMarket:state.account.quadrigaUserSellMarket,
    quadrigaUserOrders:state.account.quadrigaUserOrders,
    quadrigaUserOrdersLookup: state.account.quadrigaUserOrdersLookup,
})
const mapDispatchToProps = (dispatch) => ({
  getQuadrigaTickersDispatch: ()=>{dispatch(getQuadrigaTickersAll())},
  setTradingBookDispatch:(book)=>{dispatch(setTradingBook(book))},
  getQuadrigaOrdersDispatch:(book,group)=>{dispatch(getQuadrigaOrders(book,group))},
  postUserQuadrigaBalanceDispatch:(key,sign,nonce)=>{dispatch(postUserQuadrigaBalance(key,sign,nonce))},
  postUserOpenOrdersQuadrigaDispatch:(key,sign,nonce,book)=>{dispatch(postUserOpenOrdersQuadriga(key,sign,nonce,book))},
  postUserQuadrigaBalanceAndOpenOrdersDispatch:(apiKey,clientId,secret,tradingBook)=>{dispatch(postUserQuadrigaBalanceAndOpenOrders(apiKey,clientId,secret,tradingBook))},
  postUserLookupOrderQuadrigaDispatch:(key,sign,nonce,id)=>{dispatch(postUserLookupOrderQuadriga(key,sign,nonce,id))},
  postUserCancelOrderQuadrigaDispatch:(apiKey,clientId,secret,id,book)=>{dispatch(postUserCancelOrderQuadriga(apiKey,clientId,secret,id,book))},
  postUserBuyAtPriceQuadrigaDispatch:(apiKey,clientId,secret,amount,price,book)=>{dispatch(postUserBuyAtPriceQuadriga(apiKey,clientId,secret,amount,price,book))},
  postUserBuyMarketOrderQuadrigaDispatch:(apiKey,clientId,secret,amount,book)=>{dispatch(postUserBuyMarketOrderQuadriga(apiKey,clientId,secret,amount,book))},
  postUserSellLimitQuadrigaDispatch:(apiKey,clientId,secret,amount,price,book)=>{dispatch(postUserSellLimitQuadriga(apiKey,clientId,secret,amount,price,book))},
  postUserSellMarketOrderQuadrigaDispatch:(apiKey,clientId,secret,amount,book)=>{dispatch(postUserSellMarketOrderQuadriga(apiKey,clientId,secret,amount,book))}
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
    }
    return {
         headerTitle: `ΞTH `,
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
      const {setTradingBookDispatch} = this.props;
      clearQuadrigaTickers();
      setTradingBookDispatch('eth_cad')
    }

  
    componentDidMount(){
      const {postUserQuadrigaBalanceAndOpenOrdersDispatch,apiKey,clientId,privateKey,tradingBook} = this.props;
      postUserQuadrigaBalanceAndOpenOrdersDispatch(apiKey,clientId,privateKey,'eth_cad')
    }
  
    componentWillUnmount(){
      const {getQuadrigaTickersDispatch} = this.props;
      clearInterval(this.state.interval)
      getQuadrigaTickersDispatch();
    }



    render() {
      const {
        apiKey,
        clientId,
        privateKey,
        tradingBook,
        quadrigaUserBalance,
        quadrigaUserOrders,
        quadrigaUserBuyAt,
        quadrigaUserBuyMarket,
        quadrigaUserOrdersLookup,
        quadrigaUserCancelOrder,
        quadrigaUserSellLimit,
        quadrigaUserSellMarket,
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
        <BuySellComponent acronym="ΞTH" name="Ethereum" quadrigaOrders={this.props.quadrigaOrders} 
        trading={{
          apiKey: apiKey,
          clientId: clientId,
          secret: privateKey,
          token: "eth",
          quadrigaUserOrdersLookup:quadrigaUserOrdersLookup,
          quadrigaUserOrders:quadrigaUserOrders,
          quadrigaUserBuyAt:quadrigaUserBuyAt,
          quadrigaUserBuyMarket:quadrigaUserBuyMarket,
          quadrigaUserCancelOrder:quadrigaUserCancelOrder,
          quadrigaUserSellLimit:quadrigaUserSellLimit,
          quadrigaUserSellMarket:quadrigaUserSellMarket,
          tradingBook: tradingBook,
          quadrigaUserBalance: quadrigaUserBalance,
          isGettingUserQuadrigaBalance:isGettingUserQuadrigaBalance,
          userBalance:(key,sign,nonce)=>postUserQuadrigaBalanceDispatch(key,sign,nonce),
          userOpenOrders:(key,sign,nonce,book)=>postUserOpenOrdersQuadrigaDispatch(key,sign,nonce,book),
          userLookupOrder:(key,sign,nonce,id)=>postUserLookupOrderQuadrigaDispatch(key,sign,nonce,id),
          userCancelOrder:(apiKey,clientId,secret,id,book)=>postUserCancelOrderQuadrigaDispatch(apiKey,clientId,secret,id,book),
          userBuyAtPrice:(apiKey,clientId,secret,amount,price,book)=>{postUserBuyAtPriceQuadrigaDispatch(apiKey,clientId,secret,amount,price,book)},
          userBuyMarketPrice:(apiKey,clientId,secret,amount,book)=>{postUserBuyMarketOrderQuadrigaDispatch(apiKey,clientId,secret,amount,book)},
          userSellAtPrice:(apiKey,clientId,secret,amount,price,book)=>{postUserSellLimitQuadrigaDispatch(apiKey,clientId,secret,amount,price,book)},
          userSellMarketPrice:(apiKey,clientId,secret,amount,book)=>{postUserSellMarketOrderQuadrigaDispatch(apiKey,clientId,secret,amount,book)}
        }} 
        />
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
