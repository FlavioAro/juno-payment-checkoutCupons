import { Button, TextField } from '@material-ui/core';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { change, register } from '../../store/actions/register.action';
import MaskedInput from 'react-text-mask'

const TextMaskCustom = (props) => {
    const { inputRef, ...other } = props;
    let mask = [];

    if(props.name === 'cpf') {
        mask = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
    }

    if(props.name === 'phone') {
        mask = ['(', /[0-9]/, /\d/ , ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/,/\d/, /\d/]
        if(other.value) {
            if(other.value.length === 15) {
                mask = ['(', /[0-9]/, /\d/ , ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/,/\d/]
            }
        }
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

export default function Register() {
    const dispatch = useDispatch();
    const { user, error } = useSelector(state => state.registerReducer)

    const [ state, setState ] = React.useState(JSON.parse(localStorage.getItem('user')) || {})

    React.useEffect(() => {
        dispatch(change(state))
    }, [])

    return (
        <>
            <div className="mb-3">
                <TextField
                    error={(error.name) && true}
                    label="Nome"
                    value={(user.name || state.name) || ''}
                    onChange={text => {
                        dispatch(change({ name: text.target.value }))
                        if(error.name && delete error.name);
                    }}
                />
                {(error.name) &&
                    <strong className="text-danger">{error.name.msg}</strong>
                }
            </div>

            <div className="mb-3">
                <TextField
                    error={(error.email) && true}
                    label="Email"
                    type="email"
                    autoComplete="email"
                    value={(user.email || state.email) || ''}
                    onChange={text => {
                        dispatch(change({ email: text.target.value }))
                        if(error.email && delete error.email);
                    }}
                />
                {(error.email) &&
                    <strong className="text-danger">{error.email.msg}</strong>
                }
            </div>

            <div className="mb-3">
                <TextField
                    error={(error.phone) && true}
                    label="Telefone"
                    name="phone"
                    type="tel"
                    autoComplete="off"
                    InputProps={{
                        inputComponent: TextMaskCustom,
                        value: (user.phone || state.phone) || '',
                        onChange: text => {
                            dispatch(change({ phone: text.target.value }))
                            if(error.phone && delete error.phone);
                        }
                    }}
                />
                {(error.phone) &&
                    <strong className="text-danger">{error.phone.msg}</strong>
                }
            </div>

            <div className="mb-3">
                <TextField
                    error={(error.cpf) && true}
                    label="CPF"
                    name="cpf"
                    type="tel"
                    autoComplete="off"
                    InputProps={{
                        inputComponent: TextMaskCustom,
                        value: (user.cpf || state.cpf) || '',
                        onChange: text => {
                            dispatch(change({ cpf: text.target.value }))
                            if(error.cpf && delete error.cpf);
                        }
                    }}
                />
                {(error.cpf) &&
                    <strong className="text-danger">{error.cpf.msg}</strong>
                }
            </div>

            <div className="d-flex">
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className="mt-4 mb-4"
                    onClick={() => dispatch(register(user)).then(res => res && window.location.reload())}
                >
                Continuar
                </Button>
                <div className="d-flex align-items-center ms-3">
                    <Button onClick={() => {
                        dispatch(change('clear'))
                        localStorage.removeItem('user')
                        localStorage.removeItem('access_token')
                        setState({})
                    }} color="secondary">Limpar</Button>
                </div>
            </div>
        </>
    )
}
