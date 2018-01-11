import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    Dimensions,
    TouchableNativeFeedback,
    TextInput,
    TouchableHighlight
} from 'react-native';
import {Button} from 'react-native-elements'
import { iOSUIKit } from 'react-native-typography'
import Modal from 'react-native-modalbox';
import {connect} from 'react-redux';
import IconMaterial from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import IconAwsome from 'react-native-vector-icons/dist/FontAwesome';
import {encryptAuthenticationQuadriga} from 'util';
import DropdownAlert from 'react-native-dropdownalert';
import {
    setFromTokenLogo,
    setToTokenLogo,
    postChangellyCurrency,
    postChangellyMinAmount,
    postChangellyExchangeAmount,
    postChangellyCreateTransaction,
    getChangellyTransactions,
    getChangellyStatus
} from 'exchange'
import {
    postUserBitcoinWalletWithdrawQuadriga,
    postUserEthereumWalletWithdrawQuadriga,
    postUserBitcoinGoldWalletWithdrawQuadriga,
    postUserLitecoinWalletWithdrawQuadriga,
    postUserBitcoinCashWalletWithdrawQuadriga
} from 'account'
import {resetNavigation} from 'util'
import QRCode from 'react-native-qrcode';

const {height, width} = Dimensions.get('window');

const textStyle = {
    fontSize: 19,
    color: 'black',
    marginBottom:10,
}


const mapStateToProps = (state) => ({
    apiKey: state.user.apiKey,
    clientId:state.user.clientId,
    privateKey:state.user.privateKey,
    changellyCreateTransaction: state.exchange.changellyCreateTransaction,
    fromAmount: state.exchange.fromAmount,
    quadrigaUserWalletWithdraw: state.account.quadrigaUserWalletWithdraw,
})
const mapDispatchToProps = (dispatch) => ({
    postChangellyCreateTransactionDispatch: (fromCoin, toCoin, amount, address, extraId, navigation) => {dispatch(postChangellyCreateTransaction(fromCoin, toCoin, amount, address, extraId, navigation))},
    postUserBitcoinWalletWithdrawQuadrigaDispatch:(key,sign,nonce,amount,address)=>{dispatch(postUserBitcoinWalletWithdrawQuadriga(key,sign,nonce,amount,address))},
    postUserEthereumWalletWithdrawQuadrigaDispatch:(key,sign,nonce,amount,address)=>{dispatch(postUserEthereumWalletWithdrawQuadriga(key,sign,nonce,amount,address))},
    postUserBitcoinGoldWalletWithdrawQuadrigaDispatch:(key,sign,nonce,amount,address)=>{dispatch(postUserBitcoinGoldWalletWithdrawQuadriga(key,sign,nonce,amount,address))},
    postUserLitecoinWalletWithdrawQuadrigaDispatch:(key,sign,nonce,amount,address)=>{dispatch(postUserLitecoinWalletWithdrawQuadriga(key,sign,nonce,amount,address))},
    postUserBitcoinCashWalletWithdrawQuadriga:(key,sign,nonce,amount,address)=>{dispatch(postUserBitcoinCashWalletWithdrawQuadriga(key,sign,nonce,amount,address))},
})

class PayExchange extends Component {
    constructor() {
        super();
        this.state = {
            address: null
        }
        this.handlePlatform = this.handlePlatform.bind(this);
        this.handleWithdraw = this.handleWithdraw.bind(this);
    }

    static navigationOptions = ({navigation}) => {
        const headerStyle = {
            alignSelf: 'center',
            color: 'white',
            position: 'relative',
            ...Platform.select({
                android:{
                    right: 30
                }
            })
        }
        return {
            headerTitle: 'Send',
            headerStyle: {
                backgroundColor: 'orange',
            },
            headerTitleStyle: {
                ...headerStyle
            },

        }
    };

    handleWithdrawAlert(){
        const {quadrigaUserWalletWithdraw,apiKey,clientId,privateKey} = this.props;
        const {book,bookTwo} = this.props.navigation.state.params;
        if(quadrigaUserWalletWithdraw.data.hasOwnProperty('error')){
            this.dropdown.alertWithType('error','Error', quadrigaUserWalletWithdraw.data.error.message);
        }else{
            this.dropdown.alertWithType('success','Success', 'Your withdraw has been sent, you will receive your exchange soon !');
        }
    }

