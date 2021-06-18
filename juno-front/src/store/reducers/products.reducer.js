import { actionTypes } from '../actions/products.action'

const initialState = {
    products: []
}

const productsReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.INDEX:

        return { 
            ...state, 
            products: payload 
        }

    default:
        return state
    }
}

export default productsReducer