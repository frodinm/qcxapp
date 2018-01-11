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
} from 'react-native';
import {connect} from 'react-redux'
import { NavigationActions } from 'react-navigation'
import IconMaterial from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import IconSimple from 'react-native-vector-icons/dist/SimpleLineIcons'
import IconAwsome from 'react-native-vector-icons/dist/FontAwesome'
import IconIOS from 'react-native-vector-icons/dist/Ionicons'
import DropdownAlert from 'react-native-dropdownalert';

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
    postUserLookupOrderQuadriga,
    postUserBitcoinWalletWithdrawQuadriga,
    postUserEthereumWalletWithdrawQuadriga,
    postUserBitcoinGoldWalletWithdrawQuadriga,
    postUserLitecoinWalletWithdrawQuadriga,
    postUserBitcoinCashWalletWithdrawQuadriga,
    postUserQuadrigaBalanceAndTransactions
} from 'account';
import i18n from 'i18n'
import {resetNavigation} from 'util'
import QRCode from 'react-native-qrcode';
import { iOSUIKit } from 'react-native-typography'
import {Divider,Button} from 'react-native-elements'
import Modal from 'react-native-modalbox';
import {encryptAuthenticationQuadriga,Logos} from 'util';

const {height, width} = Dimensions.get('window');

const textStyle = {
    fontSize: 17,
    color: 'black',
    marginBottom:10,
    textAlign:'center',
}
const mapStateToProps = (state) => ({
    apiKey: state.user.apiKey,
    clientId:state.user.clientId,
    privateKey:state.user.privateKey,

})
const mapDispatchToProps = (dispatch) => ({
    postUserBitcoinWalletWithdrawQuadrigaDispatch:(key,sign,nonce,amount,address)=>{dispatch(postUserBitcoinWalletWithdrawQuadriga(key,sign,nonce,amount,address))},
    postUserEthereumWalletWithdrawQuadrigaDispatch:(key,sign,nonce,amount,address)=>{dispatch(postUserEthereumWalletWithdrawQuadriga(key,sign,nonce,amount,address))},
    postUserBitcoinGoldWalletWithdrawQuadrigaDispatch:(key,sign,nonce,amount,address)=>{dispatch(postUserBitcoinGoldWalletWithdrawQuadriga(key,sign,nonce,amount,address))},
    postUserLitecoinWalletWithdrawQuadrigaDispatch:(key,sign,nonce,amount,address)=>{dispatch(postUserLitecoinWalletWithdrawQuadriga(key,sign,nonce,amount,address))},
    postUserBitcoinCashWalletWithdrawQuadriga:(key,sign,nonce,amount,address)=>{dispatch(postUserBitcoinCashWalletWithdrawQuadriga(key,sign,nonce,amount,address))},
})


class ExchangeWallet extends Component {
    constructor() {
        super();
        this.state = {
        
        }
        this.handleQrCode = this.handleQrCode.bind(this);
        this.handleCopyAddress = this.handleCopyAddress.bind(this);
    }
    //btc_cad btc_usd  eth_btc, eth_cad, ltc_cad, bch_cad, btg_cad
    componentWillMount(){

    }
    componentDidMount(){
        this.props.navigation.setParams({ handleQrCode: this.handleQrCode})
    }

    static navigationOptions = ({navigation}) => {
        const headerStyle = {
            alignSelf: 'center',
            color: 'white',
            position: 'relative',
            
        }
        return {
            headerTitle: 'Wallet',
            headerRight: <TouchableOpacity onPress={()=> navigation.state.params.handleQrCode()}>
                            <IconMaterial size={25} color='white' style={{marginRight:20}} name="qrcode-scan"/>
                         </TouchableOpacity>,
            headerStyle: {
                backgroundColor: 'orange',
            },
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
            if(TouchableNativeFeedback.canUseNativeForeground()){
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

    handleLogo(acronym){
       let logo;
           Logos.map((e) => {
            if (e.acronym.indexOf(acronym) !== -1) {
                logo = e.logo;
            }
        })
        return logo;
    }

    handleCopyAddress(){
        const {address} = this.props.navigation.state.params;
        Clipboard.setString(address);
        this.refs.modal.close();
        setTimeout(()=>{
            this.dropdown.alertWithType('info','Info',"Address was copied to clipboard!")
        },550)
    }



    render() {
        const {currencyFrom,currencyTo,payinAddress,payoutAddress} = this.props.navigation.state.params;
        return(
            <View style={styles.container}>
                <View style={{alignItems: 'center',height:height}}>
                <Text style={[iOSUIKit.body,{padding:20}]}>This is your unique key pair !</Text>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                        <Text style={[iOSUIKit.body,{marginRight:10,fontWeight:'bold',marginBottom:20}]}>From</Text>
                        <Image style={{height:height/6,width:width/3,marginRight:10}} resizeMode="contain" source={this.handleLogo(currencyFrom)}/>
                    </View>
                    <View style={{margin:5,marginTop:20}}>
                        <IconAwsome name="exchange" size={25}/>
                    </View>
                    <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                        <Text style={[iOSUIKit.body,{marginRight:10,fontWeight:'bold',marginBottom:20}]}>To</Text>
                        <Image style={{height:height/6,width:width/3}} resizeMode="contain" source={this.handleLogo(currencyTo)}/>
                    </View>
                </View>
                <Text style={[iOSUIKit.body,{padding:10}]}>Send {currencyFrom.toUpperCase()} to</Text>
                <Text style={[iOSUIKit.body,{padding:10}]}>{payinAddress}</Text>
                <Text style={[iOSUIKit.body,{padding:10}]}>To receive your {currencyTo.toUpperCase()} at the address</Text>
                <Text style={[iOSUIKit.body,{padding:10}]}>{payoutAddress}</Text>
                </View>
                <Modal 
                 style={styles.modal}
                 position={"center"}
                 coverScreen={true}
                 ref={"modal"} 
                 >
                    <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',height: 350,width: 300}}>
                    <Text style={[iOSUIKit.title3,{marginBottom:30,position:'absolute',top:30}]}>My {currencyFrom.toUpperCase()} Address</Text>
                    <QRCode
                        value={payinAddress}
                        size={180}
                        bgColor='black'
                        fgColor='white'
                        />
                        {this.handleModalButton("close".toUpperCase(),{position:'absolute',bottom:30,right:150,margin:5},{fontSize:14,color:'black',textAlign:'center'},()=>this.refs.modal.close())}
                        {this.handleModalButton("copy address".toUpperCase(),{position:'absolute',bottom:30,right:20,margin:5},{fontSize:14,color:'orange',textAlign:'center'},()=>this.handleCopyAddress())}
                    </View>
                </Modal>
                <DropdownAlert updateStatusBar={false} translucent={true} ref={ref => this.dropdown = ref}  />
              </View>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center',


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


   
});

export const ExchangeWalletScreen = connect(mapStateToProps,mapDispatchToProps)(ExchangeWallet);
