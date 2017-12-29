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
    TouchableOpacity,
    TouchableHighlight,
    Clipboard
} from 'react-native';
import {connect} from 'react-redux'
import IconMaterial from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import IconAwsome from 'react-native-vector-icons/dist/FontAwesome'
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
import {resetNavigation} from 'util'
import QRCode from 'react-native-qrcode';
import { iOSUIKit } from 'react-native-typography'
import {Divider} from 'react-native-elements'
import Modal from 'react-native-modalbox';

const {height, width} = Dimensions.get('window');

const textStyle = {
    fontSize: 19,
    color: 'black',
    marginBottom:10,
}


const mapStateToProps = (state) => ({
    quadrigaTickerBTC: state.account.quadrigaTickerBTC,
    quadrigaTickerETH: state.account.quadrigaTickerETH,
    quadrigaTickerBCH: state.account.quadrigaTickerBCH,
    quadrigaTickerBTG: state.account.quadrigaTickerBTG,
    quadrigaTickerLTC: state.account.quadrigaTickerLTC,
    quadrigaUserBalance: state.account.quadrigaUserBalance,
})
const mapDispatchToProps = (dispatch) => ({
   
})

class Wallet extends Component {
    constructor() {
        super();
        this.state = {
            address: null
        }
        this.handleData = this.handleData.bind(this);
        this.handleQrCode = this.handleQrCode.bind(this);
        this.handlePlatform = this.handlePlatform.bind(this);
        this.handleCopyAddress = this.handleCopyAddress.bind(this);
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

    handleCopyAddress(){
        const {address} = this.props.navigation.state.params;
        Clipboard.setString(address);
        this.refs.modal.close();
        setTimeout(()=>{
            alert("Address was copied to clipboard!")
        },550)
    }


    render() {
        const {quadrigaTickerBTC,quadrigaTickerETH,quadrigaUserBalance} = this.props;
        const {type,acronym,name,address} = this.props.navigation.state.params;
        if(type === 'quadriga'){
        return(
            <View style={styles.container}>
            <View style={{ flexDirection: 'column', alignItems: 'center'}}>
                    <View style={{...Platform.select({ios:{height:height/2-60},android:{height:height/2-40}}),alignItems: 'center'}}>
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
                    <ScrollView contentContainerStyle={{width:width,...Platform.select({ios:{height:(height/2)},android:{height:height/2-40}}),alignItems:'center',justifyContent:'center'}}>
                        <Text style={[iOSUIKit.title3,{fontWeight:'bold'}]}>You have no transactions</Text>
                        <Text style={{textAlign:'center',fontSize:16}}>{`\nBuy ${name} now and your\ntransactions will show here`}</Text>
                    </ScrollView>

                </View>
              
                <Modal 
                 style={[styles.modal, styles.modal3]}
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
        height: 350,
        width: 300
    },
   
});

export const WalletScreen = connect(mapStateToProps,mapDispatchToProps)(Wallet);
