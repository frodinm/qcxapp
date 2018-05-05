import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { resetNavigation } from 'util';
import { moduleButtonPressedReset } from 'account';
import { setPin } from 'users';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import I18n from 'react-native-i18n';
import { NumberPad } from 'components';

const { height, width } = Dimensions.get('window');
const pinRef = null;

const pinStyle = {
  height: 13,
  width: 13,
  marginRight: 10,
  marginLeft: 10,
  borderRadius: 50,
  borderWidth: 1,
  borderColor: 'black',

};

const mapStateToProps = (state) => ({
  pin: state.user.pin
});
const mapDispatchToProps = (dispatch) => ({
  setPinDispatch: (pin) => dispatch(setPin(pin)),
  moduleButtonPressedResetDispatch: () => { dispatch(moduleButtonPressedReset()); }
});




class AuthPincode extends Component {
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
    const { moduleButtonPressedResetDispatch } = this.props;
    moduleButtonPressedResetDispatch();
  }
  handleClick() {
    const { navigation, pin } = this.props;
    if (this.state.pinAuth.length === 4) {
      if (this.state.pinAuth === pin) {
        resetNavigation('Auth', navigation);
      } else {
        this.refs.view1.shake();
        this.refs.view2.shake();
        this.refs.view3.shake();
        this.refs.view4.shake();
        this.setState({
          error: true
        });
      }

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
      setTimeout(() => {
        if (this.state.pinAuth.length === 4) {
          this.handleClick();
        }
      }, 100);
    }
  }
  handleDeleteLastInput() {
    this.setState({
      pinAuth: this.state.pinAuth.slice(0, this.state.pinAuth.length - 1)
    });
  }
  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={"always"} >
        <View style={{ alignItems: 'center', height: height / 2, width, justifyContent: 'center' }}>
          <Text style={{ fontSize: 18, color: 'orange', marginBottom: 50 }}> {I18n.t('pin')}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Animatable.View useNativeDriver={true} ref="view1" style={this.handlePin1Style()} />
            <Animatable.View useNativeDriver={true} ref="view2" style={this.handlePin2Style()} />
            <Animatable.View useNativeDriver={true} ref="view3" style={this.handlePin3Style()} />
            <Animatable.View useNativeDriver={true} ref="view4" style={this.handlePin4Style()} />
          </View>
        </View>
        <NumberPad addToPin={(input) => this.handlePinReference(input)} removePinAuth={() => this.handleDeleteLastInput()} />
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  pin: {
    opacity: 0,
    position: 'absolute'

  },
  pin2: {
    ...pinStyle,

  },
  pin3: {
    ...pinStyle,

  },
  pin4: {
    ...pinStyle,

  }
});

export const AuthPinCodeScreen = connect(mapStateToProps, mapDispatchToProps)(AuthPincode);
