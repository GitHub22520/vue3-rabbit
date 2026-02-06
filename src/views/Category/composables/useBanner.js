// 封装 banner 轮播图相关代码
import { getBannerAPI } from "@/apis/home";
import { ref, onMounted } from "vue";

export function useBanner() {
  const bannerList = ref([]);

  const getBanner = async () => {
    const res = await getBannerAPI({
      distributionSite: 2,
    });
    // console.log(res)
    bannerList.value = res.result;
  };

  onMounted(() => {
    getBanner();
  });

  return {
    bannerList,
  };
}
