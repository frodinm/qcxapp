import {
  SIGN_OUT_ACCOUNT,
  SET_TRADING_BOOK,
  GET_QUADRIGA_TICKERS,
  GET_QUADRIGA_ORDERS,
  GET_QUADRIGA_TRANSACTIONS,
  POST_USER_QUADRIGA_TRANSACTIONS,
  POST_USER_QUADRIGA_BALANCE,
  POST_USER_QUADRIGA_ORDERS,
  POST_USER_QUADRIGA_LOOKUP_ORDERS,
  POST_USER_QUADRIGA_CANCEL_ORDERS,
  POST_USER_QUADRIGA_BUY_AT_PRICE,
  POST_USER_QUADRIGA_BUY_ORDER_MARKET,
  POST_USER_QUADRIGA_SELL_LIMIT,
  POST_USER_QUADRIGA_SELL_MARKET,
  POST_USER_QUADRIGA_BITCOIN_WALLET,
  POST_USER_QUADRIGA_ETHER_WALLET,
  POST_USER_QUADRIGA_BITCOIN_CASH_WALLET,
  POST_USER_QUADRIGA_BITCOIN_GOLD_WALLET,
  POST_USER_QUADRIGA_LITECOIN_WALLET,
  POST_USER_QUADRIGA_BITCOIN_WALLET_WITHDRAW,
  POST_USER_QUADRIGA_ETHER_WALLET_WITHDRAW,
  POST_USER_QUADRIGA_BITCOIN_CASH_WALLET_WITHDRAW,
  POST_USER_QUADRIGA_BITCOIN_GOLD_WALLET_WITHDRAW,
  POST_USER_QUADRIGA_LITECOIN_WALLET_WITHDRAW,


} from 'account';
import {
  getTicketsQuadrigaAll,
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
  postBitcoinCashWalletAddressQuadriga,
  postBitcoinCashWalletWithdrawQuadriga,
  postBitcoinGoldWalletAddressQuadriga,
  postBitcoinGoldWalletWithdrawQuadriga,
  postLitecoinWalletAddressQuadriga,
  postLitecoinWalletWithdrawQuadriga,
} from 'api';
import { encryptAuthenticationQuadriga } from 'util';

let interval;

export const signOutAcccount = () => {
  clearQuadrigaTickers();
  return dispatch => {
    dispatch({ type: SIGN_OUT_ACCOUNT.SUCCESS });
  };
};

export const setTradingBook = (tradingBook) => {
  return dispatch => {
    dispatch({ type: SET_TRADING_BOOK.SUCCESS, payload: tradingBook });
  };
};

export const getQuadrigaOrders = (book, group) => {
  return dispatch => {
    dispatch({ type: GET_QUADRIGA_ORDERS.PENDING });
    getOrderBookQuadriga(book, group).then((response) => {
      dispatch({ type: GET_QUADRIGA_ORDERS.SUCCESS, payload: response });
    }).catch((error) => {
      dispatch({ type: GET_QUADRIGA_ORDERS.ERROR, payload: error });
    });
  };
};
//All the ticker calls since they didnt make one object for all tickers

