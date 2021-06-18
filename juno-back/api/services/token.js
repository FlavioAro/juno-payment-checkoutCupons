const axios = require('axios')
const config = require('config')
const fs = require('fs')
const tokenJson = require('../../token.json')

const auth = axios.create({
    baseURL: config.get('endpoint')
})


auth.interceptors.request.use(
    async (set) => {
        set.headers['Authorization'] = "Basic "+ await new Buffer.from(config.get('clientId')+':'+config.get('clientSecret')).toString("base64")
        return set;
    }
)

const getToken = async () => {
    let token = await auth.post(config.get('endpoint_token')+'?grant_type=client_credentials').then(res => res.data)
    if(token.access_token) {
        token.expire = Date.now() + token.expires_in;
        let res = JSON.stringify(token)
        fs.writeFile('token.json', res, () => {});
    }
}

exports.validateToken  = () => {
    if(Date.now() >= tokenJson.expire) {
        getToken()
    }
}