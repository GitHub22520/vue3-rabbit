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

export { getDetail };
