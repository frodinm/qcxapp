import {
  USER_AUTH,
  USER_SIGNOUT,
  USER_SETPIN,
  USER_SET_TEMP_PIN,
  USER_SET_FIRST_TIME,
} from 'users'

const initialState = {
  isLoggedIn: false,
  authenticated: false,
  isLoggingIn: false,
  isLogginOut:false,
  isPinSet: false,
  isFirstTimeUser:true,
  isFetchingCurrencies:false,
  changelly:null,
  toConfirmPin:'',
  pin:'',
  clientId: '',
  apiKey:'',
  privateKey:'',
  error: null
}

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_AUTH.SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isAuthenticate: true,
        clientId: action.payload.clientId,
        apiKey: action.payload.apikey,
        privateKey:action.payload.privateKey,
        isLoggingIn: false,
      }
    case USER_AUTH.PENDING:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: true,
      }
    case USER_AUTH.ERROR:
      return {
        ...state,
        isLoggedIn: false,
        authenticated: false,
        isLoggingIn: false,
      }
    case USER_SIGNOUT.SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        isAuthenticate: false,
        clientId: '',
        apiKey: '',
        privateKey:''
      }
    case USER_SIGNOUT.PENDING:
      return {
        ...state,
        isLogginOut: true,
      }
    case USER_SIGNOUT.ERROR:
      return {
        ...state,
      }
    case USER_SETPIN.SUCCESS:
      return {
        ...state,
        pin: action.payload.pin,
        isPinSet: true,

      }
    case USER_SETPIN.PENDING:
      return {
        ...state,
        isPinSet: false,
      }
    case USER_SETPIN.ERROR:
      return {
        ...state,
        isPinSet: false,
      }
      case USER_SET_TEMP_PIN.SUCCESS:
      return {
        ...state,
        toConfirmPin: action.payload.toConfirmPin,
        isPinSet: true,
      }
    case USER_SET_TEMP_PIN.PENDING:
      return {
        ...state,
        isPinSet: false,
      }
    case USER_SET_TEMP_PIN.ERROR:
      return {
        ...state,
        isPinSet: false,
      }
    case USER_SET_FIRST_TIME.SUCCESS:
      return {
        ...state,
        isFirstTimeUser: action.payload,
      }


    default:
      return state
  }
}