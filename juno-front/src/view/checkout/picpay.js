import React from 'react'
import { Button, InputAdornment, TextField } from '@material-ui/core'
import { MdEmail } from 'react-icons/md'
import MaskedInput from 'react-text-mask'
import { useDispatch, useSelector } from 'react-redux'
import { payPicpay } from '../../store/actions/payment.action'

const TextMaskCustom = (props) => {
    const { inputRef, ...other } = props;
    let mask = [];

    if (props.id === 'cpf') {
        mask = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
    }

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null)
            }}
            mask={mask}
            guide={false}
        />
    )
}

export default function Picpay() {
    const dispatch = useDispatch()
    const { itens, coupon } = useSelector(state => state.cartReducer)
    const user = JSON.parse(localStorage.getItem('user')) || {}

    const [state, setState] = React.useState({})

    return (
        <div className="container mt-4 pt-3">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h5 className="font-weight-normal mb-4 mt-4">Pic Pay</h5>

                    <div className="card card-body">
                        <div className="mb-3">
                            <label className="label-custom">Nome completo</label>
                            <TextField
                                value={state.name || user.name}
                                autoComplete="off"
                                onChange={text => setState({ ...state, name: text.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="label-custom">Email</label>
                            <TextField
                                value={state.email || user.email}
                                autoComplete="off"
                                type="email"
                                onChange={text => setState({ ...state, email: text.target.value })}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment>
                                            <MdEmail style={{ fontSize: '1.5rem' }} className="me-2 text-muted" />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="label-custom">CPF</label>
                            <TextField
                                autoComplete="off"
                                id="cpf"
                                InputProps={{
                                    inputComponent: TextMaskCustom,
                                    value: state.cpf || user.cpf,
                                    type: 'tel',
                                    placeholder: '___.___.___-__',
                                    onChange: text => setState({
                                        ...state,
                                        cpf: text.target.value,
                                        document: text.target.value.replace(/[.-]/g, '')
                                    })
                                }}
                            />
                        </div>
                    </div>

                    <div className="col-12">
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            className="mt-4 mb-4 font-weight-bold"
                            onClick={() => dispatch(payPicpay({
                                itens: itens,
                                coupon: coupon,
                                name: state.name,
                                email: state.email,
                                document: state.document
                            })).then(res => res && window.location.replace('/'))
                        }
                        >
                            Realizar pagamento
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