export const getQuadrigaTickerBTC = () => {
  return dispatch => {
    dispatch({ type: GET_QUADRIGA_TICKER_BTC.PENDING });
    getTicketsQuadriga("btc_cad").then((response) => {
      dispatch({ type: GET_QUADRIGA_TICKER_BTC.SUCCESS, payload: response });
    }).catch((error) => {
      dispatch({ type: GET_QUADRIGA_TICKER_BTC.ERROR, payload: error });
    });
  };
};
export const getQuadrigaTickerETH = () => {
  return dispatch => {
    dispatch({ type: GET_QUADRIGA_TICKER_ETH.PENDING });
    getTicketsQuadriga("eth_cad").then((response) => {
      dispatch({ type: GET_QUADRIGA_TICKER_ETH.SUCCESS, payload: response });
    }).catch((error) => {
      dispatch({ type: GET_QUADRIGA_TICKER_ETH.ERROR, payload: error });
    });
  };
};
export const getQuadrigaTickerBCH = () => {
  return dispatch => {
    dispatch({ type: GET_QUADRIGA_TICKER_BCH.PENDING });
    getTicketsQuadriga("bch_cad").then((response) => {
      dispatch({ type: GET_QUADRIGA_TICKER_BCH.SUCCESS, payload: response });
    }).catch((error) => {
      dispatch({ type: GET_QUADRIGA_TICKER_BCH.ERROR, payload: error });
    });
  };
};
export const getQuadrigaTickerBTG = () => {
  return dispatch => {
    dispatch({ type: GET_QUADRIGA_TICKER_BTG.PENDING });
    getTicketsQuadriga("btg_cad").then((response) => {
      dispatch({ type: GET_QUADRIGA_TICKER_BTG.SUCCESS, payload: response });
    }).catch((error) => {
      dispatch({ type: GET_QUADRIGA_TICKER_BTG.ERROR, payload: error });
    });
  };
};
export const getQuadrigaTickerLTC = () => {
  return dispatch => {
    dispatch({ type: GET_QUADRIGA_TICKER_LTC.PENDING });
    getTicketsQuadriga("ltc_cad").then((response) => {
      dispatch({ type: GET_QUADRIGA_TICKER_LTC.SUCCESS, payload: response });
    }).catch((error) => {
      dispatch({ type: GET_QUADRIGA_TICKER_LTC.ERROR, payload: error });
    });
  };
};

export const getQuadrigaTransactions = (book, time) => {
  return dispatch => {
    dispatch({ type: GET_QUADRIGA_TRANSACTIONS.PENDING });
    getTransactionsQuadriga(book, time).then((response) => {
      dispatch({ type: GET_QUADRIGA_TRANSACTIONS.SUCCESS, payload: response });
    }).catch((error) => {
      dispatch({ type: GET_QUADRIGA_TRANSACTIONS.ERROR, payload: error });
    });
  };
};

export const getQuadrigaTickersAll = () => {
  return dispatch => {
    interval = setInterval(() => {
      dispatch({ type: GET_QUADRIGA_TICKERS.PENDING });
      getTicketsQuadrigaAll().then((response) => {
        dispatch({ type: GET_QUADRIGA_TICKERS.SUCCESS, payload: response });
      }).catch((err) => {
        dispatch({ type: GET_QUADRIGA_TICKERS.ERROR, payload: error });
      });
    }, 10000);
  };
};

export const getQuadrigaTickersAllAtPin = () => {
  return dispatch => {
    dispatch({ type: GET_QUADRIGA_TICKERS.PENDING });
    getTicketsQuadrigaAll().then((response) => {
      dispatch({ type: GET_QUADRIGA_TICKERS.SUCCESS, payload: response });
    }).catch((err) => {
      dispatch({ type: GET_QUADRIGA_TICKERS.ERROR, payload: error });
    });
  };
};

export const clearQuadrigaTickers = () => {
  clearInterval(interval);
};


// Authenticated calls
export const postUserQuadrigaBalanceAndOpenOrders = (apiKey, clientId, secret, tradingBook) => {
  let nonce;
  return dispatch => {
    dispatch({ type: GET_QUADRIGA_ORDERS.PENDING });
    getOrderBookQuadriga(tradingBook, 0).then((response) => {
      dispatch({ type: GET_QUADRIGA_ORDERS.SUCCESS, payload: response });
      dispatch({ type: POST_USER_QUADRIGA_BALANCE.PENDING });
      nonce = Date.now();
      postBalanceQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, secret), nonce).then((response) => {
        dispatch({ type: POST_USER_QUADRIGA_BALANCE.SUCCESS, payload: response });
        dispatch({ type: POST_USER_QUADRIGA_ORDERS.PENDING });
        nonce = Date.now();
        postOpenOrdersQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, secret), nonce, tradingBook).then((response) => {
          dispatch({ type: POST_USER_QUADRIGA_ORDERS.SUCCESS, payload: response });
        }).catch((error) => {
          dispatch({ type: POST_USER_QUADRIGA_ORDERS.ERROR, payload: error });
        });
      }).catch((error) => {
        dispatch({ type: POST_USER_QUADRIGA_BALANCE.ERROR, payload: error });
      });
    }).catch((error) => {
      dispatch({ type: GET_QUADRIGA_ORDERS.ERROR, payload: error });
    });
  };
};

