// 定义懒加载插件

// 引入窗口监控
import { useIntersectionObserver } from "@vueuse/core";

export const lazyPlugin = {
  install(app) {
    // 懒加载指令逻辑
    // 自定义指令创建
    app.directive("img-lazy", {
      mounted(el, binding) {
        // el：指令绑定的元素
        // binding：binding.value，指令等于号后面绑定的表达式的值
        // console.log(el, binding.value);
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          //   console.log(isIntersecting);
          if (isIntersecting) {
            // 进入视口区域
            el.src = binding.value;
            stop(); // 停止监控，避免重复加载图片
          }
        });
      },
    });
  },
};
