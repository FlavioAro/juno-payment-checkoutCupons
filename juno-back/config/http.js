const axios = require('axios')
const config = require('config')
const auth = require('../api/services/token')
const token = require('../token.json')

const http = axios.create({
    baseURL: config.get('endpoint')
})

http.interceptors.request.use(
    async (config) => {
        auth.validateToken()
        config.headers.authorization = 'Bearer '+token.access_token
        config.headers['X-Api-Version'] = 2
        config.headers['X-Resource-Token'] = '70CAC5B4A28498B0CD0B6A927662BBC93E01AF6DDBAE529BBC6FB15F34C6EDB4'
        return config;
    }
)

http.interceptors.response.use(response => response, error => {
    return Promise.reject(error);
});

module.exports = http;