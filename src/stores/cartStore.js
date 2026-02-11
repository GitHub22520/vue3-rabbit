// 封装购物车模块
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore(
  "cart",
  () => {
    // 定义 state
    const cartList = ref([]);
    // 定义 action
    const addCart = (goods) => {
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
        // cartList.value.push({
        //     ...goods,
        //     count: 1
        // })
        cartList.value.push(goods);
      }
    };

    return {
      cartList,
      addCart,
    };
  },
  {
    persist: true, // 开启数据持久化
  },
);
