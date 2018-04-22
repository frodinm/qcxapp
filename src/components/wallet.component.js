import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Image,
    Dimensions,

} from 'react-native';
import { CameraComponent } from 'components'
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { Button, Divider } from 'react-native-elements'
import { connect } from 'react-redux'
import { Logos } from 'util';
import {
    getChangellyTransactions,
    postChangellyAddressPair
} from 'exchange'

const { height, width } = Dimensions.get('window');


const mapStateToProps = (state) => ({
    changellyAddressesUsed: state.exchange.changellyAddressesUsed,
    changellyTransactions: state.exchange.changellyTransactions,
    changellyAddressPairs: state.exchange.changellyAddressPairs,
})
const mapDispatchToProps = (dispatch) => ({
    getChangellyTransactionsDispatch: (currency, address, extraId, limit, offset) => { dispatch(getChangellyTransactions(currency, address, extraId, limit, offset)) },
    getChangellyAddressPairDispatch: (fromCoin, toCoin, address, extraId) => { dispatch(postChangellyAddressPair(fromCoin, toCoin, address, extraId)) }
})



class Wallet extends Component {
    constructor(props) {
        super(props);

    }


    static navigationOptions = ({ navigation }) => {
        const headerStyle = {
            alignSelf: 'center',
            color: 'white',
            position: 'relative',
            ...Platform.select({
                android: {
                    left: 30
                }
            })
        }
        return {
            headerTitle: `Wallet`,
            headerRight: <TouchableOpacity><Icon name="settings" size={30} color="#fff" style={{ marginRight: 20 }} /></TouchableOpacity>,
            headerTitleStyle: {
                ...headerStyle
            },
            headerStyle: {
                backgroundColor: 'orange'
            },
        }
    };
    handleTransactions() {
        const { changellyTransactions } = this.props;

        if (changellyTransactions != null) {
            return (
                changellyTransactions.data.result.map((transaction) => {
                    let date = new Date(transaction.createdAt * 1000);
                    let logoTo;
                    Logos.map((logo) => {
                        if (logo.acronym.indexOf(transaction.currencyTo) != -1) {
                            logoTo = logo.logo
                        }
                    })
                    let logoFrom;
                    Logos.map((logo) => {
                        if (logo.acronym.indexOf(transaction.currencyFrom) != -1) {
                            logoFrom = logo.logo;
                        }
                    })
                    return (
                        <View key={transaction.id} style={{ alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', height: height / 9, alignItems: 'center', justifyContent: 'center' }}>
                                <Text>Exchange  </Text>
                                <Image style={{ height: 40, width: 40 }} resizeMode={'contain'} source={logoFrom} />
                                <Text>  to</Text>
                                <Image style={{ height: 40, width: 40 }} resizeMode={'contain'} source={logoTo} />
                                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text> {date.getDate()}/{date.getMonth()}/{date.getFullYear()}</Text>
                                    <Text>{date.getHours()}:{date.getMinutes()}:{date.getSeconds()}</Text>
                                </View>

                            </View>
                            <Divider style={{ height: 1, alignSelf: 'center', width: width / 1.1, backgroundColor: '#e2e2e2' }} />
                        </View>


                    )

                }))
        } else {
            <Text>none</Text>
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {this.handleTransactions()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },

});

export const WalletScreen = connect(mapStateToProps, mapDispatchToProps)(Wallet);
