import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    Image,
    Dimensions,
    TouchableNativeFeedback,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    Clipboard,
    Button
} from 'react-native';
import {connect} from 'react-redux'
import IconMaterial from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import IconSimple from 'react-native-vector-icons/dist/SimpleLineIcons'
import IconAwsome from 'react-native-vector-icons/dist/FontAwesome'
import IconIOS from 'react-native-vector-icons/dist/Ionicons'

import {
    setFromTokenLogo,
    setToTokenLogo,
    postChangellyMinAmount,
    postChangellyExchangeAmount,
    getChangellyTransactions,
    getChangellyStatus,
    postChangellyAddressPair
} from 'exchange'
import {
    postUserQuadrigaTransactions,
    postUserLookupOrderQuadriga
} from 'account';
import i18n from 'i18n'
import {resetNavigation} from 'util'
import QRCode from 'react-native-qrcode';
import { iOSUIKit } from 'react-native-typography'
import {Divider} from 'react-native-elements'
import Modal from 'react-native-modalbox';
import {encryptAuthenticationQuadriga,convertunixTime} from 'util';

const {height, width} = Dimensions.get('window');

const textStyle = {
    fontSize: 19,
    color: 'black',
    marginBottom:10,
}

const apiKey = "PoDWcWznpm"
const secret = "534158c052093441c9bb309788f4e3d5"
const clientId = "2515766"

const mapStateToProps = (state) => ({
    apiKey: state.user.apiKey,
    clientId:state.user.clientId,
    privateKey:state.user.privateKey,
    quadrigaTickerBTC: state.account.quadrigaTickerBTC,
    quadrigaTickerETH: state.account.quadrigaTickerETH,
    quadrigaTickerBCH: state.account.quadrigaTickerBCH,
    quadrigaTickerBTG: state.account.quadrigaTickerBTG,
    quadrigaTickerLTC: state.account.quadrigaTickerLTC,
    quadrigaUserBalance: state.account.quadrigaUserBalance,
    quadrigaUserTransactions: state.account.quadrigaUserTransactions,
    quadrigaUserOrdersLookup: state.account.quadrigaUserOrdersLookup,
})
const mapDispatchToProps = (dispatch) => ({
    postUserQuadrigaTransactionsDispatch:(key,sign,nonce,offset,limit,sort,book)=>{dispatch(postUserQuadrigaTransactions(key,sign,nonce,offset,limit,sort,book))},
    postUserLookupOrderQuadrigaDispatch:(key,sign,nonce,id)=>{dispatch(postUserLookupOrderQuadriga(key,sign,nonce,id))}
})

const testLookUp = {
  
}

const testObject = [
    {
    datetime: Date.now(),
    id: "1892832323",
    type: "2",
    method: "deposit",
    major:'btc',
    minor:'cad',
    order_id:'jfqwoijfqwernktnjqjknq4jknqjwknefqkjwefn',
    fee:0.05,
    rate:'19234'
    },
    {
        datetime: Date.now(),
        id: "1892832323",
        type: "1",
        method: "deposit",
        major:'btc',
        minor:'cad',
        order_id:'jfqwoijfqwernktnjqjknq4jknqjwknefqkjwefn',
        fee:0.05,
        rate:'19234'
        },
        {
            datetime: Date.now(),
            id: "1892832323",
            type: "2",
            method: "withdrawal",
            major:'btc',
            minor:'cad',
            order_id:'jfqwoijfqwernktnjqjknq4jknqjwknefqkjwefn',
            fee:0.05,
            rate:'19234'
            },
            {
                datetime: Date.now(),
                id: "1892832323",
                type: "2",
                method: "withdrawal",
                major:'btc',
                minor:'cad',
                order_id:'jfqwoijfqwernktnjqjknq4jknqjwknefqkjwefn',
                fee:0.05,
                rate:'19234'
                },
                {
                    datetime: Date.now(),
                    id: "1892832323",
                    type: "0",
                    method: "deposit",
                    major:'btc',
                    minor:'cad',
                    order_id:'jfqwoijfqwernktnjqjknq4jknqjwknefqkjwefn',
                    fee:0.05,
                    rate:'19234'
                    },
                    {
                        datetime: Date.now(),
                        id: "1892832323",
                        type: "1",
                        method: "withdrawal",
                        major:'btc',
                        minor:'cad',
                        order_id:'jfqwoijfqwernktnjqjknq4jknqjwknefqkjwefn',
                        fee:0.05,
                        rate:'19234'
                        },
                        {
                            datetime: Date.now(),
                            id: "1892832323",
                            type: "0",
                            method: "deposit",
                            major:'btc',
                            minor:'cad',
                            order_id:'jfqwoijfqwernktnjqjknq4jknqjwknefqkjwefn',
                            fee:0.05,
                            rate:'19234'
                            },
                            {
                                datetime: Date.now(),
                                id: "1892832323",
                                type: "1",
                                method: "withdrawal",
                                major:'btc',
                                minor:'cad',
                                order_id:'jfqwoijfqwernktnjqjknq4jknqjwknefqkjwefn',
                                fee:0.05,
                                rate:'19234'
                                }
    
]

