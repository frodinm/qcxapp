import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions,
    TouchableNativeFeedback,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    Clipboard,
    Alert,
} from 'react-native';
import { connect } from 'react-redux';
import IconMaterial from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import IconSimple from 'react-native-vector-icons/dist/SimpleLineIcons';
import IconAwsome from 'react-native-vector-icons/dist/FontAwesome';
import IconIOS from 'react-native-vector-icons/dist/Ionicons';
import Permissions from 'react-native-permissions';
import DropdownAlert from 'react-native-dropdownalert';
import {
    AdMobBanner,
} from 'react-native-admob';
import {
    getQuadrigaTickersAll,
    clearQuadrigaTickers,
    postUserQuadrigaTransactions,
    postUserLookupOrderQuadriga,
    postUserBitcoinWalletWithdrawQuadriga,
    postUserEthereumWalletWithdrawQuadriga,
    postUserBitcoinGoldWalletWithdrawQuadriga,
    postUserLitecoinWalletWithdrawQuadriga,
    postUserBitcoinCashWalletWithdrawQuadriga,
    postUserQuadrigaBalanceAndTransactions,
    postUserQuadrigaBalance
} from 'account';
import i18n from 'react-native-i18n';
import QRCode from 'react-native-qrcode';
import { iOSUIKit } from 'react-native-typography';
import { Divider, Button } from 'react-native-elements';
import Modal from 'react-native-modalbox';
import { encryptAuthenticationQuadriga } from 'util';

const { height, width } = Dimensions.get('window');

const textStyle = {
    fontSize: 17,
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
};
const mapStateToProps = (state) => ({
    apiKey: state.user.apiKey,
    clientId: state.user.clientId,
    privateKey: state.user.privateKey,
    quadrigaUserWalletWithdraw: state.account.quadrigaUserWalletWithdraw,
    quadrigaTickers: state.account.quadrigaTickers,
    quadrigaUserBalance: state.account.quadrigaUserBalance,
    quadrigaUserTransactions: state.account.quadrigaUserTransactions,
    quadrigaUserOrdersLookup: state.account.quadrigaUserOrdersLookup,
});
const mapDispatchToProps = (dispatch) => ({
    getQuadrigaTickersDispatch: () => { dispatch(getQuadrigaTickersAll()); },
    postUserQuadrigaBalanceDispatch: (key, sign, nonce) => { dispatch(postUserQuadrigaBalance(key, sign, nonce)); },
    postUserQuadrigaTransactionsDispatch: (apiKey, clientId, privateKey, offset, limit, sort, book, bookTwo) => { dispatch(postUserQuadrigaTransactions(apiKey, clientId, privateKey, offset, limit, sort, book, bookTwo)); },
    postUserLookupOrderQuadrigaDispatch: (key, sign, nonce, id) => { dispatch(postUserLookupOrderQuadriga(key, sign, nonce, id)); },
    postUserBitcoinWalletWithdrawQuadrigaDispatch: (key, sign, nonce, amount, address) => { dispatch(postUserBitcoinWalletWithdrawQuadriga(key, sign, nonce, amount, address)); },
    postUserEthereumWalletWithdrawQuadrigaDispatch: (key, sign, nonce, amount, address) => { dispatch(postUserEthereumWalletWithdrawQuadriga(key, sign, nonce, amount, address)); },
    postUserBitcoinGoldWalletWithdrawQuadrigaDispatch: (key, sign, nonce, amount, address) => { dispatch(postUserBitcoinGoldWalletWithdrawQuadriga(key, sign, nonce, amount, address)); },
    postUserLitecoinWalletWithdrawQuadrigaDispatch: (key, sign, nonce, amount, address) => { dispatch(postUserLitecoinWalletWithdrawQuadriga(key, sign, nonce, amount, address)); },
    postUserBitcoinCashWalletWithdrawQuadriga: (key, sign, nonce, amount, address) => { dispatch(postUserBitcoinCashWalletWithdrawQuadriga(key, sign, nonce, amount, address)); },
    postUserQuadrigaBalanceAndTransactionsDispatch: (apiKey, clientId, privateKey, offset, limit, sort, book, bookTwo) => { dispatch(postUserQuadrigaBalanceAndTransactions(apiKey, clientId, privateKey, offset, limit, sort, book, bookTwo)); }
});


