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
})
const mapDispatchToProps = (dispatch) => ({
    postChangellyCreateTransactionDispatch: (fromCoin, toCoin, amount, address, extraId, navigation) => {dispatch(postChangellyCreateTransaction(fromCoin, toCoin, amount, address, extraId, navigation))},
})

class PayExchange extends Component {
    constructor() {
        super();
        this.state = {
            address: null
        }

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


    handlePay() {

    }

    handlePlatform(){
        if(Platform.OS === 'android'){
            return (
                <TouchableNativeFeedback onPress={()=>this.handlePay()} useForeground={true} background={TouchableNativeFeedback.Ripple()} delayPressIn={0}>
                    <View style={{backgroundColor:'orange',marginTop:20,height:60,width:width,alignItems:'center',justifyContent:'center',flexDirection:'row',position:'absolute',bottom:0}}>
                        <Text style={{fontSize:19,color:'white',textAlign:'center'}}> Quick Send {'\n'} with Quadriga </Text>
                    </View>
                </TouchableNativeFeedback> 
            )
        }else{
            return(
                <View style={{position:'absolute',bottom:0}}>
                 <TouchableHighlight onPress={()=>this.handlePay()}>
                 <View style={{backgroundColor:'orange',height:60,width:width,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                     <Text style={{fontSize:19,color:'white',textAlign:'center'}}> Quick Send {'\n'} with Quadriga </Text>
                 </View>
                </TouchableHighlight>
                </View>
             )
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
    }
});

export const PayExchangeScreen = connect(mapStateToProps, mapDispatchToProps)(PayExchange);