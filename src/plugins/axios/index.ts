/*
 * @Description: 
 * @Author: yebanban
 * @Date: 2022-04-14 17:27:49
 * @LastEditTime: 2026-05-06 15:46:26
 * @LastEditors: yebanban
 */
import Axios from "./axios"
export const http = new Axios({
    baseURL: 'http://127.0.0.1:7001/',
    timeout: 10000
})