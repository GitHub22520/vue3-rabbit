// 封装和用户相关的接口函数
import httpInstance from "@/utils/http";

const loginAPI = ({ account, password }) => {
  return httpInstance({
    url: "/login",
    method: "post",
    data: {
      account,
      password,
    },
  });
};

export { loginAPI };
