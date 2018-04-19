import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';
import {
    NewUserScreen
} from './newUser.screen';
import {
    QuadrigaExchangeScreen,
    BuySellScreen,
    AccountsWalletsScreen,
    WalletScreen,
    ExchangeWalletScreen,
    SettingsScreen,
    SupportScreen
} from 'account';
import {
    AddressExchangeScreen,
    ConfirmExchangeScreen,
    PayExchangeScreen
} from 'exchange';
import {
    NewUserFormScreen,
    RegisterScreen,
    PinCodeScreen,
    ConfirmPinCodeScreen,
    AuthPinCodeScreen
} from 'users';
import {
    CameraComponent
} from 'components';
import { WebViewHelper } from 'util';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import I18n from 'react-native-i18n';


export const AuthenticatedRoute = TabNavigator({
    Quadriga: {
        screen: QuadrigaExchangeScreen,
        navigationOptions: {
            tabBarLabel: I18n.t('exchange')
        }
    },
    Accounts: {
        screen: AccountsWalletsScreen,
        navigationOptions: {
            tabBarLabel: I18n.t('accounts')
        }
    },
    // Exchange: {
    //     screen: ChangellyExchangeScreen,
    // },
    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
            tabBarLabel: I18n.t('settings')
        }
    }
}, {
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        backBehavior: 'none',
        tabBarOptions: {
            labelStyle: {
                fontSize: 12,
            },
            activeTintColor: '#fff',
            inactiveTintColor: '#000',
            style: {
                backgroundColor: '#e9993b',

            }
        },
    });




const PinCodeRouting = StackNavigator({
    SetPin: {
        screen: PinCodeScreen,
        navigationOptions: {
            header: null
        }
    },
    ConfirmPin: {
        screen: ConfirmPinCodeScreen,
        navigationOptions: {
            header: null
        }
    },
}, {
        transitionConfig: getSlideFromRightTransition
    });

const ExchangeRouting = StackNavigator({
    ExchangeAddress: {
        screen: AddressExchangeScreen,
        navigationOptions: {
            headerTintColor: 'black',
        }
    },
    ConfirmExchange: {
        screen: ConfirmExchangeScreen,
        navigationOptions: {
            headerTintColor: 'black',
        }
    },
    PayExchange: {
        screen: PayExchangeScreen,
        navigationOptions: {
            headerTintColor: 'black',
        }
    },
}, {
        transitionConfig: getSlideFromRightTransition,
        headerMode: 'none'
    });


export const InitialRouting = StackNavigator({
    App: {
        screen: NewUserScreen,
        navigationOptions: {
            header: null
        }
    },
    Form: {
        screen: NewUserFormScreen,
        navigationOptions: {
            headerStyle: {
                headerTintColor: 'black',
                backgroundColor: '#ff5d16'
            }
        }
    },
    Register: {
        screen: RegisterScreen,
        navigationOptions: {
            headerTintColor: 'black',
            headerStyle: {
                backgroundColor: '#ff5d16'
            }
        }
    },
    PinCode: {
        screen: PinCodeRouting,
        navigationOptions: {
            headerTintColor: 'black',
        }
    },
    AuthPin: {
        screen: AuthPinCodeScreen,
        navigationOptions: {
            header: null
        }
    },
    Auth: {
        screen: AuthenticatedRoute,
        navigationOptions: {
            headerTintColor: 'black',
        }
    },
    buySell: {
        screen: BuySellScreen,
        navigationOptions: {
            headerTintColor: 'black',
        }
    },
    ExchangeAddress: {
        screen: ExchangeRouting,
        navigationOptions: {
            headerTintColor: 'black',
        }
    },
    CheckAddress: {
        screen: WebViewHelper,
        navigationOptions: {
            headerTintColor: 'black',
        }

    },
    Camera: {
        screen: CameraComponent,
        navigationOptions: {
            header: null
        }
    },
    Wallet: {
        screen: WalletScreen,
        navigationOptions: {
            headerTintColor: 'black',
        }
    },
    ExchangeWallet: {
        screen: ExchangeWalletScreen,
        navigationOptions: {
            headerTintColor: 'black',
        }
    },
    Support: {
        screen: SupportScreen,
        navigationOptions: {
            headerTintColor: 'black',
            headerStyle: {
                backgroundColor: 'orange',
            },
        }
    }
},
    {
        transitionConfig: getSlideFromRightTransition,

    });
