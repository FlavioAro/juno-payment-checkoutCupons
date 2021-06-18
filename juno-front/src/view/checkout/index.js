import { Button, IconButton, InputAdornment, TextField, Divider } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { change, coupons, removeCoupon, addCart, removeItem, removeItemAll } from '../../store/actions/cart.action'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { FcOpenedFolder } from 'react-icons/fc'
import { FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../header'

export default function Checkout() {
    const dispatch = useDispatch()
    const { itens, total, coupon, count, discount } = useSelector(state => state.cartReducer)

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h3 className="font-weight-normal mb-4">Checkout</h3>

                <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="font-weight-normal">MEU CARRINHO</h5>
                            </div>
                            <hr className="m-0"/>
                            <div className="card-body">
                                {(itens.length > 0) ?
                                    <>
                                        {itens.map((item, index) => (
                                            <div key={index} className="row align-items-center mb-4">
                                                <div className="col-md-2 product-img">
                                                    <svg className="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#868e96"></rect></svg>
                                                </div>
                                                <div className="col-md-4 product-title">
                                                    <label className="label-custom">{item.title}</label>
                                                </div>
                                                <div className="col-md-3">
                                                    <TextField
                                                        type="tel"
                                                        InputProps={{
                                                            value: item.qtd,
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <IconButton onClick={() => dispatch(removeItem(item))}>
                                                                        <MdChevronLeft size={30} />
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            ),
                                                            endAdornment: (
                                                                <InputAdornment position="start">
                                                                    <IconButton onClick={() => dispatch(addCart(item))}>
                                                                        <MdChevronRight size={30} />
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            )
                                                        }}
                                                    />
                                                </div>
                                                <div className="col-md-2 product-price">
                                                    <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(item.price * item.qtd)}</strong>
                                                </div>

                                                <div className="col-md-1 product-remove">
                                                    <IconButton onClick={() => dispatch(removeItemAll(item))}>
                                                        <FaTrash color="#000" size={20} />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                    :

                                    <div className="text-center mt-5 pt-5 mb-5 pb-5">
                                        <FcOpenedFolder size="70" />
                                        <h6 className="mt-4 text-muted">Seu carrinho esta vazio</h6>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        {(itens.length > 0) &&
                        <div className="card">
                            <div className="card-body mb-3">
                                <label className="label-custom text-muted mb-4">{count} item(s)</label>
                                <h4 className="mb-5 fw-bold">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format((discount > 0) ? total - discount : total)}</h4>

                                {(coupon.id) &&
                                <>
                                    <div className="d-flex justify-content-between coupon-code">
                                        <strong className="small" onClick={() => console.log(coupon)}>PREÇO</strong>
                                        <label className="total">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(total)}</label>
                                    </div>
                                    <Divider className="mt-2 mb-2"/>
                                    <div className="d-flex justify-content-between coupon-code">
                                        <strong className="small">DESCONTO</strong>
                                        <strong className="discount text-danger">-{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(discount)}</strong>
                                    </div>
                                    <Divider className="mt-2 mb-2"/>
                                    <div className="d-flex justify-content-between mb-5 coupon-code">
                                        <strong className="small">TOTAL A PAGAR</strong>
                                        <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(total - discount)}</strong>
                                    </div>
                                </>
                                }

                                <div className="d-flex coupon mb-5">
                                    <TextField
                                        placeholder="Inserir cupom"
                                        size="small"
                                        value={coupon.code || ''}
                                        onChange={text => dispatch(change({ coupon: {
                                            ...coupon,
                                            code: text.target.value
                                        } }))}
                                    />
                                    <Button 
                                        variant="contained"
                                        color="secondary"
                                        disabled={(coupon.code) ? false : true}
                                        onClick={() => dispatch(coupons(coupon.code))}
                                    >
                                        Aplicar
                                    </Button>
                                </div>
                                
                                <div className="d-flex justify-content-between">
                                    <Button
                                        variant="contained" 
                                        color="secondary" 
                                        size="large"
                                        component={Link}
                                        to="/order"
                                        className="btn-checkout"
                                    >
                                        Finalizar compra
                                    </Button>
                                    {(coupon.id) &&
                                        <Button onClick={() => dispatch(removeCoupon())} color="secondary">Remover cupom</Button>
                                    }
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
