import { actionTypes } from '../actions/payment.action'

const initialState = {
    transaction: {},
    success: false
}

const paymentReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.SHOW:
        return { 
            ...state, 
            transaction: payload 
        }
    
    case actionTypes.SUCCESS:
        return { 
            ...state, 
            success: payload 
        }
    default:
        return state
    }
}

export default paymentReducer
