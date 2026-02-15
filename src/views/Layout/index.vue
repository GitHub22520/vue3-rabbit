<template>
    <LayoutFixed/>
    <LayoutNav/>
    <LayoutHeader/>

    <!-- 添加 key,破会复用机制，强制销毁重建 -->
    <!-- <router-view :key="$route.fullPath"></router-view> -->
    <router-view/>

    <LayoutFooter/>
</template>

<script lang="ts" setup>
import { onMounted, } from 'vue'  
// 导入基本页面框架
import LayoutNav from './components/LayoutNav.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutFooter from './components/LayoutFooter.vue';
// 导入吸顶导航组件
import LayoutFixed from './components/LayoutFixed.vue';
// 触发获取导航列表的 action
import { useCategoryStore } from '@/stores/categroyStore';

const categoryStore = useCategoryStore()

onMounted(() => {
    categoryStore.getCategory()
})

</script>

<style scoped>
</style>