export const postUserQuadrigaBalanceAndTransactions = (apiKey, clientId, privateKey, offset, limit, sort, book, bookTwo) => {
  let nonce;
  let returnArray;
  return dispatch => {
    dispatch({ type: POST_USER_QUADRIGA_BALANCE.PENDING });
    nonce = Date.now();
    postBalanceQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, privateKey), nonce).then((response) => {
      dispatch({ type: POST_USER_QUADRIGA_BALANCE.SUCCESS, payload: response });
      dispatch({ type: POST_USER_QUADRIGA_TRANSACTIONS.PENDING });
      nonce = Date.now();
      postUserTransactionsQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, privateKey), nonce, offset, limit, sort, book).then((response) => {
        returnArray = response.data;
        dispatch({ type: POST_USER_QUADRIGA_TRANSACTIONS.PENDING });
        nonce = Date.now();
        postUserTransactionsQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, privateKey), nonce, offset, limit, sort, bookTwo).then((response) => {
          returnArray = returnArray.concat(response.data).filter((thing, index, self) => self.findIndex(t => t.datetime === thing.datetime) === index); //filter duplicate deposits based on the same datetime.
          dispatch({ type: POST_USER_QUADRIGA_TRANSACTIONS.SUCCESS, payload: returnArray });
        }).catch((error) => {
          dispatch({ type: POST_USER_QUADRIGA_TRANSACTIONS.ERROR, payload: error });
        });
      }).catch((error) => {
        dispatch({ type: POST_USER_QUADRIGA_TRANSACTIONS.ERROR, payload: error });
      });
    }).catch((error) => {
      dispatch({ type: POST_USER_QUADRIGA_BALANCE.ERROR, payload: error });
    });
  };
};

export const postUserQuadrigaBalance = (key, sign, nonce) => {
  return dispatch => {
    dispatch({ type: POST_USER_QUADRIGA_BALANCE.PENDING });
    postBalanceQuadriga(key, sign, nonce).then((response) => {
      dispatch({ type: POST_USER_QUADRIGA_BALANCE.SUCCESS, payload: response });
    }).catch((error) => {
      dispatch({ type: POST_USER_QUADRIGA_BALANCE.ERROR, payload: error });
    });
  };
};

export const postUserQuadrigaTransactions = (apiKey, clientId, privateKey, offset, limit, sort, book, bookTwo) => {
  let nonce;
  let returnArray;
  return dispatch => {
    dispatch({ type: POST_USER_QUADRIGA_TRANSACTIONS.PENDING });
    nonce = Date.now();
    postUserTransactionsQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, privateKey), nonce, offset, limit, sort, book).then((response) => {
      returnArray = response.data;
      dispatch({ type: POST_USER_QUADRIGA_TRANSACTIONS.PENDING });
      nonce = Date.now();
      postUserTransactionsQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, privateKey), nonce, offset, limit, sort, bookTwo).then((response) => {
        returnArray = returnArray.concat(response.data).filter((thing, index, self) => self.findIndex(t => t.datetime === thing.datetime) === index); //filter duplicate deposits based on the same datetime.
        dispatch({ type: POST_USER_QUADRIGA_TRANSACTIONS.SUCCESS, payload: returnArray });
      }).catch((error) => {
        dispatch({ type: POST_USER_QUADRIGA_TRANSACTIONS.ERROR, payload: error });
      });
    }).catch((error) => {
      dispatch({ type: POST_USER_QUADRIGA_TRANSACTIONS.ERROR, payload: error });
    });
  };
};


export const postUserOpenOrdersQuadriga = (key, sign, nonce, book) => {
  return dispatch => {
    dispatch({ type: POST_USER_QUADRIGA_ORDERS.PENDING });
    postOpenOrdersQuadriga(key, sign, nonce, book).then((response) => {
      dispatch({ type: POST_USER_QUADRIGA_ORDERS.SUCCESS, payload: response });
    }).catch((error) => {
      dispatch({ type: POST_USER_QUADRIGA_ORDERS.ERROR, payload: error });
    });
  };
};

