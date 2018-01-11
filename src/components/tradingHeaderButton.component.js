import React,{Component} from 'react'
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native'
import IconFoundation from 'react-native-vector-icons/dist/Foundation'
import IconMaterial from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import {connect} from 'react-redux'
import {encryptAuthenticationQuadriga} from 'util'
import { 
    setTradingBook,
    getQuadrigaOrders,
    postUserOpenOrdersQuadriga
 } from 'account'
 import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../assets/config.json';
const IconCustom = createIconSetFromFontello(fontelloConfig);

const {height,width} = Dimensions.get('window');

const mapStatetoProps = state =>({
    apiKey: state.user.apiKey,
    clientId:state.user.clientId,
    privateKey:state.user.privateKey,
    tradingBook: state.account.tradingBook,
})

const mapDispatchToProps = dispatch =>({
    setTradingBookDispatch:(book)=>{dispatch(setTradingBook(book))},
    getQuadrigaOrdersDispatch:(book,group)=>{dispatch(getQuadrigaOrders(book,group))},
    postUserOpenOrdersQuadrigaDispatch:(key,sign,nonce,book)=>{dispatch(postUserOpenOrdersQuadriga(key,sign,nonce,book))},
})

class TradingButton extends Component {
  constructor(){
    super();
    this.state = {
        interval: null,
    }
    this.handleRightIcon = this.handleRightIcon.bind(this);
  }

  componentDidMount(){
    const {getQuadrigaOrdersDispatch,tradingBook} = this.props;
    const intervalInstance = setInterval(()=>{
        getQuadrigaOrdersDispatch(tradingBook,0)
      },10000)
      this.setState({
        interval:intervalInstance
      })
  }

  componentWillUnmount(){
    clearInterval(this.state.interval)
   }


