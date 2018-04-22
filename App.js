/**
 * @flow
 */
import './shim';
import React, { Component } from 'react';
import {
  NetInfo,
  AsyncStorage,
  AppRegistry
} from 'react-native';
import './ReactotronConfig';
import { InitialRouting } from 'navigation';
import { persistStore } from 'redux-persist';
import codePush from 'react-native-code-push';
import { configuredStore } from 'AppRedux';
import { Provider } from 'react-redux';
import { OfflineScreen, registerKilledListener, registerAppListener } from 'util';
import DeviceInfo from 'react-native-device-info';
import md5 from 'md5';
import createEncryptor from 'redux-persist-transform-encrypt';
import FCM from "react-native-fcm";
import BackgroundFetch from "react-native-background-fetch";


function doAction() {
  let timeout = 3000;
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(FCM);
      FCM.createNotificationChannel({
        id: 'default',
        name: 'Default',
        description: 'used for example',
        priority: 'high'
      });
      FCM.scheduleLocalNotification({
        channel: 'default',
        id: 'testnotif',
        fire_date: new Date().getTime() + 5000,
        vibrate: 500,
        title: 'Hello',
        body: 'Test Scheduled Notification',
        sub_text: 'sub text',
        priority: "high",
        large_icon: "https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg",
        show_in_foreground: true,
        picture: 'https://firebase.google.com/_static/af7ae4b3fc/images/firebase/lockup.png',
        wake_screen: true,
        extra1: { a: 1 },
        extra2: 1
      });
      resolve();
    }, timeout);
  });
}

let MyHeadlessTask = async () => {
  console.log('- BackgroundFetch HeadlessTask start');
  // Important:  await asychronous tasks when using HeadlessJS.
  await doAction();
  // Required:  Signal to native code that your task is complete.
  // If you don't do this, your app could be terminated and/or assigned
  // battery-blame for consuming too much time in background.
  BackgroundFetch.finish();
  console.log('- BackgroundFetch HeadlessTask finished');
};



registerKilledListener();

class App extends Component {
  constructor() {
    super();
    this.state = {
      connection: '',
      isRehydrated: false,
    };
    this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
    this.scheduleLocalNotification = this.scheduleLocalNotification.bind(this);


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
    BackgroundFetch.configure({
      minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
      stopOnTerminate: false,   // <-- Android-only,
      startOnBoot: true,        // <-- Android-only
      enableHeadless: true,
    }, () => {
      console.log("[js] Received background-fetch event");

      FCM.scheduleLocalNotification({
        channel: 'default',
        id: 'testnotif',
        fire_date: new Date().getTime() + 5000,
        vibrate: 500,
        title: 'Hello',
        body: 'Test Scheduled Notification',
        sub_text: 'sub text',
        priority: "high",
        large_icon: "https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg",
        show_in_foreground: true,
        picture: 'https://firebase.google.com/_static/af7ae4b3fc/images/firebase/lockup.png',
        wake_screen: true,
        extra1: { a: 1 },
        extra2: 1
      });
      BackgroundFetch.finish();// Important
    }, () => {
      console.log("[js] RNBackgroundFetch failed to start");
    });
    BackgroundFetch.status((status) => {
      switch (status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log("BackgroundFetch restricted");
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log("BackgroundFetch denied");
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log("BackgroundFetch is enabled");
          break;
      }
    });



    FCM.createNotificationChannel({
      id: 'default',
      name: 'Default',
      description: 'used for example',
      priority: 'high'
    });
    registerAppListener(this.props.navigation);
    FCM.getInitialNotification().then(notif => {
      console.log(notif);

    });

    try {
      let result = await FCM.requestPermissions({ badge: false, sound: true, alert: true });
      console.log(result);
    } catch (e) {
      console.error(e);
    }

    this.scheduleLocalNotification();
  }


  showLocalNotification() {
    FCM.presentLocalNotification({
      channel: 'default',
      id: new Date().valueOf().toString(),                // (optional for instant notification)
      title: "Test Notification with action",             // as FCM payload
      body: "Force touch to reply",                       // as FCM payload (required)
      priority: "high",                                   // as FCM payload
      click_action: "com.myapp.MyCategory",               // as FCM payload - this is used as category identifier on iOS.
      badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
      number: 10,                                         // Android only
      ticker: "My Notification Ticker",                   // Android only
      auto_cancel: true,                                  // Android only (default true)
      large_icon: "https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg",                           // Android only
      icon: "ic_launcher",                                // as FCM payload, you can relace this with custom icon you put in mipmap
      big_text: "Show when notification is expanded",     // Android only
      sub_text: "This is a subText",                      // Android only
      color: "red",                                       // Android only
      vibrate: 300,                                       // Android only default: 300, no vibration if you pass 0
      wake_screen: true,                                  // Android only, wake up screen when notification arrives
      group: "group",                                     // Android only

      ongoing: true,                                      // Android only


      show_in_foreground: true                           // notification when app is in foreground (local & remote)
    });
  }

  scheduleLocalNotification() {
    FCM.scheduleLocalNotification({
      channel: 'default',
      id: 'testnotif',
      fire_date: new Date().getTime() + 5000,
      vibrate: 500,
      title: 'Hello',
      body: 'Test Scheduled Notification',
      sub_text: 'sub text',
      priority: "high",
      large_icon: "https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg",
      show_in_foreground: true,
      picture: 'https://firebase.google.com/_static/af7ae4b3fc/images/firebase/lockup.png',
      wake_screen: true,
      extra1: { a: 1 },
      extra2: 1
    });
  }

  showLocalNotificationWithAction() {
    FCM.presentLocalNotification({
      title: 'Test Notification with action',
      body: 'Force touch to reply',
      priority: "high",
      show_in_foreground: true,
      click_action: "com.myidentifi.fcm.text", // for ios
      android_actions: JSON.stringify([{
        id: "view",
        title: 'view'
      }, {
        id: "dismiss",
        title: 'dismiss'
      }]) // for android, take syntax similar to ios's. only buttons are supported
    });
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

AppRegistry.registerHeadlessTask('BackgroundFetch', () => MyHeadlessTask);

export default MyApp = codePush(App);
