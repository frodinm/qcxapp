import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  BackHandler
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import i18n from 'react-native-i18n';


const { height, width } = Dimensions.get('window');


export class NumberPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numArray3: [{ number: 3, subText: 'DEF', func: () => this.props.addToPin(3), icon: null }, { number: 6, subText: 'MNO', func: () => this.props.addToPin(6), icon: null }, { number: 9, subText: 'WXYZ', func: () => this.props.addToPin(9), icon: null }, { func: () => this.props.removePinAuth(), icon: <Icon name="arrow-left" size={25} /> }],
      numArray2: [{ number: 2, subText: 'ABC', func: () => this.props.addToPin(2), icon: null }, { number: 5, subText: 'JKL', func: () => this.props.addToPin(5), icon: null }, { number: 8, subText: 'TUV', func: () => this.props.addToPin(8), icon: null }, { number: 0, func: () => this.props.addToPin(0), icon: null }],
      numArray1: [{ number: 1, func: () => this.props.addToPin(1), icon: null }, { number: 4, subText: 'GHI', func: () => this.props.addToPin(4), icon: null }, { number: 7, subText: 'PQRS', func: () => this.props.addToPin(7), icon: null }, { number: i18n.t('cancel'), func: () => BackHandler.exitApp(), icon: null }]
    };
  }

  handleDisplayButtons(numArray) {
    return numArray.map((currentItem, index) => {
      return (
        <TouchableOpacity key={index} onPressIn={currentItem.func} style={styles.padButton}>
          {currentItem.icon}
          <Text style={{ fontSize: 22, color: 'black' }}>{currentItem.number}</Text>
          <Text style={{ fontSize: 12 }}>{currentItem.subText}</Text>

        </TouchableOpacity>
      );
    });
  }





  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.pad} >
            {this.handleDisplayButtons(this.state.numArray1)}
          </View>
          <View style={styles.pad} >
            {this.handleDisplayButtons(this.state.numArray2)}
          </View>
          <View style={styles.pad} >
            {this.handleDisplayButtons(this.state.numArray3)}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: height / 2,
    width: width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  subContainer: {
    flexDirection: 'row',
  },
  pad: {
    flexDirection: 'column',
    alignItems: 'center',


  },
  padButton: {
    height: height / 2 / 4,
    width: width / 3,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',

  }

});