    handleWithdraw(acronym){
        const {
            apiKey,
            clientId,
            privateKey,
            fromAmount,
            postUserBitcoinWalletWithdrawQuadrigaDispatch,
            postUserEthereumWalletWithdrawQuadrigaDispatch,
            postUserBitcoinGoldWalletWithdrawQuadrigaDispatch,
            postUserLitecoinWalletWithdrawQuadrigaDispatch,
            postUserBitcoinCashWalletWithdrawQuadriga,
        } = this.props;
        let nonce;
        switch(acronym){
            case 'btc':
                nonce = Date.now();
                postUserBitcoinWalletWithdrawQuadrigaDispatch(apiKey,encryptAuthenticationQuadriga(nonce,clientId,apiKey,privateKey),nonce,fromAmount,this.props.changellyCreateTransaction.data.result.payinAddress);
            break;
            case 'eth':
                nonce = Date.now();
                postUserEthereumWalletWithdrawQuadrigaDispatch(apiKey,encryptAuthenticationQuadriga(nonce,clientId,apiKey,privateKey),nonce,fromAmount,this.props.changellyCreateTransaction.data.result.payinAddress);
            break;
            case 'bch':
                nonce = Date.now();
                postUserBitcoinCashWalletWithdrawQuadriga(apiKey,encryptAuthenticationQuadriga(nonce,clientId,apiKey,privateKey),nonce,fromAmount,this.props.changellyCreateTransaction.data.result.payinAddress);
            break;
            case 'btg':
                nonce = Date.now();
                postUserBitcoinGoldWalletWithdrawQuadrigaDispatch(apiKey,encryptAuthenticationQuadriga(nonce,clientId,apiKey,privateKey),nonce,fromAmount,this.props.changellyCreateTransaction.data.result.payinAddress);
            break;
            case 'ltc':
                nonce = Date.now();
                postUserLitecoinWalletWithdrawQuadrigaDispatch(apiKey,encryptAuthenticationQuadriga(nonce,clientId,apiKey,privateKey),nonce,fromAmount,this.props.changellyCreateTransaction.data.result.payinAddress);
            break;

        }
        this.refs.modalConfimSend.close();
        setTimeout(()=>{
            this.handleWithdrawAlert();
        },1000)
    }

    handlePlatform(){
        if(this.props.navigation.state.params.fromCoin === 'btc' || this.props.navigation.state.params.fromCoin === 'eth' || this.props.navigation.state.params.fromCoin === 'bch' || this.props.navigation.state.params.fromCoin === 'btg' || this.props.navigation.state.params.fromCoin === 'ltc') {
            if(Platform.OS === 'android'){
                if(TouchableNativeFeedback.canUseNativeForeground()){
                    return (
                        <TouchableNativeFeedback onPress={()=>this.refs.modalConfimSend.open()} useForeground={true} background={TouchableNativeFeedback.Ripple()} delayPressIn={0}>
                            <View style={{backgroundColor:'orange',marginTop:20,height:60,width:width,alignItems:'center',justifyContent:'center',flexDirection:'row',position:'absolute',bottom:0}}>
                                <Text style={{fontSize:19,color:'white',textAlign:'center'}}> Quick Send {'\n'} with Quadriga </Text>
                            </View>
                        </TouchableNativeFeedback> 
                    )
                }else{
                    return(
                        <View style={{position:'absolute',bottom:0}}>
                        <TouchableHighlight onPress={()=>this.refs.modalConfimSend.open()}>
                        <View style={{backgroundColor:'orange',height:60,width:width,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                            <Text style={{fontSize:19,color:'white',textAlign:'center'}}> Quick Send {'\n'} with Quadriga </Text>
                        </View>
                        </TouchableHighlight>
                        </View>
                    )
                }
            }else{
                return(
                    <View style={{position:'absolute',bottom:0}}>
                    <TouchableHighlight onPress={()=>this.refs.modalConfimSend.open()}>
                    <View style={{backgroundColor:'orange',height:60,width:width,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                        <Text style={{fontSize:19,color:'white',textAlign:'center'}}> Quick Send {'\n'} with Quadriga </Text>
                    </View>
                    </TouchableHighlight>
                    </View>
                )
            }
        }
    }

    render() {
        const {changellyCreateTransaction} = this.props

        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'column', alignItems: 'center',margin:20}}>
                    <Text style={{...textStyle}}>Transaction ID : {changellyCreateTransaction.data.result.id}</Text>
                    <Text style={{...textStyle}}>Send {this.props.fromAmount} {this.props.navigation.state.params.fromCoin} to this address</Text>
                    <Text style={{...textStyle,fontSize:15}}>{changellyCreateTransaction.data.result.payinAddress}</Text>
                    <QRCode
                        value={changellyCreateTransaction.data.result.payinAddress}
                        size={200}
                        bgColor='black'
                        fgColor='white'/>
                    <Button
                        large
                        buttonStyle={{margin:20,borderRadius:10,backgroundColor:'#ff9443'}}
                    title={'Go to account'}
                        fontSize={18}
                        onPress={()=>resetNavigation('Auth',this.props.navigation)}
                    />
                </View>
              {this.handlePlatform()}
                <Modal style={[styles.modalConfirm,{alignItems:'center',justifyContent:'center'}]} backdrop={false} entry="top"  position={"top"} ref={"modalConfimSend"}>
                    <Text style={[iOSUIKit.subhead, {color: "white",textAlign:'center'}]}>Please confirm your withdraw of {this.props.fromAmount} {this.props.navigation.state.params.fromCoin}{'\n'} from your QuadrigaCX {this.props.navigation.state.params.fromCoin.toUpperCase()} wallet</Text>
                    <View style={{flexDirection:'row'}}>
                        <Button onPress={()=>this.refs.modalConfimSend.close()} title="Cancel" buttonStyle={{backgroundColor:'#4ca64c',height:height/16,width:width/2.5,opacity:1}}/>
                        <Button onPress={()=>this.handleWithdraw(this.props.navigation.state.params.fromCoin)} title="Confirm" buttonStyle={{backgroundColor:'#ffb732',height:height/16,width:width/2.5,opacity:1}}/>
                    </View>
                </Modal>
                <DropdownAlert updateStatusBar={false} translucent={true} ref={ref => this.dropdown = ref}  />
            </View>
        );
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
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    modalConfirm: {
        height: height/6.5,
        backgroundColor: '#007aff',
        opacity:0.97
      },
});

export const PayExchangeScreen = connect(mapStateToProps, mapDispatchToProps)(PayExchange);