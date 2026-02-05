import httpInstance from "@/utils/http.js";

/** @returns {Promise<any>} */
export function getBannerAPI() {
  return httpInstance({
    url: "/home/banner",
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
