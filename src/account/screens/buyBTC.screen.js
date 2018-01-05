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
import {BuySellComponent,TradingButtonComponent} from 'components'
import {Button,Header} from 'react-native-elements'
import {connect} from 'react-redux'
import {encryptAuthenticationQuadriga,Logos} from 'util'
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
})
const mapDispatchToProps = (dispatch) => ({
  setTradingBookDispatch:(book)=>{dispatch(setTradingBook(book))},
  getQuadrigaOrdersDispatch:(book,group)=>{dispatch(getQuadrigaOrders(book,group))},
  postUserQuadrigaBalanceDispatch:(key,sign,nonce)=>{dispatch(postUserQuadrigaBalance(key,sign,nonce))},
  postUserOpenOrdersQuadrigaDispatch:(key,sign,nonce,book)=>{dispatch(postUserOpenOrdersQuadriga(key,sign,nonce,book))},
  postUserLookupOrderQuadrigaDispatch:(key,sign,nonce,id)=>{dispatch(postUserLookupOrderQuadriga(key,sign,nonce,id))},
  postUserCancelOrderQuadrigaDispatch:(apiKey,clientId,secret,id)=>{dispatch(postUserCancelOrderQuadriga(apiKey,clientId,secret,id))},
  postUserBuyAtPriceQuadrigaDispatch:(apiKey,clientId,secret,amount,price,book)=>{dispatch(postUserBuyAtPriceQuadriga(apiKey,clientId,secret,amount,price,book))},
  postUserBuyMarketOrderQuadrigaDispatch:(apiKey,clientId,secret,amount,book)=>{dispatch(postUserBuyMarketOrderQuadriga(apiKey,clientId,secret,amount,book))},
  postUserSellLimitQuadrigaDispatch:(apiKey,clientId,secret,amount,price,book)=>{dispatch(postUserSellLimitQuadriga(apiKey,clientId,secret,amount,price,book))},
  postUserSellMarketOrderQuadrigaDispatch:(apiKey,clientId,secret,amount,book)=>{dispatch(postUserSellMarketOrderQuadriga(apiKey,clientId,secret,amount,book))}
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
        headerRight: <TradingButtonComponent/>,
        headerStyle:{
              backgroundColor:'orange'
            },
        }
    };
    componentWillMount(){
      const {getQuadrigaOrdersDispatch,setTradingBookDispatch} = this.props;
      getQuadrigaOrdersDispatch("btc_cad",0)
      setTradingBookDispatch('btc_cad')
    }
  
    componentDidMount(){
      const {postUserQuadrigaBalanceDispatch,apiKey,clientId,privateKey} = this.props;
      const nonce = Date.now();
      postUserQuadrigaBalanceDispatch(apiKey,encryptAuthenticationQuadriga(nonce,clientId,apiKey,privateKey),nonce)
    }
  
    componentWillUnmount(){
     clearInterval(this.state.interval)
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
        <BuySellComponent acronym="XɃT" name="Bitcoin" quadrigaOrders={this.props.quadrigaOrders} 
        trading={{
          apiKey: apiKey,
          clientId: clientId,
          secret: privateKey,
          token: "eth",
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
          userCancelOrder:(apiKey,clientId,secret,id)=>postUserCancelOrderQuadrigaDispatch(apiKey,clientId,secret,id),
          userBuyAtPrice:(apiKey,clientId,secret,amount,price,book)=>{postUserBuyAtPriceQuadrigaDispatch(apiKey,clientId,secret,amount,price,book)},
          userBuyMarketPrice:(apiKey,clientId,secret,amount,book)=>{postUserBuyMarketOrderQuadrigaDispatch(apiKey,clientId,secret,amount,book)},
          userSellAtPrice:(apiKey,clientId,secret,amount,price,book)=>{postUserSellLimitQuadrigaDispatch(apiKey,clientId,secret,amount,price,book)},
          userSellMarketPrice:(apiKey,clientId,secret,amount,book)=>{postUserSellMarketOrderQuadrigaDispatch(apiKey,clientId,secret,amount,book)}
        }} />
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
