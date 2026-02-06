// 封装分类数据业务相关代码
import { ref, onMounted } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { getCategoryAPI } from "@/apis/category";

export function useCategory() {
  // useRoute() 必须在 setup 上下文中调用，即函数内部
  const route = useRoute();
  const categoryData = ref([]);

  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id);
    // console.log(res);
    categoryData.value = res.result;
  };
  onMounted(() => {
    getCategory();
  });
  // 在路由参数变化的时候，可以把分类数据接口重新发送
  onBeforeRouteUpdate((to) => {
    // console.log('路由变化了');
    // 存在问题：使用最新的路由参数请求最新的分类数据
    // console.log(to);
    getCategory(to.params.id);
  });

  return {
    categoryData,
  };
}
