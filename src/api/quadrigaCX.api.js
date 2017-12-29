import axios from 'axios';
const rootEndpoint = "https://api.quadrigacx.com/v2"


export const getTicketsQuadriga = (ticket) => {
  return axios.request({
    baseURL: `${rootEndpoint}`,
    url:`/ticker?book=${ticket}`
  })
}

export const getOrderBookQuadriga = (book,group) => {
  return axios.request({
    baseURL: `${rootEndpoint}`,
    url:'/order_book',
    params:{
      book:`${book}`,
      group:`${group}`
    }
  })
}

export const getTransactionsQuadriga = (book,time) => {
  return axios.request({
    baseURL: `${rootEndpoint}`,
    url:'/transactions',
    params:{
      book:`${book}`,
      time:`${time}`
    }
  })
}

export const postBalanceQuadriga = (key,signature,nonce) => {
  return axios.request({
    baseURL: `${rootEndpoint}`,
    url:'/balance',
    method:'post',
    data:{
      key: `${key}`,
      signature: `${signature}`,
      nonce: `${nonce}`
    }
  })
}

export const postUserTransactionsQuadriga = (key,signature,nonce,offset,limit,sort,book) => {
  return axios.request({
    baseURL: `${rootEndpoint}`,
    url:'/user_transactions',
    method:'post',
    data:{
      key: `${key}`,
      signature: `${signature}`,
      nonce: `${nonce}`,
      offset: `${offset}`,
      limit: `${limit}`,
      sort: `${sort}`,
      book: `${book}`
    }
  })
}

export const postOpenOrdersQuadriga = (key,signature,nonce,book) => {
  return axios.request({
    baseURL: `${rootEndpoint}`,
    url:'/open_orders',
    method:'post',
    data:{
      key: `${key}`,
      signature: `${signature}`,
      nonce: `${nonce}`,
      book:`${book}`
    }
  })
}


export const postLookupOrderQuadriga = (key,signature,nonce,id) => {
  return axios.request({
    baseURL: `${rootEndpoint}`,
    url:'/lookup_order',
    method:'post',
    data:{
      key: `${key}`,
      signature: `${signature}`,
      nonce: `${nonce}`,
      id: `${id}`
    }
  })
}

export const postCancelOrderQuadriga = (key,signature,nonce,offset,id) => {
  return axios.request({
    baseURL: `${rootEndpoint}`,
    url:'/cancel_order',
    method:'post',
    data:{
      key: `${key}`,
      signature: `${signature}`,
      nonce: `${nonce}`,
      id: `${id}`
    }
  })
}

export const postBuyAtPriceQuadriga = (key,signature,nonce,amount,price,book) => {
  return axios.request({
    baseURL: `${rootEndpoint}`,
    url:'/buy',
    method:'post',
    data:{
      key: `${key}`,
      signature: `${signature}`,
      nonce: `${nonce}`,
      amount:`${amount}`,
      price:`${price}`, //price to get in
      book:`${book}`
    }
  })
}

export const postBuyOrderQuadrigaMarket = (key,signature,nonce,amount,book) => {
  return axios.request({
    baseURL: `${rootEndpoint}`,
    url:'/buy',
    method:'post',
    data:{
      key: `${key}`,
      signature: `${signature}`,
      nonce: `${nonce}`,
      amount:`${amount}`,
      book:`${book}`
    }
  })
}

export const postSellLimitQuadriga = (key,signature,nonce,amount,price,book) => {
  return axios.request({
    baseURL: `${rootEndpoint}`,
    url:'/sell',
    method:'post',
    data:{
      key: `${key}`,
      signature: `${signature}`,
      nonce: `${nonce}`,
      amount:`${amount}`,
      price:`${price}`,//price to sell at
      book:`${book}`
    }
  })
}

