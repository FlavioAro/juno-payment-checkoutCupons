import { actionTypes } from '../actions/register.action'

const initialState = {
    user: {
        'name': '',
        'email': '',
        'phone': '',
        'cpf': ''
    },
    success: false,
    error: {}
}

const registerReducer =  (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.CHANGE:
        return { 
            ...state, 
            user: (payload === 'clear') ? {} : {
                ...state.user,
                ...payload
            }
        }

    case actionTypes.SUCCESS:
        return {
            ...state,
            success: payload
        }

    case actionTypes.ERROR:
        return {
            ...state,
            error: payload
        }

    default:
        return state
    }
}

export default registerReducer