class Wallet extends Component {
    constructor() {
        super();
        this.state = {
            address: '',
            withdrawAddress: '',
            amount: '',
            refreshing: false,
            minor: '-20.11185076',//data is just to not have an error for initial load of the modal
            major: '0.01660000',
            minorToken: 'cad',
            majorToken: 'eth',
            rate: '1205.50',
            order_id: 'ighhsvn4czab1t1lq276iu36h6f3cl4zx9czfidb4f7iun3fm1yif6boyrawft4h',
            fee: '0.00008341',
            datetime: '2018-01-06 18:46:44',
            acronym: ''
        };
        this.handleData = this.handleData.bind(this);
        this.handleQrCode = this.handleQrCode.bind(this);
        this.handlePlatform = this.handlePlatform.bind(this);
        this.handleCopyAddress = this.handleCopyAddress.bind(this);
        this.handleTransactions = this.handleTransactions.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleTransactionInfo = this.handleTransactionInfo.bind(this);
        this.handleBuyAction = this.handleBuyAction.bind(this);
        this.handleWithdraw = this.handleWithdraw.bind(this);
    }
    //btc_cad btc_usd  eth_btc, eth_cad, ltc_cad, bch_cad, btg_cad
    componentWillMount() {
        const { postUserQuadrigaBalanceAndTransactionsDispatch, apiKey, clientId, privateKey } = this.props;
        const { book, bookTwo } = this.props.navigation.state.params;
        clearQuadrigaTickers();
        postUserQuadrigaBalanceAndTransactionsDispatch(apiKey, clientId, privateKey, 0, 50, "desc", book, bookTwo);
    }
    componentDidMount() {
        this.props.navigation.setParams({ handleQrCode: this.handleQrCode });
        const { acronym } = this.props.navigation.state.params;
        this.setState({ acronym });
    }
    componentWillUnmount() {
        const { getQuadrigaTickersDispatch } = this.props;
        getQuadrigaTickersDispatch();
    }

    static navigationOptions = ({ navigation }) => {
        const headerStyle = {
            alignSelf: 'center',
            color: 'white',
            position: 'relative',

        };
        return {

            headerTitle: i18n.t('wallet'),
            headerStyle: {
                backgroundColor: 'orange',
            },
            headerRight: <TouchableOpacity onPress={() => navigation.state.params.handleQrCode()}>
                <IconMaterial size={25} color='white' style={{ marginRight: 20 }} name="qrcode-scan" />
            </TouchableOpacity>,
            headerTitleStyle: {
                ...headerStyle
            },

        };
    };


    handleQrCode() {
        this.refs.modal.open();
    }

    handlePlatform(onPressAction, buttonStyle, text) {
        if (Platform.OS === 'android') {
            if (TouchableNativeFeedback.canUseNativeForeground()) {
                return (
                    <TouchableNativeFeedback onPress={onPressAction} useForeground={true} background={TouchableNativeFeedback.Ripple()} delayPressIn={0} style={{ height: 40, width: width / 2.3, margin: 5, marginBottom: 10, borderRadius: 5, }}>
                        <View style={{ ...buttonStyle, justifyContent: 'center' }} pointerEvents='box-only' >
                            <Text style={{ textAlign: 'center', fontSize: 20, color: 'black' }}>{text}</Text>
                        </View>
                    </TouchableNativeFeedback>
                );
            } else {
                return (
                    <TouchableHighlight style={{ height: 40, width: width / 2.3, margin: 5, marginBottom: 10, borderRadius: 5, }} onPress={onPressAction} >
                        <View style={{ backgroundColor: 'orange', justifyContent: 'center', height: 40, width: width / 2.3, marginBottom: 10, borderRadius: 5, }} pointerEvents='box-only' >
                            <Text style={{ textAlign: 'center', fontSize: 18, color: 'black' }}>{text}</Text>
                        </View>
                    </TouchableHighlight>
                );
            }
        } else {
            return (
                <TouchableHighlight style={{ height: 40, width: width / 2.3, margin: 5, marginBottom: 10, borderRadius: 5, }} onPress={onPressAction} >
                    <View style={{ backgroundColor: 'orange', justifyContent: 'center', height: 40, width: width / 2.3, marginBottom: 10, borderRadius: 5, }} pointerEvents='box-only' >
                        <Text style={{ textAlign: 'center', fontSize: 18, color: 'black' }}>{text}</Text>
                    </View>
                </TouchableHighlight>
            );
        }
    }