export const postSellMarketOrderQuadriga = (key,signature,nonce,amount,book) => {
  return axios.request({
    baseURL: `${rootEndpoint}`,
    url:'/sell',
    method:'post',
    data:{
      key: `${key}`,
      signature: `${signature}`,
      nonce: `${nonce}`,
      amount:`${amount}`,
      book:`${book}`
    }
  })
}
 //wallets

export const postBitcoinWalletAddressQuadriga = (key,signature,nonce) => {
  return axios.request({
    baseURL: `${rootEndpoint}`,
    url:'/bitcoin_deposit_address',
    method:'post',
    data:{
      key: `${key}`,
      signature: `${signature}`,
      nonce: `${nonce}`
    }
  })
}

export const postBitcoinWalletWithdrawQuadriga = (key,signature,nonce,amount,address) => {
  return axios.request({
    baseURL: `${rootEndpoint}`,
    url:'/bitcoin_withdrawal',
    method:'post',
    data:{
      key: `${key}`,
      signature: `${signature}`,
      nonce: `${nonce}`,
      amount:`${amount}`,
      address:`${address}`
    }
  })
}

export const postEthereumWalletAddressQuadriga = (key,signature,nonce) => {
  return axios.request({
    baseURL: `${rootEndpoint}`,
    url:'/ether_deposit_address',
    method:'post',
    data:{
      key: `${key}`,
      signature: `${signature}`,
      nonce: `${nonce}`
    }
  })
}

export const postEthereumWalletWithdrawQuadriga = (key,signature,nonce,amount,address) => {
  return axios.request({
    baseURL: `${rootEndpoint}`,
    url:'/ether_withdrawal',
    method:'post',
    data:{
      key: `${key}`,
      signature: `${signature}`,
      nonce: `${nonce}`,
      amount:`${amount}`,
      address:`${address}`
    }
  })
}

export const postBitcoinCashWalletAddressQuadriga = (key,signature,nonce) => {
  return axios.request({
    baseURL: `${rootEndpoint}`,
    url:'/bitcoincash_deposit_address',
    method:'post',
    data:{
      key: `${key}`,
      signature: `${signature}`,
      nonce: `${nonce}`
    }
  })
}

export const postBitcoinCashWalletWithdrawQuadriga = (key,signature,nonce,amount,address) => {
  return axios.request({
    baseURL: `${rootEndpoint}`,
    url:'/bitcoincash_withdrawal',
    method:'post',
    data:{
      key: `${key}`,
      signature: `${signature}`,
      nonce: `${nonce}`,
      amount:`${amount}`,
      address:`${address}`
    }
  })
}

export const postBitcoinGoldWalletAddressQuadriga = (key,signature,nonce) => {
  return axios.request({
    baseURL: `${rootEndpoint}`,
    url:'/bitcoingold_deposit_address',
    method:'post',
    data:{
      key: `${key}`,
      signature: `${signature}`,
      nonce: `${nonce}`
    }
  })
}

export const postBitcoinGoldWalletWithdrawQuadriga = (key,signature,nonce,amount,address) => {
  return axios.request({
    baseURL: `${rootEndpoint}`,
    url:'/bitcoingold_withdrawal',
    method:'post',
    data:{
      key: `${key}`,
      signature: `${signature}`,
      nonce: `${nonce}`,
      amount:`${amount}`,
      address:`${address}`
    }
  })
}

export const postLitecoinWalletAddressQuadriga = (key,signature,nonce) => {
  return axios.request({
    baseURL: `${rootEndpoint}`,
    url:'/litecoin_deposit_address',
    method:'post',
    data:{
      key: `${key}`,
      signature: `${signature}`,
      nonce: `${nonce}`
    }
  })
}

export const postLitecoinWalletWithdrawQuadriga = (key,signature,nonce,amount,address) => {
  return axios.request({
    baseURL: `${rootEndpoint}`,
    url:'/litecoin_withdrawal',
    method:'post',
    data:{
      key: `${key}`,
      signature: `${signature}`,
      nonce: `${nonce}`,
      amount:`${amount}`,
      address:`${address}`
    }
  })
}