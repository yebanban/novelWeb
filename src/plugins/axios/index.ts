import Axios from "./axios"
export const http = new Axios({
    baseURL: 'http://8.148.144.132/',
    timeout: 10000
})