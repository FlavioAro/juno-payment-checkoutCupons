import Axios from 'axios'

const apiUrl = 'http://localhost:8080/'

export const Http = Axios.create({
    baseURL: apiUrl
})

export const HttpAuth = Axios.create({
    baseURL: apiUrl
})

HttpAuth.interceptors.request.use(
    async (config) => {
        config.headers.authorization = 'Bearer ' + await localStorage.getItem('access_token')
        return config;
    }
)

HttpAuth.interceptors.response.use(response => {
    return response;
}, error => {
    if(error.response) {
        if(error.response.status === 401) {
            if(localStorage.getItem('access_token')) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('user');
                window.location.reload()
            }
        }
    }
    return error;
})