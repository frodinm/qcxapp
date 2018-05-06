import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  Animated,
  Alert
} from 'react-native';
import LottieView from 'lottie-react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { Divider, Button } from 'react-native-elements';
import { iOSUIKit } from 'react-native-typography';
import IconMaterial from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import SimpleIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import IconIOS from 'react-native-vector-icons/dist/Ionicons';
import Modal from 'react-native-modalbox';
import i18n from 'react-native-i18n';
import {
  AdMobBanner,
} from 'react-native-admob';
import { encryptAuthenticationQuadriga } from 'util';

const { width, height } = Dimensions.get('window');

export class BuySellComponent extends Component {
  constructor() {
    super();
    this.state = {
      amount: "",
      price: "",
      interval: null,
      tokenAmountAvailable: "0",
      refreshProgress: new Animated.Value(0),
      isDisabled: false
    };
    this.handleBidOrderView = this.handleBidOrderView.bind(this);
    this.handleAskOrderView = this.handleAskOrderView.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleTotalPrice = this.handleTotalPrice.bind(this);
    this.handleUserOrders = this.handleUserOrders.bind(this);
    this.handleRefreshUserBalance = this.handleRefreshUserBalance.bind(this);
    this.handleTokenAvailable = this.handleTokenAvailable.bind(this);
    this.handleFromAvailableAmount = this.handleFromAvailableAmount.bind(this);
    this.handleToFixed = this.handleToFixed.bind(this);
    this.handleBuyToken = this.handleBuyToken.bind(this);
    this.handleSellToken = this.handleSellToken.bind(this);
    this.handleBuyMArketAlert = this.handleBuyMArketAlert.bind(this);
    this.handleBuyAtPriceAlert = this.handleBuyAtPriceAlert.bind(this);
    this.handleSellAtPriceAlert = this.handleSellAtPriceAlert.bind(this);
    this.handleSellMarketAlert = this.handleSellMarketAlert.bind(this);
    this.handleOpenInfo = this.handleOpenInfo.bind(this);
    this.confirmCancelOrder = this.confirmCancelOrder.bind(this);
  }
  componentDidMount() {
    const { userOpenOrders, tradingBook, apiKey, clientId, secret } = this.props.trading;
    this.animation.play();


  }

  handleAmount(text) {
    this.setState({
      amount: text
    });
  }

  handleCloseButtonIcon() {
    if (Platform.OS === 'android') {
      return <IconMaterial name="close" size={25} />;
    } else {
      return <IconIOS name="ios-close" size={25} />;
    }
  }

  handleTotalPrice() {
    const { quadrigaOrders } = this.props;
    const { tradingBook } = this.props.trading;
    if (this.state.price === "") {
      if (tradingBook.slice(4, 7) !== 'btc') {
        return <Text style={[iOSUIKit.caption, styles.text]}>{i18n.t('total')}: ~{(parseFloat(this.state.amount === "" ? 0 : this.state.amount) * parseFloat(quadrigaOrders.asks.slice(7, 8)[0])).toFixed(2)} {tradingBook.slice(4, 7).toUpperCase()}</Text>;
      } else {
        return <Text style={[iOSUIKit.caption, styles.text]}>{i18n.t('total')}: ~{(parseFloat(this.state.amount === "" ? 0 : this.state.amount) * parseFloat(quadrigaOrders.asks.slice(0, 1)[0])).toFixed(6)} BTC</Text>;
      }
    } else {
      if (tradingBook.slice(4, 7) !== 'btc') {
        return <Text style={[iOSUIKit.caption, styles.text]}>{i18n.t('total')}: {(parseFloat(this.state.amount === "" ? 0 : this.state.amount) * parseFloat(this.state.price)).toFixed(4)} {tradingBook.slice(4, 7).toUpperCase()}</Text>;
      } else {
        return <Text style={[iOSUIKit.caption, styles.text]}>{i18n.t('total')}: {parseFloat(this.state.amount === "" ? 0 : this.state.amount) * parseFloat(this.state.price)} BTC</Text>;
      }
    }
  }

  handlePrice(text) {
    this.setState({
      price: text
    });
  }

