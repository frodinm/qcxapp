import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableNativeFeedback,
    TouchableHighlight,
    Share,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import IconMaterial from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import SimpleIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import DropdownAlert from 'react-native-dropdownalert';
import {
    AdMobBanner,
} from 'react-native-admob';

import {
    signOutAcccount
} from 'account';
import {
    userLogOut
} from 'users';
import i18n from 'react-native-i18n';
import { iOSUIKit } from 'react-native-typography';
import { Divider } from 'react-native-elements';
import I18n from 'react-native-i18n';

const { height, width } = Dimensions.get('window');

const mapStateToProps = (state) => ({
    apiKey: state.user.apiKey,
    clientId: state.user.clientId,
    privateKey: state.user.privateKey,

});
const mapDispatchToProps = (dispatch) => ({
    userLogOutDispatch: () => dispatch(userLogOut()),
    signOutAcccountDispatch: () => dispatch(signOutAcccount()),
});

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'App' })],
});


class Settings extends Component {

    static navigationOptions = ({ navigation }) => {
        const headerStyle = {
            alignSelf: 'center',
            color: 'white',

        };
        return {
            headerTitle: i18n.t('settings'),
            headerTitleStyle: {
                ...headerStyle
            },
            headerStyle: {
                backgroundColor: 'orange'
            },
            tabBarLabel: 'Settings',
            tabBarIcon: ({ tintColor }) => (
                <IconMaterial
                    name="settings"
                    color={tintColor}
                    size={25}
                />
            )
        };
    };



    handlePlatform(text, onPressAction, style) {
        if (Platform.OS === 'android') {
            if (TouchableNativeFeedback.canUseNativeForeground()) {
                return (
                    <View style={{ alignItems: 'center' }}>
                        <TouchableNativeFeedback onPress={onPressAction} useForeground={true} background={TouchableNativeFeedback.Ripple()} delayPressIn={0}>
                            <View style={{ backgroundColor: 'white', height: 60, width: width, alignItems: 'center', flexDirection: 'row' }}>
                                <Text style={[iOSUIKit.subhead, { marginLeft: 10 }, style]}>{text}</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <Divider style={{ height: 1, backgroundColor: '#ffe4b2', width: width / 1.1 }} />
                    </View>
                );
            } else {
                return (
                    <View style={{ alignItems: 'center' }}>
                        <TouchableHighlight underlayColor="orange" onPress={onPressAction}>
                            <View style={{ backgroundColor: 'white', height: 60, width: width, alignItems: 'center', flexDirection: 'row' }}>
                                <Text style={[iOSUIKit.caption, { marginLeft: 10 }, style]}>{text}</Text>
                                <SimpleIcon name="arrow-right" style={{ position: 'absolute', right: 5, color: '#ffa500' }} />
                            </View>
                        </TouchableHighlight>
                        <Divider style={{ height: 1, backgroundColor: '#ffe4b2', width: width / 1.1 }} />
                    </View>
                );
            }
        } else {
            return (
                <View style={{ alignItems: 'center' }}>
                    <TouchableHighlight underlayColor="orange" onPress={onPressAction}>
                        <View style={{ backgroundColor: 'white', height: 60, width: width, alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={[iOSUIKit.caption, { marginLeft: 15 }, style]}>{text}</Text>
                            <SimpleIcon name="arrow-right" style={{ position: 'absolute', right: 15, color: '#ffa500' }} />
                        </View>
                    </TouchableHighlight>
                    <Divider style={{ height: 1, backgroundColor: '#ffe4b2', width: width / 1.1 }} />
                </View>
            );
        }

    }

    handleModalButton(text, styles, textStyle, onPressAction) {
        return (
            <View style={styles}>
                <Text onPress={onPressAction} style={textStyle}>{text}</Text>
            </View>
        );

    }

    handleResetNav = {
        resetNav: () => {
            return new Promise((resolve, reject) => {
                resolve(this.props.navigation.dispatch(resetAction));
            });
        },
        userLogOut: () => {
            return new Promise((resolve, reject) => {
                resolve(this.props.userLogOutDispatch());
            });
        }
    }

    handleSignOut() {
        const { signOutAcccountDispatch } = this.props;

        this.handleResetNav.userLogOut().then(() => {
            this.handleResetNav.resetNav().then(() => {
                signOutAcccountDispatch();
            });
        });
    }


    handleSignoutOAlert() {
        Alert.alert(
            I18n.t('signout'),
            I18n.t('signoutMessage'),
            [
                { text: I18n.t('cancel'), onPress: () => { }, style: 'cancel' },
                { text: I18n.t('signout'), onPress: () => this.handleSignOut() },
            ]
        );
    }


    handleShare() {
        Share.share({
            message: "Check out this free app called Qcx : https://play.google.com/store/apps/details?id=com.qcx&hl=en, it lets you conveniently trade on your QuadrigaCX account.",
            title: "Qcx - Trade, deposit and withdraw securely on QuadrigaCX",
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ color: 'black', margin: 15, marginTop: 25 }}>{i18n.t('app')}</Text>
                <Divider style={{ height: 1, backgroundColor: 'orange', width: width / 1.1, alignSelf: 'center' }} />
                {this.handlePlatform(I18n.t('support'), () => { this.props.navigation.navigate('Support'); })}
                {this.handlePlatform(I18n.t('share'), () => this.handleShare(), {})}
                {this.handlePlatform(I18n.t('signout'), () => this.handleSignoutOAlert(), { color: 'red' })}
                <View style={{ position: 'absolute', bottom: 0, width: width }}>
                    <AdMobBanner
                        adSize="smartBannerLandscape"
                        adUnitID="ca-app-pub-8321262189259728/9817402008"
                        testDevices={[AdMobBanner.simulatorId]}
                        onAdFailedToLoad={error => console.error(error)}
                    />
                </View>
                <DropdownAlert updateStatusBar={false} translucent={true} ref={ref => this.dropdown = ref} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },

});

export const SettingsScreen = connect(mapStateToProps, mapDispatchToProps)(Settings);
