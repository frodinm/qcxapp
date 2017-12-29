import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
  TouchableHighlight,
  TouchableNativeFeedback
} from 'react-native';
import {CameraComponent,AddButtonComponent} from 'components'
import IconMaterial from 'react-native-vector-icons/dist/MaterialIcons';
import IconIOS from 'react-native-vector-icons/dist/Ionicons';
import {Divider} from 'react-native-elements'
import {connect} from 'react-redux'
import {Logos,encryptAuthenticationQuadriga} from 'util';
import Modal from 'react-native-modalbox';
import SimpleIcon from 'react-native-vector-icons/dist/SimpleLineIcons'
import {
  setUserFirstTime
} from 'users'
import {
    postUserQuadrigaBalance,
    postUserBitcoinWalletAddressQuadriga,
    postUserEthereumWalletAddressQuadriga,
    postAccounScreenMainCall
} from 'account'
import { iOSUIKit } from 'react-native-typography'
import { isAbsolute } from 'path';

const apiKey = "PoDWcWznpm"
const secret = "534158c052093441c9bb309788f4e3d5"
const clientId = "2515766"

const {height,width} = Dimensions.get('window');


const mapStateToProps = (state) => ({
  isFirstTimeUser: state.user.isFirstTimeUser,
  userWallets:state.account.userWallets,
  quadrigaUserBalance: state.account.quadrigaUserBalance,
})
const mapDispatchToProps = (dispatch) => ({
    setUserFirstTimeDispatch:()=>{dispatch(setUserFirstTime(false))},
    postUserQuadrigaBalanceDispatch:(key,sign,nonce)=>{dispatch(postUserQuadrigaBalance(key,sign,nonce))},
    postUserBitcoinWalletAddressQuadrigaDispatch:(key,sign,nonce)=>{dispatch(postUserBitcoinWalletAddressQuadriga(key,sign,nonce))},
    postUserEthereumWalletAddressQuadrigaDispatch:(key,sign,nonce)=>{dispatch(postUserEthereumWalletAddressQuadriga(key,sign,nonce))},
    postAccounScreenMainCallDispatch:(clientId,apiKey,secret)=>{dispatch(postAccounScreenMainCall(clientId,apiKey,secret))},
})


class AccountsWallets extends Component {
  constructor(props) {
    super(props);
    this.handlePlatform = this.handlePlatform.bind(this);
    this.handleBalance = this.handleBalance.bind(this);
    this.handleAddNewAddress = this.handleAddNewAddress.bind(this);
  }
  componentWillMount(){
      const {postUserQuadrigaBalanceDispatch,postUserBitcoinWalletAddressQuadrigaDispatch,postUserEthereumWalletAddressQuadrigaDispatch,postAccounScreenMainCallDispatch} = this.props;
      if(this.props.isFirstTimeUser === true){//prevent having duplicate addresses for quadriga
        postAccounScreenMainCallDispatch(clientId,apiKey,secret);
        this.props.setUserFirstTimeDispatch();
      }else{
      let nonce = Date.now();
         postUserQuadrigaBalanceDispatch(apiKey,encryptAuthenticationQuadriga(nonce,clientId,apiKey,secret),nonce)
      }
  }

  componentDidMount(){
    setTimeout(() => {
      this.props.navigation.setParams({add:()=>this.handleAddNewAddress()})
    }, 1000);
  }