  handleToFixed(value) {
    const { tradingBook } = this.props.trading;
    if (tradingBook.slice(4, 7) === 'btc') {
      return value.toFixed(5);
    } else {
      return value.toFixed(2);
    }
  }

  handleText(type) {
    switch (type) {
      case "0":
        return "Buy";
      case "1":
        return "Sell";
    }
  }

  handleStatus(type) {
    switch (type) {
      case "0":
        return "Active";
      case "1":
        return "Partially filled";
    }
  }



  handleBidOrderView() {
    const { quadrigaOrders } = this.props;
    let btcBids = quadrigaOrders.bids.slice(0, 10);
    return btcBids.map((item, index) => {
      return <View key={index} style={{ flexDirection: 'column', alignSelf: 'flex-start', marginTop: 2 }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => this.setState({ price: this.handleToFixed(parseFloat(item[0])) })}><Text style={{ width: width / 4 - 8, alignSelf: 'center', textAlign: 'center' }}>{this.handleToFixed(parseFloat(item[0]))}</Text></TouchableOpacity>
          <Text style={{ width: width / 4 - 8, alignSelf: 'center', textAlign: 'center' }}>{parseFloat(item[1]).toFixed(3)}</Text>
        </View>
      </View>;
    });
  }

  handleAskOrderView() {
    const { quadrigaOrders } = this.props;
    let btcAsks = quadrigaOrders.asks.slice(0, 10);
    return btcAsks.map((item, index) => {
      return <View key={index} style={{ flexDirection: 'column', alignSelf: 'flex-start', marginTop: 2 }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => this.setState({ price: this.handleToFixed(parseFloat(item[0])) })}><Text style={{ width: width / 4 - 4, alignSelf: 'center', textAlign: 'center' }}>{this.handleToFixed(parseFloat(item[0]))}</Text></TouchableOpacity>
          <Text style={{ width: width / 4 - 4, alignSelf: 'center', textAlign: 'center' }}>{parseFloat(item[1]).toFixed(3)}</Text>
        </View>
      </View>;
    });
  }

