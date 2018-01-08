import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    StatusBar
} from 'react-native';
import {TransactionView, Modules, Orders} from 'components'
import Icon from 'react-native-vector-icons/dist/Foundation'
import {Button, Header} from 'react-native-elements'
import {connect} from 'react-redux'
import {encryptAuthenticationQuadriga} from 'util'

import {
    getQuadrigaTickerBTC,
    getQuadrigaTickerETH,
    getQuadrigaTickerBCH,
    getQuadrigaTickerBTG,
    getQuadrigaTickerLTC,
    getQuadrigaTransactions,
    postUserQuadrigaBalance,
    postUserOpenOrdersQuadriga
} from 'account'

const {height, width} = Dimensions.get('window');
let colorChangeBTC = 'white';
let colorChangeETH = 'white';
let colorChangeBCH = 'white';
let colorChangeBTG = 'white';
let colorChangeLTC = 'white';


const mapStateToProps = (state) => ({
    apiKey: state.user.apiKey,
    clientId:state.user.clientId,
    privateKey:state.user.privateKey,
    quadrigaTickerBTC: state.account.quadrigaTickerBTC,
    quadrigaTickerETH: state.account.quadrigaTickerETH,
    quadrigaTickerBCH: state.account.quadrigaTickerBCH,
    quadrigaTickerBTG: state.account.quadrigaTickerBTG,
    quadrigaTickerLTC: state.account.quadrigaTickerLTC,
    quadrigaTransactions: state.account.quadrigaTransactions,
    quadrigaUserBalance: state.account.quadrigaUserBalance
})
const mapDispatchToProps = (dispatch) => ({
    getQuadrigaTickerDispatch: (ticker) => { // timeouts to reduce the too many calls error
        dispatch(getQuadrigaTickerBTC());
        setTimeout(()=>{
            dispatch(getQuadrigaTickerETH());
        },2000)
        setTimeout(()=>{
            dispatch(getQuadrigaTickerBCH());
        },2000)
        setTimeout(()=>{
            dispatch(getQuadrigaTickerBTG());
        },2000)
        setTimeout(()=>{
            dispatch(getQuadrigaTickerLTC())
        },2000)  
    },
    getQuadrigaTransactionsDispatch: (book, time) => {
        dispatch(getQuadrigaTransactions(book, time))
    },
    postUserQuadrigaBalanceDispatch: (key, sign, nonce) => {
        dispatch(postUserQuadrigaBalance(key, sign, nonce))
    },
    postUserOpenOrdersQuadrigaDispatch: (key, sign, nonce) => {
        dispatch(postUserOpenOrdersQuadriga(key, sign, nonce))
    }
})


