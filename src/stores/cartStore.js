// 封装购物车模块
import { defineStore } from "pinia";
import { ref, computed } from "vue";

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

    // 删除购物车操作
    const delCart = (skuId) => {
      // 思路：
      // 1. 通过要删除的下标值：splice
      // const index = cartList.value.findIndex((item) => item.skuId === skuId);
      // cartList.value.splice(index, 1);
      // 2. 使用数组的过滤方法：filter
      cartList.value = cartList.value.filter((item) => item.skuId !== skuId);
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

    // 已选商品计算
    const selectedCount = computed(() =>
      cartList.value.reduce((a, c) => a + (c.selected ? c.count : 0), 0),
    );

    return {
      cartList,
      allcount,
      allPrice,
      selectedCount,
      addCart,
      delCart,
      singleCheck,
    };
  },
  {
    persist: true, // 开启数据持久化
  },
);
