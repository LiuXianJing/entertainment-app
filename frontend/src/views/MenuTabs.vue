<template>
    <div class="menu-tabs-container flex sm:hidden">
        <div 
        v-for="item in menuItems" 
        :class="['menu-item text-red-100', 
        (activeMenuItem && item.path === activeMenuItem.path) ? 'active' : 'default']"
        @click="handleClickMenuItem(item)"
        >
          <router-link :to="`${item.path}`">
            {{ item.name }}
          </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect, } from 'vue';
import { MenuItem } from '../types';
import { useRoute } from 'vue-router';

const route = useRoute();

const menuItems = reactive<MenuItem[]>([
    {
        name: 'Game',
        path: '/game'
    },
    {
        name: 'Video',
        path: '/video'
    },
    {
        name: 'Chat',
        path: '/chat',
    },
    {
        name: 'Mine',
        path: '/mine'
    },
])
const handleClickMenuItem = (item: MenuItem) => {
    activeMenuItem.value = item
}

const activeMenuItem = ref<MenuItem>()
watchEffect(() => {
    activeMenuItem.value = route.path.length > 1 ?
    {
        name: route.name as string,
        path: route.path
    } : {
        name: 'Game',
        path: '/game'
    }
})
</script>

<style scoped lang="less">
.menu-tabs-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    .menu-item {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        cursor: pointer;
        &:hover {
            background-color: #5369df;
        }
        &:not(:last-child) {
            border-right: #5369df solid 1px;
        }
    }
    .default {
        color: #fff;
        background-color: aquamarine;
    }
    .active {
        color: #7e1010;
        background-color: #5369df;
    }
}
</style>