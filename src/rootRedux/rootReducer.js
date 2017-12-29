import { combineReducers }from 'redux';
import {UserReducer} from 'users'
import {AccountReducer} from 'account'
import {ExchangeReducer} from 'exchange'

export const rootReducer = combineReducers({
  user: UserReducer,
  account: AccountReducer,
  exchange: ExchangeReducer
})

