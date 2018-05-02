import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { ButtonComponent } from 'components';
import BTClogo from '../assets/logos/bitcoin.png';
import ETHlogo from '../assets/logos/ethereum.png';
import BCHlogo from '../assets/logos/BCH.png';
import BTGlogo from '../assets/logos/bitcoin-gold.png';
import LTClogo from '../assets/logos/litecoin.png';

const { height, width } = Dimensions.get('window');
const BTCETHStyle = {
  height: height / 4.4,
  width: (width * 0.464),
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  ...Platform.select({
    android: {
      margin: 5,
      shadowOffset: { width: 10, height: 10 },
      shadowColor: 'black',
      shadowOpacity: 1,
      elevation: 2
    }
  })
};
const OTHERStyle = {
  height: height / 4.4,
  width: (width * 0.30),
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  ...Platform.select({
    android: {
      margin: 5,
      shadowOffset: { width: 0, height: 10 },
      shadowColor: 'black',
      shadowOpacity: 1,
      elevation: 2
    }
  })

};

export class Modules extends Component {
  constructor() {
    super();
  }

  handleOnPress(navigation, name) { // great solution for tabnavigator
    Promise.all([
      navigation.dispatch(
        NavigationActions.navigate({
          index: 0,
          // TabNav is a TabNavigator nested in a StackNavigator
          actions: [NavigationActions.navigate({ routeName: 'BuySell' })]
        })
      )
    ]).then(() => navigation.navigate(name));
  }

  handleRouteToBTC() {
    const { navigation } = this.props;
    this.props.moduleButtonPressedHandler();
    navigation.navigate('buySell', { acronym: 'XɃT', token: 'btc', name: 'Bitcoin', pair: 'btc_cad' });
  }

  handleRouteToETH() {
    const { navigation } = this.props;
    this.props.moduleButtonPressedHandler();
    navigation.navigate('buySell', { acronym: 'ΞTH', token: 'eth', name: 'Ethereum', pair: 'eth_cad' });
  }

  handleRouteToBCH() {
    const { navigation } = this.props;
    this.props.moduleButtonPressedHandler();
    navigation.navigate('buySell', { acronym: 'BCH', token: 'bch', name: 'Bitcoin Cash', pair: 'btc_cad' });
  }

  handleRouteToBTG() {
    const { navigation } = this.props;
    this.props.moduleButtonPressedHandler();
    navigation.navigate('buySell', { acronym: 'BTG', token: 'btg', name: 'Bitcoin Gold', pair: 'btg_cad' });
  }

  handleRouteToLTC() {
    const { navigation } = this.props;
    this.props.moduleButtonPressedHandler();
    navigation.navigate('buySell', { acronym: 'ŁTC', token: 'ltc', name: 'Litecoin', pair: 'ltc_cad' });
  }


  render() {
    const { dataBTC, dataETH, dataBCH, dataBTG, dataLTC, colorBTC, colorETH, colorBCH, colorBTG, colorLTC, isModuleButtonPressed, moduleButtonPressedHandler } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <ButtonComponent buttonStyle={BTCETHStyle} isModuleButtonPressed={isModuleButtonPressed} onPressAction={() => this.handleRouteToBTC()} tokenData={dataBTC} imageSource={BTClogo} color={colorBTC} />
          <ButtonComponent buttonStyle={BTCETHStyle} moduleButtonPressedHandler={moduleButtonPressedHandler} isModuleButtonPressed={isModuleButtonPressed} onPressAction={() => this.handleRouteToETH()} tokenData={dataETH} imageSource={ETHlogo} tokenName={'ETH'} color={colorETH} />
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <ButtonComponent buttonStyle={OTHERStyle} isModuleButtonPressed={isModuleButtonPressed} onPressAction={() => this.handleRouteToBCH()} tokenData={dataBCH} imageSource={BCHlogo} color={colorBCH} />
          <ButtonComponent buttonStyle={OTHERStyle} isModuleButtonPressed={isModuleButtonPressed} onPressAction={() => this.handleRouteToBTG()} tokenData={dataBTG} imageSource={BTGlogo} color={colorBTG} />
          <ButtonComponent buttonStyle={OTHERStyle} isModuleButtonPressed={isModuleButtonPressed} onPressAction={() => this.handleRouteToLTC()} tokenData={dataLTC} imageSource={LTClogo} color={colorLTC} />
        </View>

      </View>
    );
  }

}


const styles = new StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  }
});