export const postUserLookupOrderQuadriga = (key, sign, nonce, id) => {
  return dispatch => {
    dispatch({ type: POST_USER_QUADRIGA_LOOKUP_ORDERS.PENDING });
    postLookupOrderQuadriga(key, sign, nonce, id).then((response) => {
      dispatch({ type: POST_USER_QUADRIGA_LOOKUP_ORDERS.SUCCESS, payload: response });
    }).catch((error) => {
      dispatch({ type: POST_USER_QUADRIGA_LOOKUP_ORDERS.ERROR, payload: error });
    });
  };
};


export const postUserCancelOrderQuadriga = (apiKey, clientId, secret, id, book) => {
  let nonce;
  return dispatch => {
    dispatch({ type: POST_USER_QUADRIGA_CANCEL_ORDERS.PENDING });
    nonce = Date.now();
    postCancelOrderQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, secret), nonce, id).then((response) => {
      dispatch({ type: POST_USER_QUADRIGA_CANCEL_ORDERS.SUCCESS, payload: response });
      dispatch({ type: POST_USER_QUADRIGA_BALANCE.PENDING });
      nonce = Date.now();
      postBalanceQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, secret), nonce).then((response) => {
        dispatch({ type: POST_USER_QUADRIGA_BALANCE.SUCCESS, payload: response });
        dispatch({ type: POST_USER_QUADRIGA_ORDERS.PENDING });
        nonce = Date.now();
        postOpenOrdersQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, secret), nonce, book).then((response) => {
          dispatch({ type: POST_USER_QUADRIGA_ORDERS.SUCCESS, payload: response });
        }).catch((error) => {
          dispatch({ type: POST_USER_QUADRIGA_ORDERS.ERROR, payload: error });
        });
      }).catch((error) => {
        dispatch({ type: POST_USER_QUADRIGA_BALANCE.ERROR, payload: error });
      });
    }).catch((error) => {
      dispatch({ type: POST_USER_QUADRIGA_CANCEL_ORDERS.ERROR, payload: error });
    });
  };
};


export const postUserBuyAtPriceQuadriga = (apiKey, clientId, secret, amount, price, book) => {
  let nonce;
  return dispatch => {
    dispatch({ type: POST_USER_QUADRIGA_BUY_AT_PRICE.PENDING });
    nonce = Date.now();
    postBuyAtPriceQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, secret), nonce, amount, price, book).then((response) => {
      dispatch({ type: POST_USER_QUADRIGA_BUY_AT_PRICE.SUCCESS, payload: response });
      dispatch({ type: POST_USER_QUADRIGA_BALANCE.PENDING });
      nonce = Date.now();
      postBalanceQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, secret), nonce).then((response) => {
        dispatch({ type: POST_USER_QUADRIGA_BALANCE.SUCCESS, payload: response });
        dispatch({ type: POST_USER_QUADRIGA_ORDERS.PENDING });
        nonce = Date.now();
        postOpenOrdersQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, secret), nonce, book).then((response) => {
          dispatch({ type: POST_USER_QUADRIGA_ORDERS.SUCCESS, payload: response });
        }).catch((error) => {
          dispatch({ type: POST_USER_QUADRIGA_ORDERS.ERROR, payload: error });
        });
      }).catch((error) => {
        dispatch({ type: POST_USER_QUADRIGA_BALANCE.ERROR, payload: error });
      });
    }).catch((error) => {
      dispatch({ type: POST_USER_QUADRIGA_BUY_AT_PRICE.ERROR, payload: error });
    });
  };
};


export const postUserBuyMarketOrderQuadriga = (apiKey, clientId, secret, amount, book) => {
  let nonce;
  return dispatch => {
    dispatch({ type: POST_USER_QUADRIGA_BUY_ORDER_MARKET.PENDING });
    nonce = Date.now();
    postBuyOrderQuadrigaMarket(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, secret), nonce, amount, book).then((response) => {
      dispatch({ type: POST_USER_QUADRIGA_BUY_ORDER_MARKET.SUCCESS, payload: response });
      dispatch({ type: POST_USER_QUADRIGA_BALANCE.PENDING });
      nonce = Date.now();
      postBalanceQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, secret), nonce).then((response) => {
        dispatch({ type: POST_USER_QUADRIGA_BALANCE.SUCCESS, payload: response });
        dispatch({ type: POST_USER_QUADRIGA_ORDERS.PENDING });
        nonce = Date.now();
        postOpenOrdersQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, secret), nonce, book).then((response) => {
          dispatch({ type: POST_USER_QUADRIGA_ORDERS.SUCCESS, payload: response });
        }).catch((error) => {
          dispatch({ type: POST_USER_QUADRIGA_ORDERS.ERROR, payload: error });
        });
      }).catch((error) => {
        dispatch({ type: POST_USER_QUADRIGA_BALANCE.ERROR, payload: error });
      });
    }).catch((error) => {
      dispatch({ type: POST_USER_QUADRIGA_BUY_ORDER_MARKET.ERROR, payload: error });
    });
  };
};

