import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableNativeFeedback,
  TouchableHighlight
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { resetNavigation } from 'util';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropdownAlert from 'react-native-dropdownalert';
import {
  getQuadrigaTickersAllAtPin,
  getQuadrigaTransactions
} from 'account';
import { setPin } from 'users';
import I18n from 'react-native-i18n';
import { NumberPad } from 'components';

const { height, width } = Dimensions.get('window');

const pinStyle = {
  height: 13,
  width: 13,
  marginRight: 10,
  marginLeft: 10,
  marginBottom: height / 6,
  borderRadius: 50,
  borderWidth: 1,
  borderColor: 'black',

};

const mapStateToProps = (state) => ({
  pin: state.user.pin
});
const mapDispatchToProps = (dispatch) => ({
  setPinDispatch: (pin) => dispatch(setPin(pin)),
  getQuadrigaTickersDispatch: () => dispatch(getQuadrigaTickersAllAtPin()),
  getQuadrigaTransactionsDispatch: (book, time) => { dispatch(getQuadrigaTransactions(book, time)); },
});

class Pincode extends Component {
  constructor() {
    super();
    this.state = {
      pinAuth: '',
      error: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handlePinReference = this.handlePinReference.bind(this);
  }
  componentDidMount() {
    const { getQuadrigaTickersDispatch, getQuadrigaTransactionsDispatch } = this.props;
    getQuadrigaTickersDispatch();
    getQuadrigaTransactionsDispatch("btc_cad", "hour");
  }

  handlePlatform(onPressAction, buttonStyle, text) {
    if (Platform.OS === 'android') {
      if (TouchableNativeFeedback.canUseNativeForeground()) {
        return (
          <TouchableNativeFeedback onPress={onPressAction} useForeground={true} background={TouchableNativeFeedback.Ripple()} delayPressIn={0} style={{ height: 40, width: width / 2.3, margin: 5, marginBottom: 10, borderRadius: buttonStyle.borderRadius }}>
            <View style={{ ...buttonStyle, justifyContent: 'center' }} pointerEvents='box-only' >
              <Text style={{ textAlign: 'center', fontSize: 17, color: 'white' }}>{text}</Text>
            </View>
          </TouchableNativeFeedback>
        );
      } else {
        return (
          <TouchableHighlight style={{ ...buttonStyle, borderRadius: buttonStyle.borderRadius }} onPress={onPressAction} >
            <View style={{ ...buttonStyle, justifyContent: 'center' }} pointerEvents='box-only' >
              <Text style={{ textAlign: 'center', fontSize: 17, color: 'white' }}>{text}</Text>
            </View>
          </TouchableHighlight>
        );
      }
    } else {
      return (
        <TouchableHighlight style={{ ...buttonStyle, borderRadius: buttonStyle.borderRadius }} onPress={onPressAction} >
          <View style={{ ...buttonStyle, justifyContent: 'center' }} pointerEvents='box-only' >
            <Text style={{ textAlign: 'center', fontSize: 17, color: 'white' }}>{text}</Text>
          </View>
        </TouchableHighlight>
      );
    }
  }

  handleClick() {
    const { navigation, setPinDispatch } = this.props;
    if (this.state.pinAuth.length === 4) {
      setPinDispatch(this.state.pinAuth);
      this.dropdown.alertWithType('info', 'Info', `${I18n.t('setPinMessage')} ${this.state.pinAuth}`);
      setTimeout(() => {
        resetNavigation('Auth', navigation);
      }, 2000);
    } else {
      this.refs.view1.shake();
      this.refs.view2.shake();
      this.refs.view3.shake();
      this.refs.view4.shake();
      this.setState({
        error: true
      });
    }
  }
  handlePin1Style() {
    if (this.state.pinAuth.length >= 1) {
      return {
        ...pinStyle,
        backgroundColor: 'orange',
      };
    } else if (this.state.error === true) {
      return {
        ...pinStyle,
        backgroundColor: 'transparent',
        borderColor: 'red',
      };
    } else {
      return {
        ...pinStyle,
        backgroundColor: 'transparent',
      };
    }
  }
  handlePin2Style() {
    if (this.state.pinAuth.length >= 2) {
      return {
        ...pinStyle,
        backgroundColor: 'orange',

      };
    } else if (this.state.error === true) {
      return {
        ...pinStyle,
        backgroundColor: 'transparent',
        borderColor: 'red',
      };
    } else {
      return {
        ...pinStyle,
        backgroundColor: 'transparent',
      };
    }
  }
  handlePin3Style() {
    if (this.state.pinAuth.length >= 3) {
      return {
        ...pinStyle,
        backgroundColor: 'orange',
      };
    } else if (this.state.error === true) {
      return {
        ...pinStyle,
        backgroundColor: 'transparent',
        borderColor: 'red',
      };
    } else {
      return {
        ...pinStyle,
        backgroundColor: 'transparent',
      };
    }
  }
  handlePin4Style() {
    if (this.state.pinAuth.length === 4) {
      return {
        ...pinStyle,
        backgroundColor: 'orange',
      };
    } else if (this.state.error === true) {
      return {
        ...pinStyle,
        backgroundColor: 'transparent',
        borderColor: 'red',
      };
    } else {
      return {
        ...pinStyle,
        backgroundColor: 'transparent',
      };
    }
  }
  handlePinReference(input) {
    if (this.state.pinAuth.length < 4) {
      this.setState({
        pinAuth: this.state.pinAuth + input
      });
    }
  }
  handleDeleteLastInput() {
    this.setState({
      pinAuth: this.state.pinAuth.slice(0, this.state.pinAuth.length - 1)
    });
  }
  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={"always"}>
        <View style={{ alignItems: 'center', height: height / 2 - 75, width, justifyContent: 'center' }}>
          <Text style={{ fontSize: 18, color: 'orange', marginBottom: 50 }}> {I18n.t('pin')}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Animatable.View useNativeDriver={true} ref="view1" style={this.handlePin1Style()} />
            <Animatable.View useNativeDriver={true} ref="view2" style={this.handlePin2Style()} />
            <Animatable.View useNativeDriver={true} ref="view3" style={this.handlePin3Style()} />
            <Animatable.View useNativeDriver={true} ref="view4" style={this.handlePin4Style()} />
          </View>
        </View>
        <NumberPad addToPin={(input) => this.handlePinReference(input)} removePinAuth={() => this.handleDeleteLastInput()} />
        {this.handlePlatform(() => this.handleClick(), { backgroundColor: 'orange', zIndex: 5, height: 60, width: width }, I18n.t('setPinButton'))}
        <DropdownAlert updateStatusBar={false} translucent={true} ref={ref => this.dropdown = ref} />
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  }
});

export const PinCodeScreen = connect(mapStateToProps, mapDispatchToProps)(Pincode);