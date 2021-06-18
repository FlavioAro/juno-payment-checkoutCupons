import React from 'react'
import { MdAspectRatio, MdCreditCard, MdKeyboardBackspace, MdViewWeek } from 'react-icons/md'
import { FaQrcode } from 'react-icons/fa'

import { payPix } from '../../store/actions/payment.action'
import { useDispatch, useSelector } from 'react-redux'
import Pix from './pix'
import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@material-ui/core'
import Card from './card'
import Boleto from './boleto'
import Picpay from './picpay'

export default function Payment() {
    const dispatch = useDispatch()
    const { itens, coupon } = useSelector(state => state.cartReducer)

    const [state, setState] = React.useState({})
    const [pay, setPay] = React.useState(null)
    const [modal, setModal] = React.useState({
        open: true
    })

    return (
        <div className="card-body">
            <div className="mb-4">
                <label className="label-custom text-muted">Como você prefere pagar?</label>
            </div>

            <div className="d-flex pointer" onClick={() => setPay('card')}>
                <MdCreditCard className="display-4" />
                <div className="ms-4 d-flex flex-column align-items-center">
                    <label className="h5 mb-1 me-auto">Cartão</label>
                    <label className="text-muted me-auto">Crédito</label>
                </div>
            </div>

            <hr />

            <div className="d-flex pointer" onClick={() => setPay('boleto')}>
                <MdViewWeek className="display-4" />
                <div className="ms-4 d-flex flex-column align-items-center">
                    <label className="h5 mb-1 me-auto">Boleto bancário</label>
                    <label className="text-muted me-auto">O pagamento será aprovado em 1 ou 3 dias uteis</label>
                </div>
            </div>

            <hr />

            <div className="d-flex pointer" onClick={() => setPay('picpay')}>
                <MdAspectRatio className="display-4" />
                <div className="ms-4 d-flex flex-column align-items-center">
                    <label className="h5 mb-1 me-auto">PIC PAY</label>
                    <label className="text-muted me-auto">Pague via QR Code com Pic pay</label>
                </div>
            </div>

            <hr />

            <div className="pointer" onClick={() => dispatch(payPix({ itens: itens, coupon: coupon })).then(
                res => {
                    if (res.id) {
                        setModal({ open: true })
                        setState(res)
                    }
                })
            }>
                <div className="d-flex pointer">
                    <FaQrcode className="display-4" />
                    <div className="ms-4 d-flex flex-column align-items-center">
                        <label className="h5 mb-1 me-auto">PIX</label>
                        <label className="text-muted me-auto">Pague via QR Code com PIX</label>
                    </div>
                </div>
            </div>

            {(state.id) &&
                <Pix
                    open={modal.open}
                    onClose={() => setModal({ open: false })}
                    pix={state}
                />
            }

            <Dialog
                open={(pay) ? true : false}
                onClose={() => setPay(null)}
                className="modal-cart"
                fullScreen
            >
                <AppBar>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={() => setPay(null)} aria-label="close">
                            <MdKeyboardBackspace />
                        </IconButton>
                        <Typography variant="h6">
                            Pagamento
                        </Typography>
                    </Toolbar>
                </AppBar>
                {(pay === 'card') &&
                    <Card />
                }
                {(pay === 'boleto') &&
                    <Boleto />
                }
                {(pay === 'picpay') &&
                    <Picpay />
                }
            </Dialog>
        </div>
    )
}