import httpInstance from "@/utils/http";

// 获取商品详情
const getDetail = (id) => {
  return httpInstance({
    url: "/goods",
    params: {
      id,
    },
  });
};

// 热榜信息获取
const getHotGoodsAPI = ({ id, type, limit = 3 }) => {
  return httpInstance({
    url: "/goods/hot",
    params: {
      id,
      type,
      limit,
    },
  });
};

export { getDetail, getHotGoodsAPI };
