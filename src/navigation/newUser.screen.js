import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView
} from 'react-native';
import Swiper from 'react-native-swiper'
import {Button} from 'react-native-elements'
import {AuthenticatedRoute} from 'navigation'
import {connect} from 'react-redux'
import {encryptAuthenticationQuadriga,resetNavigation} from 'util'
import {iOSUIKit} from 'react-native-typography'
import { Isao  } from 'react-native-textinput-effects';
import {userLogin} from 'users'
import ChangellyLogo from '../assets/img/logo.png'

const {height,width} = Dimensions.get('window')

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    pin:state.user.pin
})
const mapDispatchToProps = (dispatch) => ({
    userLoginDispatch: (clientId,apiKey,privateKey)=> dispatch(userLogin(clientId,apiKey,privateKey))
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


    }
    componentWillMount(){
        const { navigation, isLoggedIn, pin } = this.props;
        if(isLoggedIn && pin === '' ){
            resetNavigation('PinCode',navigation)
        }else if(pin != ''){
          resetNavigation( 'Auth'/*'AuthPin'*/,navigation)
        }
      }
      handleLogin(){
        const {navigation,userLoginDispatch} = this.props;
        userLoginDispatch(this.state.clientId,this.state.apiKey,this.state.privateKey)
        resetNavigation('PinCode',navigation)

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
          <Text style={[iOSUIKit.body,styles.text]}>{`Easily trade, deposit,\n and withdraw on QuadrigaCX`}</Text>
        </View>
        <View style={styles.slide1}>
          <Image resizeMode="contain" source={ChangellyLogo} style={{height:100,width:250}}/>
          <Text style={[iOSUIKit.body,styles.text]}>{`Easy and fast exchange to any of the supported cryptocurrencies on Changelly `}</Text>
        </View>
        <ScrollView behavior={'padding'} style={styles.slide2}>
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
          <Button
          buttonStyle={{backgroundColor: '#da9733',alignSelf:'center',margin:30,marginTop:50,right:70,paddingLeft:20,paddingRight:20}}
          textStyle={{textAlign: 'center'}}
          title={`Get Started!`}
          onPress={()=>this.handleLogin()}
        />
          <Button
            buttonStyle={{backgroundColor: '#da9733',alignSelf:'center',position:'relative',top:-73,right:-70,paddingLeft:35,paddingRight:35}}
            textStyle={{textAlign: 'center'}}
            title={`Register`}
            onPress={()=>navigation.navigate('Register')}
          />
          <Text style={styles.webViewHelper} onPress={this.handleGettingStarted}>Get your access keys</Text>
        </ScrollView>
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
    position:'relative',
    top: -50


  }
});

export const NewUserScreen = connect(mapStateToProps,mapDispatchToProps)(NewUser);