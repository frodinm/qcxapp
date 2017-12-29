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
  POST_USER_QUADRIGA_BUY_ORDER_MARKET,
  POST_USER_QUADRIGA_SELL_LIMIT,
  POST_USER_QUADRIGA_SELL_MARKET,
  POST_USER_QUADRIGA_BITCOIN_WALLET,
  POST_USER_QUADRIGA_BITCOIN_WITHDRAW,
  POST_USER_QUADRIGA_ETHER_WALLET,
  POST_USER_QUADRIGA_ETHER_WITHDRAW
} from 'account'

const initialState = {
  isGettingQuadrigaTicker: false,
  isGettingQuadrigaTransactions:false,
  isGettingQuadrigaOrders:false,
  isGettingUserQuadrigaTransactions:false,
  isGettingUserQuadrigaBalance:false,
  isGettingUserQuadrigaOrders:false,
  isGettingUserQuadrigaLookUpOrders:false,
  isGettingUserQuadrigaBuyAt:false,
  isGettingUserQuadrigaBuyMarket:false,
  isGettingUserQuadrigaSellLimit:false,
  isGettingUserQuadrigaSellMarket:false,
  isGettingUserQuadrigaBitcoinWallet:false,
  isGettingUserQuadrigaBitcoinWithdraw:false,
  isGettingUserQuadrigaEtherWallet:false,
  isGettingUserQuadrigaEtherWalletWithdraw:false,
  isCancellingOrder:false,
  quadrigaUserBalance:null,
  quadrigaUserTransactions:null,
  quadrigaOrders:null,
  quadrigaTransactions:null,
  quadrigaUserOrders:null,
  quadrigaUserOrdersLookup:null,
  quadrigaUserCancelOrder:null,
  quadrigaUserBuyAt:null,
  quadrigaUserBuyMarket:null,
  quadrigaUserSellLimit:null,
  quadrigaUserSellMarket:null,
  quadrigaUserBitcoinWallet:null,
  quadrigaUserBitcoinWalletWithdraw:null,
  quadrigaUserEtherWallet:null,
  quadrigaUserEtherWalletWithdraw:null,
  userWallets:[],
  quadrigaTickerBTC: null,
  quadrigaTickerLTC:null,
  quadrigaTickerBCH:null,
  quadrigaTickerETH:null,
  quadrigaTickerBTG:null,
  error: null,
}

