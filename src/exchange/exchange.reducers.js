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
import {postChangellyExchangeAmount} from "./exchange.actions";

const initialState = {
    isGettingCurrencies: false,
    isGettingMinAmount: false,
    isGettingExchangeAmount: false,
    isCreatingTransaction: false,
    isGettingTransactions: false,
    isGettingStatus: false,
    isCreatingAddressPair: false,
    changellyExchangeAmount: null,
    changellyCurrencies: null,
    changellyMinAmount: null,
    changellyCreateTransaction: null,
    changellyCreateAddressPair:null,
    changellyTransactions: null,
    changellyAddressesUsed: [],
    changellyAddressPairs: [],
    changellyStatus: null,
    selectedFromTokenLogo: null,
    selectedToTokenLogo: null,
    tokenOneTextInputValue: '',
    tokenTwoTextInputValue: '',
    fromAmount: '',
    error: null,
}

export const ExchangeReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_CHANGELLY_CURRENCIES.PENDING:
            return {
                ...state,
                isGettingCurrencies: true,
            }
        case POST_CHANGELLY_CURRENCIES.SUCCESS:
            return {
                ...state,
                isGettingCurrencies: false,
                changellyCurrencies: action.payload.data.result,
            }
        case POST_CHANGELLY_CURRENCIES.ERROR:
            return {
                ...state,
                isGettingCurrencies: false,
                error: action.payload,
            }
        case POST_CHANGELLY_MINIMUM_AMOUNT.PENDING:
            return {
                ...state,
                isGettingMinAmount: true,
            }
        case POST_CHANGELLY_MINIMUM_AMOUNT.SUCCESS:
            return {
                ...state,
                isGettingMinAmount: false,
                changellyMinAmount: action.payload,
            }
        case POST_CHANGELLY_MINIMUM_AMOUNT.ERROR:
            return {
                ...state,
                isGettingMinAmount: false,
                error: action.payload,
            }
        case POST_CHANGELLY_EXCHANGE_AMOUNT.PENDING:
            return {
                ...state,
                isGettingExchangeAmount: true,
            }
        case POST_CHANGELLY_EXCHANGE_AMOUNT.SUCCESS:
            return {
                ...state,
                isGettingExchangeAmount: false,
                changellyExchangeAmount: action.payload.res,
                fromAmount:action.payload.fromAmount,
            }
        case POST_CHANGELLY_EXCHANGE_AMOUNT.ERROR:
            return {
                ...state,
                isGettingExchangeAmount: false,
                error: action.payload,
            }
        case POST_CHANGELLY_CREATE_TRANSACTION.PENDING:
            return {
                ...state,
                isCreatingTransaction: true,
            }
        case POST_CHANGELLY_CREATE_TRANSACTION.SUCCESS:
            return {
                ...state,
                isCreatingTransaction: false,
                changellyCreateTransaction: action.payload,
                changellyAddressesUsed: [...state.changellyAddressesUsed,action.payload.data.result.payoutAddress].filter((value,index,array)=>{return array.indexOf(value) === index}),

            }
        case POST_CHANGELLY_CREATE_TRANSACTION.ERROR:
            return {
                ...state,
                isCreatingTransaction: false,
                error: action.payload,
            }
        case POST_CHANGELLY_CREATE_ADDRESS_PAIR.PENDING:
            return {
                ...state,
                isCreatingTransaction: true,
            }
        case POST_CHANGELLY_CREATE_ADDRESS_PAIR.SUCCESS:
            return {
                ...state,
                isCreatingTransaction: false,
                changellyCreateAddressPair: action.payload,
                changellyAddressPairs: [...state.changellyAddressPairs,action.payload.data.result.address].filter((value,index,array)=>{return array.indexOf(value) === index}),

            }
        case POST_CHANGELLY_CREATE_ADDRESS_PAIR.ERROR:
            return {
                ...state,
                isCreatingTransaction: false,
                error: action.payload,
            }
        case POST_CHANGELLY_TRANSACTIONS.PENDING:
            return {
                ...state,
                isGettingTransactions: true,
            }
        case POST_CHANGELLY_TRANSACTIONS.SUCCESS:
            return {
                ...state,
                isGettingTransactions: false,
                changellyTransactions: action.payload,
            }
        case POST_CHANGELLY_TRANSACTIONS.ERROR:
            return {
                ...state,
                isGettingTransactions: false,
                error: action.payload,
            }
        case POST_CHANGELLY_STATUS.PENDING:
            return {
                ...state,
                isGettingStatus: true,
            }
        case POST_CHANGELLY_STATUS.SUCCESS:
            return {
                ...state,
                isGettingStatus: false,
                changellyStatus: action.payload,
            }
        case POST_CHANGELLY_STATUS.ERROR:
            return {
                ...state,
                isGettingStatus: false,
                error: action.payload,
            }
        case SET_FROM_TOKEN_LOGO.SUCCESS:
            return {
                ...state,
                selectedFromTokenLogo: action.payload,
            }
        case SET_TO_TOKEN_LOGO.SUCCESS:
            return {
                ...state,
                selectedToTokenLogo: action.payload,
            }
        case SET_TOKEN_ONE_TEXT_VALUE.SUCCESS:
            return {
                ...state,
                tokenOneTextInputValue: action.payload,
            }
        case SET_TOKEN_TWO_TEXT_VALUE.SUCCESS:
            return {
                ...state,
                tokenTwoTextInputValue: action.payload,
            }
        case SET_TOKEN_FROM_AMOUNT.SUCCESS:
            return {
                ...state,
                fromAmount: action.payload,
            }


        default:
            return state
    }
}