  handleOnPress(){
    const {setTradingBookDispatch,tradingBook,getQuadrigaOrdersDispatch,postUserOpenOrdersQuadrigaDispatch,apiKey,clientId,privateKey} = this.props;

    if( tradingBook === 'btc_cad' || tradingBook === 'btc_usd'){
        if(tradingBook === 'btc_cad'){
            setTradingBookDispatch('btc_usd')
            getQuadrigaOrdersDispatch("btc_usd",0)
            clearInterval(this.state.interval);
            const intervalInstance = setInterval(()=>{
                getQuadrigaOrdersDispatch("btc_usd",0)
            },15000)
            this.setState({
                interval:intervalInstance 
            })
            let nonce = Date.now();
            postUserOpenOrdersQuadrigaDispatch(apiKey,encryptAuthenticationQuadriga(nonce,clientId,apiKey,privateKey),nonce,'btc_usd');
        }else{
            setTradingBookDispatch('btc_cad')
            getQuadrigaOrdersDispatch("btc_cad",0)
            clearInterval(this.state.interval);
            const intervalInstance = setInterval(()=>{
                getQuadrigaOrdersDispatch("btc_cad",0)
            },15000)
            this.setState({
                interval:intervalInstance 
            })
            let nonce = Date.now();
            postUserOpenOrdersQuadrigaDispatch(apiKey,encryptAuthenticationQuadriga(nonce,clientId,apiKey,privateKey),nonce,'btc_cad');
        }
    }else if(tradingBook === 'eth_cad' || tradingBook === 'eth_btc'){
        if(tradingBook === 'eth_cad'){
            setTradingBookDispatch('eth_btc')
            getQuadrigaOrdersDispatch("eth_btc",0)
            clearInterval(this.state.interval);
            const intervalInstance = setInterval(()=>{
                getQuadrigaOrdersDispatch("eth_btc",0)
            },15000)
            this.setState({
                interval:intervalInstance 
            })
            let nonce = Date.now();
            postUserOpenOrdersQuadrigaDispatch(apiKey,encryptAuthenticationQuadriga(nonce,clientId,apiKey,privateKey),nonce,'eth_btc');
        }else{
            setTradingBookDispatch('eth_cad')
            getQuadrigaOrdersDispatch("eth_cad",0)
            clearInterval(this.state.interval);
            const intervalInstance = setInterval(()=>{
                getQuadrigaOrdersDispatch("eth_cad",0)
            },15000)
            this.setState({
                interval:intervalInstance 
            })
            let nonce = Date.now();
            postUserOpenOrdersQuadrigaDispatch(apiKey,encryptAuthenticationQuadriga(nonce,clientId,apiKey,privateKey),nonce,'eth_cad');
        }
    }else if(tradingBook === 'ltc_cad' || tradingBook === 'ltc_btc'){
        if(tradingBook === 'ltc_cad'){
            setTradingBookDispatch('ltc_btc')
            getQuadrigaOrdersDispatch("ltc_btc",0)
            clearInterval(this.state.interval);
            const intervalInstance = setInterval(()=>{
                getQuadrigaOrdersDispatch("ltc_btc",0)
            },15000)
            this.setState({
                interval:intervalInstance 
            })
            let nonce = Date.now();
            postUserOpenOrdersQuadrigaDispatch(apiKey,encryptAuthenticationQuadriga(nonce,clientId,apiKey,privateKey),nonce,'ltc_btc');
        }else{
            setTradingBookDispatch('ltc_cad')
            getQuadrigaOrdersDispatch("ltc_cad",0)
            clearInterval(this.state.interval);
            const intervalInstance = setInterval(()=>{
                getQuadrigaOrdersDispatch("ltc_cad",0)
            },15000)
            this.setState({
                interval:intervalInstance 
            })
            let nonce = Date.now();
            postUserOpenOrdersQuadrigaDispatch(apiKey,encryptAuthenticationQuadriga(nonce,clientId,apiKey,privateKey),nonce,'ltc_cad');
        }
    }else if(tradingBook === 'bch_cad' || tradingBook === 'bch_btc'){
        if(tradingBook === 'bch_cad'){
            setTradingBookDispatch('bch_btc')
            getQuadrigaOrdersDispatch("bch_btc",0)
            clearInterval(this.state.interval);
            const intervalInstance = setInterval(()=>{
                getQuadrigaOrdersDispatch("bch_btc",0)
            },15000)
            this.setState({
                interval:intervalInstance 
            })
            let nonce = Date.now();
            postUserOpenOrdersQuadrigaDispatch(apiKey,encryptAuthenticationQuadriga(nonce,clientId,apiKey,privateKey),nonce,'bch_btc');
        }else{
            setTradingBookDispatch('bch_cad')
            getQuadrigaOrdersDispatch("bch_cad",0)
            clearInterval(this.state.interval);
            const intervalInstance = setInterval(()=>{
                getQuadrigaOrdersDispatch("bch_cad",0)
            },15000)
            this.setState({
                interval:intervalInstance 
            })
            let nonce = Date.now();
            postUserOpenOrdersQuadrigaDispatch(apiKey,encryptAuthenticationQuadriga(nonce,clientId,apiKey,privateKey),nonce,'bch_cad');
        }
    }else if(tradingBook === 'btg_cad' || tradingBook === 'btg_btc'){
        if(tradingBook === 'btg_cad'){
            setTradingBookDispatch('btg_btc')
            getQuadrigaOrdersDispatch("btg_btc",0)
            clearInterval(this.state.interval);
            const intervalInstance = setInterval(()=>{
                getQuadrigaOrdersDispatch("btg_btc",0)
            },15000)
            this.setState({
                interval:intervalInstance 
            })
            let nonce = Date.now();
            postUserOpenOrdersQuadrigaDispatch(apiKey,encryptAuthenticationQuadriga(nonce,clientId,apiKey,privateKey),nonce,'btg_btc');
        }else{
            setTradingBookDispatch('btg_cad')
            getQuadrigaOrdersDispatch("btg_cad",0)
            clearInterval(this.state.interval);
            const intervalInstance = setInterval(()=>{
                getQuadrigaOrdersDispatch("btg_cad",0)
            },15000)
            this.setState({
                interval:intervalInstance 
            })
            let nonce = Date.now();
            postUserOpenOrdersQuadrigaDispatch(apiKey,encryptAuthenticationQuadriga(nonce,clientId,apiKey,privateKey),nonce,'btg_cad');
        }
    }
  }

  handleRightIcon(){
    const {tradingBook} = this.props;
    switch (tradingBook) {
        case "btc_cad":
        return <Text>USD </Text>
          break;
        case "btc_usd":
        return <Text>CAD </Text>
          break;
        case "eth_cad":
            return  <IconFoundation name="bitcoin-circle" size={30} style={{marginRight:10}}/>
          break;
        case "eth_btc":
          return  <Text>CAD </Text>
        break;
        case "bch_cad":
           return <IconFoundation name="bitcoin-circle" size={30} style={{marginRight:10}}/>
          break;
        case "bch_btc":
          return <Text>CAD </Text>
         break;
        case "btg_cad":
          return <IconFoundation name="bitcoin-circle" size={30} style={{marginRight:10}}/>
          break;
        case "btg_btc":
          return <Text>CAD</Text>
          break;
        case "ltc_cad":
           return <IconFoundation name="bitcoin-circle" size={30} style={{marginRight:10}}/>
          break;
        case "ltc_btc":
          return <Text>CAD </Text>
         break;
        default:
          return <Text>CAD </Text>
          break;
      }      
  }

  handleTradeFrom(){
      const {navigation} = this.props;
    return <TouchableOpacity onPress={()=>this.handleOnPress()} style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
        <Text>Trade with </Text>
        {this.handleRightIcon()}
    </TouchableOpacity>
  }

  render(){
    const {imageSource,onPressAction,buttonStyle,text} = this.props
    return(
        <View>
          {this.handleTradeFrom()}
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

export const TradingButtonComponent = connect(mapStatetoProps,mapDispatchToProps)(TradingButton);
