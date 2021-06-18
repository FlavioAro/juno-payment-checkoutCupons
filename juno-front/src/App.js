import React from 'react';
import { Provider } from 'react-redux'
import { store } from './store/store'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { Loading, Notify, Alert } from './view/components'
import './global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontsource-roboto'
import Routes from './Routes'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: blue[500]
        },
    },
    props: {
        MuiTextField: {
            variant: 'outlined',
            fullWidth: true
        },
        MuiSelect: {
            variant: 'outlined',
            fullWidth: true
        }
    }
});

const App = () => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Alert />
            <Notify />
            <Loading />
            <Routes />
        </ThemeProvider>
    </Provider>
)

export default App;