export const postUserSellLimitQuadriga = (apiKey, clientId, secret, amount, price, book) => {
  let nonce;
  return dispatch => {
    dispatch({ type: POST_USER_QUADRIGA_SELL_LIMIT.PENDING });
    nonce = Date.now();
    postSellLimitQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, secret), nonce, amount, price, book).then((response) => {
      dispatch({ type: POST_USER_QUADRIGA_SELL_LIMIT.SUCCESS, payload: response });
      dispatch({ type: POST_USER_QUADRIGA_BALANCE.PENDING });
      nonce = Date.now();
      postBalanceQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, secret), nonce).then((response) => {
        dispatch({ type: POST_USER_QUADRIGA_BALANCE.SUCCESS, payload: response });
        dispatch({ type: POST_USER_QUADRIGA_ORDERS.PENDING });
        nonce = Date.now();
        postOpenOrdersQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, secret), nonce, book).then((response) => {
          dispatch({ type: POST_USER_QUADRIGA_ORDERS.SUCCESS, payload: response });
        }).catch((error) => {
          dispatch({ type: POST_USER_QUADRIGA_ORDERS.ERROR, payload: error });
        });
      }).catch((error) => {
        dispatch({ type: POST_USER_QUADRIGA_BALANCE.ERROR, payload: error });
      });
    }).catch((error) => {
      dispatch({ type: POST_USER_QUADRIGA_SELL_LIMIT.ERROR, payload: error });
    });
  };
};

export const postUserSellMarketOrderQuadriga = (apiKey, clientId, secret, amount, book) => {
  let nonce;
  return dispatch => {
    dispatch({ type: POST_USER_QUADRIGA_SELL_MARKET.PENDING });
    nonce = Date.now();
    postSellMarketOrderQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, secret), nonce, amount, book).then((response) => {
      dispatch({ type: POST_USER_QUADRIGA_SELL_MARKET.SUCCESS, payload: response });
      dispatch({ type: POST_USER_QUADRIGA_BALANCE.PENDING });
      nonce = Date.now();
      postBalanceQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, secret), nonce).then((response) => {
        dispatch({ type: POST_USER_QUADRIGA_BALANCE.SUCCESS, payload: response });
        dispatch({ type: POST_USER_QUADRIGA_ORDERS.PENDING });
        nonce = Date.now();
        postOpenOrdersQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, secret), nonce, book).then((response) => {
          dispatch({ type: POST_USER_QUADRIGA_ORDERS.SUCCESS, payload: response });
        }).catch((error) => {
          dispatch({ type: POST_USER_QUADRIGA_ORDERS.ERROR, payload: error });
        });
      }).catch((error) => {
        dispatch({ type: POST_USER_QUADRIGA_BALANCE.ERROR, payload: error });
      });
    }).catch((error) => {
      dispatch({ type: POST_USER_QUADRIGA_SELL_MARKET.ERROR, payload: error });
    });
  };
};

export const postUserBitcoinWalletAddressQuadriga = (key, sign, nonce) => {
  return dispatch => {
    dispatch({ type: POST_USER_QUADRIGA_BITCOIN_WALLET.PENDING });
    postBitcoinWalletAddressQuadriga(key, sign, nonce).then((response) => {
      dispatch({ type: POST_USER_QUADRIGA_BITCOIN_WALLET.SUCCESS, payload: { res: response, address: { acronym: 'btc', name: 'Bitcoin', receiveAddress: response.data } } });
    }).catch((error) => {
      dispatch({ type: POST_USER_QUADRIGA_BITCOIN_WALLET.ERROR, payload: error });
    });
  };
};

