<template>
    <LayoutNav/>
    <LayoutHeader/>

    <router-view></router-view>
    
    <LayoutFooter/>
</template>

<script lang="ts" setup>
// 导入基本页面框架
import LayoutNav from './components/LayoutNav.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutFooter from './components/LayoutFooter.vue';
</script>

<style scoped>
</style>