class Wallet extends Component {
    constructor() {
        super();
        this.state = {
            address: null,
            refreshing: false,
        }
        this.handleData = this.handleData.bind(this);
        this.handleQrCode = this.handleQrCode.bind(this);
        this.handlePlatform = this.handlePlatform.bind(this);
        this.handleCopyAddress = this.handleCopyAddress.bind(this);
        this.handleTransactions = this.handleTransactions.bind(this);
        this.handleTestPress = this.handleTestPress.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleTransactionInfo = this.handleTransactionInfo.bind(this);
    }
    //btc_cad btc_usd  eth_btc, eth_cad, ltc_cad, bch_cad, btg_cad
    componentWillMount(){
        const {postUserQuadrigaTransactionsDispatch} = this.props;
        const {book} = this.props.navigation.state.params;

        let nonce = Date.now();
        postUserQuadrigaTransactionsDispatch(apiKey,encryptAuthenticationQuadriga(nonce,clientId,apiKey,secret),nonce,0,50,"desc",book);
    }
    componentDidMount(){
        this.props.navigation.setParams({ handleQrCode: this.handleQrCode})
    }

    handleTestPress(){
        const {book} = this.props.navigation.state.params;
        const {postUserQuadrigaTransactionsDispatch} = this.props;
        let nonce = Date.now();
        postUserQuadrigaTransactionsDispatch(apiKey,encryptAuthenticationQuadriga(nonce,clientId,apiKey,secret),nonce,0,50,"desc",book);
    }

    static navigationOptions = ({navigation}) => {
        const headerStyle = {
            alignSelf: 'center',
            color: 'white',
            position: 'relative',
            
        }
        return {
           
            headerTitle: 'Wallet',
            headerStyle: {
                backgroundColor: 'orange',
            },
            headerRight: <TouchableOpacity onPress={()=> navigation.state.params.handleQrCode()}>
                            <IconMaterial size={25} color='white' style={{marginRight:20}} name="qrcode-scan"/>
                         </TouchableOpacity>,
            headerTitleStyle: {
                ...headerStyle
            },

        }
    };


    handleQrCode(){
        this.refs.modal.open();
    }
    
