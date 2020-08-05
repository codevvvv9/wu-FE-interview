import { Message } from 'element-ui';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import router from '@/router'

/**
 * http请求工具类
 * 
 * 请求拦截器 负责将客户端的标识 token值存储起来，并放置在头部提交给服务端
 * 
 * 响应拦截器 负责全局处理业务请求的网络或者业务错误
 */

//创建axios实例

const config = {
  timeout: 10000 //超时时间
}
const service = axios.create(config)

//请求拦截
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (localStorage.tsToken) {
      config.headers.Authorization = localStorage.tsToken
    }

    return config
  },
  (error: any) => {
    Promise.reject(error)
  }
)

//响应拦截
service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  ( error: any) => {
    let errorMessage = ""
    let status = error.response.status
    if (error && status) {
      switch (status) {
        // case 400:
        //   errorMessage = "Bad Request 传参属性不对"
        //   break;
        case 401:
          errorMessage = "Unauthorized 登录状态失效，请重新登录"
          localStorage.removeItem("tsToken")
          router.push('/login')
          break;
        case 403:
          errorMessage = "Forbidden 拒绝访问"
          break;
        case 408:
          errorMessage = "Request Timeout 请求超时"
          break;
        case 500:
          errorMessage = "Internal Server Error 服务器内部错误"
          break;
        case 501:
          errorMessage = "Not Implemented 服务器未实现"
          break;
        case 502:
          errorMessage = "Bad Gateway 网关错误"
          break;
        case 503:
          errorMessage = "Service Unavailable 服务不可用"
          break;
        case 504:
          errorMessage = "Gateway Timeout 网关超时"
          break;
        case 505:
          errorMessage = "HTTP Version Not Supported HTTP版本不受支持"
          break;
        default:
          errorMessage = error.response.data.msg
          break;
      }
    } else {
      errorMessage = error
    }

    Message.error(errorMessage)
    return Promise.reject(errorMessage)
  }

)

export default service