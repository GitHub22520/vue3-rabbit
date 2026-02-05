<template>
    <div class="container">
        <HomeCategory/>
        <HomeBanner/>
    </div>
    <HomeNew/>
    <HomeHot/>
    <HomeProject/>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
// 导入组件
import HomeBanner from './components/HomeBanner.vue';
import HomeCategory from './components/HomeCategory.vue';
import HomeNew from './components/HomeNew.vue';
import HomeHot from './components/HomeHot.vue';
import HomeProject from './components/HomeProject.vue';

</script>

<style scoped>
</style>