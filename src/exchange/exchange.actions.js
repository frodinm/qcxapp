import {
    POST_CHANGELLY_CREATE_ADDRESS_PAIR,
    POST_CHANGELLY_CURRENCIES,
    POST_CHANGELLY_MINIMUM_AMOUNT,
    POST_CHANGELLY_EXCHANGE_AMOUNT,
    POST_CHANGELLY_CREATE_TRANSACTION,
    POST_CHANGELLY_TRANSACTIONS,
    POST_CHANGELLY_STATUS,
    SET_FROM_TOKEN_LOGO,
    SET_TO_TOKEN_LOGO,
    SET_TOKEN_ONE_TEXT_VALUE,
    SET_TOKEN_TWO_TEXT_VALUE,
    SET_TOKEN_FROM_AMOUNT,
    SET_TOKEN_TO_AMOUNT
} from 'exchange'
import {
    getCurrenciesChangelly,
    getMinAmountChangelly,
    getExchangeAmountChangelly,
    createTransactionChangelly,
    getTransactionsChangelly,
    getStatusChangelly,
    createAddressPairChangelly
} from 'api'


export const setTokenFromAmount = (amount) => {
    return dispatch => {
        dispatch({type: SET_TOKEN_FROM_AMOUNT.SUCCESS, payload: amount})
    }
}

export const setTokenOneTextValue = (value) => {
    return dispatch => {
        dispatch({type: SET_TOKEN_ONE_TEXT_VALUE.SUCCESS, payload: value})
    }
}

export const setTokenTwoTextValue = (value) => {
    return dispatch => {
        dispatch({type: SET_TOKEN_TWO_TEXT_VALUE.SUCCESS, payload: value})
    }
}

export const setFromTokenLogo = (token) => {
    return dispatch => {
        dispatch({type: SET_FROM_TOKEN_LOGO.SUCCESS, payload: token})
    }
}

export const setToTokenLogo = (token) => {
    return dispatch => {
        dispatch({type: SET_TO_TOKEN_LOGO.SUCCESS, payload: token})
    }
}

export const postChangellyCurrency = () => {
    return dispatch => {
        dispatch({type: POST_CHANGELLY_CURRENCIES.PENDING})
        getCurrenciesChangelly().then((response) => {
            dispatch({type: POST_CHANGELLY_CURRENCIES.SUCCESS, payload: response})
        }).catch((error) => {
            dispatch({type: POST_CHANGELLY_CURRENCIES.ERROR, payload: error})
        })
    }
}

export const postChangellyMinAmount = (fromCoin, toCoin ,fromName,exchangeAmount,navigator) => {
    return dispatch => {
        dispatch({type: POST_CHANGELLY_MINIMUM_AMOUNT.PENDING})
        getMinAmountChangelly(fromCoin, toCoin).then((response) => {
            dispatch({type: POST_CHANGELLY_MINIMUM_AMOUNT.SUCCESS, payload: response})
            if(response.data.result > exchangeAmount){
                alert("Amount is too small. Minimum amount is "+response.data.result+` ${fromCoin.toUpperCase()}. Otherwise you might lose your funds.`)
            }else{
                navigator.navigate('ExchangeAddress', {fromName:fromName,fromCoin:fromCoin,toCoin:toCoin})
            }

        }).catch((error) => {
            dispatch({type: POST_CHANGELLY_MINIMUM_AMOUNT.ERROR, payload: error})
        })
    }
}

export const postChangellyExchangeAmount = (fromCoin, toCoin, amount,info) => {
    return dispatch => {
        dispatch({type: POST_CHANGELLY_EXCHANGE_AMOUNT.PENDING})
        getExchangeAmountChangelly(fromCoin, toCoin, amount).then((response) => {
            if(info === "OneToTwo"){
                dispatch({type: SET_TOKEN_TWO_TEXT_VALUE.SUCCESS, payload: parseFloat(response.data.result).toFixed(6).toString()})
                dispatch({type: POST_CHANGELLY_EXCHANGE_AMOUNT.SUCCESS, payload: {fromAmount: amount,res:response}})

            }else{
                dispatch({type: SET_TOKEN_ONE_TEXT_VALUE.SUCCESS, payload: parseFloat(response.data.result).toFixed(6).toString()})
                dispatch({type: SET_TOKEN_TWO_TEXT_VALUE.SUCCESS, payload: amount})
                dispatch({type: POST_CHANGELLY_EXCHANGE_AMOUNT.SUCCESS, payload: {fromAmount: response.data.result ,res:response}})
            }
        }).catch((error) => {
            dispatch({type: POST_CHANGELLY_EXCHANGE_AMOUNT.ERROR, payload: error})
        })
    }
}

export const postChangellyAddressPair = (fromCoin, toCoin, address, extraId) => {
    return dispatch => {
        dispatch({type: POST_CHANGELLY_CREATE_ADDRESS_PAIR.PENDING})
        createAddressPairChangelly(fromCoin, toCoin, address, extraId).then((response) => {
            dispatch({type: POST_CHANGELLY_CREATE_ADDRESS_PAIR.SUCCESS, payload: response})
        }).catch((error) => {
            dispatch({type: POST_CHANGELLY_CREATE_ADDRESS_PAIR.ERROR, payload: error})
        })
    }
}

export const postChangellyCreateTransaction = (fromCoin, toCoin, amount, address, extraId, navigation) => {
    return dispatch => {
        dispatch({type: POST_CHANGELLY_CREATE_TRANSACTION.PENDING})
        createTransactionChangelly(fromCoin, toCoin, amount, address, extraId).then((response) => {
            if(response.data.hasOwnProperty('error')){
                alert(response.data.error.message);
            }else{
                dispatch({type: POST_CHANGELLY_CREATE_TRANSACTION.SUCCESS, payload: {res:response,amount:amount}})
                navigation.navigate('PayExchange',{fromCoin: fromCoin})
            }
        }).catch((error) => {
            dispatch({type: POST_CHANGELLY_CREATE_TRANSACTION.ERROR, payload: error})
        })
    }
}

export const getChangellyTransactions = (currency, address, extraId, limit, offset) => {
    return dispatch => {
        dispatch({type: POST_CHANGELLY_TRANSACTIONS.PENDING})
        getTransactionsChangelly(currency, address, extraId, limit, offset).then((response) => {
            dispatch({type: POST_CHANGELLY_TRANSACTIONS.SUCCESS, payload: response})
        }).catch((error) => {
            dispatch({type: POST_CHANGELLY_TRANSACTIONS.ERROR, payload: error})
        })
    }
}


export const getChangellyStatus = (id) => {
    return dispatch => {
        dispatch({type: POST_CHANGELLY_STATUS.PENDING})
        getStatusChangelly(id).then((response) => {
            dispatch({type: POST_CHANGELLY_STATUS.SUCCESS, payload: response})
        }).catch((error) => {
            dispatch({type: POST_CHANGELLY_STATUS.ERROR, payload: error})
        })
    }
}
