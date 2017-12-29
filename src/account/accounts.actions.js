import {
  GET_QUADRIGA_TICKER_BTC,
  GET_QUADRIGA_TICKER_ETH,
  GET_QUADRIGA_TICKER_BCH,
  GET_QUADRIGA_TICKER_BTG,
  GET_QUADRIGA_TICKER_LTC,
  GET_QUADRIGA_ORDERS,
  GET_QUADRIGA_TRANSACTIONS,
  POST_USER_QUADRIGA_TRANSACTIONS,
  POST_USER_QUADRIGA_BALANCE,
  POST_USER_QUADRIGA_ORDERS,
  POST_USER_QUADRIGA_LOOKUP_ORDERS,
  POST_USER_QUADRIGA_CANCEL_ORDERS,
  POST_USER_QUADRIGA_BUY_AT_PRICE,
  POST_USER_QUADRIGA_BITCOIN_WALLET,
  POST_USER_QUADRIGA_ETHER_WALLET,
  POST_USER_QUADRIGA_ACCOUNT_DATA

} from 'account'
import {
  getTicketsQuadriga,
  getOrderBookQuadriga,
  getTransactionsQuadriga,
  postBalanceQuadriga,
  postUserTransactionsQuadriga,
  postOpenOrdersQuadriga,
  postLookupOrderQuadriga,
  postCancelOrderQuadriga,
  postBuyAtPriceQuadriga,
  postBuyOrderQuadrigaMarket,
  postSellLimitQuadriga,
  postSellMarketOrderQuadriga,
  postBitcoinWalletAddressQuadriga,
  postBitcoinWalletWithdrawQuadriga,
  postEthereumWalletAddressQuadriga,
  postEthereumWalletWithdrawQuadriga,
} from 'api'
import {encryptAuthenticationQuadriga} from 'util'



export const getQuadrigaOrders = (book,group) => {
  return dispatch => {
    dispatch({type: GET_QUADRIGA_ORDERS.PENDING})
    getOrderBookQuadriga(book,group).then((response) => {
      dispatch({type: GET_QUADRIGA_ORDERS.SUCCESS, payload: response})
    }).catch((error) => {
      dispatch({type: GET_QUADRIGA_ORDERS.ERROR, payload: error})
    })
  }
}
//All the ticker calls since they didnt make one object for all tickers

export const getQuadrigaTickerBTC = () => {
  return dispatch => {
    dispatch({type: GET_QUADRIGA_TICKER_BTC.PENDING})
    getTicketsQuadriga("btc_cad").then((response) => {
      dispatch({type: GET_QUADRIGA_TICKER_BTC.SUCCESS, payload: response})
    }).catch((error) => {
      dispatch({type: GET_QUADRIGA_TICKER_BTC.ERROR, payload: error})
    })
  }
}
export const getQuadrigaTickerETH = () => {
  return dispatch => {
    dispatch({type: GET_QUADRIGA_TICKER_ETH.PENDING})
    getTicketsQuadriga("eth_cad").then((response) => {
      dispatch({type: GET_QUADRIGA_TICKER_ETH.SUCCESS, payload: response})
    }).catch((error) => {
      dispatch({type: GET_QUADRIGA_TICKER_ETH.ERROR, payload: error})
    })
  }
}
export const getQuadrigaTickerBCH = () => {
  return dispatch => {
    dispatch({type: GET_QUADRIGA_TICKER_BCH.PENDING})
    getTicketsQuadriga("bch_cad").then((response) => {
      dispatch({type: GET_QUADRIGA_TICKER_BCH.SUCCESS, payload: response})
    }).catch((error) => {
      dispatch({type: GET_QUADRIGA_TICKER_BCH.ERROR, payload: error})
    })
  }
}
export const getQuadrigaTickerBTG = () => {
  return dispatch => {
    dispatch({type: GET_QUADRIGA_TICKER_BTG.PENDING})
    getTicketsQuadriga("btg_cad").then((response) => {
      dispatch({type: GET_QUADRIGA_TICKER_BTG.SUCCESS, payload: response})
    }).catch((error) => {
      dispatch({type: GET_QUADRIGA_TICKER_BTG.ERROR, payload: error})
    })
  }
}
export const getQuadrigaTickerLTC = () => {
  return dispatch => {
    dispatch({type: GET_QUADRIGA_TICKER_LTC.PENDING})
    getTicketsQuadriga("ltc_cad").then((response) => {
      dispatch({type: GET_QUADRIGA_TICKER_LTC.SUCCESS, payload: response})
    }).catch((error) => {
      dispatch({type: GET_QUADRIGA_TICKER_LTC.ERROR, payload: error})
    })
  }
}

