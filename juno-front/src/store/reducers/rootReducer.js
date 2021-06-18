import { combineReducers } from 'redux'
import loadingReducer from './loading.reducer'
import notifyReducer from './notify.reducer'
import alertReducer from './alert.reducer'
import paymentReducer from './payment.reducer'
import productsReducer from './products.reducer'
import cartReducer from './cart.reducer'
import authReducer from './auth.reducer'
import registerReducer from './register.reducer'

const rootReducer = combineReducers({
    loadingReducer,
    notifyReducer,
    alertReducer,
    paymentReducer,
    productsReducer,
    cartReducer,
    authReducer,
    registerReducer
})

export default rootReducer;