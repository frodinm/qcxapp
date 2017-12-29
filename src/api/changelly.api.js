import axios from 'axios';
import {encryptAuthenticationChangelly, jsonHelper} from 'util'

const rootEndpoint = "https://api.changelly.com"
const apiKey = "db94a9df8aa94d4693d8571b4b1c1567"
const secret = "8608157459e02c7dc8c8eedaa36401957bce07aeaeebd80bd47c7f05673762c3"


export const getCurrenciesChangelly = () => {
    let message = `{"params": [], "jsonrpc": "2.0", "id": "frodinm", "method": "getCurrencies"}`
    return axios.request({

        url: `${rootEndpoint}`,
        method: 'POST',
        headers: {
            'api-key': `${apiKey}`,
            'sign': encryptAuthenticationChangelly(message, secret),
            'Content-type': 'application/json'
        },
        data: message
    })
}

export const getMinAmountChangelly = (fromCoin, toCoin) => {
    let message = `{"params": {"from": "${fromCoin}", "to": "${toCoin}"}, "jsonrpc": "2.0", "id": "frodinm", "method": "getMinAmount"}`

    return axios.request({
        baseURL: `${rootEndpoint}`,
        method: 'post',
        headers: {
            'api-key': `${apiKey}`,
            'sign': encryptAuthenticationChangelly(message, secret),
            'content-type': 'application/json'
        },
        data: message
    })
}

export const getExchangeAmountChangelly = (fromCoin, toCoin, amount) => {
    let message = `{"params": {"from": "${fromCoin}", "to": "${toCoin}", "amount": "${amount}"}, "jsonrpc": "2.0", "id": "frodinm", "method": "getExchangeAmount"}`
    return axios.request({
        baseURL: `${rootEndpoint}`,
        method: 'post',
        headers: {
            'api-key': `${apiKey}`,
            'sign': encryptAuthenticationChangelly(message, secret),
            'content-type': 'application/json'
        },
        data: message
    })
}

export const createTransactionChangelly = (fromCoin, toCoin, amount, address, extraId) => {
    let message;
    if (extraId === null) {
        message = `{"params": {"from": "${fromCoin}", "to": "${toCoin}", "amount": "${amount}", "address": "${address}", "extraId": ${extraId}}, "jsonrpc": "2.0", "id": "frodinm", "method": "createTransaction"}`
    } else {
        message = `{"params": {"from": "${fromCoin}", "to": "${toCoin}", "amount": "${amount}", "address": "${address}", "extraId": "${extraId}"}, "jsonrpc": "2.0", "id": "frodinm", "method": "createTransaction"}`
    }
    return axios.request({
        baseURL: `${rootEndpoint}`,
        method: 'post',
        headers: {
            'api-key': `${apiKey}`,
            'sign': encryptAuthenticationChangelly(message, secret),
            'content-type': 'application/json'
        },
        data: message
    })
}

export const createAddressPairChangelly = (fromCoin, toCoin, address, extraId) => {
    let message;
    if (extraId === null) {
        message = `{"params": {"from": "${fromCoin}", "to": "${toCoin}", "address": "${address}", "extraId": ${extraId}}, "jsonrpc": "2.0", "id": "frodinm", "method": "generateAddress"}`
    } else {
        message = `{"params": {"from": "${fromCoin}", "to": "${toCoin}", "address": "${address}", "extraId": "${extraId}"}, "jsonrpc": "2.0", "id": "frodinm", "method": "generateAddress"}`
    }
    return axios.request({
        baseURL: `${rootEndpoint}`,
        method: 'post',
        headers: {
            'api-key': `${apiKey}`,
            'sign': encryptAuthenticationChangelly(message, secret),
            'content-type': 'application/json'
        },
        data: message
    })
}

export const getTransactionsChangelly = (currency, address, extraId, limit, offset) => {
    let message;
    let currencyValue;
    let addressValue;
    let extraIdValue;
    let limitValue;
    let offsetValue;
    if (currency !== null) {
        currencyValue = `"${currency}"`
    } else {
        currencyValue = `null`
    }
    if (address !== null) {
        addressValue = `"${address}"`
    } else {
        addressValue = `null`
    }
    if (extraId !== null) {
        extraIdValue = `"${extraId}"`
    } else {
        extraIdValue = `null`
    }
    if (limit !== null) {
        limitValue = `${limit}`
    } else {
        limitValue = `null`
    }
    if (offset !== null) {
        offsetValue = `${offset}`
    } else {
        offsetValue = `null`
    }

    message = `{"params": {"currency": ${currencyValue}, "address": ${addressValue}, "extraId": ${extraIdValue}, "limit": ${limitValue}, "offset": ${offsetValue}}, "jsonrpc": "2.0", "id": "frodinm", "method": "getTransactions"}`
    return axios.request({
        baseURL: `${rootEndpoint}`,
        method: 'post',
        headers: {
            'api-key': `${apiKey}`,
            'sign': encryptAuthenticationChangelly(message, secret),
            'content-type': 'application/json'
        },
        data: message
    })
}

export const getStatusChangelly = (id) => {
    let message = `{"params": {"id": "${id}"}, "jsonrpc": "2.0", "id": "frodinm", "method": "getStatus"}`
    return axios.request({
        baseURL: `${rootEndpoint}`,
        method: 'post',
        headers: {
            'api-key': `${apiKey}`,
            'sign': encryptAuthenticationChangelly(message, secret),
            'content-type': 'application/json'
        },
        data: message
    })
}