export const getQuadrigaTransactions = (book,time) => {
  return dispatch => {
    dispatch({type: GET_QUADRIGA_TRANSACTIONS.PENDING})
    getTransactionsQuadriga(book,time).then((response) => {
      dispatch({type: GET_QUADRIGA_TRANSACTIONS.SUCCESS, payload: response})
    }).catch((error) => {
      dispatch({type: GET_QUADRIGA_TRANSACTIONS.ERROR, payload: error})
    })
  }
}
// Authenticated calls
export const postUserQuadrigaBalance = (key,sign,nonce) => {
  return dispatch => {
    dispatch({type: POST_USER_QUADRIGA_BALANCE.PENDING})
    postBalanceQuadriga(key,sign,nonce).then((response) => {
      dispatch({type: POST_USER_QUADRIGA_BALANCE.SUCCESS, payload: response})
    }).catch((error) => {
      dispatch({type: POST_USER_QUADRIGA_BALANCE.ERROR, payload: error})
    })
  }
}

export const postUserQuadrigaTransactions = (key,sign,nonce) => {
  return dispatch => {
    dispatch({type: POST_USER_QUADRIGA_TRANSACTIONS.PENDING})
    postUserTransactionsQuadriga(key,sign,nonce).then((response) => {
      dispatch({type: POST_USER_QUADRIGA_TRANSACTIONS.SUCCESS, payload: response})
    }).catch((error) => {
      dispatch({type: POST_USER_QUADRIGA_TRANSACTIONS.ERROR, payload: error})
    })
  }
}


export const postUserOpenOrdersQuadriga = (key,sign,nonce,book) => {
  return dispatch => {
    dispatch({type: POST_USER_QUADRIGA_ORDERS.PENDING})
    postOpenOrdersQuadriga(key,sign,nonce,book).then((response) => {
      dispatch({type: POST_USER_QUADRIGA_ORDERS.SUCCESS, payload: response})
    }).catch((error) => {
      dispatch({type: POST_USER_QUADRIGA_ORDERS.ERROR, payload: error})
    })
  }
}

export const postUserLookupOrderQuadriga = (key,sign,nonce,id) => {
  return dispatch => {
    dispatch({type: POST_USER_QUADRIGA_LOOKUP_ORDERS.PENDING})
    postLookupOrderQuadriga(key,sign,nonce,id).then((response) => {
      dispatch({type: POST_USER_QUADRIGA_LOOKUP_ORDERS.SUCCESS, payload: response})
    }).catch((error) => {
      dispatch({type: POST_USER_QUADRIGA_LOOKUP_ORDERS.ERROR, payload: error})
    })
  }
}


export const postUserCancelOrderQuadriga = (key,sign,nonce,id) => {
  return dispatch => {
    dispatch({type: POST_USER_QUADRIGA_CANCEL_ORDERS.PENDING})
    postCancelOrderQuadriga(key,sign,nonce,id).then((response) => {
      dispatch({type: POST_USER_QUADRIGA_CANCEL_ORDERS.SUCCESS, payload: response})
    }).catch((error) => {
      dispatch({type: POST_USER_QUADRIGA_CANCEL_ORDERS.ERROR, payload: error})
    })
  }
}


export const postUserBuyAtPriceQuadriga = (key,sign,nonce,amount,price,book) => {
  return dispatch => {
    dispatch({type: POST_USER_QUADRIGA_BUY_AT_PRICE.PENDING})
    postBuyAtPriceQuadriga(key,sign,nonce,amount,price,book).then((response) => {
      dispatch({type: POST_USER_QUADRIGA_BUY_AT_PRICE.SUCCESS, payload: response})
    }).catch((error) => {
      dispatch({type: POST_USER_QUADRIGA_BUY_AT_PRICE.ERROR, payload: error})
    })
  }
}


export const postUserBuyOrderQuadrigaMarket = (key,sign,nonce,amount,book) => {
  return dispatch => {
    dispatch({type: POST_USER_QUADRIGA_BUY_ORDER_MARKET.PENDING})
    postBuyOrderQuadrigaMarket(key,sign,nonce,amount,book).then((response) => {
      dispatch({type: POST_USER_QUADRIGA_BUY_ORDER_MARKET.SUCCESS, payload: response})
    }).catch((error) => {
      dispatch({type: POST_USER_QUADRIGA_BUY_ORDER_MARKET.ERROR, payload: error})
    })
  }
}

export const postUserSellLimitQuadriga = (key,sign,nonce,amount,price,book) => {
  return dispatch => {
    dispatch({type: POST_USER_QUADRIGA_SELL_LIMIT.PENDING})
    postSellLimitQuadriga(key,sign,nonce,amount,price,book).then((response) => {
      dispatch({type: POST_USER_QUADRIGA_SELL_LIMIT.SUCCESS, payload: response})
    }).catch((error) => {
      dispatch({type: POST_USER_QUADRIGA_SELL_LIMIT.ERROR, payload: error})
    })
  }
}