    handleModalButton(text, styles, textStyle, onPressAction) {
        return (
            <View style={styles}>
                <Text onPress={onPressAction} style={textStyle}>{text}</Text>
            </View>
        );

    }
    handleData(acronym) {
        const { quadrigaTickers, quadrigaUserBalance, postUserQuadrigaBalanceDispatch, apiKey, clientId, privateKey } = this.props;
        if (quadrigaUserBalance.data.hasOwnProperty('error')) {
            setTimeout(() => {
                let nonce = Date.now();
                postUserQuadrigaBalanceDispatch(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, privateKey), nonce);
            }, 500);

        } else {
            if (acronym === 'btc') {
                return (
                    <View>
                        <Text style={[textStyle, { fontSize: 19 }]}>{quadrigaUserBalance.data.btc_balance === "0.00000000" ? "0" : quadrigaUserBalance.data.btc_balance} BTC</Text>
                        <Text style={[textStyle, { marginBottom: 20 }]}>${(quadrigaTickers.data.btc_cad.last * quadrigaUserBalance.data.btc_balance).toFixed(2)} CAD</Text>
                    </View>
                );
            } else if (acronym === 'eth') {
                return (
                    <View>
                        <Text style={[textStyle, { fontSize: 19 }]}>{quadrigaUserBalance.data.eth_balance === "0.00000000" ? "0" : quadrigaUserBalance.data.eth_balance} ETH</Text>
                        <Text style={[textStyle, { marginBottom: 20 }]}>${(quadrigaTickers.data.eth_cad.last * quadrigaUserBalance.data.eth_balance).toFixed(2)} CAD</Text>
                    </View>
                );
            } else if (acronym === 'bch') {
                return (
                    <View>
                        <Text style={[textStyle, { fontSize: 19 }]}>{quadrigaUserBalance.data.bch_balance === "0.00000000" ? "0" : quadrigaUserBalance.data.bch_balance} BCH</Text>
                        <Text style={[textStyle, { marginBottom: 20 }]}>${(quadrigaTickers.data.bch_cad.last * quadrigaUserBalance.data.bch_balance).toFixed(2)} CAD</Text>
                    </View>
                );
            } else if (acronym === 'btg') {
                return (
                    <View>
                        <Text style={[textStyle, { fontSize: 19 }]}>{quadrigaUserBalance.data.btg_balance === "0.00000000" ? "0" : quadrigaUserBalance.data.btg_balance} BTG</Text>
                        <Text style={[textStyle, { marginBottom: 30 }]}>${(quadrigaTickers.data.btg_cad.last * quadrigaUserBalance.data.btg_balance).toFixed(2)} CAD</Text>
                    </View>
                );
            } else if (acronym === 'ltc') {
                return (
                    <View>
                        <Text style={[textStyle, { fontSize: 19 }]}>{quadrigaUserBalance.data.ltc_balance === "0.00000000" ? "0" : quadrigaUserBalance.data.ltc_balance} LTC</Text>
                        <Text style={[textStyle, { marginBottom: 20 }]}>${(quadrigaTickers.data.ltc_cad.last * quadrigaUserBalance.data.ltc_balance).toFixed(2)} CAD</Text>
                    </View>
                );
            }
        }

    }
    handleIcon(object) {
        if (object.type === 2) {
            return <IconAwsome name="exchange" size={22} />;
        } else if (object.type === 1) {
            return <IconIOS name="ios-send-outline" size={35} />;
        } else if (object.type === 0) {
            return <IconSimple name="wallet" size={22} />;
        }

    }
    handleText(object) {
        if (object.type === 0) {
            return {
                BuyOrSell: i18n.t('deposit'),
                textObject: <Text style={[iOSUIKit.caption]}>{i18n.t('amount')} {object[Object.keys(object)[0]]} {Object.keys(object)[0].toUpperCase()}</Text>
            };
        } else if (object.type === 1) {
            return {
                BuyOrSell: i18n.t('sent'),
                textObject: <Text style={[iOSUIKit.body]}>{i18n.t('to')} {object.minor}</Text>
            };
        } else if (object.type === 2) {
            return {
                BuyOrSell: i18n.t('traded'),
                textObject: null
            };
        }
    }

    handleRefresh() {
        const { postUserQuadrigaTransactionsDispatch, apiKey, clientId, privateKey } = this.props;
        const { book, bookTwo } = this.props.navigation.state.params;
        postUserQuadrigaTransactionsDispatch(apiKey, clientId, privateKey, 0, 50, "desc", book, bookTwo);
    }

    handleTransactionInfo(item) {
        if (item.type === 2) {
            if (parseFloat(item[Object.keys(item)[0]]) < 0) {
                this.setState({
                    minor: item[Object.keys(item)[0]],
                    major: item[Object.keys(item)[1]],
                    minorToken: Object.keys(item)[0],
                    majorToken: Object.keys(item)[1],
                    rate: item.rate,
                    order_id: item.order_id,
                    fee: item.fee,
                    datetime: item.datetime
                });
            } else {
                this.setState({
                    minor: item[Object.keys(item)[1]],
                    major: item[Object.keys(item)[0]],
                    minorToken: Object.keys(item)[1],
                    majorToken: Object.keys(item)[0],
                    rate: item.rate,
                    order_id: item.order_id,
                    fee: item.fee,
                    datetime: item.datetime
                });
            }
            this.refs.modalLookUp.open();
        } else {
            this.dropdown.alertWithType('info', 'Info', i18n.t('depositAmountError'));
        }



    }

    handleWithdrawAlert() {
        const { quadrigaUserWalletWithdraw, postUserQuadrigaBalanceAndTransactionsDispatch, apiKey, clientId, privateKey } = this.props;
        const { book, bookTwo } = this.props.navigation.state.params;
        if (quadrigaUserWalletWithdraw.data.hasOwnProperty('error')) {
            this.dropdown.alertWithType('error', 'Error', quadrigaUserWalletWithdraw.data.error.message);
        } else {
            this.dropdown.alertWithType('success', 'Success', i18n.t('withdrawSentMessage'));
            setTimeout(() => {
                postUserQuadrigaBalanceAndTransactionsDispatch(apiKey, clientId, privateKey, 0, 50, "desc", book, bookTwo);
            }, 500);
        }
    }

    handleWithdraw() {
        const { acronym, withdrawAddress, amount } = this.state;
        const {
            apiKey,
            clientId,
            privateKey,
            postUserBitcoinWalletWithdrawQuadrigaDispatch,
            postUserEthereumWalletWithdrawQuadrigaDispatch,
            postUserBitcoinGoldWalletWithdrawQuadrigaDispatch,
            postUserLitecoinWalletWithdrawQuadrigaDispatch,
            postUserBitcoinCashWalletWithdrawQuadriga,
        } = this.props;
        let nonce;
        switch (acronym) {
            case 'btc':
                nonce = Date.now();
                postUserBitcoinWalletWithdrawQuadrigaDispatch(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, privateKey), nonce, amount, withdrawAddress);
                break;
            case 'eth':
                nonce = Date.now();
                postUserEthereumWalletWithdrawQuadrigaDispatch(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, privateKey), nonce, amount, withdrawAddress);
                break;
            case 'bch':
                nonce = Date.now();
                postUserBitcoinCashWalletWithdrawQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, privateKey), nonce, amount, withdrawAddress);
                break;
            case 'btg':
                nonce = Date.now();
                postUserBitcoinGoldWalletWithdrawQuadrigaDispatch(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, privateKey), nonce, amount, withdrawAddress);
                break;
            case 'ltc':
                nonce = Date.now();
                postUserLitecoinWalletWithdrawQuadrigaDispatch(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, privateKey), nonce, amount, withdrawAddress);
                break;

        }
        this.refs.modalWithdraw.close();
        setTimeout(() => {
            this.handleWithdrawAlert();
        }, 1000);
    }

    handleCopyAddress() {
        const { address, name } = this.props.navigation.state.params;
        if (typeof address === "string") {
            Clipboard.setString(address);
            Alert.alert(
                i18n.t('copyAddress'),
                i18n.locale.substring(0, 2) === 'en' ? `${i18n.t('yourSingular')} ${name} ${i18n.t('address')} : ${address} ${i18n.t('copyAlertMessage')}` : `${i18n.t('yourSingular')} ${i18n.t('address')} ${name} : ${address} ${i18n.t('copyAlertMessage')}`,
                [{ text: 'OK', onPress: () => this.refs.modal.close() }],
                { onDismiss: () => this.refs.modal.close() }
            );
        } else {
            Alert.alert(
                i18n.t('copyAddress'),
                i18n.t('copyAlertError'),
                [{ text: 'OK', onPress: () => this.refs.modal.close() }],
                { onDismiss: () => this.refs.modal.close() }
            );
        }

    }

    _keyExtractor = (item, index) => index.toString();

    _renderItem = ({ item, index }) => {

        return (
            <View style={{ width: width, height: height / 11, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableHighlight style={{ justifyContent: 'center' }} underlayColor="orange" style={{}} onPress={() => this.handleTransactionInfo(item)} >
                    <View key={index} style={{ width: width, height: height / 14, backgroundColor: 'white' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: width, height: height / 14 }}>
                            <View style={{ width: width * 0.14, alignItems: 'center' }}>
                                {this.handleIcon(item)}
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: width * 0.52 }}>
                                <Text style={[iOSUIKit.body]}>{this.handleText(item).BuyOrSell} {this.props.navigation.state.params.name} </Text>
                                {this.handleText(item).textObject}
                            </View>
                            <View style={{ flexDirection: 'column', width: width * 0.28 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
                                    <Text style={iOSUIKit.caption} >{item.datetime.split(" ")[1]}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
                                    <Text style={iOSUIKit.caption}>{item.datetime.split(" ")[0]}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
                <Divider style={{ height: 1, backgroundColor: 'orange', width: width / 1.1, marginTop: 5 }} />
            </View>
        );
    };


    handleTransactions(name) {
        const { quadrigaUserTransactions } = this.props;
        if (quadrigaUserTransactions.length === 0) {
            return (
                <View style={{ width: width, ...Platform.select({ ios: { height: (height / 2 - 50) }, android: { height: height / 2.35 - 40 } }), alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={[iOSUIKit.title3, { fontWeight: 'bold' }]}>{i18n.t('noTransactionsTitle')}</Text>
                    <Text style={{ textAlign: 'center', fontSize: 16 }}>{`\n${i18n.t('buy')} ${name} ${i18n.t('noTransactionMessage')}`}</Text>
                </View>
            );
        } else {
            return (
                <View style={{ width: width, ...Platform.select({ ios: { height: (height / 2 - 50) }, android: { height: height / 2.35 - 40 } }) }}>
                    <FlatList
                        data={quadrigaUserTransactions}
                        extraData={this.props}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.handleRefresh()}
                    />
                </View>
            );
        }
    }

    handleBuyAction(name) {
        this.dropdown.alertWithType('info', 'Info', `${i18n.t('buyAlertMessage')} ${name.toUpperCase()} !`);
    }

    handleCamera() {
        if (Platform.OS === 'ios') {
            Permissions.check('camera').then(response => {
                // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
                if (response.toString() !== 'authorized') {
                    Alert.alert(
                        i18n.t('cameraAccessErrorTitle'),
                        'Access needed to Scan Qr codes',
                        [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            {
                                text: 'Open Settings',
                                onPress: () => Permissions.openSettings(),
                            },
                        ]
                    );
                } else {
                    this.props.navigation.navigate('Camera', { setAddress: (address) => { this.setState({ withdrawAddress: address }); } });
                }
            });
        } else {
            Permissions.check('camera').then(response => {
                // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
                if (response.toString() !== 'authorized') {
                    Permissions.request('camera').then(response => {
                        if (response.toString() === 'denied') {
                            alert(i18n.t('cameraAccessErrorMessage'));
                        } else {
                            this.props.navigation.navigate('Camera', { setAddress: (address) => { this.setState({ withdrawAddress: address }); } });
                        }
                    });
                } else {
                    this.props.navigation.navigate('Camera', { setAddress: (address) => { this.setState({ withdrawAddress: address }); } });
                }
            });
        }

    }

    confirmWithdraw() {
        const { acronym, withdrawAddress, amount } = this.state;
        Alert.alert(
            i18n.t('withdraw'),
            `${i18n.t('withdrawAlert')}\n${i18n.t('address')}:${withdrawAddress} \n${i18n.t('amount')} : ${amount === "" ? "0" : amount} ${acronym.toUpperCase()}`,
            [
                { text: i18n.t('cancel'), onPress: () => { }, style: 'cancel' },
                { text: i18n.t('confirm'), onPress: () => this.handleWithdraw() },
            ]
        );
    }

    render() {
        const { acronym, name, address } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <View contentContainerStyle={{ flexDirection: 'column', alignItems: 'center' }}>
                    <View style={{ ...Platform.select({ ios: { height: height / 2 - 60 }, android: { height: height / 2 - 40 } }), alignItems: 'center' }}>
                        <View style={{ alignItems: 'center', width: width, height: (height / 2 - 30) * 0.45 }}>
                            <Text style={[iOSUIKit.title3, { marginBottom: 10, marginTop: 20 }]}>{i18n.t('yourSingular')} {name} {i18n.t('wallet')}</Text>
                            {this.handleData(acronym)}
                        </View>
                        <View style={{ flexDirection: 'column', ...Platform.select({ ios: { height: (height / 2 - 30) * 0.25 }, android: { height: (height / 2 - 40) * 0.30 } }) }}>
                            <View style={{ flexDirection: 'row' }}>
                                {this.handlePlatform(() => this.handleBuyAction(acronym), { height: 40, width: width / 2.3, backgroundColor: 'orange', margin: 5, marginBottom: 10, borderRadius: 5 }, i18n.t('buy'))}
                                {this.handlePlatform(() => this.refs.modalWithdraw.open(), { height: 40, width: width / 2.3, backgroundColor: 'orange', margin: 5, marginBottom: 10, borderRadius: 5 }, i18n.t('withdraw'))}
                            </View>
                            <Divider style={{ height: 1, backgroundColor: 'orange', width: width / 1.1 }} />
                        </View>
                        <Text style={[iOSUIKit.title3, { fontSize: 22, marginTop: 20 }]}>Transactions</Text>
                    </View>
                    {this.handleTransactions(name)}
                </View>
                <Modal
                    style={styles.modalLookUp}
                    position={"center"}
                    ref={"modalLookUp"}
                >
                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                        <Text style={[iOSUIKit.title3, { marginBottom: 10 }]}>{i18n.t('transactionInfo')}</Text>
                        <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                            <Text style={styles.lookUpTextTitle}>{i18n.t('from')}</Text>
                            <Text style={styles.looUpTextData}>{this.state.minor} {this.state.minorToken.toUpperCase()}</Text>
                        </View>
                        <Divider style={{ height: 1, width: width / 1.2 - 22, backgroundColor: 'orange' }} />
                        <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                            <Text style={styles.lookUpTextTitle}>{i18n.t('to')}</Text>
                            <Text style={styles.looUpTextData}>{this.state.major} {this.state.majorToken.toUpperCase()}</Text>
                        </View>
                        <Divider style={{ height: 1, width: width / 1.2 - 22, backgroundColor: 'orange' }} />
                        <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                            <Text style={styles.lookUpTextTitle}>{i18n.t('rate')}</Text>
                            <Text style={styles.looUpTextData}>{this.state.rate}</Text>
                        </View>
                        <Divider style={{ height: 1, width: width / 1.2 - 22, backgroundColor: 'orange' }} />
                        <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                            <Text style={styles.lookUpTextTitle}>{i18n.t('fee')}</Text>
                            <Text style={styles.looUpTextData}>{this.state.fee}</Text>
                        </View>
                        <Divider style={{ height: 1, width: width / 1.2 - 22, backgroundColor: 'orange' }} />
                        <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                            <Text style={styles.lookUpTextTitle}>{i18n.t('date')}</Text>
                            <Text style={styles.looUpTextData}>{this.state.datetime}</Text>
                        </View>
                        <Divider style={{ height: 1, width: width / 1.2 - 22, backgroundColor: 'orange' }} />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ height: height / 8, width: width / 1.2, alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => { this.refs.modalLookUp.close(); }} style={{ margin: 20, marginBottom: 15 }}>
                                    <Text style={{ fontSize: 15, color: 'black' }}>{i18n.t('close').toUpperCase()}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    style={styles.modal}
                    position={"center"}
                    coverScreen={true}
                    ref={"modal"}
                >
                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 350, width: 300 }}>
                        <Text style={[iOSUIKit.title3, { marginBottom: 30, position: 'absolute', top: 30 }]}>{i18n.locale.substring(0, 2) === 'en' ? `${i18n.t('my')} ${name} ${i18n.t('address')}` : `${i18n.t('my')} ${i18n.t('address')} ${name}`}</Text>
                        <QRCode
                            value={address}
                            size={180}
                            bgColor='black'
                            fgColor='white'
                        />
                        {this.handleModalButton(i18n.t('close').toUpperCase(), { position: 'absolute', bottom: 30, right: 150, margin: 5 }, { fontSize: 14, color: 'black', textAlign: 'center' }, () => this.refs.modal.close())}
                        {this.handleModalButton(i18n.t('copyAddress').toUpperCase(), { position: 'absolute', bottom: 30, right: 20, margin: 5 }, { fontSize: 14, color: 'orange', textAlign: 'center' }, () => this.handleCopyAddress())}
                    </View>
                </Modal>
                <Modal
                    style={styles.modalWithdraw}
                    position={"center"}
                    ref={"modalWithdraw"}
                    keyboardTopOffset={0}
                >
                    <View style={{ flexDirection: 'column', alignItems: 'center', width: width / 1.1 }}>
                        <TouchableOpacity onPress={() => this.handleCamera()} style={{ position: 'absolute', top: 20, left: 30 }}>
                            <IconIOS name="ios-qr-scanner" size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.refs.modalWithdraw.close()} style={{ position: 'absolute', top: 15, right: 30 }}>
                            <IconIOS name="ios-close" size={35} />
                        </TouchableOpacity>
                        <Text style={[iOSUIKit.title3, { marginTop: 22 }]}>{i18n.t('withdraw')}</Text>
                        <Text style={[iOSUIKit.body, { marginTop: 22 }]}>{i18n.t('withdrawTitle')} {name}</Text>
                        <TextInput onChangeText={(text) => this.setState({ withdrawAddress: text })} value={this.state.withdrawAddress} placeholder={i18n.t('addressHere')} style={styles.textInput} />
                        <Text style={[iOSUIKit.body, { marginTop: 22 }]}>{i18n.t('withdrawSend')}</Text>
                        <TextInput onChangeText={(text) => this.setState({ amount: text })} keyboardType="numeric" placeholder={i18n.t('amountHere')} style={styles.textInput} />
                        <Button onPress={() => this.confirmWithdraw()} title={`${i18n.t('withdraw')}!`} containerViewStyle={{ position: 'relative', top: 25, width: 150, height: 50, }} buttonStyle={{ backgroundColor: 'orange' }} />
                    </View>
                </Modal>
                <AdMobBanner
                    adSize="smartBannerLandscape"
                    adUnitID="ca-app-pub-8321262189259728/7083427459"
                    testDevices={[AdMobBanner.simulatorId]}
                    onAdFailedToLoad={error => console.error(error)}
                />
                <DropdownAlert updateStatusBar={false} translucent={true} ref={ref => this.dropdown = ref} />
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
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        ...Platform.select({
            ios: {
                marginTop: 0
            }
        }),
        height: height / 1.8,
        width: width / 1.2
    },
    modalLookUp: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        ...Platform.select({
            ios: {
                marginTop: 0
            }
        }),
        height: height / 1.8,
        width: width / 1.1
    },
    lookUpTextTitle: {
        width: width / 1.21 / 2.1,
        paddingLeft: 10,
        color: 'black'
    },
    looUpTextData: {
        width: width / 1.2 / 1.9,
        textAlign: 'center',
        color: 'black'
    },
    modalWithdraw: {

        alignItems: 'center',
        borderRadius: 5,
        ...Platform.select({
            ios: {
                marginTop: 0
            }
        }),
        height: height / 1.6,
        width: width / 1.1
    },
    textInput: {
        ...Platform.select({
            ios: {
                borderWidth: 1,
                borderColor: '#8E8E93',
                borderRadius: 5,
                paddingLeft: 5,
                height: 30,
            }
        }),
        width: width / 1.2,
        marginTop: 15,
    }
});

export const WalletScreen = connect(mapStateToProps, mapDispatchToProps)(Wallet);
