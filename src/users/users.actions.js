import { 
  USER_AUTH,
  USER_SETPIN,
  USER_SET_TEMP_PIN,
  USER_SET_FIRST_TIME
} from 'users'

export const setTempPin = (pin) =>{
  return dispatch => {
    dispatch({type: USER_SET_TEMP_PIN.SUCCESS, payload:{
      toConfirmPin: pin
    }})
  }
}

export const setPin = (pin) =>{
  return dispatch => {
    dispatch({type: USER_SETPIN.SUCCESS, payload:{
      pin: pin
    }})
  }
}

export const setUserFirstTime = (value) =>{
  return dispatch => {
    dispatch({type: USER_SET_FIRST_TIME.SUCCESS, payload: value})
  }
}


export const userLogin = (clientId,apiKey,privateKey) => {
  return dispatch => {
      dispatch({type:USER_AUTH.PENDING})
      dispatch({type:USER_AUTH.SUCCESS,payload:{
        clientId:clientId,
        apikey:apiKey,
        privateKey:privateKey
      }})
  }
}

export const getCurrenciesExchange = (clientId,apiKey,privateKey) => {
  return dispatch => {
    dispatch({type:USER_AUTH.PENDING})
    getCurrenciesChangelly()
    dispatch({type:USER_AUTH.SUCCESS,payload:{
      clientId:clientId,
      apikey:apiKey,
      privateKey:privateKey
    }})
  }
}