import httpInstance from "@/utils/http";

// 获取分类列表
export function getCategoryAPI(id) {
  return httpInstance({
    url: "/category",
    params: {
      id,
    },
  });
}

// 获取二级分类列表
export function getCategoryFilterAPI(id) {
  return httpInstance({
    url: "/category/sub/filter",
    params: {
      id,
    },
  });
}

// 获取导航数据
/**
 * @description 获取导航数据
 * @data {
 * categoryId: number
 * page: number
 * pageSize: number
 * sortField: 'pubilshTime' | 'orderNum' | 'evaluateNum'
 * }
 * @return {*}}
 */
export function getSubCategoryAPI(data) {
  return httpInstance({
    url: "/category/goods/temporary",
    method: "post",
    data,
  });
}