    handlePlatform(onPressAction,buttonStyle,text){
        if(Platform.OS === 'android'){
          return(
            <TouchableNativeFeedback onPress={onPressAction} useForeground={true} background={TouchableNativeFeedback.Ripple()} delayPressIn={0}>
              <View style={{...buttonStyle,justifyContent:'center'}} pointerEvents='box-only' >
              <Text style={{textAlign:'center',fontSize:20,color:'black',fontWeight:'bold'}}>{text}</Text>
              </View>
          </TouchableNativeFeedback>
          )
        }else{
          return(
            <TouchableHighlight style={{height:40,width:width/2.3,margin:5,marginBottom:10,borderRadius:5,}} onPress={onPressAction} >
              <View style={{backgroundColor:'orange',justifyContent:'center',height:40,width:width/2.3,marginBottom:10,borderRadius:5,}} pointerEvents='box-only' >
              <Text style={{textAlign:'center',fontSize:18,color:'black',fontWeight:'bold'}}>{text}</Text>
              </View>
          </TouchableHighlight>
          )
        }
      }

    handleModalButton(text,styles,textStyle,onPressAction){
        return(
            <View style={styles}>
                <Text onPress={onPressAction} style={textStyle}>{text}</Text>
            </View>
        )
        
    }
    handleData(acronym){
        const {quadrigaTickerBTC,quadrigaTickerETH,quadrigaTickerBCH,quadrigaTickerBTG,quadrigaTickerLTC,quadrigaUserBalance} = this.props;
        const textStyle = iOSUIKit.body;
        
        if(acronym === 'btc'){
            return (
                <View>
                    <Text style={[textStyle,{fontSize:20}]}>{quadrigaUserBalance.data.btc_balance === "0.00000000" ? "0": quadrigaUserBalance.data.btc_balance} BTC</Text>
                    <Text style={[textStyle,{marginBottom:20}]}>${(quadrigaTickerBTC.data.last*quadrigaUserBalance.data.btc_balance).toFixed(2)}</Text>
                </View>
            )
        }else if(acronym === 'eth'){
            return (
                <View>
                    <Text style={[textStyle,{fontSize:20}]}>{quadrigaUserBalance.data.eth_balance === "0.00000000" ? "0": quadrigaUserBalance.data.eth_balance} ETH</Text>
                    <Text style={[textStyle,{marginBottom:20}]}>${(quadrigaTickerETH.data.last*quadrigaUserBalance.data.eth_balance).toFixed(2)}</Text>
                </View>
            )
        }else if(acronym === 'bch'){
            return (
                <View>
                    <Text style={[textStyle,{fontSize:20}]}>{quadrigaUserBalance.data.bch_balance === "0.00000000" ? "0": quadrigaUserBalance.data.bch_balance} BCH</Text>
                    <Text style={[textStyle,{marginBottom:20}]}>${(quadrigaTickerBCH.data.last*quadrigaUserBalance.data.bch_balance).toFixed(2)}</Text>
                </View>
            )
        }else if(acronym === 'btg'){
            return (
                <View>
                    <Text style={[textStyle,{fontSize:20}]}>{quadrigaUserBalance.data.btg_balance === "0.00000000" ? "0": quadrigaUserBalance.data.btg_balance} BTG</Text>
                    <Text style={[textStyle,{marginBottom:20}]}>${(quadrigaTickerBTG.data.last*quadrigaUserBalance.data.btg_balance).toFixed(2)}</Text>
                </View>
            )
        }else if(acronym === 'ltc'){
            return (
                <View>
                    <Text style={[textStyle,{fontSize:20}]}>{quadrigaUserBalance.data.ltc_balance === "0.00000000" ? "0": quadrigaUserBalance.data.ltc_balance} LTC</Text>
                    <Text style={[textStyle,{marginBottom:20}]}>${(quadrigaTickerLTC.data.last*quadrigaUserBalance.data.ltc_balance).toFixed(2)}</Text>
                </View>
            )
        }
        
    }
    handleIcon(object){
        if(object.type === "2"){
            return <IconAwsome name="exchange" size={22}/>
        }else if(object.type === "1"){
            return <IconIOS name="ios-send-outline" size={35}/>
        }else if(object.type === "0"){
            return  <IconSimple name="wallet" size={22}/>
        }

    }
    handleText(object){
        let BuyOrSell;
        let noun;
        if(object.type ===  '0'){
            return{ 
                BuyOrSell:"Deposit",
                textObject: null
            }
        }else if(object.type === "1"){
            return{ 
                BuyOrSell:"Sent",
                textObject: <Text style={[iOSUIKit.body]}>To {object.minor}</Text>
            }
        }else if(object.type === "2"){
            return{ 
                BuyOrSell:"Bought",
                textObject: <Text style={[iOSUIKit.body]}>From {object.minor}</Text>
            }
        }
    }