  handleOpenInfo(item) {
    const { userLookupOrder, apiKey, clientId, secret } = this.props.trading;
    let nonce = Date.now();
    userLookupOrder(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, secret), nonce, item.id);
    this.refs.modalOrderInfo.open();

  }

  handleUserOrders() {
    const { quadrigaUserOrders, tradingBook, userOpenOrders, apiKey, clientId, secret } = this.props.trading;
    const { name } = this.props;
    if (quadrigaUserOrders.data.length === 0) {
      return <Text style={{ textAlign: 'center', margin: 30 }}>{`${i18n.t('buyNow')} ${name} ${i18n.t('noOrderMessage')}`}</Text>;
    } else if (quadrigaUserOrders.data.hasOwnProperty('error')) {
      let nonce = Date.now();
      userOpenOrders(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, secret), nonce, tradingBook);
    } else {
      return (
        quadrigaUserOrders.data.map((item, index) => {
          return (
            <TouchableHighlight underlayColor="orange" onPress={() => this.handleOpenInfo(item)} key={index} style={{ height: 50, width: width / 1.03 - 5 }}>
              <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white' }}>
                <Text style={[iOSUIKit.body, { width: '18%', textAlign: 'center' }]}>{this.handleText(item.type)}</Text>
                <Text style={{ color: 'black', width: '30%', textAlign: 'center' }}>{item.amount}</Text>
                <Text style={{ width: '26%', textAlign: 'center' }}>{item.price}</Text>
                <Text style={{ width: '15%', textAlign: 'center' }}>{this.handleStatus(item.status)}</Text>
                <View style={{ width: '10%', alignItems: 'center' }}><SimpleIcon name="arrow-right" size={15} color="orange" /></View>
              </View>
            </TouchableHighlight>
          );
        })

      );
    }

  }


  handleRefreshUserBalance() {
    const { apiKey, clientId, secret, userBalance } = this.props.trading;
    this.animation.play();
    const nonce = Date.now();
    userBalance(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, secret), nonce);
  }

  handleFromAvailableAmount() {
    const { quadrigaUserBalance, tradingBook } = this.props.trading;
    if (tradingBook === 'btc_cad' || tradingBook === 'btc_usd') {
      if (tradingBook === 'btc_cad') {
        return `${quadrigaUserBalance.data.cad_available} CAD`;
      } else {
        return `${quadrigaUserBalance.data.usd_available} USD`;
      }
    } else if (tradingBook === 'eth_cad' || tradingBook === 'eth_btc') {
      if (tradingBook === 'eth_cad') {
        return `${quadrigaUserBalance.data.cad_available} CAD`;
      } else {
        return `${parseFloat(quadrigaUserBalance.data.btc_available).toFixed(6)} BTC`;
      }
    } else if (tradingBook === 'ltc_cad' || tradingBook === 'ltc_btc') {
      if (tradingBook === 'ltc_cad') {
        return `${quadrigaUserBalance.data.cad_available} CAD`;
      } else {
        return `${parseFloat(quadrigaUserBalance.data.btc_available).toFixed(6)} BTC`;
      }
    } else if (tradingBook === 'bch_cad' || tradingBook === 'bch_btc') {
      if (tradingBook === 'bch_cad') {
        return `${quadrigaUserBalance.data.cad_available} CAD`;
      } else {
        return `${parseFloat(quadrigaUserBalance.data.btc_available).toFixed(6)} BTC`;
      }
    } else if (tradingBook === 'btg_cad' || tradingBook === 'btg_btc') {
      if (tradingBook === 'btg_cad') {
        return `${quadrigaUserBalance.data.cad_available} CAD`;
      } else {
        return `${parseFloat(quadrigaUserBalance.data.btc_available).toFixed(6)} BTC`;
      }
    }
  }

  handleTokenAvailable() {
    const { quadrigaUserBalance, token } = this.props.trading;

    switch (token) {
      case "btc":
        return parseFloat(quadrigaUserBalance.data.btc_available).toFixed(6);
      case "eth":
        return parseFloat(quadrigaUserBalance.data.eth_available).toFixed(6);
      case "bch":
        return parseFloat(quadrigaUserBalance.data.bch_available).toFixed(6);
      case "btg":
        return parseFloat(quadrigaUserBalance.data.btg_available).toFixed(6);
      case "ltc":
        return parseFloat(quadrigaUserBalance.data.ltc_available).toFixed(6);
      default:
        return "0";
    }
  }

  handleBuyMArketAlert() {
    const { quadrigaUserBuyMarket } = this.props.trading;
    if (quadrigaUserBuyMarket.data.hasOwnProperty('error')) {
      this.dropdown.alertWithType('error', 'Error', quadrigaUserBuyMarket.data.error.message);
    } else {
      this.dropdown.alertWithType('info', 'Info', i18n.t('buyMarketPriceAlertMessage'));
    }
  }

  handleBuyAtPriceAlert() {
    const { quadrigaUserBuyAt } = this.props.trading;
    if (quadrigaUserBuyAt.data.hasOwnProperty('error')) {
      this.dropdown.alertWithType('error', 'Error', quadrigaUserBuyAt.data.error.message);
    } else {
      this.dropdown.alertWithType('info', 'Info', `${this.handleText(quadrigaUserBuyAt.data.type)} ${quadrigaUserBuyAt.data.amount} ${quadrigaUserBuyAt.data.book.slice(0, 3).toUpperCase()} ${i18n.t('at')} ${quadrigaUserBuyAt.data.price} ${i18n.t('buyOrderConfirmLimitMessageAlert')}`);
    }
  }

  handleSellAtPriceAlert() {
    const { quadrigaUserSellLimit } = this.props.trading;
    if (quadrigaUserSellLimit.data.hasOwnProperty('error')) {
      this.dropdown.alertWithType('error', 'Error', quadrigaUserSellLimit.data.error.message);
    } else {
      this.dropdown.alertWithType('info', 'Info', `${this.handleText(quadrigaUserSellLimit.data.type)} ${quadrigaUserSellLimit.data.amount} ${quadrigaUserSellLimit.data.book.slice(0, 3).toUpperCase()} ${i18n.t('at')} ${quadrigaUserSellLimit.data.price} ${i18n.t('buyOrderConfirmLimitMessageAlert')}`);
    }
  }

  handleSellMarketAlert() {
    const { quadrigaUserSellMarket } = this.props.trading;
    if (quadrigaUserSellMarket.data.hasOwnProperty('error')) {
      this.dropdown.alertWithType('error', 'Error', quadrigaUserSellMarket.data.error.message);
    } else {
      this.dropdown.alertWithType('info', 'Info', i18n.t('sellMarketPriceAlertMessage'));
    }
  }

  handleBuyToken() {
    const { tradingBook, userBuyAtPrice, userBuyMarketPrice, apiKey, clientId, secret } = this.props.trading;
    if (this.state.price === "") {
      userBuyMarketPrice(apiKey, clientId, secret, this.state.amount, tradingBook);
      setTimeout(() => {
        this.handleBuyMArketAlert();
      }, 1000);
    } else {
      userBuyAtPrice(apiKey, clientId, secret, this.state.amount, this.state.price, tradingBook);
      setTimeout(() => {
        this.handleBuyAtPriceAlert();
      }, 1000);
    }


  }

  handleSellToken() {
    const { tradingBook, apiKey, clientId, secret, userSellAtPrice, userSellMarketPrice } = this.props.trading;
    if (this.state.price === "") {
      userSellMarketPrice(apiKey, clientId, secret, this.state.amount, tradingBook);
      setTimeout(() => {
        this.handleSellMarketAlert();
      }, 1000);
    } else {
      userSellAtPrice(apiKey, clientId, secret, this.state.amount, this.state.price, tradingBook);
      setTimeout(() => {
        this.handleSellAtPriceAlert();
      }, 1000);
    }
  }

  handleStatusColor(value) {
    switch (value) {
      case "-1":
        return <View style={{ height: 10, width: 10, borderRadius: 100, backgroundColor: '#cc3232', alignSelf: 'center' }} />;
      case "0":
        return <View style={{ height: 10, width: 10, borderRadius: 100, backgroundColor: '#2B73B6', alignSelf: 'center' }} />;
      case "1":
        return <View style={{ height: 10, width: 10, borderRadius: 100, backgroundColor: '#ecec4c', alignSelf: 'center' }} />;
      case "2":
        return <View style={{ height: 10, width: 10, borderRadius: 100, backgroundColor: '#32A54A', alignSelf: 'center' }} />;
    }
  }

  handleStatusText(value) {
    switch (value) {
      case "-1":
        return <Text>Canceled</Text>;
      case "0":
        return <Text>Active</Text>;
      case "1":
        return <Text>Partially filled</Text>;
      case "2":
        return <Text>Complete</Text>;
    }
  }

  handleType(type) {
    switch (type) {
      case "0":
        return {
          title: i18n.t('buyNow'),
          return: i18n.t('paid'),
        };
      case "1":
        return {
          title: i18n.t('sellPresent'),
          return: i18n.t('return'),
        };
      default:
        return {
          title: "",
          return: "",
        };
    }
  }

  confirmCancelOrder() {
    const { quadrigaUserOrdersLookup, userCancelOrder, apiKey, clientId, secret, tradingBook } = this.props.trading;
    userCancelOrder(apiKey, clientId, secret, quadrigaUserOrdersLookup.data[0].id, tradingBook);
    this.refs.modalOrderInfo.close();
    this.dropdown.alertWithType('info', 'Info', i18n.t('cancelOrderSuccessMessage'));
  }

  confirmBuyOrder() {
    this.handleBuyToken();
  }

  confirmSellOrder() {
    this.handleSellToken();
  }

  handleSetAmountValue() {
    this.setState({ amount: this.handleTokenAvailable() });
  }

  handleBuyOrder() {
    const { price } = this.state;
    const { quadrigaOrders } = this.props;
    Alert.alert(
      price === "" ? i18n.t('buyMarketPriceMessage') : i18n.t('buyLimitPriceMessage'),
      price !== "" ? `${i18n.t('buyOrderConfirmMessage')} ${this.state.amount === "" ? "0" : this.state.amount} ${this.props.acronym} ${i18n.t('at')} $${this.state.price} ${i18n.t('each')}` : `${i18n.t('buyOrderConfirmMessage')} ${this.state.amount === "" ? "0" : this.state.amount} ${this.props.acronym} ${i18n.t('at')} ~$${parseFloat(quadrigaOrders.asks.slice(7, 8)[0]).toFixed(2)} ${i18n.t('each')}`,
      [
        { text: i18n.t('cancel'), onPress: () => { }, style: 'cancel' },
        { text: i18n.t('confirm'), onPress: () => this.confirmBuyOrder() },
      ]
    );
  }


  handleSellOrder() {
    const { price } = this.state;
    const { quadrigaOrders } = this.props;
    Alert.alert(
      price === "" ? i18n.t('sellMarketPriceMessage') : i18n.t('sellLimitPriceMessage'),
      price !== "" ? `${i18n.t('sellOrderConfirmMessage')} ${this.state.amount === "" ? "0" : this.state.amount} ${this.props.acronym} ${i18n.t('at')} $${this.state.price} ${i18n.t('each')}` : `${i18n.t('sellOrderConfirmMessage')} ${this.state.amount === "" ? "0" : this.state.amount} ${this.props.acronym} ${i18n.t('at')} ~$${parseFloat(quadrigaOrders.asks.slice(7, 8)[0]).toFixed(2)} ${i18n.t('each')}`,
      [
        { text: i18n.t('cancel'), onPress: () => { }, style: 'cancel' },
        { text: i18n.t('confirm'), onPress: () => this.confirmSellOrder() },
      ]
    );
  }

  handleCancelOrder() {
    Alert.alert(
      i18n.t('cancelOrder'),
      i18n.t('cancelOrderMessage'),
      [
        { text: i18n.t('cancel'), onPress: () => { }, style: 'cancel' },
        { text: i18n.t('confirm'), onPress: () => this.confirmCancelOrder() },
      ]
    );
  }


  render() {
    const { acronym, quadrigaOrders, trading } = this.props;
    const { quadrigaUserOrdersLookup } = this.props.trading;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', width: width / 1.045, elevation: 2, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2, marginTop: 5 }}>
            <View style={{ flexDirection: 'column', marginTop: 15, marginBottom: 15, width: width / 2.2 }}>
              <Text style={[iOSUIKit.body, {}]}>{i18n.t('amount')}</Text>
              <TextInput onChangeText={(text) => this.handleAmount(text)} value={this.state.amount} keyboardType="numeric" placeholder={`${i18n.t('amount')} ${acronym}`} style={styles.textInput} />
              <Text style={[iOSUIKit.body, {}]}>{i18n.t('price')}</Text>
              <TextInput onChangeText={(text) => this.handlePrice(text)} value={this.state.price} keyboardType="numeric" placeholder={`${trading.tradingBook.slice(4, 7).toUpperCase()} ${i18n.t('per')} ${acronym} ${i18n.t('at')} MP`} style={styles.textInput} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: width / 2.2, alignItems: 'center' }}>
              <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[iOSUIKit.title3, styles.text]}>{i18n.t('available')}</Text>
                <Text style={[iOSUIKit.caption, styles.text]}>${this.handleFromAvailableAmount()}</Text>
                <TouchableOpacity onPress={() => this.handleSetAmountValue()}><Text style={[iOSUIKit.caption, styles.text]}>{this.handleTokenAvailable()} {acronym}</Text></TouchableOpacity>
                {this.handleTotalPrice()}
              </View>
              <View style={{ marginTop: 30 }}>
                <TouchableOpacity onPress={() => { this.handleRefreshUserBalance(); }}>
                  <LottieView
                    ref={animation => {
                      this.animation = animation;
                    }}
                    source={require('../assets/animation/refresh.json')}
                    style={{ height: height / 10, width: width / 10 }}
                    loop={false}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: width / 1.045, height: height / 8, alignItems: 'center', backgroundColor: 'white', marginBottom: 5, marginLeft: 2, marginTop: 5, justifyContent: 'center', elevation: 2, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2 }}>
            <Button onPress={() => this.handleBuyOrder()} title={i18n.t('buy').toUpperCase()} buttonStyle={{ backgroundColor: '#4ca64c', height: height / 15, width: width / 2.5 }} />
            <Button onPress={() => this.handleSellOrder()} title={i18n.t('sellPresent').toUpperCase()} buttonStyle={{ backgroundColor: '#ffb732', height: height / 15, width: width / 2.5 }} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ backgroundColor: 'white', width: width / 2.2, marginLeft: 2, elevation: 2, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ width: width / 2.2, alignSelf: 'flex-start', textAlign: 'center', backgroundColor: 'transparent' }}>{i18n.t('top10Bids')}</Text>
              <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                <Text style={[iOSUIKit.body, { width: width / 4 - 8, textAlign: 'center', alignSelf: 'center' }]}>{i18n.t('price')}</Text>
                <Text style={[iOSUIKit.body, { width: width / 4 - 8, textAlign: 'center', alignSelf: 'center' }]}>{i18n.t('amount')}</Text>
              </View>
              {this.handleBidOrderView()}
            </View>
            <View style={{ height: 250, marginLeft: 8, backgroundColor: 'white', elevation: 2, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ width: width / 2.2, alignSelf: 'center', textAlign: 'center', backgroundColor: 'transparent' }}>{i18n.t('top10Asks')}</Text>
              <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <Text style={[iOSUIKit.body, { width: width / 4 - 8, textAlign: 'center', alignSelf: 'center' }]}>{i18n.t('price')}</Text>
                <Text style={[iOSUIKit.body, { width: width / 4 - 8, alignSelf: 'center', textAlign: 'center' }]}>{i18n.t('amount')}</Text>
              </View>
              {this.handleAskOrderView()}
            </View>
          </View>
          <View style={{ width: width / 1.045, alignItems: 'center', backgroundColor: 'white', marginBottom: 5, marginLeft: 2, marginTop: 5, justifyContent: 'center', elevation: 2, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2 }}>
            <Text style={[iOSUIKit.title3, { width: width, textAlign: 'center', marginTop: 10, marginBottom: 10 }]}>{i18n.t('yourOrders')}</Text>
            <View style={{ flexDirection: 'row', width: width / 1.045, alignItems: 'center' }}>
              <Text style={[iOSUIKit.body, { width: '18%', textAlign: 'center' }]}>{i18n.t('type')}</Text>
              <Text style={{ color: 'black', width: '30%', textAlign: 'center' }}>{i18n.t('amount')}({trading.tradingBook.slice(0, 3).toUpperCase()})</Text>
              <Text style={{ width: '26%', textAlign: 'center' }}>{i18n.t('price')}({trading.tradingBook.slice(4, 7).toUpperCase()})</Text>
              <Text style={{ width: '15%', textAlign: 'center' }}>{i18n.t('status')}</Text>
            </View>
            {this.handleUserOrders()}
          </View>
        </ScrollView>
        <AdMobBanner
          adSize="smartBannerLandscape"
          adUnitID="ca-app-pub-8321262189259728/1335017575"
          testDevices={[AdMobBanner.simulatorId]}
          onAdFailedToLoad={error => console.error(error)}
        />
        <Modal
          style={styles.modalOrderInfo}
          position={"center"}
          ref={"modalOrderInfo"}
        >
          <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 30, height: 350, width: 300 }}>
            <Text style={[iOSUIKit.title3, { marginBottom: 10 }]}>{i18n.t('orderInfoTitle')}</Text>
            <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
              <Text style={{ width: width / 1.21 / 2.1, paddingLeft: 10 }}>{i18n.t('type')}</Text>
              <Text style={{ width: width / 1.2 / 1.9, textAlign: 'center' }}>{this.handleType(quadrigaUserOrdersLookup.data[0].type).title}</Text>
            </View>
            <Divider style={{ height: 1, width: width / 1.2 - 22, backgroundColor: 'orange' }} />
            <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
              <Text style={{ width: width / 1.21 / 2.1, paddingLeft: 10 }}>{i18n.t('amount')}</Text>
              <Text style={{ width: width / 1.21 / 1.9, textAlign: 'center' }}>{quadrigaUserOrdersLookup.data[0].amount} {quadrigaUserOrdersLookup.data[0].book.slice(0, 3).toUpperCase()}</Text>
            </View>
            <Divider style={{ height: 1, width: width / 1.2 - 22, backgroundColor: 'orange' }} />
            <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
              <Text style={{ width: width / 1.21 / 2.2, paddingLeft: 10 }}>{i18n.t('price')}</Text>
              <Text style={{ width: width / 1.2 / 1.9, textAlign: 'center' }}>{quadrigaUserOrdersLookup.data[0].price} {quadrigaUserOrdersLookup.data[0].book.slice(4, 7).toUpperCase()}</Text>
            </View>
            <Divider style={{ height: 1, width: width / 1.2 - 22, backgroundColor: 'orange' }} />
            <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
              <Text style={{ width: width / 1.21 / 3.0, paddingLeft: 10 }}>{i18n.t('date')}</Text>
              <Text style={{ width: width / 1.21 / 1.5 / 2, textAlign: 'right' }}>{quadrigaUserOrdersLookup.data[0].created.split(" ")[1]}</Text>
              <Text style={{ width: width / 1.21 / 1.5 / 2, textAlign: 'center', paddingRight: 10 }}>{quadrigaUserOrdersLookup.data[0].created.split(" ")[0]}</Text>
            </View>
            <Divider style={{ height: 1, width: width / 1.2 - 22, backgroundColor: 'orange' }} />
            <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
              <Text style={{ width: width / 1.21 / 2.1, paddingLeft: 10 }}>{i18n.t('status')}</Text>
              <View style={{ width: width / 1.21 / 1.9, justifyContent: 'center', alignItems: 'flex-end', display: 'flex', flexDirection: 'row' }}>
                {this.handleStatusColor(quadrigaUserOrdersLookup.data[0].status)}
                <Text style={{ width: width / 1.21 / 1.9 / 2, textAlign: 'center' }}> {this.handleStatusText(quadrigaUserOrdersLookup.data[0].status)}</Text>
              </View>
            </View>
            <Divider style={{ height: 1, width: width / 1.2 - 22, backgroundColor: 'orange' }} />
            <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
              <Text style={{ width: width / 1.21 / 2.1, paddingLeft: 10 }}>{this.handleType(quadrigaUserOrdersLookup.data[0].type).return}</Text>
              <Text style={{ width: width / 1.2 / 1.9, textAlign: 'center' }}>{(quadrigaUserOrdersLookup.data[0].price) * (quadrigaUserOrdersLookup.data[0].amount)} {quadrigaUserOrdersLookup.data[0].book.slice(4, 7).toUpperCase()} </Text>
            </View>
            <Divider style={{ height: 1, width: width / 1.2 - 22, backgroundColor: 'orange' }} />
            <View style={{ flexDirection: 'row' }}>
              <View style={{ height: height / 7.8, width: width / 1.2 / 1.66 }}>
                <TouchableOpacity onPress={() => this.handleCancelOrder()} style={{ margin: 20, marginBottom: 10, position: 'absolute', bottom: 15, right: 0 }}>
                  <Text style={{ fontSize: 15, color: '#ff3b30' }}>{i18n.t('cancelOrder')}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ height: height / 7.8, width: width / 1.2 / 2.5 }}>
                <TouchableOpacity onPress={() => { this.refs.modalOrderInfo.close(); }} style={{ margin: 20, marginBottom: 15, position: 'absolute', bottom: 10, right: 10 }}>
                  <Text style={{ fontSize: 15, color: 'black' }}>{i18n.t('close')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <DropdownAlert updateStatusBar={false} translucent={true} ref={ref => this.dropdown = ref} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

    backgroundColor: '#f1f1f1',
  },
  text: {
    marginTop: 5,
    marginBottom: 5
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
    width: width / 2.5,
    marginTop: 5,
  },
  modalOrderInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    ...Platform.select({
      ios: {
        marginTop: 0
      }
    }),
    height: height / 1.6,
    width: width / 1.2
  }

});