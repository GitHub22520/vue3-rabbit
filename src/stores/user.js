// 管理用户数据相关
import { defineStore } from "pinia";
import { ref } from "vue";

import { loginAPI } from "@/apis/user";

export const useUserStore = defineStore(
  "user",
  () => {
    // 定义管理用户数据的 state
    const userInfo = ref({});
    // 定义获取接口数据的 action 函数
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password });
      userInfo.value = res.result;
    };

    // 退出时清除用户信息
    const clearUserInfo = () => {
      userInfo.value = {};
    };

    // 以对象的格式把 state 和 action 返回
    return {
      userInfo,
      getUserInfo,
      clearUserInfo,
    };
  },
  {
    persist: true, // 开启数据持久化
  },
);
