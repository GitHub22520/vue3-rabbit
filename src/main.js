import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// 引入初始化样式文件
import "@/styles/common.scss";
// 引入窗口监控
import { useIntersectionObserver } from "@vueuse/core";

// 测试接口
// import { getCategory } from "@/apis/testAPI";
// getCategory().then((res) => {
//   console.log("分类数据：", res);
// });

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

// 自定义指令创建
app.directive("img-lazy", {
  mounted(el, binding) {
    // el：指令绑定的元素
    // binding：binding.value，指令等于号后面绑定的表达式的值
    // console.log(el, binding.value);
    useIntersectionObserver(el, ([{ isIntersecting }]) => {
      //   console.log(isIntersecting);
      if (isIntersecting) {
        // 进入视口区域
        el.src = binding.value;
      }
    });
  },
});