export const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUADRIGA_TICKER_BTC.PENDING:
      return {
        ...state,
        isGettingQuadrigaTicker: true,
      }
    case GET_QUADRIGA_TICKER_BTC.SUCCESS:
      return {
        ...state,
        isGettingQuadrigaTicker: false,
        quadrigaTickerBTC: action.payload,
      }
    case GET_QUADRIGA_TICKER_BTC.ERROR:
      return {
        ...state,
        isGettingQuadrigaTicker: false,
        error: action.payload,
      }
      case GET_QUADRIGA_TICKER_ETH.PENDING:
      return {
        ...state,
        isGettingQuadrigaTicker: true,
      }
    case GET_QUADRIGA_TICKER_ETH.SUCCESS:
      return {
        ...state,
        isGettingQuadrigaTicker: false,
        quadrigaTickerETH: action.payload,
      }
    case GET_QUADRIGA_TICKER_ETH.ERROR:
      return {
        ...state,
        isGettingQuadrigaTicker: false,
        error: action.payload,
      }
      case GET_QUADRIGA_TICKER_BCH.PENDING:
      return {
        ...state,
        isGettingQuadrigaTicker: true,
      }
    case GET_QUADRIGA_TICKER_BCH.SUCCESS:
      return {
        ...state,
        isGettingQuadrigaTicker: false,
        quadrigaTickerBCH: action.payload,
      }
    case GET_QUADRIGA_TICKER_BCH.ERROR:
      return {
        ...state,
        isGettingQuadrigaTicker: false,
        error: action.payload,
      }
      case GET_QUADRIGA_TICKER_BTG.PENDING:
      return {
        ...state,
        isGettingQuadrigaTicker: true,
      }
    case GET_QUADRIGA_TICKER_BTG.SUCCESS:
      return {
        ...state,
        isGettingQuadrigaTicker: false,
        quadrigaTickerBTG: action.payload,
      }
    case GET_QUADRIGA_TICKER_BTG.ERROR:
      return {
        ...state,
        isGettingQuadrigaTicker: false,
        error: action.payload,
      }
      case GET_QUADRIGA_TICKER_LTC.PENDING:
      return {
        ...state,
        isGettingQuadrigaTicker: true,
      }
    case GET_QUADRIGA_TICKER_LTC.SUCCESS:
      return {
        ...state,
        isGettingQuadrigaTicker: false,
        quadrigaTickerLTC: action.payload,
      }
    case GET_QUADRIGA_TICKER_LTC.ERROR:
      return {
        ...state,
        isGettingQuadrigaTicker: false,
        error: action.payload,
      }
    case GET_QUADRIGA_ORDERS.PENDING:
      return {
        ...state,
        isGettingQuadrigaOrders: true,
      }
    case GET_QUADRIGA_ORDERS.SUCCESS:
      return {
        ...state,
        isGettingQuadrigaOrders: false,
        quadrigaOrders: action.payload,
      }
    case GET_QUADRIGA_ORDERS.ERROR:
      return {
        ...state,
        isGettingQuadrigaOrders: false,
        error: action.payload,
      }
    case GET_QUADRIGA_TRANSACTIONS.PENDING:
      return {
        ...state,
        isGettingQuadrigaTransactions: true,
      }
    case GET_QUADRIGA_TRANSACTIONS.SUCCESS:
      return {
        ...state,
        isGettingQuadrigaTransactions: false,
        quadrigaTransactions: action.payload.data.slice(0,20),
      }
    case GET_QUADRIGA_TRANSACTIONS.ERROR:
      return {
        ...state,
        isGettingQuadrigaTransactions: false,
        error: action.payload,
      }
    case POST_USER_QUADRIGA_TRANSACTIONS.PENDING:
      return {
        ...state,
        isGettingUserQuadrigaTransactions: true,
      }
    case POST_USER_QUADRIGA_TRANSACTIONS.SUCCESS:
      return {
        ...state,
        isGettingUserQuadrigaTransactions: false,
        quadrigaUserTransactions: action.payload,
      }
    case POST_USER_QUADRIGA_TRANSACTIONS.ERROR:
      return {
        ...state,
        isGettingUserQuadrigaTransactions: false,
        error: action.payload,
      }
    case POST_USER_QUADRIGA_BALANCE.PENDING:
      return {
        ...state,
        isGettingUserQuadrigaBalance: true,
      }
    case POST_USER_QUADRIGA_BALANCE.SUCCESS:
      return {
        ...state,
        isGettingUserQuadrigaBalance: false,
        quadrigaUserBalance: action.payload,
      }
    case POST_USER_QUADRIGA_BALANCE.ERROR:
      return {
        ...state,
        isGettingUserQuadrigaBalance: false,
        error: action.payload,
      }
      case POST_USER_QUADRIGA_ORDERS.PENDING:
      return {
        ...state,
        isGettingUserQuadrigaOrders: true,
      }
    case POST_USER_QUADRIGA_ORDERS.SUCCESS:
      return {
        ...state,
        isGettingUserQuadrigaOrders: false,
        quadrigaUserOrders: action.payload,
      }
    case POST_USER_QUADRIGA_ORDERS.ERROR:
      return {
        ...state,
        isGettingUserQuadrigaOrders: false,
        error: action.payload,
      }
      case POST_USER_QUADRIGA_LOOKUP_ORDERS.PENDING:
      return {
        ...state,
        isGettingUserQuadrigaLookUpOrders: true,
      }
    case POST_USER_QUADRIGA_LOOKUP_ORDERS.SUCCESS:
      return {
        ...state,
        isGettingUserQuadrigaLookUpOrders: false,
        quadrigaUserOrdersLookup: action.payload,
      }
    case POST_USER_QUADRIGA_LOOKUP_ORDERS.ERROR:
      return {
        ...state,
        isGettingUserQuadrigaLookUpOrders: false,
        error: action.payload,
      }
    case POST_USER_QUADRIGA_CANCEL_ORDERS.PENDING:
      return {
        ...state,
        isCancellingOrder: true,
      }
    case POST_USER_QUADRIGA_CANCEL_ORDERS.SUCCESS:
      return {
        ...state,
        isCancellingOrder: false,
        quadrigaUserCancelOrder: action.payload,
      }
    case POST_USER_QUADRIGA_CANCEL_ORDERS.ERROR:
      return {
        ...state,
        isCancellingOrder: false,
        error: action.payload,
      }
    case POST_USER_QUADRIGA_BUY_AT_PRICE.PENDING:
      return {
        ...state,
        isGettingUserQuadrigaBuyAt: true,
      }
    case POST_USER_QUADRIGA_BUY_AT_PRICE.SUCCESS:
      return {
        ...state,
        isGettingUserQuadrigaBuyAt: false,
        quadrigaUserBuyAt: action.payload,
      }
    case POST_USER_QUADRIGA_BUY_AT_PRICE.ERROR:
      return {
        ...state,
        isGettingUserQuadrigaBuyAt: false,
        error: action.payload,
      }
      case POST_USER_QUADRIGA_BUY_ORDER_MARKET.PENDING:
      return {
        ...state,
        isGettingUserQuadrigaBuyMarket: true,
      }
    case POST_USER_QUADRIGA_BUY_ORDER_MARKET.SUCCESS:
      return {
        ...state,
        isGettingUserQuadrigaBuyMarket: false,
        quadrigaUserBuyMarket: action.payload,
      }
    case POST_USER_QUADRIGA_BUY_ORDER_MARKET.ERROR:
      return {
        ...state,
        isGettingUserQuadrigaBuyMarket: false,
        error: action.payload,
      }
    case POST_USER_QUADRIGA_SELL_LIMIT.PENDING:
      return {
        ...state,
        isGettingUserQuadrigaSellLimit: true,
      }
    case POST_USER_QUADRIGA_SELL_LIMIT.SUCCESS:
      return {
        ...state,
        isGettingUserQuadrigaSellLimit: false,
        quadrigaUserSellLimit: action.payload,
      }
    case POST_USER_QUADRIGA_SELL_LIMIT.ERROR:
      return {
        ...state,
        isGettingUserQuadrigaSellLimit: false,
        error: action.payload,
      }
    case POST_USER_QUADRIGA_SELL_MARKET.PENDING:
      return {
        ...state,
        isGettingUserQuadrigaSellMarket: true,
      }
    case POST_USER_QUADRIGA_SELL_MARKET.SUCCESS:
      return {
        ...state,
        isGettingUserQuadrigaSellMarket: false,
        quadrigaUserSellMarket: action.payload,
      }
    case POST_USER_QUADRIGA_SELL_MARKET.ERROR:
      return {
        ...state,
        isGettingUserQuadrigaSellMarket: false,
        error: action.payload,
      }
    case POST_USER_QUADRIGA_BITCOIN_WALLET.PENDING:
      return {
        ...state,
        isGettingUserQuadrigaBitcoinWallet: true,
      }
    case POST_USER_QUADRIGA_BITCOIN_WALLET.SUCCESS:
      return {
        ...state,
        isGettingUserQuadrigaBitcoinWallet: false,
        quadrigaUserBitcoinWallet: action.payload.res,
        userWallets: [...state.userWallets,action.payload.address]

      }
    case POST_USER_QUADRIGA_BITCOIN_WALLET.ERROR:
      return {
        ...state,
        isGettingUserQuadrigaBitcoinWallet: false,
        error: action.payload,
      }
    case POST_USER_QUADRIGA_BITCOIN_WITHDRAW.PENDING:
      return {
        ...state,
        isGettingUserQuadrigaBitcoinWithdraw: true,
      }
    case POST_USER_QUADRIGA_BITCOIN_WITHDRAW.SUCCESS:
      return {
        ...state,
        isGettingUserQuadrigaBitcoinWithdraw: false,
        quadrigaUserBitcoinWalletWithdraw: action.payload,
      }
    case POST_USER_QUADRIGA_BITCOIN_WITHDRAW.ERROR:
      return {
        ...state,
        isGettingUserQuadrigaBitcoinWithdraw: false,
        error: action.payload,
      }
    case POST_USER_QUADRIGA_ETHER_WALLET.PENDING:
      return {
        ...state,
        isGettingUserQuadrigaEtherWallet: true,
      }
    case POST_USER_QUADRIGA_ETHER_WALLET.SUCCESS:
      return {
        ...state,
        isGettingUserQuadrigaEtherWallet: false,
        quadrigaUserEtherWallet: action.payload.res,
        userWallets: [...state.userWallets,action.payload.address]
      }
    case POST_USER_QUADRIGA_ETHER_WALLET.ERROR:
      return {
        ...state,
        isGettingUserQuadrigaEtherWallet: false,
        error: action.payload,
      }
    case POST_USER_QUADRIGA_ETHER_WITHDRAW.PENDING:
      return {
        ...state,
        isGettingUserQuadrigaEtherWalletWithdraw: true,
      }
    case POST_USER_QUADRIGA_ETHER_WITHDRAW.SUCCESS:
      return {
        ...state,
        isGettingUserQuadrigaEtherWalletWithdraw: false,
        quadrigaUserEtherWalletWithdraw: action.payload,
      }
    case POST_USER_QUADRIGA_ETHER_WITHDRAW.ERROR:
      return {
        ...state,
        isGettingUserQuadrigaEtherWalletWithdraw: false,
        error: action.payload,
      }
    default:
      return state
  }
}
