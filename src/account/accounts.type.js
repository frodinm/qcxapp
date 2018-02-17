import {createAction} from 'util'

export const GET_QUADRIGA_TICKERS = createAction('GET_QUADRIGA_TICKERS');
export const GET_QUADRIGA_ORDERS = createAction('GET_QUADRIGA_ORDERS');
export const GET_QUADRIGA_TRANSACTIONS = createAction('GET_QUADRIGA_TRANSACTIONS');
export const POST_USER_QUADRIGA_BALANCE = createAction('POST_USER_QUADRIGA_BALANCE');
export const POST_USER_QUADRIGA_TRANSACTIONS = createAction('POST_USER_QUADRIGA_TRANSACTIONS');
export const POST_USER_QUADRIGA_ORDERS = createAction('POST_USER_QUADRIGA_ORDERS');
export const POST_USER_QUADRIGA_LOOKUP_ORDERS = createAction('POST_USER_QUADRIGA_LOOKUP_ORDERS');
export const POST_USER_QUADRIGA_CANCEL_ORDERS = createAction('POST_USER_QUADRIGA_CANCEL_ORDERS');
export const POST_USER_QUADRIGA_BUY_AT_PRICE = createAction('POST_USER_QUADRIGA_BUY_AT_PRICE');
export const POST_USER_QUADRIGA_BUY_ORDER_MARKET = createAction('POST_USER_QUADRIGA_BUY_ORDER_MARKET');
export const POST_USER_QUADRIGA_SELL_LIMIT = createAction('POST_USER_QUADRIGA_SELL_LIMIT');
export const POST_USER_QUADRIGA_SELL_MARKET = createAction('POST_USER_QUADRIGA_SELL_MARKET');
export const POST_USER_QUADRIGA_BITCOIN_WALLET = createAction('POST_USER_QUADRIGA_BITCOIN_WALLET');
export const POST_USER_QUADRIGA_BITCOIN_WALLET_WITHDRAW = createAction('POST_USER_QUADRIGA_BITCOIN_WALLET_WITHDRAW');
export const POST_USER_QUADRIGA_ETHER_WALLET = createAction('POST_USER_QUADRIGA_ETHER_WALLET');
export const POST_USER_QUADRIGA_ETHER_WALLET_WITHDRAW = createAction('POST_USER_QUADRIGA_ETHER_WALLET_WITHDRAW');
export const POST_USER_QUADRIGA_BITCOIN_CASH_WALLET = createAction('POST_USER_QUADRIGA_BITCOIN_CASH_WALLET');
export const POST_USER_QUADRIGA_BITCOIN_CASH_WALLET_WITHDRAW = createAction('POST_USER_QUADRIGA_BITCOIN_CASH_WALLET_WITHDRAW');
export const POST_USER_QUADRIGA_BITCOIN_GOLD_WALLET = createAction('POST_USER_QUADRIGA_BITCOIN_GOLD_WALLET');
export const POST_USER_QUADRIGA_BITCOIN_GOLD_WALLET_WITHDRAW = createAction('POST_USER_QUADRIGA_BITCOIN_GOLD_WALLET_WITHDRAW');
export const POST_USER_QUADRIGA_LITECOIN_WALLET = createAction('POST_USER_QUADRIGA_LITECOIN_WALLET');
export const POST_USER_QUADRIGA_LITECOIN_WALLET_WITHDRAW = createAction('POST_USER_QUADRIGA_LITECOIN_WALLET_WITHDRAW');
export const POST_USER_QUADRIGA_ACCOUNT_DATA = createAction('POST_USER_QUADRIGA_ACCOUNT_DATA');
export const SET_TRADING_BOOK = createAction('SET_TRADING_BOOK');
export const SIGN_OUT_ACCOUNT = createAction('SIGN_OUT_ACCOUNT');
