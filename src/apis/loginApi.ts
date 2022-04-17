import {http} from "../plugins/axios"
interface UserPassword{
    password:string
}
export interface TokenResponse{
    token:string
}
function login(data:UserPassword){
    return http.request<TokenResponse>({url:`login`,method:'post',data})
}
export default{login}