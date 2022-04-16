import Axios from "./axios"
export const http=new Axios({
    baseURL:'https://qc8aau.api.cloudendpoint.cn/',
    timeout:10000
})