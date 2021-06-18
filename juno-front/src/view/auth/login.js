import { Button, TextField } from '@material-ui/core';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { change, login } from '../../store/actions/auth.action';

export default function Login() {
    const dispatch = useDispatch();
    const { credentials } = useSelector(state => state.authReducer)

    return (
        <>
            <TextField
                label="Email"
                type="email"
                autoComplete="email"
                margin="normal"
                value={credentials.email}
                onChange={text => dispatch(change({ email: text.target.value }))}
            />

            <TextField
                label="Senha"
                type="password"
                margin="normal"
                value={credentials.password}
                onChange={text => dispatch(change({ password: text.target.value }))}
            />

            <Button
                variant="contained"
                color="primary"
                size="large"
                className="mt-4 mb-4"
                onClick={() => dispatch(login(credentials)).then(res => res && window.location.reload())}
            >
            Continuar
            </Button>
        </>
    )
}
