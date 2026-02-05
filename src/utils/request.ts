// 对于 axios 函数库进行二次封装
/* 二次封装的目的：
     1. 利用 axios 请求、相应拦截器功能
     2.请求拦截器：一般可以在请求头中携带公共参数：token
     3.响应拦截器：可以简化服务器返回的数据，处理 http 的网络错误
*/
import axios from 'axios';
import { ElMessage } from 'element-plus';

// 利用 axios.create 方法，创建一个 axios 实例:可以设置基础路径、超时时间的设置
const request = axios.create({
    baseURL: '/api',  // 基础路径设置，发请求的时候，路径当中会出现 /api
    timeout: 10000   // 超时时间设置，超出 5 秒请求失败
})

// 请求拦截器
request.interceptors.request.use((config) => {
    // config：请求拦截器回调注入的对象（配置对象），配置对象身上最重要的一件事：headers属性
    // 可以通过请求头携带公共参数：token
    return config
})

// 响应拦截器
request.interceptors.response.use((response) => {
    // 响应拦截器成功的回调，一般会进行简化数据
    return response.data;
},(error) => {
    // 处理 http 网络错误
    let status = error.response.status;
    switch(status){
        case 404:
            // 错误信息提示
            ElMessage({
                type: 'error',
                message: error.message || '请求资源不存在'
            })
            break;
        case 401:
            ElMessage({
                type: 'error',
                message: '参数有问题'
            })
            break;
        case 403:
            // 错误信息提示
            ElMessage({
                type: 'error',
                message: '无权限访问'
            })
            break;
        case 500|501|502|503|504:
            ElMessage({
                type: 'error',
                message: '服务器挂了'
            })
            break;
    }
    return Promise.reject(new Error(error.message))
})

// 对外暴露 request 函数
export default request;