import { actionTypes } from '../actions/notify.action'

const initialState = {
    open: false,
    horizontal: 'center',
    vertical: 'top',
    class: 'error',
    time: 3000,
    msg: '',
}

const notifyReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.CHANGE:
        return { ...state, ...payload }

    default:
        return state
    }
}

export default notifyReducer