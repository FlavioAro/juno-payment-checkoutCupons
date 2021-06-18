import { Http, HttpAuth } from '../../config/Http'
import { changeLoading } from './loading.action'
import { changeNotify } from './notify.action'

export const actionTypes = {
    CHANGE: 'REGISTER_CHANGE',
    ERROR: 'REGISTER_ERROR',
    SUCCESS: 'REGISTER_SUCCESS'
}

export const change = (payload) => ({
    type: actionTypes.CHANGE,
    payload
})

export const errors = (payload) => ({
    type: actionTypes.ERROR,
    payload
})

export const success = (payload) => ({
    type: actionTypes.SUCCESS,
    payload
})

export const setUserToken = token => dispatch => {
    localStorage.setItem('access_token', token);
    dispatch(success(true))
    return true
}

export const update = data => dispatch => {
    return HttpAuth.post('/user/update', data)
        .then(res => res.data)
}

export const register = data => dispatch => {
    dispatch(changeLoading({
        open: true,
        msg: 'Carregando...'
    }));

    return Http.post('/user/register', data)
        .then(res => {
            dispatch( changeLoading({open: false}) )
            if(typeof res !== 'undefined'){
                if(res.data.access_token){
                    localStorage.setItem('user', JSON.stringify(data));
                    return dispatch( setUserToken(res.data.access_token) )
                }
            }
        })
        .catch(error => {
            dispatch( changeLoading({open: false}) )

            if(error.response) {
                dispatch(errors(error.response.data.errors))
            }
        })
}