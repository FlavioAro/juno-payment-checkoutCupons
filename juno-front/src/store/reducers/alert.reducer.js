import { actionTypes } from '../actions/alert.action'

const initialState = {
    open: false,
    class: 'success',
    time: 3000,
    msg: ''
}

const alertReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.CHANGE:
        return { ...state, ...payload }

    default:
        return state
    }
}

export default alertReducer
