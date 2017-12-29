import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
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


const mapStateToProps = (state) => ({
  selectedFromTokenLogo: state.exchange.selectedFromTokenLogo,
  selectedToTokenLogo: state.exchange.selectedToTokenLogo,
  changellyCurrencies: state.exchange.changellyCurrencies,
  changellyMinAmount: state.exchange.changellyMinAmount,
})
const mapDispatchToProps = (dispatch) => ({
  setFromTokenDispatch: (token)=>{dispatch(setFromTokenLogo(token))},
  setToTokenDispatch: (token)=>{dispatch(setToTokenLogo(token))},
  getChangellyCurrencyDispatch: () =>{dispatch(postChangellyMinAmount())},
  getChangellyMinAmountDispatch: (fromCoin,toCoin) =>{dispatch(getChangellyMinAmount(fromCoin,toCoin))}
})



class ChangellyExchange extends Component {
    constructor(){
        super();
        this.handleGetCurrencies = this.handleGetCurrencies.bind(this);
    }
    componentWillMount(){
      const {setFromTokenDispatch,setToTokenDispatch} = this.props;
      setFromTokenDispatch(Logos[0].logo);
      setToTokenDispatch(Logos[1].logo);
    }
  
  
  handleGetCurrencies(){
    const {getChangellyCurrencyDispatch,getChangellyMinAmountDispatch} = this.props;
    console.log(getChangellyCurrencyDispatch())
    console.log(getChangellyMinAmountDispatch("eth","storj"))
    
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
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

export const ChangellyExchangeScreen = connect(mapStateToProps,mapDispatchToProps)(ChangellyExchange);