class QuadrigaExchange extends Component {
    constructor() {
        super();
        this.state = {
            nonce: null,
            interval: null,
        }
        this.handleGetTicker = this.handleGetTicker.bind(this);
        this.handleGetBalance = this.handleGetBalance.bind(this);
        this.handleBalance = this.handleBalance.bind(this);
        this.handleRestartInterval = this.handleRestartInterval.bind(this);

    }
    componentWillMount() {
        const {getQuadrigaTransactionsDispatch, getQuadrigaTickerDispatch} = this.props;
        let interval = setInterval(()=>{getQuadrigaTransactionsDispatch("btc_cad","hour");getQuadrigaTickerDispatch()},15000); //too many request... Gonna pass the instance to the modules so they clear the interval on mount.
        this.setState({interval})
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.quadrigaTickerBTC.data.last != this.props.quadrigaTickerBTC.data.last) {
            this.props.navigation.setParams({btcTicker: `${Math.round(nextProps.quadrigaTickerBTC.data.last)} `});
        }
    }

    handleRestartInterval(){
        const {getQuadrigaTransactionsDispatch, getQuadrigaTickerDispatch} = this.props;
        let interval = setInterval(()=>{getQuadrigaTransactionsDispatch("btc_cad","hour");getQuadrigaTickerDispatch()},15000); // modules componentWillUnmount will restart the interval
        this.setState({interval})
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.quadrigaTickerBTC.data.last > this.props.quadrigaTickerBTC.data.last) {
            colorChangeBTC = '#b2d8b2'
        } else if (nextProps.quadrigaTickerBTC.data.last < this.props.quadrigaTickerBTC.data.last) {
            colorChangeBTC = '#ff9999'
        }
        if (nextProps.quadrigaTickerETH.data.last > this.props.quadrigaTickerETH.data.last) {
            colorChangeETH = '#b2d8b2'
        } else if (nextProps.quadrigaTickerETH.data.last < this.props.quadrigaTickerETH.data.last) {
            colorChangeETH = '#ff9999'
        }
        if (nextProps.quadrigaTickerBCH.data.last > this.props.quadrigaTickerBCH.data.last) {
            colorChangeBCH = '#b2d8b2'
        } else if (nextProps.quadrigaTickerBCH.data.last < this.props.quadrigaTickerBCH.data.last) {
            colorChangeBCH = '#ff9999'
        }
        if (nextProps.quadrigaTickerBTG.data.last > this.props.quadrigaTickerBTG.data.last) {
            colorChangeBTG = '#b2d8b2'
        } else if (nextProps.quadrigaTickerBTG.data.last < this.props.quadrigaTickerBTG.data.last) {
            colorChangeBTG = '#ff9999'
        }
        if (nextProps.quadrigaTickerLTC.data.last > this.props.quadrigaTickerLTC.data.last) {
            colorChangeLTC = '#b2d8b2'
        } else if (nextProps.quadrigaTickerLTC.data.last < this.props.quadrigaTickerLTC.data.last) {
            colorChangeLTC = '#ff9999'
        }

    }


    handleGetBalance() {
        const {postUserQuadrigaBalanceDispatch,apiKey,clientId,privateKey} = this.props;
        const nonce = Date.now();
        postUserQuadrigaBalanceDispatch(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, privateKey), nonce);
    }

    handleGetTicker() {
        const {quadrigaTickerBTC} = this.props;
        if (quadrigaTickerBTC === " ") {
            return "..."
        } else {
            return `${quadrigaTickerBTC.data.last}`
        }
    }

    handleBalance() {
        const {quadrigaUserBalance} = this.props;
        if (quadrigaUserBalance === null) {
            return "..."
        } else {
            return `${quadrigaUserBalance.btc_balance}`
        }
    }  

    static navigationOptions = ({navigation}) => {
        const headerStyle = {
            alignSelf: 'center',
            color: 'white',
        }

        if (navigation.state.params != undefined) {
            return {
                headerTitle: `BTC/CAD ${navigation.state.params.btcTicker}`,
                headerTitleStyle: {
                    ...headerStyle
                },
                headerStyle: {
                    backgroundColor: 'orange'
                },
                tabBarLabel: 'Quadriga',            
                tabBarIcon: ({ tintColor }) => (
                <Icon
                    name="bitcoin-circle"
                    color={tintColor}
                    size={30}
                />
              ),
            }
        } else {
            return {
                headerTitle: `BTC/CAD `,
                headerTitleStyle: {
                    ...headerStyle
                },
                headerStyle: {
                    backgroundColor: 'orange'
                },
                tabBarLabel: 'Quadriga',
                tabBarIcon: ({ tintColor }) => (
                <Icon
                    name="bitcoin-circle"
                    color={tintColor}
                    size={30}
                />
              ),
            }
        }

    };

    render() {
        const {quadrigaTransactions, quadrigaTickerBTC, quadrigaTickerETH, quadrigaTickerBCH, quadrigaTickerBTG, quadrigaTickerLTC} = this.props;
        return (
            <ScrollView style={{height: height, width: width, backgroundColor: '#fff', flex: 1}}>
                <StatusBar
                    animated
                    backgroundColor={'#ff8433'}
                    />
                <ScrollView contentContainerStyle={styles.container}>
                    <Modules colorBTC={colorChangeBTC} colorETH={colorChangeETH} colorBCH={colorChangeBCH}
                             colorBTG={colorChangeBTG} colorLTC={colorChangeLTC} navigation={this.props.navigation}
                             dataBTC={quadrigaTickerBTC} dataETH={quadrigaTickerETH} dataBCH={quadrigaTickerBCH}
                             dataBTG={quadrigaTickerBTG} dataLTC={quadrigaTickerLTC}
                             intervalInstance={this.state.interval} restartInterval={()=>this.handleRestartInterval()}/>
                    <TransactionView data={quadrigaTransactions}/>
                </ScrollView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: '#f1f1f1',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#fff',
        marginBottom: 5,
    },
});

export const QuadrigaExchangeScreen = connect(mapStateToProps, mapDispatchToProps)(QuadrigaExchange);
