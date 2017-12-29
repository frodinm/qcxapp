import crypto from 'crypto'

//ex: const hmac = encryptAuthentication(Date.now(),clientId,apiKey,privateKey);

export const encryptAuthenticationQuadriga = (nonce,client,key,secret) =>{
    return crypto.createHmac('sha256',Buffer.from(`${secret}`)).update(nonce+client+key).digest('hex')
}

export const encryptAuthenticationChangelly = (message,secret) =>{
  return crypto.createHmac('sha512',Buffer.from(`${secret}`)).update(message).digest('hex')
}

export const getUnixTime = () => {
  return window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
}