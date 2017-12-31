import crypto from 'crypto'

//ex: const hmac = encryptAuthentication(Date.now(),clientId,apiKey,privateKey);

export const encryptAuthenticationQuadriga = (nonce,client,key,secret) =>{
    return crypto.createHmac('sha256',Buffer.from(`${secret}`)).update(nonce+client+key).digest('hex')
}

export const encryptAuthenticationChangelly = (message,secret) =>{
  return crypto.createHmac('sha512',Buffer.from(`${secret}`)).update(message).digest('hex')
}

export const convertunixTime = (unixTime) => {
  let date = new Date(unixTime)

  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds:date.getSeconds(),
    day: date.getDate(),
    month: date.getMonth(),
    fullYear: date.getFullYear(),
  }
}