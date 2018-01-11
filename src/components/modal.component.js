import React, {Component} from 'react';
import {Button} from 'react-native-elements';
import Modal from 'react-native-modalbox';
import {LogoComponent, ModalButtonComponent} from 'components'
import {Logos} from 'util'
import arrows from '../assets/img/arrows.png'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import DropdownAlert from 'react-native-dropdownalert';

import {
    AppRegistry,
    Text,
    StyleSheet,
    ScrollView,
    View,
    Dimensions,
    TextInput,
    Image,
    TouchableNativeFeedback,
    KeyboardAvoidingView,
    Platform,
    TouchableHighlight,
    SafeAreaView
} from 'react-native';
import {
    setTokenFromAmount,
    setTokenOneTextValue,
    setTokenTwoTextValue,
    setFromTokenLogo,
    setToTokenLogo,
    postChangellyCurrency,
    postChangellyMinAmount,
    postChangellyExchangeAmount,
    postChangellyCreateTransaction,
    getChangellyTransactions,
    getChangellyStatus
} from 'exchange'
import {connect} from 'react-redux'
import {Kaede} from 'react-native-textinput-effects'

const {height, width} = Dimensions.get('window');

const btn = {
    borderLeftWidth: 1,
    borderBottomWidth:1,
    borderColor: 'orange',
    height: height / 4,
    width: width / 2,
}

const textInput = {
    borderLeftWidth: 1,
    borderBottomWidth:1,
    borderColor: 'orange',
    textAlign: 'center',
    height: 50,
    width: width / 2,
}

const mapStateToProps = state => ({
    selectedFromTokenLogo: state.exchange.selectedFromTokenLogo,
    selectedToTokenLogo: state.exchange.selectedToTokenLogo,
    changellyCurrencies: state.exchange.changellyCurrencies,
    changellyMinAmount: state.exchange.changellyMinAmount,
    changellyExchangeAmount: state.exchange.changellyExchangeAmount,
    tokenOneTextInputValue:state.exchange.tokenOneTextInputValue,
    tokenTwoTextInputValue:state.exchange.tokenTwoTextInputValue,
    fromAmount:state.exchange.fromAmount,
})
const mapDispatchToProps = dispatch => ({
    setFromAmountDispatch: (amount) => {
        dispatch(setTokenFromAmount(amount))
    },
    setFromTokenDispatch: (token) => {
        dispatch(setFromTokenLogo(token))
    },
    setToTokenDispatch: (token) => {
        dispatch(setToTokenLogo(token))
    },
    getChangellyCurrencyDispatch: () =>{dispatch(postChangellyCurrency())},
    getChangellyMinAmountDispatch: (fromCoin, toCoin, toName, exchangeAmount, navigator) => {
        dispatch(postChangellyMinAmount(fromCoin, toCoin, toName, exchangeAmount, navigator))
    },
    getChangellyExchangeAmountDispatch: (fromCoin, toCoin, amount,info) => {
        dispatch(postChangellyExchangeAmount(fromCoin, toCoin, amount,info))
    },
    setTokenOneTextValueDispatch: (value) => {
        dispatch(setTokenOneTextValue(value))
    },
    setTokenTwoTextValueDispatch: (value) => {
        dispatch(setTokenTwoTextValue(value))
    }
})

class ModalComponent extends Component {

    constructor() {
        super();
        this.state = {
            selectedFromToken: 'btc',
            selectedToToken: 'eth',
            isSelectingToken: '',
            selectedTextInput: 0,
            toName:'Ethereum'
        };

        this.handleSelectingFrom = this.handleSelectingFrom.bind(this);
        this.handleSelectingTo = this.handleSelectingTo.bind(this);
        this.handleReturn = this.handleReturn.bind(this);
        this.handleSelectedFromToken = this.handleSelectedFromToken.bind(this);
        this.handleSelectedToToken = this.handleSelectedToToken.bind(this);
        this.handleOnChangeText = this.handleOnChangeText.bind(this);
        this.handleSelectedTextInput = this.handleSelectedTextInput.bind(this);
        this.handleCheckIfAvailable = this.handleCheckIfAvailable.bind(this);
        this.handleGetStarted = this.handleGetStarted.bind(this);
        this.handleToName = this.handleToName.bind(this);
    }

