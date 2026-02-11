// 对于 axios 函数库进行二次封装
/* 二次封装的目的：
     1. 利用 axios 请求、相应拦截器功能
     2.请求拦截器：一般可以在请求头中携带公共参数：token
     3.响应拦截器：可以简化服务器返回的数据，处理 http 的网络错误
*/
import axios from "axios";
import "element-plus/theme-chalk/el-message.css";
import { ElMessage } from "element-plus";

import { useUserStore } from "@/stores/user.js";
import router from "@/router";

// 利用 axios.create 方法，创建一个 axios 实例:可以设置基础路径、超时时间的设置
const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net", // 基础路径设置，发请求的时候，路径当中会出现 /api
  timeout: 5000, // 超时时间设置，超出 5 秒请求失败
});

// 请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    // config：请求拦截器回调注入的对象（配置对象），配置对象身上最重要的一件事：headers属性
    // 可以通过请求头携带公共参数：token
    // 从 pinia 中获取 token 数据
    const userStore = useUserStore();
    // 如果 token 存在，就携带 token
    const token = userStore.userInfo.token;
    // console.log(",,,", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 响应拦截器
httpInstance.interceptors.response.use(
  (response) => {
    // 响应拦截器成功的回调，一般会进行简化数据
    return response.data;
  },
  (error) => {
    // 处理 http 网络错误
    console.log(error.response);

    let status = error.response.status;
    switch (status) {
      case 400:
        ElMessage({
          type: "error",
          message: error.response.data.message,
        });
        break;
      case 404:
        // 错误信息提示
        ElMessage({
          type: "error",
          message: error.response.data.message || "请求资源不存在",
        });
        break;
      case 401: {
        ElMessage({
          type: "error",
          message: error.response.data.message || "参数有问题",
        });
        // 清除用户信息
        const userStore = useUserStore();
        userStore.clearUserInfo();
        router.push("/login");
        break;
      }
      case 403:
        // 错误信息提示
        ElMessage({
          type: "error",
          message: "无权限访问",
        });
        break;
      case 500 | 501 | 502 | 503 | 504:
        ElMessage({
          type: "error",
          message: "服务器挂了",
        });
        break;
    }
    return Promise.reject(new Error(error.response.data.message));
  },
);

// 对外暴露 httpInstance 函数
export default httpInstance;
