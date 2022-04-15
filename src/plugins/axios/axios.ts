import axios, { AxiosRequestConfig } from 'axios'

export default class Axios {
  private instance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors()
  }
  public async request<T, D = ResponseResult<T>>(config: AxiosRequestConfig) {
    return new Promise<D>(async (resolve, reject) => {
      try {
        const response = await this.instance.request<D>(config)
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    })
  }
  private interceptors() {
    this.interceptorsRequest()
    this.interceptorsResponse()
  }
  private interceptorsRequest() {
    this.instance.interceptors.request.use(
      config => {
        const token = sessionStorage.getItem('token')
        if (token) {
          config.headers.common.token = token
        }
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
  }
  private interceptorsResponse() {
    this.instance.interceptors.response.use(
      response => {
        console.log(response.status)
        return response
      },
      error => {
        return Promise.reject(error)
      }
    )
  }
}
