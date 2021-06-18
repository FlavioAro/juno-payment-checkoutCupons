import React from 'react'
import { Divider } from '@material-ui/core'
import { FcOpenedFolder } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core'
import Register from '../auth/register'
import Header from '../header'
import Payment from './pay'

export default function Order() {
    const dispatch = useDispatch()
    const { itens, total, count, coupon, discount } = useSelector(state => state.cartReducer)

    const [tab, setTab] = React.useState(null)

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h3 className="font-weight-normal mb-4">Checkout</h3>

                <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="font-weight-normal mt-2">1 - INFORMAÇÕES PESSOAIS</h5>
                            </div>
                            {(!localStorage.getItem('access_token') || tab) &&
                                <div className="p-5 pt-2 pb-3">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Register />
                                        </div>
                                    </div>
                                </div>
                            }
                            <hr className="m-0" />
                            <div className="card-body">
                                <h5 className="font-weight-normal mt-2">2 - PAGAMENTO</h5>
                                {(localStorage.getItem('access_token') && !tab) &&
                                    <>
                                    {(itens.length > 0) ?
                                        <>
                                            <Payment />
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="large"
                                                className="ms-3 mt-5 mb-4"
                                                onClick={() => setTab(1)}
                                            >
                                            Voltar
                                            </Button>
                                        </>
                                        :
                                        <div className="text-center mt-5 pt-5 mb-5 pb-5">
                                            <FcOpenedFolder size="70" />
                                            <h6 className="mt-4 text-muted">Seu carrinho esta vazio</h6>
                                        </div>
                                    }
                                    </>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <label className="label-custom text-muted mb-4">{count} item(s)</label>
                                {itens.map((item, index) => (
                                    <div key={index} className="row mb-4">
                                        <div className="col-3 product-img-small">
                                            <svg className="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#868e96"></rect></svg>
                                        </div>
                                        <div className="col-8 product-title">
                                            <label className="label-custom d-block">{item.title}</label>
                                            <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.qtd)}</strong>
                                        </div>
                                        <div className="col-1">
                                            <div><strong>{item.qtd}</strong></div>
                                        </div>
                                    </div>
                                ))}

                                <div className="mt-5 mb-3">
                                    {(coupon.id) &&
                                        <>
                                            <div className="d-flex justify-content-between coupon-code">
                                                <strong className="small">PREÇO</strong>
                                                <label className="total">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(total)}</label>
                                            </div>
                                            <Divider className="mt-2 mb-2"/>
                                            <div className="d-flex justify-content-between coupon-code">
                                                <strong className="small">DESCONTO</strong>
                                                <strong className="discount text-danger">-{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(discount)}</strong>
                                            </div>
                                            <Divider className="mt-2 mb-2"/>
                                        </>
                                    }
                                    <div className="d-flex justify-content-between coupon-code">
                                        <strong className="small">TOTAL A PAGAR</strong>
                                        <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format((discount > 0 ) ? total - discount : total)}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
