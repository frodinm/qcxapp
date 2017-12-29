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

const {height, width} = Dimensions.get('window');

const titleStyle = {
    fontSize: 19,
    color: '#ff6200',
    marginBottom:10,
}
const amountStyle = {
    color: 'black',
    fontSize: 17,
    marginBottom: 10,
}

const mapStateToProps = (state) => ({
    fromAmount: state.exchange.fromAmount,
    tokenTwoTextInputValue: state.exchange.tokenTwoTextInputValue,
})
const mapDispatchToProps = (dispatch) => ({
    postChangellyCreateTransactionDispatch: (fromCoin, toCoin, amount, address, extraId, navigation) => {dispatch(postChangellyCreateTransaction(fromCoin, toCoin, amount, address, extraId, navigation))},
})

class ConfirmExchange extends Component {
    constructor() {
        super();
        this.state = {
            address: null
        }

        this.handleConfirm = this.handleConfirm.bind(this);
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
            headerTitle: 'Confirm',
            headerStyle: {
                backgroundColor: 'orange',
            },
            headerTitleStyle: {
                ...headerStyle
            },

        }
    };


    handleConfirm() {
        const {postChangellyCreateTransactionDispatch,fromAmount} = this.props;
        postChangellyCreateTransactionDispatch(this.props.navigation.state.params.fromCoin,this.props.navigation.state.params.toCoin,fromAmount,this.props.navigation.state.params.address,null,this.props.navigation);
    }

    handlePlatform(){
        if(Platform.OS === 'android'){
            return (
                <TouchableNativeFeedback onPress={()=>this.handleConfirm()} useForeground={true} background={TouchableNativeFeedback.Ripple()} delayPressIn={0}>
                    <View style={{backgroundColor:'orange',marginTop:20,height:60,width:width,alignItems:'center',justifyContent:'center',flexDirection:'row',position:'absolute',bottom:0}}>
                        <Text style={{fontSize:19,color:'white',textAlign:'center'}}> Confirm </Text>
                    </View>
                </TouchableNativeFeedback> 
            )
        }else{
            return(
                <View style={{position:'absolute',bottom:0}}>
                <TouchableHighlight onPress={()=>this.handleConfirm()}>
                <View style={{backgroundColor:'orange',height:60,width:width,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                    <Text style={{fontSize:19,color:'white',textAlign:'center'}}> Confirm </Text>
                </View>
                </TouchableHighlight>
                </View>
             )
        }
    }

    render() {
        const {state, navigate} = this.props.navigation;
        const {fromAmount, tokenTwoTextInputValue} = this.props;

        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'column', alignItems: 'center',margin:20}}>
                    <Text style={{...titleStyle}}>YOU HAVE </Text>
                    <Text style={{...amountStyle}}> {fromAmount} {state.params.fromCoin.toUpperCase()}</Text>
                    <Text style={{...titleStyle}}>YOU GET</Text>
                    <Text style={{...amountStyle}}>{tokenTwoTextInputValue} {state.params.toCoin.toUpperCase()}</Text>
                    <Text style={{...titleStyle}}>RECIPIENT ADDRESS</Text>
                    <Text onPress={()=>navigate('CheckAddress',{address:state.params.address,toAcronym:state.params.toCoin})} style={{fontSize: 18, color: '#ffa200'}} adjustsFontSizeToFit={true}>{state.params.address}</Text>
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

export const ConfirmExchangeScreen = connect(mapStateToProps, mapDispatchToProps)(ConfirmExchange);