// 封装购物车模块
import { defineStore } from "pinia";
import { ref, computed } from "vue";

import { useUserStore } from "./userStore";

import { insertCartAPI, findNewCartListAPI, delCartAPI } from "@/apis/cart";

export const useCartStore = defineStore(
  "cart",
  () => {
    const userStore = useUserStore();
    const isLogin = computed(() => userStore.userInfo.token);
    // 定义 state
    const cartList = ref([]);

    // 定义 action
    // 接口获取购物车列表
    const updateNewList = async () => {
      const res = await findNewCartListAPI();
      cartList.value = res.result;
    };

    // 添加购物车操作
    const addCart = async (goods) => {
      // todo: 这里本地购物车和接口购物车中数据并没有互通合并
      const { skuId, count } = goods;
      if (isLogin.value) {
        // 已登录
        await insertCartAPI({ skuId, count });
        // 重新获取购物车列表
        await updateNewList();
      } else {
        // 未登录：本地存储
        // 添加购物车操作
        // console.log("添加", goods);
        // 已添加该商品： count+1
        // 未添加该商品：push
        // 思路：通过匹配该商品传递的商品对象中的 skuId 能不能在 cartList 中找到
        const item = cartList.value.find((item) => goods.skuId === item.skuId);
        if (item) {
          // 找到了
          item.count = goods.count + item.count;
        } else {
          // 没找到
          cartList.value.push(goods);
        }
      }
    };

    // 删除购物车操作
    const delCart = async (skuId) => {
      // 思路：
      // 1. 通过要删除的下标值：splice
      // const index = cartList.value.findIndex((item) => item.skuId === skuId);
      // cartList.value.splice(index, 1);
      // 2. 使用数组的过滤方法：filter
      if (isLogin.value) {
        // 已登录：接口删除
        await delCartAPI([skuId]);
        // 重新获取购物车列表
        await updateNewList();
      } else {
        // 未登录：本地删除
        cartList.value = cartList.value.filter((item) => item.skuId !== skuId);
      }
    };

    // 清除购物车
    const clearCart = () => {
      cartList.value = [];
    };

    // 计算属性
    // 总数
    const allcount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0));
    // 总价
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0));

    // 单选功能
    const singleCheck = (skuId, selected) => {
      // 通过 skuId 找到对应的商品对象，并修改 selected 属性
      const item = cartList.value.find((item) => item.skuId === skuId);
      item.selected = selected;
    };

    // 是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected));

    // 全选功能
    const allCheck = (selected) => {
      // 将 cartList 中的每一项的 selected 设置为当前全选框的状态
      cartList.value.forEach((item) => (item.selected = selected));
    };

    // 已选数量
    // const selectedCount = computed(() =>
    //   cartList.value.reduce((a, c) => a + (c.selected ? c.count : 0), 0),
    // );
    const selectedCount = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count, 0),
    );
    // 已选商品总价
    // const selectedPrice = computed(() =>
    //   cartList.value.reduce((a, c) => a + (c.selected ? c.count * c.price : 0), 0),
    // );
    const selectedPrice = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count * c.price, 0),
    );

    return {
      cartList,
      allcount,
      allPrice,
      selectedCount,
      selectedPrice,
      isAll,
      addCart,
      delCart,
      singleCheck,
      allCheck,
      clearCart,
      updateNewList,
    };
  },
  {
    persist: true, // 开启数据持久化
  },
);