    handleRefresh(){
        const {postUserQuadrigaTransactionsDispatch} = this.props;
        const {book} = this.props.navigation.state.params;

        let nonce = Date.now();
        postUserQuadrigaTransactionsDispatch(apiKey,encryptAuthenticationQuadriga(nonce,clientId,apiKey,secret),nonce,0,50,"desc",book);
    }

    handleTransactionInfo(item){
        const {postUserLookupOrderQuadrigaDispatch} = this.props;
        let nonce = Date.now();
        postUserLookupOrderQuadrigaDispatch(apiKey,encryptAuthenticationQuadriga(nonce,clientId,apiKey,secret),nonce,item.order_id);
        this.refs.modalLookUp.open()
    }

    handleCopyAddress(){
        const {address} = this.props.navigation.state.params;
        Clipboard.setString(address);
        this.refs.modal.close();
        setTimeout(()=>{
            alert("Address was copied to clipboard!")
        },550)
    }

    _keyExtractor = (item, index) => index;

    _renderItem = ({item,index}) => (
        <View style={{justifyContent:'center',alignItems:'center',width:width,height:height/14,marginTop:20,}}>
            <TouchableHighlight underlayColor="orange" style={{}} onPress={()=>this.handleTransactionInfo(item)} >
                    <View key={index} style={{width:width,height:height/14,backgroundColor:'white'}}>
        
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <View style={{width:width*0.30,alignItems:'center'}}>
                        {this.handleIcon(item)}
                        </View>
                        <View style={{flexDirection:'column',justifyContent:'center',width:width*0.40}}>
                            <Text style={[iOSUIKit.body]}>{this.handleText(item).BuyOrSell} {this.props.navigation.state.params.name} </Text>
                            {this.handleText(item).textObject}
                        </View>
                        <View style={{flexDirection:'column',width:width*0.30}}>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}} >
                            <Text style={iOSUIKit.caption} >{convertunixTime(item.datetime).hours}:{convertunixTime(item.datetime).minutes}:{convertunixTime(item.datetime).seconds}</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'center'}} >
                                <Text style={iOSUIKit.caption}>{convertunixTime(item.datetime).day}/{convertunixTime(item.datetime).month}/{convertunixTime(item.datetime).fullYear}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
              <Divider style={{height: 1, backgroundColor: 'orange',width:width/1.1,alignSelf:'center'}}/>
            </View>
      );

    handleTransactions(name){
        const {quadrigaUserTransactions} = this.props;
        if(quadrigaUserTransactions.length !== 0){
        return (
            <View style={{width:width,...Platform.select({ios:{height:(height/2-50)},android:{height:height/2-40}}),alignItems:'center',justifyContent:'center'}}>
                <Text style={[iOSUIKit.title3,{fontWeight:'bold'}]}>You have no transactions</Text>
                <Text style={{textAlign:'center',fontSize:16}}>{`\nBuy ${name} now and your\ntransactions will show here`}</Text>
            </View>
           )
        }else{
            return(
                <FlatList
                data={testObject} // change to quadrigatransactions later
                extraData={this.props}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                refreshing={this.state.refreshing}
                onRefresh={()=>this.handleRefresh()}
              />
            )
        }
    }


    render() {
        const {quadrigaTickerBTC,quadrigaTickerETH,quadrigaUserBalance} = this.props;
        const {type,acronym,name,address} = this.props.navigation.state.params;
        if(type === 'quadriga'){
        return(
            <View style={styles.container}>
            <View style={{ flexDirection: 'column', alignItems: 'center'}}>
                    <View style={{...Platform.select({ios:{height:height/2-100},android:{height:height/2-40}}),alignItems: 'center'}}>
                        <View style={{alignItems: 'center',width:width,height:(height/2-30)*0.45}}>
                            <Text style={[iOSUIKit.title3,{marginBottom:10,marginTop:20}]}>Your {name} wallet</Text>
                            {this.handleData(acronym)}
                        </View>
                        <View style={{flexDirection:'column', ...Platform.select({ios:{height:(height/2-30)*0.25},android:{height:(height/2-40)*0.30}})}}>
                        <View style={{flexDirection:'row'}}>
                            {this.handlePlatform(()=>{},{height:40,width:width/2.3,backgroundColor:'orange',margin:5,marginBottom:10,borderRadius:5},"Buy")}
                            {this.handlePlatform(()=>{},{height:40,width:width/2.3,backgroundColor:'orange',margin:5,marginBottom:10,borderRadius:5},"Withdraw")}
                        </View>
                        <Divider style={{height:1,backgroundColor:'orange',width:width/1.1}}/>
                        </View>
                        <Text style={[iOSUIKit.title3,{fontSize:22,marginTop:20}]}>Transactions</Text>
                    </View>
                    {this.handleTransactions(name)}
                   

                </View>
                <Modal 
                 style={styles.modalLookUp}
                 position={"center"}
                 coverScreen={true}
                 ref={"modalLookUp"} 
                 >
                    <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',height: 350,width: 300}}>
                    <Text style={[iOSUIKit.title3,{marginBottom:30,position:'absolute',top:30}]}>My {name} Address</Text>
                    <QRCode
                        value={address}
                        size={180}
                        bgColor='black'
                        fgColor='white'
                        />
                        {this.handleModalButton("close".toUpperCase(),{position:'absolute',bottom:10,right:150,margin:5},{fontSize:14,color:'black',textAlign:'center'},()=>this.refs.modalLookUp.close())}
                        {this.handleModalButton("copy address".toUpperCase(),{position:'absolute',bottom:10,right:20,margin:5},{fontSize:14,color:'orange',textAlign:'center'},()=>this.handleCopyAddress())}
                    </View>
                </Modal>
                <Modal 
                 style={styles.modal}
                 position={"center"}
                 coverScreen={true}
                 ref={"modal"} 
                 >
                    <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',height: 350,width: 300}}>
                    <Text style={[iOSUIKit.title3,{marginBottom:30,position:'absolute',top:30}]}>My {name} Address</Text>
                    <QRCode
                        value={address}
                        size={180}
                        bgColor='black'
                        fgColor='white'
                        />
                        {this.handleModalButton("close".toUpperCase(),{position:'absolute',bottom:10,right:150,margin:5},{fontSize:14,color:'black',textAlign:'center'},()=>this.refs.modal.close())}
                        {this.handleModalButton("copy address".toUpperCase(),{position:'absolute',bottom:10,right:20,margin:5},{fontSize:14,color:'orange',textAlign:'center'},()=>this.handleCopyAddress())}
                    </View>
                </Modal>
              </View>
            )
        }else if(type === 'changelly'){
            <View style={styles.container}>
            <View style={{ flexDirection: 'column', alignItems: 'center',margin:20}}>
                    <QRCode
                        value={address}
                        size={200}
                        bgColor='black'
                        fgColor='white'/>
                
                </View>
             
              </View>
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center',
        backgroundColor:'white',
    },
    text: {
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:5,
        ...Platform.select({
            ios:{
                marginTop:0
            }
        }),
        height: height/1.8,
        width: width/1.2
    },
    modalLookUp: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:5,
        ...Platform.select({
            ios:{
                marginTop:0
            }
        }),
        height: height/1.7,
        width: width/1.1
    },
   
});

export const WalletScreen = connect(mapStateToProps,mapDispatchToProps)(Wallet);