    componentDidMount(){
        const {getChangellyCurrencyDispatch} = this.props;
        this.refs.tokenOne.clear();
        this.refs.tokenTwo.clear();
        getChangellyCurrencyDispatch();
    }

    handleReturn(acronym,name) {
        const {isSelectingToken} = this.state;
        const {setFromTokenDispatch, setToTokenDispatch} = this.props;

        if(this.handleCheckIfAvailable(acronym)===true){
            if (isSelectingToken === 'From') {
                    this.handleSelectedFromToken(acronym);
                    Logos.map((e) => {
                        if (e.acronym.indexOf(acronym) !== -1) {
                            setFromTokenDispatch(e.logo)
                        }
                    })
                    this.refs.modal1.close()
            } else {
                this.handleToName(name);
                this.handleSelectedToToken(acronym);
                Logos.map((e) => {
                    if (e.acronym.indexOf(acronym) !== -1) {
                        setToTokenDispatch(e.logo)
                    }
                })
                this.refs.modal1.close()
            }
        }else{
              alert('The selected token is not available at the moment. Please try again later or select a different token.')  
        }

    }

    handleCheckIfAvailable(acronym){
       const {changellyCurrencies} = this.props;
       let result = false;
       changellyCurrencies.map((item)=>{
            if(item === acronym){
                return result = true;
            }
       })
       return result;
    }

    handleSelectingFrom() {
        this.setState({
            isSelectingToken: 'From'
        })
        this.refs.modal1.open();
    }

    handleSelectingTo() {
        this.setState({
            isSelectingToken: 'To'
        })
        this.refs.modal1.open();
    }

    handleSelectedFromToken(name) {
        this.setState({
            selectedFromToken: name
        })
    }

    handleSelectedToToken(name) {
        this.setState({
            selectedToToken: name
        })
    }
    handleToName(name) {
        this.setState({
            toName: name
        })
    }
    handleSelectedTextInput(value) {
        const {setTokenOneTextValueDispatch,setTokenTwoTextValueDispatch,setFromAmountDispatch} = this.props;
        this.setState({
            selectedTextInput: value
        })
        this.refs.tokenOne.clear();
        this.refs.tokenTwo.clear();
        setTokenOneTextValueDispatch(null);//If I dont put null and out "", it wont allow the user to type.
        setTokenTwoTextValueDispatch(null);
        setFromAmountDispatch('');
    }


    handleOnChangeText(value) {
        const {getChangellyExchangeAmountDispatch,setTokenOneTextValueDispatch,setTokenTwoTextValueDispatch} = this.props;
        if(value === ''){
            setTokenOneTextValueDispatch(null);
            setTokenTwoTextValueDispatch(null);
        }else if(this.state.selectedTextInput === 0) {
                getChangellyExchangeAmountDispatch(this.state.selectedFromToken, this.state.selectedToToken,value,"OneToTwo")
        }else{
            getChangellyExchangeAmountDispatch(this.state.selectedToToken,this.state.selectedFromToken,value,"TwoToOne")
        }
    }

    handleCoverPlatform(){
        if(Platform.OS === 'android'){
            return false;
        }else{
            return true;
        }
    }

