// 封装倒计时逻辑函数
import { ref, computed, onUnmounted } from "vue";
import dayjs from "dayjs";

export const useCountDown = () => {
  // 响应式数据（秒）
  const time = ref(0);
  let timer = null;

  // 格式化为 mm分ss秒
  const formatTime = computed(() => dayjs.unix(time.value).format("mm分ss秒"));

  // 开启倒计时函数
  const start = (currentTime) => {
    // 清除之前的定时器
    if (timer) clearInterval(timer);

    // 设置初始时间
    time.value = currentTime;

    // 开始倒计时
    timer = setInterval(() => {
      if (time.value > 0) {
        time.value--;
      } else {
        clearInterval(timer);
        timer = null;
      }
    }, 1000);
  };

  // 组件卸载时清除定时器
  onUnmounted(() => {
    if (timer) clearInterval(timer);
  });

  return {
    formatTime,
    start,
  };
};
