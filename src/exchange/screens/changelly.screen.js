import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import {Button} from 'react-native-elements'
import {connect} from 'react-redux'
import {
  setFromTokenLogo,
  setToTokenLogo,
  postChangellyCurrency,
  postChangellyMinAmount,
  postChangellyExchangeAmount,
  postChangellyCreateTransaction,
  getChangellyTransactions,
  getChangellyStatus
} from 'exchange'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {LogoComponent,ExchangeModalComponent} from 'components'
import {Logos} from 'util'
import {
  AdMobBanner,
} from 'react-native-admob'

const {height,width} = Dimensions.get('window');

const mapStateToProps = (state) => ({
  selectedFromTokenLogo: state.exchange.selectedFromTokenLogo,
  selectedToTokenLogo: state.exchange.selectedToTokenLogo,
  changellyCurrencies: state.exchange.changellyCurrencies,
  changellyMinAmount: state.exchange.changellyMinAmount,
})
const mapDispatchToProps = (dispatch) => ({
  setFromTokenDispatch: (token)=>{dispatch(setFromTokenLogo(token))},
  setToTokenDispatch: (token)=>{dispatch(setToTokenLogo(token))},
  getChangellyCurrencyDispatch: () =>{dispatch(postChangellyCurrency())},
  getChangellyMinAmountDispatch: (fromCoin,toCoin) =>{dispatch(getChangellyMinAmount(fromCoin,toCoin))}
})



class ChangellyExchange extends Component {
    constructor(){
        super();
       
    }
    componentWillMount(){
      const {setFromTokenDispatch,setToTokenDispatch,getChangellyCurrencyDispatch,changellyCurrencies} = this.props;
      let availableTokenArray;
      setFromTokenDispatch(Logos[0].logo);
      setToTokenDispatch(Logos[1].logo);
      getChangellyCurrencyDispatch();
     
    }

  static navigationOptions = ({ navigation  }) => {
    const headerStyle={
      alignSelf: 'center',
      color:'white',
  
    }
    return { 
         headerTitle: `Exchange`,
         headerTitleStyle:{
              ...headerStyle
        },
        headerStyle:{
              backgroundColor:'orange'
        },
        tabBarLabel: 'Exchange',
        tabBarOptions: {
          activeTintColor: '#e91e63',
          labelStyle: {
            fontSize: 12,
          },
        },
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name="exchange"
                color={tintColor}
                size={20}
            />
          ),
        }
    
};
  render() {
    return (
      <View style={styles.container}>
          <ExchangeModalComponent navigation={this.props.navigation}/>
          <View style={{position:'absolute',bottom:0,width:width}}>
            <AdMobBanner
          adSize="smartBannerLandscape"
          adUnitID="ca-app-pub-8321262189259728/2193197542"
          testDevices={[AdMobBanner.simulatorId]}
          onAdFailedToLoad={error => console.error(error)} 
          />
         </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f8f8f8'
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

export const ChangellyExchangeScreen = connect(mapStateToProps,mapDispatchToProps)(ChangellyExchange);