    handleContinuePlatform(){
        if(Platform.OS === 'android'){
            if(TouchableNativeFeedback.canUseNativeForeground()){
                return (
                    <TouchableNativeFeedback onPress={()=>this.handleGetStarted()} useForeground={true} background={TouchableNativeFeedback.Ripple()} delayPressIn={0}>
                    <View style={{backgroundColor:'orange',width:width/1.5,height:60,marginTop:50,alignSelf:'center',justifyContent:'center',alignItems:'center'}}>
                    <Text  style={{color:'white',fontWeight:'bold',fontSize:22}}>Exchange !</Text>
                    </View>
                    </TouchableNativeFeedback>
                )
            }else{
                return(
                    <View style={{width:width/1.5,height:60,marginTop:50,alignSelf:'center'}}>
                    <TouchableHighlight onPress={()=>this.handleGetStarted()}>
                    <View style={{backgroundColor:'orange',height:60,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'white',fontWeight:'bold',fontSize:22}}>Exchange !</Text>
                    </View>
                    </TouchableHighlight>
                    </View>
                )
            }
          }else{
            return(
                <View style={{width:width/1.5,height:60,marginTop:50,alignSelf:'center'}}>
                <TouchableHighlight onPress={()=>this.handleGetStarted()}>
                <View style={{backgroundColor:'orange',height:60,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white',fontWeight:'bold',fontSize:22}}>Exchange !</Text>
                </View>
                </TouchableHighlight>
                </View>
            )
          }
    }

    handleGetStarted(){
        const {getChangellyMinAmountDispatch,fromAmount} = this.props;
        getChangellyMinAmountDispatch(this.state.selectedFromToken,this.state.selectedToToken,this.state.toName,fromAmount,this.props.navigation)
    }

    render() {
        const {selectedFromTokenLogo, selectedToTokenLogo,tokenTwoTextInputValue,tokenOneTextInputValue,getChangellyMinAmountDispatch} = this.props;

        return (
            <ScrollView  scrollEnabled={false} contentContainerStyle={styles.wrapper} >
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <ModalButtonComponent text={'From'} imageSource={selectedFromTokenLogo}
                                          onPressAction={() => this.handleSelectingFrom()} buttonStyle={btn}/>
                    <ModalButtonComponent text={'To'} imageSource={selectedToTokenLogo}
                                          onPressAction={() => this.handleSelectingTo()} buttonStyle={btn}/>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <TextInput onFocus={()=>{this.handleSelectedTextInput(0)}}
                               value={tokenOneTextInputValue}//The value prop will always update the prices on initial load.Placeholder will experience some delay.
                               placeholder={"0.00"}//If the text input is empty, it will display the placeholder.
                               placeholderTextColor={'black'}
                               ref={"tokenOne"}
                               onChangeText={(value) => {
                                   this.handleOnChangeText(value)
                               }}
                               keyboardType="numeric"
                               clearTextOnFocus={true}
                               underlineColorAndroid='transparent'
                               style={textInput}/>
                    <TextInput onFocus={()=>{this.handleSelectedTextInput(1)}}
                               value={tokenTwoTextInputValue}
                               placeholder={"0.00"}
                               placeholderTextColor={'black'}
                               editable={true}
                               clearTextOnFocus={true}
                               ref={"tokenTwo"}
                               onChangeText={(value) => {
                                   this.handleOnChangeText(value)
                               }}
                               keyboardType="numeric"
                               underlineColorAndroid='transparent'
                               style={textInput}/>
                </View>
                {this.handleContinuePlatform()}
                <SafeAreaView >
                <Modal
                    style={[styles.modal, styles.modal1]}
                    ref={"modal1"}
                    swipeToClose={false}
                    onClosed={this.onClose}
                    onOpened={this.onOpen}
                    onClosingState={this.onClosingState}
                    keyboardTopOffset={0}
                    coverScreen={true}>                    

                    <LogoComponent modalRef={this.refs.modal1} closeFunction={{return: (acronym,name) => this.handleReturn(acronym,name)}}/>
                </Modal>
                </SafeAreaView>
                <DropdownAlert updateStatusBar={false} translucent={true} ref={ref => this.dropdown = ref}  />
            </ScrollView>
        );
    }
    

}

const styles = StyleSheet.create({

    wrapper: {
        
    },

    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios:{
                ...ifIphoneX({
                    marginTop: 50
                }, {
                    marginTop: 22
                })
            }
        }),
    
    },
});

export const ExchangeModalComponent = connect(mapStateToProps, mapDispatchToProps)(ModalComponent);