import httpInstance from "@/utils/http.js";

/** @returns {Promise<any>} */
export function getBannerAPI(params = {}) {
  // distributionSite默认为 1，表示首页轮播图，2表示分类页轮播图
  return httpInstance({
    url: "/home/banner",
    params: {
      distributionSite: params.distributionSite || 1,
    },
  });
}

/** @returns {Promise<any>} */
export function findNewAPI() {
  return httpInstance({
    url: "/home/new",
  });
}

/** @returns {Promise<any>} */
export function findHotAPI() {
  return httpInstance({
    url: "/home/hot",
  });
}

/** @returns {Promise<any>} */
export function getGoodsAPI() {
  return httpInstance({
    url: "/home/goods",
  });
}
