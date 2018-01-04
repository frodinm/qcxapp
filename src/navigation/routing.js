import {
    StackNavigator,
    TabNavigator,
    DrawerNavigator,
} from 'react-navigation'
import {
    NewUserScreen
} from './newUser.screen'
import {
    QuadrigaExchangeScreen,
    BuySellScreen,
    AccountsWalletsScreen,
    WalletScreen,
    BuySellBTCScreen,
    BuySellETHScreen,
    BuySellBCHScreen,
    BuySellBTGScreen,
    BuySellLTCScreen
} from 'account'
import {
    ChangellyExchangeScreen,
    AddressExchangeScreen,
    ConfirmExchangeScreen,
    PayExchangeScreen
} from 'exchange'
import {
    UsersScreen,
    NewUserFormScreen,
    RegisterScreen,
    PinCodeScreen,
    ConfirmPinCodeScreen,
    AuthPinCodeScreen
} from 'users';
import {
    CameraComponent
} from 'components'
import {WebViewHelper} from 'util'
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';


export const AuthenticatedRoute = TabNavigator({
    Quadriga: {
        screen: QuadrigaExchangeScreen,
        navigationOptions: {
            headerTintColor: 'red', //here I mean that the tintColor will be have that value on the CURRENT(!) screen
            }
    },
    Accounts: {
        screen: AccountsWalletsScreen
    },
    Exchange: {
        screen: ChangellyExchangeScreen,
    },
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
        inactiveTintColor:'#000',
        style: {
            backgroundColor: '#e9993b',

        }
    },
})




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
    },
    ConfirmExchange: {
        screen: ConfirmExchangeScreen,
    },
    PayExchange:{
        screen: PayExchangeScreen,
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
                backgroundColor: '#ff5d16'
            }
        }
    },
    Register: {
        screen: RegisterScreen,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#ff5d16'
            }
        }
    },
    PinCode: {
        screen: PinCodeRouting
    },
    AuthPin: {
        screen: AuthPinCodeScreen,
        navigationOptions: {
            header: null
        }
    },
    Auth: {
        screen: AuthenticatedRoute,
    },
    XɃTCAD: {
        screen: BuySellBTCScreen,
        navigationOptions: {
            headerTintColor: 'black', 
        }
    },
    ΞTH: {
        screen: BuySellETHScreen,
        navigationOptions: {
            headerTintColor: 'black',
        },
    },
    BCHCAD: {
        screen: BuySellBCHScreen,
        navigationOptions: {
            headerTintColor: 'black', 
        }
    },
    BTGCAD:{
        screen: BuySellBTGScreen,
        navigationOptions: {
            headerTintColor: 'black', 
        }
    },
    ŁTCCAD: {
        screen: BuySellLTCScreen,
        navigationOptions: {
            headerTintColor: 'black', 
        }
    },
    ExchangeAddress:{
        screen: ExchangeRouting,

    },
    CheckAddress:{
      screen:WebViewHelper,
    },
    Camera:{
        screen: CameraComponent,
        navigationOptions: {
            header: null
        }
    },
    Wallet:{
        screen:WalletScreen,
    }
},
{
    transitionConfig: getSlideFromRightTransition,
    
})
