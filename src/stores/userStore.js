// 管理用户数据相关
import { defineStore } from "pinia";
import { ref } from "vue";

import { loginAPI } from "@/apis/user";
import { mergeCartAPI } from "@/apis/cart";

import { useCartStore } from "./cartStore";

export const useUserStore = defineStore(
  "user",
  () => {
    const cartStore = useCartStore();
    // 定义管理用户数据的 state
    const userInfo = ref({});
    // 定义获取接口数据的 action 函数
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password });
      userInfo.value = res.result;
      // 登录成功后，合并购物车
      await mergeCartAPI(
        cartStore.cartList.map((item) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count,
          };
        }),
      ).then(() => {
        // 合并购物车成功后，更新购物车列表
        cartStore.updateNewList();
      });
    };

    // 退出时清除用户信息
    const clearUserInfo = () => {
      userInfo.value = {};
      // 退出时，清除购物车数据
      cartStore.clearCart();
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
