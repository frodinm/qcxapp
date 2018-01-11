import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
  StatusBar
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Swiper from 'react-native-swiper'
import {Button} from 'react-native-elements'
import {AuthenticatedRoute} from 'navigation'
import {connect} from 'react-redux'
import {encryptAuthenticationQuadriga,resetNavigation} from 'util'
import {iOSUIKit} from 'react-native-typography'
import { Isao  } from 'react-native-textinput-effects';
import {userLogin} from 'users'
import ChangellyLogo from '../assets/img/logo.png'
import DropdownAlert from 'react-native-dropdownalert';
import {
  postUserQuadrigaBalance,
} from 'account'

const {height,width} = Dimensions.get('window')

const mapStateToProps = (state) => ({
    quadrigaUserBalance: state.account.quadrigaUserBalance,
    isLoggedIn: state.user.isLoggedIn,
    pin:state.user.pin
})
const mapDispatchToProps = (dispatch) => ({
    userLoginDispatch: (clientId,apiKey,privateKey)=> dispatch(userLogin(clientId,apiKey,privateKey)),
    postUserQuadrigaBalanceDispatch:(key,sign,nonce)=>{dispatch(postUserQuadrigaBalance(key,sign,nonce))},
})


class NewUser extends Component {
    constructor(){
        super();
        this.state={
         clientId : '',
         apiKey: '',
         privateKey: ''
        }
        this.handleGettingStarted = this.handleGettingStarted.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleClientId=this.handleClientId.bind(this);
        this.handleApiKey=this.handleApiKey.bind(this);
        this.handleprivateKey=this.handleprivateKey.bind(this);
        this.handleLoginAlert = this.handleLoginAlert.bind(this);


    }
    componentWillMount(){
        const { navigation, isLoggedIn, pin } = this.props;
        if(isLoggedIn && pin === '' ){
            resetNavigation('PinCode',navigation)
        }else if(pin != ''){
          resetNavigation( 'AuthPin',navigation)
        }
      }

    handleLoginAlert(){
        const {quadrigaUserBalance,userLoginDispatch} = this.props;

        if(quadrigaUserBalance.data.hasOwnProperty('error')){
          this.dropdown.alertWithType('error','Error', quadrigaUserBalance.data.error.message);
        }else{
          this.dropdown.alertWithType('success','Awsome', 'Now you can set up your pin code. Please keep it secret!')
          setTimeout(()=>{
            userLoginDispatch(this.state.clientId,this.state.apiKey,this.state.privateKey)
            resetNavigation('PinCode',this.props.navigation)
          },4000)
        }
      }
      handleLogin(){
        const {navigation,userLoginDispatch,postUserQuadrigaBalanceDispatch} = this.props;

        let nonce = Date.now()
        postUserQuadrigaBalanceDispatch(this.state.apiKey,encryptAuthenticationQuadriga(nonce,this.state.clientId,this.state.apiKey,this.state.privateKey),nonce);

        setTimeout(()=>{
          this.handleLoginAlert()
        },1000)
      }
      handleGettingStarted(){
          const {navigation} = this.props;
          navigation.navigate('Form')
      }
      handleClientId(event) {
        this.setState({
          clientId: event
        })
      }

      handleApiKey(event){
        this.setState({
          apiKey: event
        })
      }
      handleprivateKey(event){
        this.setState({
          privateKey: event
        })
      }

    
  render() {
    const {isLoggedIn,navigation} = this.props;
        return <Swiper style={styles.wrapper} loop={false} dotColor={'#000'} activeDotColor={'#da9733'}>
        <View style={styles.slide1}>
          <StatusBar
          backgroundColor="orange"
          />
          <Text style={[iOSUIKit.body,styles.text]}>{`Easily trade, deposit,\n and withdraw on QuadrigaCX`}</Text>
        </View>
        <View style={styles.slide1}>
          <Image resizeMode="contain" source={ChangellyLogo} style={{height:100,width:250}}/>
          <Text style={[iOSUIKit.body,styles.text]}>{`Easy and fast exchange to any of the supported cryptocurrencies on Changelly `}</Text>
        </View>
        <KeyboardAwareScrollView behavior={'padding'} style={styles.slide2}>
        <View style={{marginTop:20}}>
          <Isao
            style={styles.textInputWrapper}
            labelStyle={styles.labelText}
            inputStyle={styles.textInput}
            label={'Client Id'}
            activeColor={'#da9733'}
            passiveColor={'#000'}
            onChangeText={(value)=>this.handleClientId(value)}
          />
          <Isao
            style={styles.textInputWrapper}
            labelStyle={styles.labelText}
            inputStyle={styles.textInput}
            label={'Api Key'}
            activeColor={'#da9733'}
            passiveColor={'#000'}
            onChangeText={(value)=>this.handleApiKey(value)}
          />
          <Isao
            style={styles.textInputWrapper}
            labelStyle={styles.labelText}
            inputStyle={styles.textInput}
            label={'Private Key'}
            activeColor={'#da9733'}
            passiveColor={'#000'}
            onChangeText={(value) => this.handleprivateKey(value)}
          />
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:50,marginBottom:20}}>
            <Button
            buttonStyle={{backgroundColor: '#da9733',alignSelf:'center',}}
            textStyle={{textAlign: 'center'}}
            title={`Get Started!`}
            onPress={()=>this.handleLogin()}
            />
            <Button
              buttonStyle={{backgroundColor: '#da9733',alignSelf:'center',}}
              textStyle={{textAlign: 'center'}}
              title={`  Register    `}
              onPress={()=>navigation.navigate('Register')}
            />
          </View>
          <Text style={styles.webViewHelper} onPress={this.handleGettingStarted}>Get your access keys</Text>
          </View>
          <DropdownAlert updateStatusBar={false} translucent={true} ref={ref => this.dropdown = ref}  />
        </KeyboardAwareScrollView>
      </Swiper>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  logo:{
      flex: 1,
      minHeight: 100,
      minWidth: 50
  },
  slide1:{
    flex: 1,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems: 'center',

  },
  slide2:{
    flex: 1,
    backgroundColor:'white',


  },
  text:{
    textAlign: 'center',
    fontSize:18,
    margin: 50,
    fontWeight: 'bold',
    color:'#da9733',
    alignSelf: 'center'
  },
  textInput:{
    color: '#000',
  },
  textInputWrapper:{
    alignSelf:'center',
    width: width/1.2,
    margin: 20,
    top: 30,
  },
  labelText:{
    fontSize:17
  },
  webViewHelper:{
    fontSize:22,
    alignSelf:'center',
    color:'#da9733',
    margin: 10,
   


  }
});

export const NewUserScreen = connect(mapStateToProps,mapDispatchToProps)(NewUser);