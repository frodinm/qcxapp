import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableNativeFeedback,
  TouchableHighlight,
  Platform
} from 'react-native';

const { height, width } = Dimensions.get('window');

export class ModalButtonComponent extends Component {
  constructor() {
    super();
  }

  handlePlatform(imageSource, onPressAction, buttonStyle, text) {
    if (Platform.OS === 'android') {
      if (TouchableNativeFeedback.canUseNativeForeground()) {
        return (
          <TouchableNativeFeedback onPress={onPressAction} useForeground={true} background={TouchableNativeFeedback.Ripple()} delayPressIn={0}>
            <View style={{ ...buttonStyle, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }} pointerEvents='box-only' >
              <Text style={{ textAlign: 'center', fontSize: 20, color: 'black', fontWeight: 'bold', marginBottom: 10 }}>{text}</Text>
              <Image style={{ height: 80, width: 80, marginBottom: 10, marginTop: 10 }} resizeMode="contain" source={imageSource} />
            </View>
          </TouchableNativeFeedback>
        );
      } else {
        return (
          <TouchableHighlight onPress={onPressAction} >
            <View style={{ ...buttonStyle, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }} pointerEvents='box-only' >
              <Text style={{ textAlign: 'center', fontSize: 20, color: 'black', fontWeight: 'bold', marginBottom: 10 }}>{text}</Text>
              <Image style={{ height: 80, width: 80, marginBottom: 10, marginTop: 10 }} resizeMode="contain" source={imageSource} />
            </View>
          </TouchableHighlight>
        );
      }
    } else {
      return (
        <TouchableHighlight style={{ ...buttonStyle }} onPress={onPressAction} >
          <View style={{ height: height / 4, width: width / 2.2, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }} pointerEvents='box-only' >
            <Text style={{ textAlign: 'center', fontSize: 20, color: 'black', fontWeight: 'bold', marginBottom: 10 }}>{text}</Text>
            <Image style={{ height: 80, width: 80, marginBottom: 10, marginTop: 10 }} resizeMode="contain" source={imageSource} />
          </View>
        </TouchableHighlight>
      );
    }
  }

  render() {
    const { imageSource, onPressAction, buttonStyle, text } = this.props;
    return (
      <View>
        {this.handlePlatform(imageSource, onPressAction, buttonStyle, text)}
      </View>
    );
  }

}


const styles = new StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  orderInfo: {
    fontSize: 18
  },
  title: {
    fontSize: 20,
    color: 'black'
  },
  titleSmaller: {
    fontSize: 15,
    color: 'black'
  }
});

