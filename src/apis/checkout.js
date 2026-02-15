import httpInstance from "@/utils/http";

// 获取订单预览信息
export const getCheckInfoAPI = () => {
  return httpInstance({
    url: "/member/order/pre",
  });
};
