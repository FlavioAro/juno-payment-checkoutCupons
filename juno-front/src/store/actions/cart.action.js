import { Http } from "../../config/Http"
import { changeAlert } from "./alert.action"
import { changeLoading } from "./loading.action"

const cart = JSON.parse(localStorage.getItem('products')) || []
const coupon = JSON.parse(localStorage.getItem('coupon')) || {}

export const actionTypes = {
    CHANGE: 'CART_CHANGE'
}

export const change = (payload) => ({
    type: actionTypes.CHANGE,
    payload
})

/* SAVE CART */

export const setCart = (payload) => ({
    type: actionTypes.CHANGE,
    payload
})

export const saveCart = (data) => dispatch => {
    localStorage.setItem('products', JSON.stringify(data))
    dispatch(setCart({itens: data}))
    dispatch(countCart())
    dispatch(totalCart())
}

export const saveCoupon = (data) => dispatch => {
    localStorage.setItem('coupon', JSON.stringify(data))
    dispatch(change({coupon: data}))
    dispatch(totalCart())
}

/* REMOVE COUPON */

export const removeCoupon = () => async dispatch => {
    await localStorage.removeItem('coupon')
    dispatch(loadCart())
}

/* LOAD CART */

export const loadCart = () => async dispatch => {
    let coupon = await JSON.parse(localStorage.getItem('coupon'))
    dispatch(setCart({
        itens: cart,
        coupon: coupon || {}
    }))
    dispatch(countCart())
    dispatch(totalCart())
}

/* TOTAL CART */

export const totalCart = () => async dispatch => {
    let coupon = await JSON.parse(localStorage.getItem('coupon'))
    var totalCart = 0;
    for(var item in cart) {
      totalCart += cart[item].price * cart[item].qtd;
    }
    dispatch(setCart({
        total: totalCart,
        discount: (coupon) ? (totalCart / 100) * coupon.discount : 0
    }))
}

/* COUNT CART */

export const countCart = () => dispatch => {
    var totalCount = 0;
    for(var item in cart) {
        totalCount += cart[item].qtd;
    }
    dispatch(setCart({count: totalCount}))
}

/* ADD CART */

export const addCart = (product) => dispatch => {
    for(var item in cart) {
        if(cart[item].id === product.id) {
          cart[item].qtd ++;
          dispatch(saveCart(cart))
          return;
        }
    }
    product.qtd = 1;
    cart.push(product);
    dispatch(saveCart(cart))
}

/* REMOVE ITEM CART */

export const removeItem = (product) => dispatch => {
    for(var item in cart) {
        if(cart[item].id === product.id) {
          cart[item].qtd --;
          if(cart[item].qtd === 0) {
            cart.splice(item, 1);
          }
          break;
        }
    }
    dispatch(saveCart(cart))
}

/* REMOVE ALL ITEM CART */

export const removeItemAll = (product) => dispatch => {
    for(var item in cart) {
        if(cart[item].id === product.id) {
          cart.splice(item, 1);
          break;
        }
    }
    dispatch(saveCart(cart))
}

/* COUPONS DISCOUNT */

export const coupons = (code) => dispatch => {
    dispatch(changeLoading({
        open: true,
        msg: 'Aplicando cupom...'
    }))
    return Http.get('/payment/coupons/'+code)
        .then(res => {
            dispatch(changeLoading({open: false}))

            if(typeof res !== 'undefined') {
                dispatch(saveCoupon(res.data))
            }
        })
        .catch(error => {
            dispatch(changeLoading({open: false}))
            if(error.response) {
                dispatch(changeAlert({
                    open: true,
                    msg: error.response.data.error,
                    class: 'error'
                }))
            }
        })
}