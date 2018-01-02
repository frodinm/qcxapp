/**
 * @flow
 */
import './shim';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  NetInfo,
  AsyncStorage,
  AppState
} from 'react-native';
import './ReactotronConfig';
import {InitialRouting} from 'navigation';
import {persistStore} from 'redux-persist'
import codePush from 'react-native-code-push'
import {configuredStore} from 'AppRedux';
import {Provider} from 'react-redux';
import {OfflineScreen,resetNavigation} from 'util';
import DeviceInfo from 'react-native-device-info'
import md5 from 'md5'
import createEncryptor from 'redux-persist-transform-encrypt'


class App extends Component {
  constructor(){
    super();
    this.state = {
      connection: '',
      isRehydrated: false,
    }
    this.handleConnectivityChange = this.handleConnectivityChange.bind(this)

  }
  componentDidMount(){
    
  }

  componentWillMount(){
      NetInfo.isConnected.fetch().then(isConnected => {
        if(isConnected === true){
          this.setState({
            connection: true
          })
        }else{
          this.setState({
            connection: false
          })
        }
      })
      NetInfo.isConnected.addEventListener('connectionChange',this.handleConnectivityChange)
      const transformsArray = [];
      if(!__DEV__){
      const encryptor = createEncryptor({
        secretKey: md5(DeviceInfo.getUniqueID())
      });
      transformsArray.push(encryptor);
    }

    persistStore(
      configuredStore,
      { storage: AsyncStorage,  transforms: transformsArray },
      () => {
        this.setState({isRehydrated: true})
      }
    )
  }

  handleConnectivityChange(isConnected) {
    if(isConnected === true){
      this.setState({
        connection: true
      })
    }else{
      this.setState({
        connection: false
      })
    }
  }
  handleRedirect(){

    if(this.state.connection === false){
      return <OfflineScreen/>
    }else if(this.state.isRehydrated === false){
      return <Text>Loading</Text>
    } else{
      return  <Provider store={configuredStore}>
        <InitialRouting/>
      </Provider>
    }
  }
  render() {
    return (
         this.handleRedirect()
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

export default  MyApp = codePush(App);
