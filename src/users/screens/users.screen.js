import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Button} from 'react-native-elements'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({

})
const mapDispatchToProps = (dispatch) => ({

})



class Users extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          large
          color={'green'}
          title='BUTTON' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});

export const UsersScreen = connect(mapStateToProps,mapDispatchToProps)(Users);