export const postUserBitcoinWalletWithdrawQuadriga = (key, sign, nonce, amount, address) => {
  return dispatch => {
    dispatch({ type: POST_USER_QUADRIGA_BITCOIN_WALLET_WITHDRAW.PENDING });
    postBitcoinWalletWithdrawQuadriga(key, sign, nonce, amount, address).then((response) => {
      dispatch({ type: POST_USER_QUADRIGA_BITCOIN_WALLET_WITHDRAW.SUCCESS, payload: response });
    }).catch((error) => {
      dispatch({ type: POST_USER_QUADRIGA_BITCOIN_WALLET_WITHDRAW.ERROR, payload: error });
    });
  };
};

export const postUserEthereumWalletAddressQuadriga = (key, sign, nonce) => {
  return dispatch => {
    dispatch({ type: POST_USER_QUADRIGA_ETHER_WALLET.PENDING });
    postEthereumWalletAddressQuadriga(key, sign, nonce).then((response) => {
      dispatch({ type: POST_USER_QUADRIGA_ETHER_WALLET.SUCCESS, payload: { res: response, address: { acronym: 'eth', name: 'Ethereum', receiveAddress: response.data } } });
    }).catch((error) => {
      dispatch({ type: POST_USER_QUADRIGA_ETHER_WALLET.ERROR, payload: error });
    });
  };
};

export const postUserEthereumWalletWithdrawQuadriga = (key, sign, nonce, amount, address) => {
  return dispatch => {
    dispatch({ type: POST_USER_QUADRIGA_ETHER_WALLET_WITHDRAW.PENDING });
    postEthereumWalletWithdrawQuadriga(key, sign, nonce, amount, address).then((response) => {
      dispatch({ type: POST_USER_QUADRIGA_ETHER_WALLET_WITHDRAW.SUCCESS, payload: response });
    }).catch((error) => {
      dispatch({ type: POST_USER_QUADRIGA_ETHER_WALLET_WITHDRAW.ERROR, payload: error });
    });
  };
};

export const postUserBitcoinCashWalletWithdrawQuadriga = (key, sign, nonce, amount, address) => {
  return dispatch => {
    dispatch({ type: POST_USER_QUADRIGA_BITCOIN_CASH_WALLET_WITHDRAW.PENDING });
    postBitcoinCashWalletWithdrawQuadriga(key, sign, nonce, amount, address).then((response) => {
      dispatch({ type: POST_USER_QUADRIGA_BITCOIN_CASH_WALLET_WITHDRAW.SUCCESS, payload: response });
    }).catch((error) => {
      dispatch({ type: POST_USER_QUADRIGA_BITCOIN_CASH_WALLET_WITHDRAW.ERROR, payload: error });
    });
  };
};

export const postUserBitcoinGoldWalletWithdrawQuadriga = (key, sign, nonce, amount, address) => {
  return dispatch => {
    dispatch({ type: POST_USER_QUADRIGA_BITCOIN_GOLD_WALLET_WITHDRAW.PENDING });
    postBitcoinGoldWalletWithdrawQuadriga(key, sign, nonce, amount, address).then((response) => {
      dispatch({ type: POST_USER_QUADRIGA_BITCOIN_GOLD_WALLET_WITHDRAW.SUCCESS, payload: response });
    }).catch((error) => {
      dispatch({ type: POST_USER_QUADRIGA_BITCOIN_GOLD_WALLET_WITHDRAW.ERROR, payload: error });
    });
  };
};

export const postUserLitecoinWalletWithdrawQuadriga = (key, sign, nonce, amount, address) => {
  return dispatch => {
    dispatch({ type: POST_USER_QUADRIGA_LITECOIN_WALLET_WITHDRAW.PENDING });
    postLitecoinWalletWithdrawQuadriga(key, sign, nonce, amount, address).then((response) => {
      dispatch({ type: POST_USER_QUADRIGA_LITECOIN_WALLET_WITHDRAW.SUCCESS, payload: response });
    }).catch((error) => {
      dispatch({ type: POST_USER_QUADRIGA_LITECOIN_WALLET_WITHDRAW.ERROR, payload: error });
    });
  };
};