export const postUserSellMarketOrderQuadriga = (key,sign,nonce,amount,book) => {
  return dispatch => {
    dispatch({type: POST_USER_QUADRIGA_SELL_MARKET.PENDING})
    postSellMarketOrderQuadriga(key,sign,nonce,amount,book).then((response) => {
      dispatch({type: POST_USER_QUADRIGA_SELL_MARKET.SUCCESS, payload: response})
    }).catch((error) => {
      dispatch({type: POST_USER_QUADRIGA_SELL_MARKET.ERROR, payload: error})
    })
  }
}

export const postUserBitcoinWalletAddressQuadriga = (key,sign,nonce) => {
  return dispatch => {
    dispatch({type:POST_USER_QUADRIGA_BITCOIN_WALLET.PENDING})
    postBitcoinWalletAddressQuadriga(key,sign,nonce).then((response) => {
      dispatch({type: POST_USER_QUADRIGA_BITCOIN_WALLET.SUCCESS, payload: {res:response,address:{acronym:'btc',name:'Bitcoin',receiveAddress:response.data}}})
    }).catch((error) => {
      dispatch({type: POST_USER_QUADRIGA_BITCOIN_WALLET.ERROR, payload: error})
    })
  }
}

export const postUserBitcoinWalletWithdrawQuadriga = (key,sign,nonce,amount,address) => {
  return dispatch => {
    dispatch({type: POST_USER_QUADRIGA_BITCOIN_WITHDRAW.PENDING})
    postBitcoinWalletWithdrawQuadriga(key,sign,nonce,amount,address).then((response) => {
      dispatch({type: POST_USER_QUADRIGA_BITCOIN_WITHDRAW.SUCCESS, payload: response})
    }).catch((error) => {
      dispatch({type: POST_USER_QUADRIGA_BITCOIN_WITHDRAW.ERROR, payload: error})
    })
  }
}

export const postUserEthereumWalletAddressQuadriga = (key,sign,nonce) => {
  return dispatch => {
    dispatch({type: POST_USER_QUADRIGA_ETHER_WALLET.PENDING})
    postEthereumWalletAddressQuadriga(key,sign,nonce).then((response) => {
      dispatch({type: POST_USER_QUADRIGA_ETHER_WALLET.SUCCESS, payload: {res:response,address:{acronym:'eth',name:'Ethereum',receiveAddress:response.data}}})
    }).catch((error) => {
      dispatch({type: POST_USER_QUADRIGA_ETHER_WALLET.ERROR, payload: error})
    })
  }
}

export const postUserEthereumWalletWithdrawQuadriga = (key,sign,nonce,amount,address) => {
  return dispatch => {
    dispatch({type: POST_USER_QUADRIGA_ETHER_WITHDRAW.PENDING})
    postEthereumWalletWithdrawQuadriga(key,sign,nonce,amount,address).then((response) => {
      dispatch({type: POST_USER_QUADRIGA_ETHER_WITHDRAW.SUCCESS, payload: response})
    }).catch((error) => {
      dispatch({type: POST_USER_QUADRIGA_ETHER_WITHDRAW.ERROR, payload: error})
    })
  }
}

export const postAccounScreenMainCall = (clientId,apiKey,secret) =>{ //need to guarantee that the api call doesnt return an error that the nonce cant be smaller than ... Making a combined async function
  let nonce;
  return dispatch =>{
    dispatch({type: POST_USER_QUADRIGA_BITCOIN_WALLET.PENDING})
    nonce = Date.now();
    postBitcoinWalletAddressQuadriga(apiKey,encryptAuthenticationQuadriga(nonce,clientId,apiKey,secret),nonce).then((response)=>{
      dispatch({type: POST_USER_QUADRIGA_BITCOIN_WALLET.SUCCESS, payload: {res:response,address:{type:'quadriga',acronym:'btc',name:'Bitcoin',receiveAddress:response.data}}});
      dispatch({type: POST_USER_QUADRIGA_ETHER_WALLET.PENDING})
      nonce = Date.now();
      postEthereumWalletAddressQuadriga(apiKey,encryptAuthenticationQuadriga(nonce,clientId,apiKey,secret),nonce).then((response)=>{
        dispatch({type: POST_USER_QUADRIGA_ETHER_WALLET.SUCCESS, payload: {res:response,address:{type:'quadriga',acronym:'eth',name:'Ethereum',receiveAddress:response.data}}});
        dispatch({type: POST_USER_QUADRIGA_BALANCE.PENDING})
        nonce = Date.now();
        postBalanceQuadriga(apiKey,encryptAuthenticationQuadriga(nonce,clientId,apiKey,secret),nonce).then((response)=>{
          dispatch({type: POST_USER_QUADRIGA_BALANCE.SUCCESS, payload: response});
        }).catch((error)=>{
          dispatch({type: POST_USER_QUADRIGA_BALANCE.ERROR, payload: error})
        })
      }).catch((error)=>{
        dispatch({type: POST_USER_QUADRIGA_ETHER_WALLET.ERROR, payload: error})
      })
    }).catch((error)=>{
      dispatch({type: POST_USER_QUADRIGA_BITCOIN_WALLET.ERROR, payload: error})
    })
  }
}