  handleAddNewAddress(){
    this.refs.modal.open();
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
         headerTitle: `Account`,
         headerRight: <AddButtonComponent onPressAction={()=>navigation.state.params.add()}/>,
         headerTitleStyle:{
              ...headerStyle
        },
        headerStyle:{
              backgroundColor:'orange'
            },
        tabBarLabel: 'Account',
        tabBarIcon: ({ tintColor }) => (
            <IconMaterial
                name="account-circle"
                color={tintColor}
                size={25}
            />
          )
        }
    };

    handleLogo(acronym){
      let Logo;
      Logos.map((current)=>{
        if(current.acronym.indexOf(acronym) !== -1){
          Logo = current.logo;
        }
      })
      return Logo;
    }

    handleBalance(acronym){
      const {quadrigaUserBalance} = this.props;
      if(acronym === 'btc'){
        return {
          available: quadrigaUserBalance !== null ? quadrigaUserBalance.data.btc_available: "0.000000",//componentWillMount is not a promise sinse quadrigaUserBalance.data would give null on initial load
          balance: quadrigaUserBalance !== null ? quadrigaUserBalance.data.btc_balance: "0.000000",
        }
      }else if(acronym === 'eth'){
        return {
          available: quadrigaUserBalance !== null ? quadrigaUserBalance.data.eth_available: "0.000000",
          balance: quadrigaUserBalance !== null ? quadrigaUserBalance.data.eth_balance: "0.0000000"
        }
      }else if(acronym === 'bch'){
        return {
          available: quadrigaUserBalance !== null ? quadrigaUserBalance.data.bch_available: "0.000000",
          balance: quadrigaUserBalance !== null ? quadrigaUserBalance.data.bch_balance: "0.0000000"
        }
      }else if(acronym === 'btg'){
        return {
          available: quadrigaUserBalance !== null ? quadrigaUserBalance.data.btg_available: "0.000000",
          balance: quadrigaUserBalance !== null ? quadrigaUserBalance.data.btg_balance: "0.0000000"
        }
      }else if(acronym === 'ltc'){
        return {
          available: quadrigaUserBalance !== null ? quadrigaUserBalance.data.ltc_available: "0.000000",
          balance: quadrigaUserBalance !== null ? quadrigaUserBalance.data.ltc_balance: "0.0000000"
        }
      }
    }

    handlePlatform(){
      const {userWallets} = this.props;
      if(Platform.OS === 'android'){
        return userWallets.map((item,index)=>{
          return( 
            <View key={index} style={{alignItems:'center'}}>
              <TouchableNativeFeedback onPress={()=>{this.props.navigation.navigate('Wallet',{type:item.type,acronym:item.acronym,name:item.name,address:item.receiveAddress})}} useForeground={true} background={TouchableNativeFeedback.Ripple()} delayPressIn={0}>
                <View style={{backgroundColor:'white',height:60,width:width,alignItems:'center',flexDirection:'row'}}>
                  <Image resizeMode="contain" style={{height:40,width:40,marginLeft:20}} source={this.handleLogo(item.acronym)}/>
                  <Text style={[iOSUIKit.subhead,{marginLeft:10}]}>{item.acronym.toUpperCase()} WALLET</Text>
                  <View style={{position:'absolute',right:10, flexDirection:'column'}}>
                  <Text >{parseInt(this.handleBalance(item.acronym).available).toFixed(6)} {item.acronym.toUpperCase()} available</Text>
                  <Text >{parseInt(this.handleBalance(item.acronym).balance).toFixed(6)} {item.acronym.toUpperCase()} balance</Text>
                  </View>
                </View>
              </TouchableNativeFeedback>         
            <Divider style={{height: 1, backgroundColor: '#ffe4b2',width:width/1.1}}/>   
            </View>
          )
        })
      }else{
       return userWallets.map((item,index)=>{
          return (
            <View key={index} style={{alignItems:'center'}}>
              <TouchableHighlight onPress={()=>{this.props.navigation.navigate('Wallet',{type:item.type,acronym:item.acronym,name:item.name,address:item.receiveAddress})}}>
                <View style={{backgroundColor:'white',height:60,width:width,alignItems:'center',flexDirection:'row'}}>
                  <Image resizeMode="contain" style={{height:40,width:40,marginLeft:20}} source={this.handleLogo(item.acronym)}/>
                  <Text style={[iOSUIKit.subhead,{marginLeft:10}]}>{item.acronym.toUpperCase()} WALLET</Text>
                  <View style={{position:'absolute',right:20, flexDirection:'column'}}>
                    <Text style={iOSUIKit.caption}>{parseInt(this.handleBalance(item.acronym).available).toFixed(3)} {item.acronym.toUpperCase()} available</Text>
                    <Text style={iOSUIKit.caption} >{parseInt(this.handleBalance(item.acronym).balance).toFixed(3)} {item.acronym.toUpperCase()} balance</Text>
                  </View>
                  <SimpleIcon name="arrow-right" style={{position: 'absolute',right:5,color:'#ffa500'}}/>
                </View>
              </TouchableHighlight>         
            <Divider style={{height: 1, backgroundColor: '#ffe4b2',width:width/1.1}}/>   
            </View>
          )
        })
      }
        
    }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
          {this.handlePlatform()}

          <Modal 
                 style={[styles.modal]}
                 position={"center"}
                 swipeToClose={true}
               
                 ref={"modal"} 
                 >
                    <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',height: 350,width: 300}}>
                      <TouchableHighlight>
                        <Text onPress={()=>this.refs.modal.close()}>Close</Text>
                      </TouchableHighlight>
                    </View>
                </Modal>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fafafa',
    height:height
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
    
},

});

export const AccountsWalletsScreen = connect(mapStateToProps,mapDispatchToProps)(AccountsWallets);
