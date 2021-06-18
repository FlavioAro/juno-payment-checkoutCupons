import { Http } from '../../config/Http'

export const actionTypes = {
    INDEX: 'PRODUCTS_INDEX'
}

// INDEX

export const indexResponse = (payload) => ({
    type: actionTypes.INDEX,
    payload
})

export const index = () => dispatch => {
    return Http.get('/products')
            .then(res => typeof res !== 'undefined' && dispatch(indexResponse(res.data)))
}
