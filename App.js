/**
 * @flow
 */
import './shim';
import React, { Component } from 'react';
import {
  NetInfo,
  AsyncStorage,
} from 'react-native';
import './ReactotronConfig';
import { InitialRouting } from 'navigation';
import { persistStore } from 'redux-persist';
import codePush from 'react-native-code-push';
import { configuredStore } from 'AppRedux';
import { Provider } from 'react-redux';
import { OfflineScreen } from 'util';
import DeviceInfo from 'react-native-device-info';
import md5 from 'md5';
import createEncryptor from 'redux-persist-transform-encrypt';
import PushNotification from 'react-native-push-notification';
import BackgroundTask from 'react-native-background-task';

BackgroundTask.define(async () => {
  // Fetch some data over the network which we want the user to have an up-to-
  // date copy of, even if they have no network when using the app
  const response = await fetch('http://feeds.bbci.co.uk/news/rss.xml')
  const text = await response.text()

  // Data persisted to AsyncStorage can later be accessed by the foreground app
  await AsyncStorage.setItem('testData', text)

  // Remember to call finish()
  BackgroundTask.finish()
})

PushNotification.configure({
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      connection: '',
      isRehydrated: false,
    };
    this.handleConnectivityChange = this.handleConnectivityChange.bind(this);

    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected === true) {
        this.setState({
          connection: true
        });
      } else {
        this.setState({
          connection: false
        });
      }
    });
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    const transformsArray = [];
    if (!__DEV__) {
      const encryptor = createEncryptor({
        secretKey: md5(DeviceInfo.getUniqueID())
      });
      transformsArray.push(encryptor);
    }

    persistStore(
      configuredStore,
      { storage: AsyncStorage, transforms: transformsArray },
      () => {
        this.setState({ isRehydrated: true });
      }
    );
  }
  async componentDidMount() {
    const result = await AsyncStorage.getItem('testData');
    console.log(result);

    this.checkStatus()
    BackgroundTask.schedule({
      period: 900, // Aim to run every 15 mins - more conservative on battery
    })

    PushNotification.localNotification({
      /* Android Only Properties */
      ticker: "My Notification Ticker", // (optional)
      bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
      subText: "This is a subText", // (optional) default: none
      tag: 'some_tag', // (optional) add tag to message
      group: "group", // (optional) add group to message

      /* iOS and Android properties */
      title: "My Notification Title", // (optional)
      message: "My Notification Message", // (required)
      playSound: false, // (optional) default: true
      actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
    });
  }

  async checkStatus() {
    const status = await BackgroundTask.statusAsync()

    if (status.available) {
      // Everything's fine
      return
    }

    const reason = status.unavailableReason
    if (reason === BackgroundTask.UNAVAILABLE_DENIED) {
      Alert.alert('Denied', 'Please enable background "Background App Refresh" for this app')
    } else if (reason === BackgroundTask.UNAVAILABLE_RESTRICTED) {
      Alert.alert('Restricted', 'Background tasks are restricted on your device')
    }
  }

  handleConnectivityChange(isConnected) {
    if (isConnected === true) {
      this.setState({
        connection: true
      });
    } else {
      this.setState({
        connection: false
      });
    }
  }
  handleRedirect() {

    if (this.state.connection === false) {
      return <OfflineScreen />;
    } else if (this.state.isRehydrated === false) {
      return null;
    } else {
      return <Provider store={configuredStore}>
        <InitialRouting />
      </Provider>;
    }
  }
  render() {
    return (
      this.handleRedirect()
    );
  }
}

export default MyApp = codePush(App);