export const postAccounScreenMainCall = (clientId, apiKey, secret) => { //need to guarantee that the api call doesnt return an error that the nonce cant be smaller than ... Making a combined async function
  let nonce;
  return dispatch => {
    dispatch({ type: POST_USER_QUADRIGA_BITCOIN_WALLET.PENDING });
    nonce = Date.now();
    postBitcoinWalletAddressQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, secret), nonce).then((response) => {
      dispatch({ type: POST_USER_QUADRIGA_BITCOIN_WALLET.SUCCESS, payload: { res: response, address: { type: 'quadriga', acronym: 'btc', name: 'Bitcoin', receiveAddress: response.data, book: 'btc_cad', bookTwo: 'btc_usd' } } });
      dispatch({ type: POST_USER_QUADRIGA_ETHER_WALLET.PENDING });
      nonce = Date.now();
      postEthereumWalletAddressQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, secret), nonce).then((response) => {
        dispatch({ type: POST_USER_QUADRIGA_ETHER_WALLET.SUCCESS, payload: { res: response, address: { type: 'quadriga', acronym: 'eth', name: 'Ethereum', receiveAddress: response.data, book: 'eth_cad', bookTwo: 'eth_btc' } } });
        dispatch({ type: POST_USER_QUADRIGA_BITCOIN_CASH_WALLET.PENDING });
        nonce = Date.now();
        postBitcoinCashWalletAddressQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, secret), nonce).then((response) => {
          dispatch({ type: POST_USER_QUADRIGA_BITCOIN_CASH_WALLET.SUCCESS, payload: { res: response, address: { type: 'quadriga', acronym: 'bch', name: 'Bitcoin Cash', receiveAddress: response.data, book: 'bch_cad', bookTwo: 'bch_btc' } } });
          dispatch({ type: POST_USER_QUADRIGA_BITCOIN_GOLD_WALLET.PENDING });
          nonce = Date.now();
          postBitcoinGoldWalletAddressQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, secret), nonce).then((response) => {
            dispatch({ type: POST_USER_QUADRIGA_BITCOIN_GOLD_WALLET.SUCCESS, payload: { res: response, address: { type: 'quadriga', acronym: 'btg', name: 'Bitcoin Gold', receiveAddress: response.data, book: 'btg_cad', bookTwo: 'btg_btc' } } });
            dispatch({ type: POST_USER_QUADRIGA_LITECOIN_WALLET.PENDING });
            nonce = Date.now();
            postLitecoinWalletAddressQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, secret), nonce).then((response) => {
              dispatch({ type: POST_USER_QUADRIGA_LITECOIN_WALLET.SUCCESS, payload: { res: response, address: { type: 'quadriga', acronym: 'ltc', name: 'Litecoin', receiveAddress: response.data, book: 'ltc_cad', bookTwo: 'ltc_btc' } } });
              dispatch({ type: POST_USER_QUADRIGA_BALANCE.PENDING });
              nonce = Date.now();
              postBalanceQuadriga(apiKey, encryptAuthenticationQuadriga(nonce, clientId, apiKey, secret), nonce).then((response) => {
                dispatch({ type: POST_USER_QUADRIGA_BALANCE.SUCCESS, payload: response });
              }).catch((error) => {
                dispatch({ type: POST_USER_QUADRIGA_BALANCE.ERROR, payload: error });
              });
            }).catch((error) => {
              dispatch({ type: POST_USER_QUADRIGA_LITECOIN_WALLET.ERROR, payload: error });
            });
          }).catch((error) => {
            dispatch({ type: POST_USER_QUADRIGA_BITCOIN_GOLD_WALLET.ERROR, payload: error });
          });
        }).catch((error) => {
          dispatch({ type: POST_USER_QUADRIGA_BITCOIN_CASH_WALLET.ERROR, payload: error });
        });
      }).catch((error) => {
        dispatch({ type: POST_USER_QUADRIGA_ETHER_WALLET.ERROR, payload: error });
      });
    }).catch((error) => {
      dispatch({ type: POST_USER_QUADRIGA_BITCOIN_WALLET.ERROR, payload: error });
    });
  };
};
