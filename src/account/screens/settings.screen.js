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
    Share
} from 'react-native';
import {connect} from 'react-redux'
import { NavigationActions } from 'react-navigation'
import IconMaterial from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import SimpleIcon from 'react-native-vector-icons/dist/SimpleLineIcons'
import IconAwsome from 'react-native-vector-icons/dist/FontAwesome'
import IconIOS from 'react-native-vector-icons/dist/Ionicons'
import DropdownAlert from 'react-native-dropdownalert';
import {
    AdMobBanner,
  } from 'react-native-admob'

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
    getQuadrigaTickers,
    clearQuadrigaTickers,
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
import {encryptAuthenticationQuadriga} from 'util';

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
    
})


class Settings extends Component {
    constructor() {
        super();
        this.state = {
          
        }
        
    }
    componentWillMount(){
        
       

    }
    componentDidMount(){
        
    }
    componentWillUnmount(){
        
      }

      static navigationOptions = ({ navigation  }) => {
        const headerStyle={
          alignSelf: 'center',
          color:'white',
          
        }
        return {
             headerTitle: `Settings`,
             headerTitleStyle:{
                  ...headerStyle
            },
            headerStyle:{
                  backgroundColor:'orange'
                },
            tabBarLabel: 'Settings',
            tabBarIcon: ({ tintColor }) => (
                <IconMaterial
                    name="settings"
                    color={tintColor}
                    size={25}
                />
              )
            }
        };

    
    
        handlePlatform(text,onPressAction,style){
            if(Platform.OS === 'android'){
              if(TouchableNativeFeedback.canUseNativeForeground()){
                  return( 
                    <View style={{alignItems:'center'}}>
                      <TouchableNativeFeedback onPress={onPressAction} useForeground={true} background={TouchableNativeFeedback.Ripple()} delayPressIn={0}>
                        <View style={{backgroundColor:'white',height:60,width:width,alignItems:'center',flexDirection:'row'}}>
                          <Text style={[iOSUIKit.subhead,{marginLeft:10},style]}>{text}</Text>
                        </View>
                      </TouchableNativeFeedback>         
                    <Divider style={{height: 1, backgroundColor: '#ffe4b2',width:width/1.1}}/>   
                    </View>
                  )
              }else{
                  return (
                    <View  style={{alignItems:'center'}}>
                      <TouchableHighlight underlayColor="orange" onPress={onPressAction}>
                        <View style={{backgroundColor:'white',height:60,width:width,alignItems:'center',flexDirection:'row'}}>
                          <Text style={[iOSUIKit.caption,{marginLeft:10},style]}>{text}</Text>
                          <SimpleIcon name="arrow-right" style={{position: 'absolute',right:5,color:'#ffa500'}}/>
                        </View>
                      </TouchableHighlight>         
                    <Divider style={{height: 1, backgroundColor: '#ffe4b2',width:width/1.1}}/>   
                    </View>
                  )
              }
            }else{
                return (
                  <View style={{alignItems:'center'}}>
                    <TouchableHighlight underlayColor="orange" onPress={onPressAction}>
                      <View style={{backgroundColor:'white',height:60,width:width,alignItems:'center',flexDirection:'row'}}>
                        <Text style={[iOSUIKit.caption,{marginLeft:15},style]}>{text}</Text>
                        <SimpleIcon name="arrow-right" style={{position: 'absolute',right:15,color:'#ffa500'}}/>
                      </View>
                    </TouchableHighlight>         
                  <Divider style={{height: 1, backgroundColor: '#ffe4b2',width:width/1.1}}/>   
                  </View>
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
   

    handleWithdrawAlert(){
        
    }

    handleShare(){
        Share.share({
         message: "Check out this free app called Qcx, it lets you conveniently trade on your QuadrigaCX account.",
         title: "Qcx - Trade, deposit and withdraw securely on QuadrigaCX"   
        })
    }

    render() {
        
        return(
            <View style={styles.container}>
                    <Text style={{color:'black',margin:15,marginTop:25}}>APP</Text>
                    <Divider style={{height:1,backgroundColor:'orange',width:width/1.1,alignSelf:'center'}}/>
                    {this.handlePlatform('Reset pin code')}
                    {this.handlePlatform('Support',()=>{this.props.navigation.navigate('Support')})}
                    {this.handlePlatform('Share Qcx',()=>this.handleShare(),{})}
                    {this.handlePlatform('Sign Out',()=>{},{color:'red'})}
                    <View style={{position:'absolute',bottom:0,width:width}}>
                        <AdMobBanner
                    adSize="smartBannerLandscape"
                    adUnitID="ca-app-pub-8321262189259728/7581255596"
                    testDevices={[AdMobBanner.simulatorId]}
                    onAdFailedToLoad={error => console.error(error)} 
                    />
                    </View>
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
        height: height/1.8,
        width: width/1.1
    },
    modalWithdraw:{
        
        alignItems: 'center',
        borderRadius:5,
        ...Platform.select({
            ios:{
                marginTop:0
            }
        }),
        height: height/1.6,
        width: width/1.1
    },
    textInput:{
        ...Platform.select({
          ios:{
            borderWidth:1,
            borderColor:'#8E8E93',
            borderRadius:5,
            paddingLeft:5,
            height:30,
          }
        }),
        width:width/1.2,
        marginTop:15,
      },
    modalConfirm: {
        height: height/7,
        backgroundColor: '#007aff',
        opacity:0.95
      },
   
});

export const SettingsScreen = connect(mapStateToProps,mapDispatchToProps)(Settings);
