import {http} from "../plugins/axios"
interface UserInfo{
    username:string
    password:string
}
export interface TokenResponse{
    token:string
}
function login(data:UserInfo){
    return http.request<TokenResponse>({url:`login`,method:'post',data})
}
export default{login}