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
    TouchableHighlight,
    KeyboardAvoidingView,
    Clipboard
} from 'react-native';
import {Button,Divider} from 'react-native-elements'
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

const {height,width} = Dimensions.get('window');


const mapStateToProps = (state) => ({
    fromAmount: state.exchange.fromAmount,
})
const mapDispatchToProps = (dispatch) => ({
    postChangellyCreateTransactionDispatch: (fromCoin, toCoin, amount, address, extraId) => postChangellyCreateTransaction(fromCoin, toCoin, amount, address, extraId),
})

class AddressExchange extends Component {
    constructor() {
        super();
        this.state={
            address: null
        }
        this.handleSetAddress = this.handleSetAddress.bind(this);
        this.handleContinue = this.handleContinue.bind(this);
        this.handleClipboard = this.handleClipboard.bind(this);
    }

    componentDidMount(){
        this.refs.addressText.clear();
    }

    handleSetAddress(address){
        if(address != '') {
            this.setState({
                address: address,
            })
        }else{
            this.setState({
                address: "Address here"
            })
        }
    }

    handleContinue(){
        if(this.state.address === 'Address here'){
            alert('Please enter an address')
        }else{
            this.props.navigation.navigate('ConfirmExchange', {address:this.state.address,fromCoin:this.props.navigation.state.params.fromCoin,toCoin:this.props.navigation.state.params.toCoin})
        }
    }

    handleIcon(iconType,iconName){
        if(iconType === 'material'){
            return <IconMaterial name={iconName} size={22}/>
        }else if(iconType === 'fontAwsome'){
           return <IconAwsome name={iconName} size={22}/>
        }
    }

    handlePlatform(onPressAction,iconType,iconName,text,style,underlayStyle){
        if(Platform.OS === 'android'){
          return(
            <TouchableNativeFeedback onPress={onPressAction} useForeground={true} background={TouchableNativeFeedback.Ripple()} delayPressIn={0}>
                <View style={style}>
                    {this.handleIcon(iconType,iconName)}
                    <Text style={{fontSize:18,color:'white',textAlign:'center'}}> {text}</Text>
                </View>
            </TouchableNativeFeedback>
          )
        }else{
          return(
            <TouchableHighlight style={underlayStyle} onPress={onPressAction}>
                <View style={style}>
                    {this.handleIcon(iconType,iconName)}
                    <Text style={{fontSize:16,color:'white',textAlign:'center'}}> {text}</Text>
               </View>
           </TouchableHighlight>
          )
        }
      }

      handleDivider(){
          if(Platform.OS === 'ios'){
              return(
                <Divider style={{ height: 1, backgroundColor: '#b3b3b3',width:width/1.1 }} />
              )
          }
      }

      static navigationOptions =  {
            headerTitle: 'Address',
            headerStyle: {
                backgroundColor: 'orange',
            },
            headerTitleStyle: {
                alignSelf: 'center',
                color: 'white',
                position: 'relative',
                ...Platform.select({
                    android: {
                        right:30
                    }
                })
            },
    };

    handleClipboard(){
        Clipboard.getString().then((res)=>{
            this.setState({
                address:res
            })
        }).catch((error)=>{
            console.log(error)
        })
    }

    render() {
        const {state,navigate} = this.props.navigation;

        return (
                <KeyboardAvoidingView behavior="position" style={styles.container}>
                    <Text style={{textAlign:'center',fontSize:18,color:'black',fontWeight:'bold',marginBottom:50,marginTop:30}}>Enter the recipient's {state.params.toCoin.toUpperCase()} address {'\n'}(your {state.params.fromName} wallet) </Text>
                    <View style={{flexDirection:'row', width: width,justifyContent: 'center',}}>
                        <View style={{marginRight:10}}>
                            {this.handlePlatform(()=>this.handleClipboard(),'fontAwsome','paste','Paste',styles.paste)}
                        </View>
                        {this.handlePlatform(()=>{navigate('Camera',{setAddress:(address)=>{this.handleSetAddress(address)}})},'material','qrcode-scan','Scan Qr',styles.qrCode,{marginLeft:10,})}
                    </View>
                    <View style={{width:width,alignItems:'center'}}>
                        <Text style={{fontSize:20,color:'black',margin:5,marginTop:20}}>{"Send Address".toUpperCase()}</Text>
                        <TextInput keyboardType="default" ref={'addressText'} onChangeText={(e)=>{this.handleSetAddress(e)}} placeholder={this.state.address} placeholderTextColor={'black'} style={{height:40,width:width/1.1,}}/>
                        {this.handleDivider()}
                        {this.handlePlatform(()=>this.handleContinue(),'','','Continue',styles.continue,{height:60,width:width/1.2,marginTop:20,})}
                    </View>
                </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {
        flex: 1,
        
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    continue:{
        backgroundColor:'orange',//eventually cleanup the repetition
        height:60,
        width:width/1.2,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        overflow:'hidden',
        
    },
    qrCode:{
        backgroundColor:'#4eb7ff',
        height:60,
        width:width/2.5,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    address:{
        backgroundColor:'orange',
        height:60,
        width:width/3.3,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    paste:{
        backgroundColor:'#399f08',
        height:60,
        width:width/2.5,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
    }
});

export const AddressExchangeScreen = connect(mapStateToProps, mapDispatchToProps)(AddressExchange);