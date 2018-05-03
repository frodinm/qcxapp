import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    Dimensions,
    StatusBar
} from 'react-native';
import { TransactionView, Modules } from 'components';
import Icon from 'react-native-vector-icons/dist/Foundation';
import { connect } from 'react-redux';
import { encryptAuthenticationQuadriga } from 'util';

import {
    getQuadrigaTickersAll,
    postUserQuadrigaBalance,
    postUserOpenOrdersQuadriga,
    moduleButtonPressedHandler,
    clearQuadrigaTickers
} from 'account';

const { height, width } = Dimensions.get('window');
let colorChangeBTC = 'white';
let colorChangeETH = 'white';
let colorChangeBCH = 'white';
let colorChangeBTG = 'white';
let colorChangeLTC = 'white';


const mapStateToProps = (state) => ({
    apiKey: state.user.apiKey,
    clientId: state.user.clientId,
    privateKey: state.user.privateKey,
    quadrigaTickers: state.account.quadrigaTickers,
    quadrigaTransactions: state.account.quadrigaTransactions,
    quadrigaUserBalance: state.account.quadrigaUserBalance,
    isModuleButtonPressed: state.account.isModuleButtonPressed
});
const mapDispatchToProps = (dispatch) => ({
    getQuadrigaTickersDispatch: () => { dispatch(getQuadrigaTickers()); },
    postUserQuadrigaBalanceDispatch: (key, sign, nonce) => {
        dispatch(postUserQuadrigaBalance(key, sign, nonce));
    },
    postUserOpenOrdersQuadrigaDispatch: (key, sign, nonce) => {
        dispatch(postUserOpenOrdersQuadriga(key, sign, nonce));
    },
    getQuadrigaTickersAllDispatch: () => { dispatch(getQuadrigaTickersAll()); },
    moduleButtonPressedHandlerDispatch: () => { dispatch(moduleButtonPressedHandler()); },
});


class QuadrigaExchange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nonce: null,
            interval: null,
        };
        this.handleGetTicker = this.handleGetTicker.bind(this);
        this.handleGetBalance = this.handleGetBalance.bind(this);
        this.handleBalance = this.handleBalance.bind(this);
        clearQuadrigaTickers();
        props.getQuadrigaTickersAllDispatch();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.quadrigaTickers.data.btc_cad.last != this.props.quadrigaTickers.data.btc_cad.last) {
            this.props.navigation.setParams({ btcTicker: `${Math.round(nextProps.quadrigaTickers.data.btc_cad.last)} ` });
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.quadrigaTickers.data.btc_cad.last > this.props.quadrigaTickers.data.btc_cad.last) {
            colorChangeBTC = '#b2d8b2';
        } else if (nextProps.quadrigaTickers.data.btc_cad.last < this.props.quadrigaTickers.data.btc_cad.last) {
            colorChangeBTC = '#ff9999';
        }
        if (nextProps.quadrigaTickers.data.eth_cad.last > this.props.quadrigaTickers.data.eth_cad.last) {
            colorChangeETH = '#b2d8b2';
        } else if (nextProps.quadrigaTickers.data.eth_cad.last < this.props.quadrigaTickers.data.eth_cad.last) {
            colorChangeETH = '#ff9999';
        }
        if (nextProps.quadrigaTickers.data.bch_cad.last > this.props.quadrigaTickers.data.bch_cad.last) {
            colorChangeBCH = '#b2d8b2';
        } else if (nextProps.quadrigaTickers.data.bch_cad.last < this.props.quadrigaTickers.data.bch_cad.last) {
            colorChangeBCH = '#ff9999';
        }
        if (nextProps.quadrigaTickers.data.btg_cad.last > this.props.quadrigaTickers.data.btg_cad.last) {
            colorChangeBTG = '#b2d8b2';
        } else if (nextProps.quadrigaTickers.data.btg_cad.last < this.props.quadrigaTickers.data.btg_cad.last) {
            colorChangeBTG = '#ff9999';
        }
        if (nextProps.quadrigaTickers.data.ltc_cad.last > this.props.quadrigaTickers.data.ltc_cad.last) {
            colorChangeLTC = '#b2d8b2';
        } else if (nextProps.quadrigaTickers.data.ltc_cad.last < this.props.quadrigaTickers.data.ltc_cad.last) {
            colorChangeLTC = '#ff9999';
        }

    }


    handleGetBalance() {
        const { postUserQuadrigaBalanceDispatch, apiKey, clientId, privateKey } = this.props;
        const nonce = Date.now();
        postUserQuadrigaBalanceDispatch(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, privateKey), nonce);
    }

    handleGetTicker() {
        const { quadrigaTickerBTC } = this.props;
        if (quadrigaTickerBTC === " ") {
            return "...";
        } else {
            return `${quadrigaTickerBTC.data.last}`;
        }
    }

    handleBalance() {
        const { quadrigaUserBalance } = this.props;
        if (quadrigaUserBalance === null) {
            return "...";
        } else {
            return `${quadrigaUserBalance.btc_balance}`;
        }
    }

    static navigationOptions = ({ navigation }) => {
        const headerStyle = {
            alignSelf: 'center',
            color: 'white',
        };

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
            };
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
            };
        }

    };

    render() {
        const { quadrigaTransactions, quadrigaTickers } = this.props;
        return (
            <ScrollView style={{ height: height, width: width, backgroundColor: '#fff', flex: 1 }}>
                <StatusBar
                    animated
                    backgroundColor={'#ff8433'}
                />
                <ScrollView contentContainerStyle={styles.container}>
                    <Modules colorBTC={colorChangeBTC} colorETH={colorChangeETH} colorBCH={colorChangeBCH}
                        colorBTG={colorChangeBTG} colorLTC={colorChangeLTC} navigation={this.props.navigation}
                        dataBTC={quadrigaTickers.data.btc_cad} dataETH={quadrigaTickers.data.eth_cad} dataBCH={quadrigaTickers.data.bch_cad}
                        dataBTG={quadrigaTickers.data.btg_cad} dataLTC={quadrigaTickers.data.ltc_cad} isModuleButtonPressed={this.props.isModuleButtonPressed}
                        moduleButtonPressedHandler={() => this.props.moduleButtonPressedHandlerDispatch()}
                    />
                    <TransactionView data={quadrigaTransactions} />
                </ScrollView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: '#f8f8f8',
    }
});

export const QuadrigaExchangeScreen = connect(mapStateToProps, mapDispatchToProps)(QuadrigaExchange);
